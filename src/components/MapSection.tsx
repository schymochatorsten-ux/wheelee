"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { type MessageKey } from "@/i18n";
import { useLocale, useT } from "@/i18n/context";
import type { ParkingSpot, ParkingSpotWithDistance } from "@/lib/types";
import { distanceMeters, formatDistance, hasCoordinates } from "@/lib/geo";
import { detectMapsTarget, type MapsTarget } from "@/lib/navigation";
import { truncationHint } from "@/lib/map-hint";
import {
  effectiveMapsPreference,
  readMapsPreference,
  type MapsPreference,
} from "@/lib/maps-preference";
import {
  DEFAULT_LOCATION_PREFERENCE,
  readLocationPreference,
  type LocationPreference,
} from "@/lib/location-preference";
import type { CityInfo } from "@/lib/parking/spots";
import type { Place } from "@/lib/geocode";
import type { PublicUser } from "@/lib/auth/user";
import { useGeolocation } from "@/hooks/useGeolocation";
import { DestinationSearch } from "./DestinationSearch";
import { useNearbySpots, useSpotsInBounds } from "@/hooks/useSpots";
import { useCities } from "@/hooks/useCities";
import type { FocusTarget, MapBounds } from "./map/ParkingMap";
import { LanguageSync } from "./LanguageSync";
import { MapLegend } from "./MapLegend";
import { SettingsPanel } from "./SettingsPanel";
import { AccountPanel } from "./AccountPanel";
import { SettingsSection } from "./SettingsSection";
import { NearestBar } from "./NearestBar";
import { SpotDetails } from "./SpotDetails";
import { SpotList } from "./SpotList";
import { FeedbackAdmin } from "./FeedbackAdmin";
import { ReportedSpots } from "./ReportedSpots";
import { AdminUsers } from "./AdminUsers";
import { AdminVisits } from "./AdminVisits";
import { AdminMail } from "./AdminMail";

/**
 * Hält Karte, Liste und Detailansicht zusammen: Standort anfragen,
 * nächstgelegenen Parkplatz bestimmen, Auswahl verwalten.
 *
 * Leaflet greift beim Laden auf `window` zu und darf deshalb nicht auf dem
 * Server gerendert werden.
 */
function MapLoading() {
  const t = useT();
  return (
    <div className="flex h-full items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <p className="text-sm text-neutral-500">{t("map.loading")}</p>
    </div>
  );
}

const ParkingMap = dynamic(() => import("./map/ParkingMap"), {
  ssr: false,
  loading: () => <MapLoading />,
});

interface MapSectionProps {
  /**
   * Die nächstgelegenen Parkplätze zur Stadtmitte, vom Server mitgeliefert.
   *
   * Nur so viele, wie die Liste zeigt – alle 17.000 ins HTML zu schreiben
   * ergab 6,3 MB (ToDo 5.4). Sobald ein Standort vorliegt, ersetzt die App
   * sie durch die wirklich nächstgelegenen.
   */
  initialNearby: ParkingSpotWithDistance[];
  /** Stadt, auf die ohne Nutzerstandort zentriert wird. */
  defaultCity: CityInfo;
  /** Angemeldetes Konto, vom Server mitgegeben – `null`, wenn keines. */
  user: PublicUser | null;
}

type View = "map" | "list" | "settings" | "feedback" | "account";

const VIEW_LABELS: Record<View, MessageKey> = {
  map: "view.map",
  list: "view.list",
  settings: "view.settings",
  feedback: "view.feedback",
  account: "settings.account",
};

/**
 * Welche Ansichten die Leiste oben anbietet.
 *
 * **„Liste" ist auf Wunsch vorläufig ausgeblendet** (2026-10-10). Die Ansicht
 * selbst bleibt vollständig erhalten – `View` kennt sie, der Zweig unten
 * rendert sie, und `nearby` wird ohnehin für die Auswahl über der Karte
 * berechnet. Wieder einschalten heißt: `"list"` hier ergänzen. Entfernt wird
 * sie bewusst nicht, denn sie ist der Zugang für Screenreader (die Karte ist
 * laut ihrer eigenen Beschriftung nur eine Ergänzung).
 *
 * **„Rückmeldungen" kommt nur für den Administrator dazu** (ToDo 17.4). Für
 * alle anderen bleibt die Kopfzeile bei zwei Reitern – jeder weitere kostet
 * dort Platz, den die Karte braucht (9.15). Dass der Reiter fehlt, ist
 * allerdings **kein Schutz**: Die Zugangsprüfung sitzt in
 * `/api/admin/feedback` und damit auf dem Server.
 *
 * **„Konto" steht ganz rechts und immer** (ToDo 9.27, auf Torstens Wunsch:
 * „Anmeldung aus den Einstellungen raus und oben rechts als kleines
 * Benutzersymbol"). Vorher lag die Anmeldung als letzter Block in den
 * Einstellungen – gemessen 1.978 px tief – und war damit praktisch nicht
 * auffindbar. Als Symbol kostet sie 44 px Kopfzeile und keinen Millimeter
 * mehr.
 */
function visibleViews(isAdmin: boolean): readonly View[] {
  return isAdmin ? ["map", "settings", "feedback", "account"] : ["map", "settings", "account"];
}

/** So viele Parkplätze zeigt die Liste höchstens. */
const LIST_LIMIT = 100;

/**
 * So viele Parkplätze bietet die Leiste über der Karte zur Auswahl an
 * (ToDo 6.16). Fünf ist ein Kompromiss: genug, damit eine Alternative dabei
 * ist, wenig genug, um die Karte nicht zuzudecken.
 */
const CANDIDATE_COUNT = 5;

/**
 * So viele Parkplätze **außerhalb** des gewählten Umkreises kommen bei einem
 * gesetzten Ziel zusätzlich in die Auswahl.
 *
 * Der Grund ist ein beobachteter Fall: Am Klinikum Frankfurt (Oder) lag
 * genau ein Parkplatz im Umkreis von 500 m – die Leiste zeigte ihn, bot aber
 * keine Auswahl an, weil es keine Alternative gab. Wer dort ankommt und den
 * Platz besetzt findet, steht ohne zweite Möglichkeit da. Der Umkreis bleibt
 * eine klare Aussage („das ist nah genug"), aber er verschweigt nicht mehr,
 * was knapp dahinter liegt.
 */
const BEYOND_RADIUS_COUNT = 3;

/**
 * Wie viel Platz die aufgeklappte Auswahl am oberen Kartenrand einnimmt.
 *
 * Eine Schätzung, und absichtlich eine großzügige: Die Leiste ist auf 46 % der
 * Bildschirmhöhe begrenzt, dazu kommt die Zielzeile darunter. Zu großzügig
 * geschätzt wird der Kartenausschnitt nur etwas enger als nötig; zu knapp
 * geschätzt landen die eingepassten Marker unter der Leiste – und das ist der
 * Fehler, der 6.21 überhaupt ausgelöst hat.
 */
const EXPANDED_BAR_HEIGHT = 430;

/**
 * Die Symbole der Reiter als Inline-SVG und nicht als Schriftzeichen.
 *
 * Derselbe Grund wie in 9.13: Zeichen wie ⚙ hängen von der Schriftart des
 * Geräts ab, fehlen auf manchen Android-Telefonen und werden dann als leeres
 * Rechteck gezeichnet. Ein SVG sieht überall gleich aus und wächst mit der
 * Schriftgröße mit (`1em`), was bei 200 % Vergrößerung zählt.
 */
const TAB_ICON = "h-[1.15em] w-[1.15em]";

/**
 * Zahnrad – mit **Zähnen**, nicht mit Strahlen (ToDo 9.28).
 *
 * Die erste Fassung war ein Kreis mit sechs abgesetzten Strichen darum. Das
 * ist die Bauform einer Sonne, und genau so wurde sie gelesen: Torsten hielt
 * den Reiter zweimal für eine Helligkeitsumschaltung („das Symbol für
 * Einstellungen ist kein Zahnrad“). Der Unterschied ist nicht Geschmack,
 * sondern Erkennbarkeit: Ein Zahnrad hat **anliegende** Zähne auf einem
 * geschlossenen Ring – die Lücke zwischen Ring und Strich ist es, die das
 * Bild zur Sonne macht.
 *
 * Deshalb hier ein gefüllter Kranz mit acht anliegenden Zähnen und einem
 * ausgesparten Loch in der Mitte (`fill-rule: evenodd`). **Der Pfad ist
 * gerechnet und nicht abgetippt** – von Hand gesetzte Koordinaten sehen im
 * Quelltext plausibel aus und stehen im Bild schief, und schief ist bei einem
 * Zahnrad sofort zu sehen.
 */
const GEAR_PATH = (() => {
  const mitte = 12;
  const zaehne = 8;
  const aussen = 10.6; // Spitze des Zahns
  const innen = 7.6; // Grund zwischen zwei Zähnen
  // Wie breit ein Zahn gemessen am Winkel ist: 0.5 wäre Zahn und Lücke gleich
  // breit. Etwas schmaler steht ruhiger, weil die Spitze außen länger wird.
  const breite = 0.42;

  const punkt = (winkel: number, radius: number) =>
    `${(mitte + Math.cos(winkel) * radius).toFixed(2)} ${(mitte + Math.sin(winkel) * radius).toFixed(2)}`;

  const schritt = (Math.PI * 2) / zaehne;
  const teile: string[] = [];

  for (let i = 0; i < zaehne; i += 1) {
    const start = i * schritt - schritt / 2;
    teile.push(
      `${i === 0 ? "M" : "L"}${punkt(start, innen)}`,
      `L${punkt(start + schritt * ((1 - breite) / 2), aussen)}`,
      `L${punkt(start + schritt * ((1 + breite) / 2), aussen)}`,
      `L${punkt(start + schritt, innen)}`,
    );
  }

  // Das Loch gegenläufig, damit `evenodd` es aussticht.
  const loch = 3.5;
  return (
    `${teile.join("")}Z` +
    `M${mitte + loch} ${mitte}` +
    `A${loch} ${loch} 0 1 0 ${mitte - loch} ${mitte}` +
    `A${loch} ${loch} 0 1 0 ${mitte + loch} ${mitte}Z`
  );
})();

function GearIcon() {
  return (
    <svg className={TAB_ICON} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d={GEAR_PATH} />
    </svg>
  );
}

function InboxIcon() {
  return (
    <svg
      className={TAB_ICON}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M3 13.5V19a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 19v-5.5"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M3 13.5 5.8 4.8A1.5 1.5 0 0 1 7.2 3.8h9.6a1.5 1.5 0 0 1 1.4 1L21 13.5h-5l-1.3 2.2h-5.4L8 13.5H3z"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Konto – der Kopf-und-Schultern-Umriss, den jede App dafür benutzt.
 *
 * Angemeldet ist er gefüllt, abgemeldet nur umrissen: ein Unterschied, den
 * man ohne Lesen sieht, zusätzlich zum Namen für Screenreader.
 */
function UserIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={TAB_ICON}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.6" strokeWidth="2" />
      <path
        d="M4.8 20.2c0-3.6 3.2-5.8 7.2-5.8s7.2 2.2 7.2 5.8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MapSection({ initialNearby, defaultCity, user: initialUser }: MapSectionProps) {
  const t = useT();
  const cities = useCities(defaultCity);
  const locale = useLocale();
  const center = defaultCity.center;
  const geo = useGeolocation();
  const [selected, setSelected] = useState<ParkingSpot | null>(null);
  const [view, setView] = useState<View>("map");
  const [focus, setFocus] = useState<FocusTarget | null>(null);

  /**
   * Das angemeldete Konto.
   *
   * Es kommt vom Server, wird hier aber im Zustand gehalten: An- und Abmelden
   * sollen sofort wirken, ohne die Seite neu zu laden – sonst würde beim
   * Abmelden die Karte samt Standortfreigabe neu aufgebaut, und man müsste den
   * Standort erneut bestätigen.
   */
  const [user, setUser] = useState<PublicUser | null>(initialUser);
  const views = visibleViews(user?.isAdmin === true);

  /**
   * Nach dem Abmelden darf kein Blick auf die Rückmeldungen übrig bleiben.
   *
   * Angezeigt würde ohnehin nichts – die Route antwortet dann mit 401 –, aber
   * eine Ansicht mit leerer Liste und Fehlermeldung ist eine schlechtere
   * Antwort als die Karte, zu der man zurückwill.
   */
  useEffect(() => {
    if (view === "feedback" && user?.isAdmin !== true) setView("map");
  }, [view, user]);

  // Startpasswort (ToDo 18.7): Die Einstellungen sind der Ort, an dem es geändert wird.
  useEffect(() => {
    if (user?.mustChangePassword) setView("settings");
  }, [user]);

  /**
   * Die Marker der Karte kommen aus dem sichtbaren Ausschnitt, die Liste und
   * die Navigationsleiste aus der Nähe-Abfrage. Beides lädt der Server
   * nach – siehe `useSpots`.
   */
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const { spots: mapSpots, clusters, truncated } = useSpotsInBounds(bounds, initialNearby);
  /*
   * Zu viele Standorte für Einzelmarker: Der Server schickt dann Zähler je
   * Gebiet (ToDo 9.20), gerechnet über **alle** Standorte des Ausschnitts.
   *
   * Vorher blieb die Karte in diesem Fall unterhalb von Zoomstufe 10 leer
   * (9.16) – zu Recht, denn die 2.000 gelieferten Standorte waren eine
   * Teilmenge in Seed-Reihenfolge und hätten an manchen Orten „hier ist
   * nichts" vorgetäuscht. Die Zähler beseitigen den Grund dafür.
   *
   * **Der alte Weg bleibt als Rückfallebene:** Ein Service Worker aus einem
   * früheren Stand beantwortet `/api/spots` noch ohne `clusters`. Dann gilt
   * wieder die gemessene Schwelle aus `lib/map-hint.ts`.
   */
  const showCounts = clusters.length > 0;
  const hint = showCounts ? "none" : truncationHint(truncated, bounds?.zoom ?? null);

  /**
   * Das Reiseziel (ToDo 6.12). Ist eines gesetzt, bezieht sich alles darauf
   * statt auf den eigenen Standort: Wer vor der Abfahrt wissen will, wo am
   * Ziel ein Platz ist, interessiert sich nicht für die Parkplätze zu Hause.
   */
  const [destination, setDestination] = useState<Place | null>(null);

  /**
   * Umkreis um das Ziel (ToDo 6.12). 500 m ist die Voreinstellung: etwa fünf
   * Gehminuten, und für jemanden mit Gehbehinderung schon eine Entscheidung
   * wert – weiter ist selten zumutbar, näher oft nicht zu haben.
   */
  const [radius, setRadius] = useState(500);

  /**
   * Karten-App: was das Gerät nahelegt und was die Nutzerin gewählt hat.
   * Beides erst nach dem Laden, weil `navigator` und `localStorage` auf dem
   * Server fehlen.
   */
  const [detected, setDetected] = useState<MapsTarget>("google");
  const [mapsPreference, setMapsPreference] = useState<MapsPreference>("auto");

  useEffect(() => {
    setDetected(detectMapsTarget(navigator.userAgent));
    // Die Wahl am Konto gilt geräteübergreifend und schlägt deshalb den
    // Browser-Speicher (ToDo 11.3a).
    setMapsPreference(effectiveMapsPreference(user?.mapsPreference, readMapsPreference()));
  }, [user?.mapsPreference]);

  // Die Wahl schlägt die Geräteerkennung; „auto" bedeutet weiter raten.
  const mapsTarget: MapsTarget = mapsPreference === "auto" ? detected : mapsPreference;

  /**
   * Standort abfragen – aber nur, wenn es erlaubt ist (ToDo 9.25).
   *
   * **Erst nach dem Laden gelesen**, weil es auf dem Server keinen Speicher
   * gibt; `null` heißt also „noch nicht gelesen“ und nicht „aus“. Am Konto
   * schlägt die Wahl den Browser – das ist der Sinn der Sache: Wer auf dem
   * Telefon abgelehnt hat, soll am Rechner nicht erneut gefragt werden.
   */
  const [locationPreference, setLocationPreference] = useState<LocationPreference | null>(null);
  useEffect(() => {
    setLocationPreference(
      user?.locationPreference ?? readLocationPreference() ?? DEFAULT_LOCATION_PREFERENCE,
    );
  }, [user?.locationPreference]);

  // Der Browser fragt selbst um Erlaubnis; hier steht nur, ob überhaupt
  // gefragt werden soll. Beim Abschalten endet die laufende Ortung sofort.
  useEffect(() => {
    if (locationPreference === "on") geo.request();
    if (locationPreference === "off") geo.stop();
  }, [locationPreference]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Die nächstgelegenen Parkplätze, vom Server berechnet.
   *
   * Ohne Standortfreigabe bleibt es bei den serverseitig vorgerechneten
   * Einträgen um die Stadtmitte; sobald ein Standort vorliegt, werden sie
   * ersetzt.
   */
  // In einem `useMemo`, damit die Abhängigkeiten stabil bleiben – sonst
  // liefe die Nähe-Abfrage bei jedem Rendern neu.
  const reference = useMemo(
    () => (destination ? { lat: destination.lat, lng: destination.lng } : geo.position),
    [destination, geo.position],
  );
  const nearby = useNearbySpots(reference, initialNearby, LIST_LIMIT);

  const nearest = reference ? (nearby[0] ?? null) : null;

  // Die Auswahl der Leiste: die nächsten Parkplätze zum eigenen Standort.
  // Ohne Standortfreigabe zählt die Liste ab der Stadtmitte, und das wäre
  // kein Vorschlag, sondern Zufall.
  /**
   * Was die Leiste anbietet.
   *
   * Ohne Ziel die fünf nächstgelegenen. Mit Ziel alles im gewählten Umkreis –
   * dort ist die Frage nicht „was ist am nächsten", sondern „was ist nah
   * genug". Liegt im Umkreis nichts, wird trotzdem der nächstgelegene
   * genannt: Ein leerer Vorschlag hilft niemandem, der gleich losfährt, und
   * die Entfernung steht ja daneben.
   */
  const { candidates, inRadiusCount } = useMemo(() => {
    if (!reference) return { candidates: [], inRadiusCount: 0 };
    if (!destination) {
      return { candidates: nearby.slice(0, CANDIDATE_COUNT), inRadiusCount: 0 };
    }

    const inRadius = nearby.filter((spot) => spot.distanceMeters <= radius);
    const beyond = nearby
      .filter((spot) => spot.distanceMeters > radius)
      .slice(0, BEYOND_RADIUS_COUNT);

    return {
      candidates: [...inRadius.slice(0, LIST_LIMIT), ...beyond],
      inRadiusCount: inRadius.length,
    };
  }, [reference, nearby, destination, radius]);

  /** Ein gewähltes Ziel rückt sofort ins Bild. */
  const chooseDestination = useCallback((place: Place) => {
    setDestination(place);
    setView("map");
    setFocus({ key: `ziel-${place.lat}-${place.lng}`, points: [place] });
  }, []);

  /** Ziel der Leiste und – wenn aufgeklappt – die angebotenen Alternativen. */
  const [barTargetId, setBarTargetId] = useState<string | null>(null);
  const [barExpanded, setBarExpanded] = useState(false);

  const onTargetChange = useCallback((spot: ParkingSpot) => setBarTargetId(spot.id), []);

  /**
   * Der Parkplatz, den die Leiste gerade als Ziel führt – dieselbe Rechnung
   * wie dort, damit Karte, Luftlinie und Navigationsknopf nicht auf
   * verschiedene Plätze zeigen. Ohne eigene Wahl ist es der nächstgelegene.
   */
  const barTarget = useMemo(
    () => candidates.find((spot) => spot.id === barTargetId) ?? candidates[0] ?? null,
    [candidates, barTargetId],
  );

  const highlightIds = useMemo(
    () => (barExpanded ? new Set(candidates.map((spot) => spot.id)) : null),
    [barExpanded, candidates],
  );

  /**
   * Beim Aufklappen die ganze Auswahl ins Bild holen (ToDo 6.21).
   *
   * Vorher deckte die Liste die Karte zu, und darunter lagen genau die
   * Parkplätze, über die sie Auskunft gab – man las Namen und Entfernungen,
   * ohne zu sehen, wo sie liegen. Die Liste ist deshalb niedriger geworden,
   * und die Karte zeigt jetzt das, was in der Liste steht.
   *
   * Nur beim Öffnen, nicht beim Schließen: Wer die Auswahl zuklappt, will
   * weitersehen, wo er gerade hingeschaut hat, und nicht erneut verschoben
   * werden.
   */
  const onExpandedChange = useCallback(
    (expanded: boolean) => {
      setBarExpanded(expanded);
      if (!expanded) return;

      const located = candidates.filter(hasCoordinates);
      if (located.length === 0) return;

      setFocus({
        key: `auswahl-${located.length}-${located[0].id}`,
        points: reference ? [...located, reference] : located,
        padTop: EXPANDED_BAR_HEIGHT,
      });
    },
    [candidates, reference],
  );

  /**
   * Beim ersten Standort auf **den Nutzer** zentrieren, nicht auf den
   * nächstgelegenen Parkplatz.
   *
   * Vorher sprang die Karte zum Parkplatz, und man sah sich selbst nicht mehr.
   * Die erste Frage beim Öffnen ist aber „wo bin ich", nicht „wo ist das Ziel" –
   * zumal der Parkplatz in Sichtweite liegen kann und beides dann ohnehin im
   * Bild ist.
   */
  const centeredOnUser = useRef(false);

  useEffect(() => {
    if (geo.status !== "ready" || !geo.position || centeredOnUser.current) return;
    centeredOnUser.current = true;
    setFocus({ key: "eigener-standort", points: [geo.position] });
  }, [geo.status, geo.position]);

  /** Karte zurück auf den eigenen Standort holen. */
  const backToMe = useCallback(() => {
    if (!geo.position) return;
    setView("map");
    setFocus({ key: `standort-${Date.now()}`, points: [geo.position] });
  }, [geo.position]);

  const select = useCallback(
    (spot: ParkingSpot) => {
      setSelected(spot);
      setView("map");
      if (hasCoordinates(spot)) {
        setFocus({
          key: `spot-${spot.id}-${Date.now()}`,
          points: reference ? [spot, reference] : [spot],
        });
      }
    },
    [reference],
  );

  /**
   * Karte auf einen Parkplatz bringen, **ohne** die Detailansicht zu öffnen.
   *
   * Der Unterschied zu `select` ist der Zweck: Beim Durchsehen der Auswahl
   * will man wissen, *wo* ein Platz liegt – ob er in der richtigen Richtung
   * ist, ob eine Hauptstraße dazwischen liegt. Die Detailansicht legt sich
   * dabei über genau die Karte, auf die man schauen will.
   */
  const jumpTo = useCallback(
    (spot: ParkingSpot) => {
      if (!hasCoordinates(spot)) return;
      setSelected(null);
      setView("map");
      setFocus({
        key: `zeigen-${spot.id}-${Date.now()}`,
        // Der Bezugspunkt soll mit ins Bild, sonst endet die Luftlinie
        // unerklärt am Rand (ToDo 6.22).
        points: reference ? [spot, reference] : [spot],
      });
    },
    [reference],
  );

  // Parkplätze kennen nur den Stadt-Slug; Name und Importdatum kennt die
  // Städteliste.
  const cityBySlug = useMemo(() => new Map(cities.map((city) => [city.slug, city])), [cities]);
  const cityNameOf = useCallback(
    (slug: string) => cityBySlug.get(slug)?.name ?? slug,
    [cityBySlug],
  );

  const selectedDistance =
    selected && geo.position && hasCoordinates(selected)
      ? distanceMeters(geo.position, { lat: selected.lat, lng: selected.lng })
      : null;

  /**
   * Die rote Luftlinie: vom Bezugspunkt zum gerade gewählten Parkplatz.
   *
   * **Was sie beantwortet:** „In welche Richtung, und wie weit wirklich?" Eine
   * Entfernungsangabe in Metern sagt das nicht – 300 m können um die Ecke oder
   * auf der anderen Seite einer vierspurigen Straße sein. Die Linie zeigt
   * beides auf einen Blick, ohne dass man die Marker auf der Karte
   * zusammensuchen muss.
   *
   * Der Bezugspunkt ist das Ziel, wenn eines eingegeben ist, sonst der eigene
   * Standort – dieselbe Regel wie für die Auswahl selbst. Sie ist bewusst eine
   * **Luftlinie und keine Route**: Die App navigiert nicht, sie übergibt an
   * eine Karten-App. Eine gezeichnete Strecke, die wie ein Fahrweg aussieht,
   * aber keiner ist, wäre eine Zusage, die sie nicht halten kann.
   */
  const lineTarget = selected ?? barTarget;
  const line =
    reference && lineTarget && hasCoordinates(lineTarget)
      ? { from: reference, to: { lat: lineTarget.lat, lng: lineTarget.lng } }
      : null;

  return (
    // Die Bildschirmhöhe setzt das Layout; hier nur den Rest ausfüllen.
    <div className="flex min-h-0 flex-1 flex-col">
      <LanguageSync accountLanguage={user?.language ?? null} />
      {/*
        Die Kopfzeile ist so klein wie möglich gehalten (auf Wunsch,
        2026-10-11). Sie trägt nichts bei, was beim Parkplatzsuchen hilft –
        jeder Millimeter hier fehlt der Karte, und die Karte ist die App.
      */}
      {/*
        **Deckend und ohne `backdrop-blur`** (ToDo 9.26). Die Kopfzeile liegt
        nicht über der Karte – sie ist deren Nachbarin im Flex-Rahmen –, also
        verwischte der Weichzeichner nichts als den eigenen Hintergrund. Er
        kostete aber eine eigene Ebene, und auf der zeichnet der Browser
        Schrift ohne Subpixel-Glättung: Der ganze Streifen wirkte unscharf,
        während der Text darunter scharf stand.

        Oben etwas mehr Luft (`pt-3`), weil die Zeile auf dem iPhone direkt
        an der Statusleiste klebte und abgeschnitten wirkte.
      */}
      <header className="shrink-0 border-b border-neutral-200 bg-white px-3 pt-3 pb-2 dark:border-neutral-800 dark:bg-neutral-900">
        {/*
          `flex-wrap`, damit bei großer Schrift die Ansichtswahl in die
          nächste Zeile rutscht, statt die Seite breiter zu machen: Bei 200 %
          Schriftgröße brauchen Überschrift und Reiter zusammen mehr Platz,
          als ein Telefon hat, und die Seite ließ sich seitwärts schieben
          (ToDo 9.8). `min-w-0` erlaubt der Überschrift zu schrumpfen – ohne
          das gewinnt sie den Platzstreit und schiebt die Reiter hinaus.
        */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* `hyphens-auto` greift, weil <html lang="de"> gesetzt ist:
              „Behindertenparkplätze" passt bei großer Schrift sonst in keine
              Telefonzeile und würde abgeschnitten. */}
          {/*
            Nur die Überschrift, keine Bestandszahlen (auf Wunsch,
            2026-10-11). „209 Städte" darunter und „18.072 Parkplätze in 209
            Städten" in der Statuszeile beantworteten eine Frage, die niemand
            stellt, der gerade einen Parkplatz sucht – und sie nahmen auf dem
            Telefon zwei Zeilen über der Karte ein. Die Zahlen sind nicht
            verloren: Sie stehen in der Listenansicht unter „Woher die Daten
            kommen" und in `data/_abdeckung.md`, also dort, wo jemand sie
            wirklich nachschlägt.
          */}
          {/*
            **Ohne Farbverlauf** (ToDo 9.26). `bg-clip-text` zeichnet Schrift
            als Maske über einen Verlauf; der Browser kann dabei nicht mit
            Subpixeln glätten, und genau deshalb stand die Überschrift weich
            da, während die Zeile darunter scharf war – auf dem iPhone-Foto
            Seite an Seite zu sehen. Dazu lief der Verlauf ins Cyan, das auf
            dunklem Grund am schwächsten steht.

            Eine Volltonfarbe ist hier nicht Geschmack, sondern Lesbarkeit:
            Die Zielgruppe liest das auf einem Telefon, oft im Auto.
          */}
          <h1 className="min-w-0 text-base font-bold break-words hyphens-auto text-blue-800 dark:text-blue-200">
            {t("app.title")}
          </h1>
          {/*
            **Ein Segmentschalter wie in den Systemapps von Apple** (ToDo
            9.31): eine Fläche, darin die Stellungen, die gewählte als weißes
            Feld. Vorher waren es vier einzelne Knöpfe mit Abstand, von denen
            der gewählte als blauer Block heraussprang – vier Flächen für eine
            Entscheidung. Die Mindestgröße von 44 px (9.8) und die Symbole auf
            dem Telefon (9.28, 9.27) bleiben unverändert.
          */}
          <div
            role="tablist"
            aria-label={t("view.choose")}
            className="flex shrink-0 gap-0.5 rounded-xl bg-neutral-200/80 p-0.5 text-xs dark:bg-neutral-800/80"
          >
            {views.map((option) => (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={view === option}
                onClick={() => setView(option)}
                // `min-h-11` bleibt: 44 px ist die Mindestgröße, die sich
                // einhändig treffen lässt (ToDo 9.8). Schlanker heißt hier
                // weniger Fläche drumherum, nicht kleinere Knöpfe.
                className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-[0.6rem] px-3 font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                  view === option
                    ? // **Flächig, ohne Schein und ohne Verlauf** (ToDo 9.29).
                      // `shadow-lg shadow-blue-700/30` legte einen weich
                      // auslaufenden blauen Hof um den gewählten Reiter –
                      // auf dem Telefon las sich der ganze Streifen dadurch
                      // wie weichgezeichnet, und genau diesen Hof hat
                      // Torsten am 2026-11-08 eingekringelt. Ein Schatten,
                      // der nach Leuchten aussieht, sagt nichts; welcher
                      // Reiter gewählt ist, sagt die Füllung.
                      //
                      // **Seit 9.31 weiß statt blau:** Im Segmentschalter
                      // trägt die erhobene Fläche die Auswahl. Blau wäre hier
                      // ein zweites Signal für dieselbe Sache und nimmt der
                      // Kopfzeile ihre Ruhe.
                      // Im Dunkelmodus die **dunklere** Fläche: Die Palette
                      // dieses Projekts dreht die Grauwerte (globals.css),
                      // ein helleres Grau trüge weiße Schrift nur mit 2,6 : 1
                      // – WCAG AA verlangt 4,5 : 1 (9.7).
                      "bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-white"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
              >
                {/*
                  **Auf dem Telefon nur das Symbol** – so ausdrücklich gewollt
                  (Torsten, 2026-11-08: „Settings bitte mobil als Zahnrad
                  darstellen und nicht Settings schreiben“). Der Name bleibt
                  für Screenreader stehen.

                  Am selben Tag war er kurzzeitig ausgeschrieben, weil das
                  Zahnrad für eine Helligkeitsumschaltung gehalten worden war
                  und die Anmeldung dahinter unauffindbar schien. Das war
                  nicht die Ursache: Die Anmeldung lag 1.978 px tief in den
                  Einstellungen. Dagegen hilft die Sprungmarke in
                  `SettingsPanel`, nicht ein breiterer Reiter – die Kopfzeile
                  wuchs dadurch um 32 px, die der Karte gehören (9.15).

                  **„Konto" bleibt auf jeder Breite ein Symbol** (9.27): Der
                  Umriss ist dafür das eingeführte Zeichen, und ausgeschrieben
                  nähme „Konto“ dem Kartenausschnitt auf dem Rechner Platz
                  weg, ohne etwas zu erklären.
                */}
                {option === "account" ? (
                  <>
                    <span aria-hidden="true">
                      <UserIcon filled={user !== null} />
                    </span>
                    <span className="sr-only">{t(VIEW_LABELS[option])}</span>
                  </>
                ) : option === "settings" || option === "feedback" ? (
                  <>
                    <span aria-hidden="true" className="sm:hidden">
                      {option === "settings" ? <GearIcon /> : <InboxIcon />}
                    </span>
                    <span className="max-sm:sr-only">{t(VIEW_LABELS[option])}</span>
                  </>
                ) : (
                  t(VIEW_LABELS[option])
                )}
              </button>
            ))}
          </div>
        </div>

        {/*
          In den Einstellungen bleibt diese Zeile weg (auf Wunsch, 2026-10-10).
          Sie beantwortet „wo ist der nächste Parkplatz" – eine Frage, die sich
          dort niemand stellt. Wer Darstellung oder Karten-App ändert, braucht
          keine Bestandszahlen, und die Standortsuche nebenher zu melden lenkt
          nur ab.
        */}
        {/*
          Statuszeile und „erneut versuchen" stehen in **einer** Zeile. Vorher
          waren es zwei, und bei abgelehntem Standort – dem Fall, in dem die
          Karte am meisten zählt, weil es keinen Vorschlag gibt – war die
          Kopfzeile dadurch 125 px hoch statt 80.
        */}
        {(view === "map" || view === "list") && (
          <div className="mt-0.5 flex items-center gap-2">
            <p
              aria-live="polite"
              className="min-w-0 flex-1 truncate text-xs text-neutral-600 dark:text-neutral-400"
            >
              {geo.status === "locating" && t("map.locating")}
              {geo.status === "ready" &&
                (nearest
                  ? t("map.nearestSpot", {
                      name: nearest.street ?? nearest.label,
                      distance: formatDistance(nearest.distanceMeters, locale),
                    })
                  : t("map.noneNearby"))}
              {geo.message}
            </p>
            {(geo.status === "denied" ||
              geo.status === "timeout" ||
              geo.status === "unavailable") && (
              <button
                type="button"
                onClick={geo.request}
                // Sichtbar steht nur „Erneut" – neben der Meldung, die den
                // Grund nennt, ist das eindeutig. Vorgelesen fehlte der
                // Zusammenhang, deshalb der vollständige Name.
                aria-label={t("map.retryLocation")}
                className="min-h-11 shrink-0 rounded-xl bg-neutral-200/80 px-2.5 text-xs font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:bg-neutral-800"
              >
                {t("search.retry")}
              </button>
            )}
          </div>
        )}
      </header>

      <main className="relative min-h-0 flex-1">
        {view === "map" ? (
          <>
            <ParkingMap
              spots={hint === "city-level" ? [] : mapSpots}
              clusters={clusters}
              center={center}
              userPosition={geo.position}
              destination={destination}
              nearestId={barTargetId ?? nearest?.id ?? null}
              highlightIds={highlightIds}
              focus={focus}
              line={line}
              onSelect={select}
              onBoundsChange={setBounds}
            />
            {/* Nur zeigen, solange keine Detailansicht offen ist – sonst
                stünden zwei Navigationsknöpfe übereinander. */}
            {/*
              Parkplatzvorschlag und Zielsuche stehen gemeinsam oben in einer
              Spalte. Unten am Kartenrand ginge nicht: Dort sitzt die
              OpenStreetMap-Attribution, und die muss sichtbar bleiben – das
              verlangt die ODbL.
            */}
            {/*
              Zielsuche zuoberst und links (auf Wunsch, 2026-10-11): Sie ist
              eine Möglichkeit, kein Vorschlag – wer die App öffnet, sucht
              meistens hier und jetzt. Als kleine Schaltfläche oben links
              bleibt sie auffindbar, ohne eine volle Zeile Karte zu kosten.
            */}
            {!selected && (
              /*
                **Eine umbrechende Zeile statt einer Spalte** (ToDo 9.30).
                Zugeklappt sind das drei kleine Flächen – „Wohin willst du?",
                die Entfernung und „zurück zu meinem Standort" –, und die
                standen untereinander: zwei Zeilen Karte für zusammen keine
                halbe. Jetzt stehen sie nebeneinander, die beiden Knöpfe
                rechts.

                **Der Umbruch ist der Trick und keine Nachlässigkeit:** Wer
                die Suche öffnet oder den Parkplatzvorschlag aufklappt, nimmt
                die volle Breite (`w-full` an deren Wurzel) – dann rutschen
                die beiden Knöpfe von selbst in die nächste Zeile, genau wie
                gewünscht. Ohne `flex-wrap` müsste dafür ein Zustand von
                unten nach oben gereicht werden.
              */
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] flex flex-wrap items-start gap-1.5 p-2">
                <DestinationSearch
                  destination={destination}
                  // Derselbe Bezugspunkt wie für die Auswahl: Ziel, wenn eines
                  // gesetzt ist, sonst der eigene Standort. Die Ortssuche
                  // ordnet ihre Treffer danach – wer „Bahnhofstraße" tippt,
                  // meint die in seiner Nähe.
                  reference={reference}
                  onChoose={chooseDestination}
                  onClear={() => setDestination(null)}
                />
                <NearestBar
                  candidates={candidates}
                  mapsTarget={mapsTarget}
                  hasPosition={reference !== null}
                  onBackToMe={backToMe}
                  onShowDetails={select}
                  onJumpTo={jumpTo}
                  onTargetChange={onTargetChange}
                  onExpandedChange={onExpandedChange}
                  destinationLabel={destination?.label ?? null}
                  inRadiusCount={inRadiusCount}
                  radius={radius}
                  onRadiusChange={setRadius}
                />
              </div>
            )}
            {/*
              Wenn der Ausschnitt mehr Parkplätze enthält, als geladen werden,
              muss das dastehen. Eine Karte, die stillschweigend die Hälfte
              verschweigt, ist schlimmer als eine, die zum Hineinzoomen
              auffordert – man verlässt sich sonst darauf, dass hier keiner ist.

              **Breite begrenzt und Satz gekürzt (ToDo 9.16, 2026-10-21).**
              `w-fit` heißt bei einem Satz, der länger ist als der Bildschirm,
              **volle Breite**: Der Streifen klebte randlos an beiden Seiten
              und war keine Pille mehr. Jetzt bleibt ein Rand stehen, und
              „dieses Ausschnitts" ist weg – es stand da, wo ohnehin nur der
              sichtbare Ausschnitt gemeint sein kann.
            */}
            {/*
              Bei Zählern steht dort, was die Zahlen bedeuten. Ohne diesen Satz
              läse man sie als „so viele gibt es hier" – gemeint ist „so viele
              sind hier bekannt", und in OpenStreetMap-Gemeinden ist das nicht
              dasselbe. Kurz gehalten aus dem Grund von 9.16: Ein Satz, der
              breiter ist als der Bildschirm, wird aus der Pille ein Balken.
            */}
            {showCounts && (
              <p
                role="status"
                className="pointer-events-none absolute inset-x-0 bottom-10 z-[1000] mx-auto w-fit max-w-[calc(100%-2rem)] rounded-2xl bg-amber-100 px-3 py-1.5 text-center text-xs font-medium text-amber-900 shadow dark:bg-amber-950 dark:text-amber-100"
              >
                {t("map.hintCounts")}
              </p>
            )}
            {hint !== "none" && (
              <p
                role="status"
                className="pointer-events-none absolute inset-x-0 bottom-10 z-[1000] mx-auto w-fit max-w-[calc(100%-2rem)] rounded-2xl bg-amber-100 px-3 py-1.5 text-center text-xs font-medium text-amber-900 shadow dark:bg-amber-950 dark:text-amber-100"
              >
                {hint === "city-level" ? t("map.hintCityLevel") : t("map.hintTruncated")}
              </p>
            )}
            <MapLegend />
            {selected && (
              <SpotDetails
                spot={selected}
                distanceMeters={selectedDistance}
                cityName={cityNameOf(selected.city)}
                importedAt={cityBySlug.get(selected.city)?.importedAt ?? null}
                mapsTarget={mapsTarget}
                accountEmail={user?.email ?? null}
                onClose={() => setSelected(null)}
              />
            )}
          </>
        ) : view === "list" ? (
          <div className="h-full overflow-y-auto px-4 py-4">
            <SpotList
              nearby={nearby}
              unlocated={[]}
              hasUserPosition={geo.position !== null}
              cities={cities}
              onSelect={select}
            />
          </div>
        ) : view === "feedback" ? (
          /*
            Begrenzte Breite wie im Reiter „Einstellungen“ (ToDo 9.21): Über
            die ganze Bildschirmbreite gezogen stehen Beschriftung und Feld so
            weit auseinander, dass man die Zeile verliert – auf einem breiten
            Bildschirm der häufigste Grund, warum eine Einstellungsseite
            unübersichtlich wirkt.
          */
          <div className="relative mx-auto h-full w-full max-w-2xl space-y-6 overflow-y-auto px-4 py-4">
            {/*
              Die Prüfliste aus den Bewertungen (8.8) steht im **selben**
              Reiter und nicht in einem eigenen. Beide Abschnitte beantworten
              dieselbe Frage – „wo stimmen die Daten nicht?" –, nur aus zwei
              Quellen: geschriebene Meldungen und Daumen nach unten. Ein
              zweiter Reiter kostete Platz in der Kopfzeile, den die Karte
              braucht (9.15), und man müsste zwischen zwei Listen wechseln, um
              sich ein Bild zu machen.

              **Sie steht oben, und das ist beim Prüfen im Browser
              entschieden worden:** Darunter lagen zehn Rückmeldungen, und die
              Prüfliste war erst nach langem Scrollen zu sehen. Das ist genau
              der Fehler, den dieses Projekt schon zweimal gemacht hat – ein
              Hinweis, den niemand sieht, ist schlimmer als keine Prüfung
              (vgl. „Auffällig dünne Datenlage" in 2d.10 und der verschwundene
              Haftungshinweis in 9.11). Sie ist außerdem die kürzere der
              beiden: nach oben begrenzt durch die Mindestzahl, im Normalfall
              drei Zeilen. Die Rückmeldungen wachsen unbegrenzt.
            */}
            <ReportedSpots onShowSpot={select} />
            {/* Ein gemeldeter Parkplatz führt über `select` auf die Karte –
                dieselbe Bewegung wie aus der Liste, samt Detailansicht und
                Luftlinie. Die Meldung wird damit sofort nachprüfbar. */}
            <FeedbackAdmin onShowSpot={select} />
            <AdminUsers />
            <AdminVisits />
            {/* Mailversand einrichten (10.22): steht unten, weil man ihn einmal
                einstellt und dann jahrelang nicht ansieht – anders als die
                Prüflisten darüber, die bei jedem Öffnen zählen. */}
            <AdminMail />
          </div>
        ) : view === "account" ? (
          /*
            **Das Konto hat eine eigene Ansicht** (ToDo 9.27). Bis zum
            2026-11-08 war es der letzte Block in den Einstellungen und lag
            damit 1.978 px tief – hinter Darstellung, Sprache, Karten-App und
            der Städteliste. Wer sich anmelden wollte, fand es nicht.

            `relative` und begrenzte Breite wie überall sonst (9.21, 9.22).
          */
          <div className="relative mx-auto h-full w-full max-w-2xl overflow-y-auto px-4 py-4">
            <SettingsSection title={t("settings.account")} description={t("settings.accountNote")}>
              <AccountPanel
                user={user}
                onUserChange={setUser}
                onShowSpot={select}
                position={geo.position}
              />
            </SettingsSection>
          </div>
        ) : (
          /*
            **`relative` ist hier kein Schmuck, sondern behebt einen zweiten
            Scrollbalken** (ToDo 9.22). `sr-only` ist in Tailwind
            `position: absolute`. Ohne einen positionierten Vorfahren ist der
            Bezugsrahmen dieser Überschriften das `main` **außerhalb** des
            scrollenden Kastens – sie werden von dessen `overflow` also nicht
            abgeschnitten, stehen an ihrer statischen Stelle weit unten und
            ziehen die ganze Seite auf. Gemessen bei 1280 × 860 und
            angemeldetem Konto: `body.scrollHeight` 1876 statt 860, also gut
            tausend Pixel Leere unter dem Inhalt. Mit `relative` liegt der
            Bezugsrahmen im Kasten und alles wird geschnitten.
          */
          <div className="relative h-full overflow-y-auto px-4 py-4">
            <SettingsPanel
              detected={detected}
              cities={cities}
              onMapsPreferenceChange={setMapsPreference}
              locationPreference={locationPreference ?? DEFAULT_LOCATION_PREFERENCE}
              onLocationPreferenceChange={setLocationPreference}
              user={user}
              onUserChange={setUser}
            />
          </div>
        )}
      </main>
    </div>
  );
}
