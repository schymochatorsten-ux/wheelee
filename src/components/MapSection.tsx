"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ParkingSpot, ParkingSpotWithDistance } from "@/lib/types";
import { distanceMeters, formatDistance, hasCoordinates } from "@/lib/geo";
import { detectMapsTarget, type MapsTarget } from "@/lib/navigation";
import { readMapsPreference, type MapsPreference } from "@/lib/maps-preference";
import type { CityInfo } from "@/lib/parking/spots";
import type { Place } from "@/lib/geocode";
import type { PublicUser } from "@/lib/auth/user";
import { useGeolocation } from "@/hooks/useGeolocation";
import { DestinationSearch } from "./DestinationSearch";
import { useNearbySpots, useSpotsInBounds } from "@/hooks/useSpots";
import type { FocusTarget, MapBounds } from "./map/ParkingMap";
import { MapLegend } from "./MapLegend";
import { SettingsPanel } from "./SettingsPanel";
import { NearestBar } from "./NearestBar";
import { SpotDetails } from "./SpotDetails";
import { SpotList } from "./SpotList";
import { FeedbackAdmin } from "./FeedbackAdmin";

/**
 * Hält Karte, Liste und Detailansicht zusammen: Standort anfragen,
 * nächstgelegenen Parkplatz bestimmen, Auswahl verwalten.
 *
 * Leaflet greift beim Laden auf `window` zu und darf deshalb nicht auf dem
 * Server gerendert werden.
 */
const ParkingMap = dynamic(() => import("./map/ParkingMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <p className="text-sm text-neutral-500">Karte wird geladen …</p>
    </div>
  ),
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
  cities: CityInfo[];
  /** Stadt, auf die ohne Nutzerstandort zentriert wird. */
  defaultCity: CityInfo;
  /** Angemeldetes Konto, vom Server mitgegeben – `null`, wenn keines. */
  user: PublicUser | null;
}

type View = "map" | "list" | "settings" | "feedback";

const VIEW_LABELS: Record<View, string> = {
  map: "Karte",
  list: "Liste",
  settings: "Einstellungen",
  feedback: "Rückmeldungen",
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
 */
function visibleViews(isAdmin: boolean): readonly View[] {
  return isAdmin ? ["map", "settings", "feedback"] : ["map", "settings"];
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

function GearIcon() {
  return (
    <svg
      className={TAB_ICON}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3.2" strokeWidth="2" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.2 7.2l1.9 1.1M17.9 15.7l1.9 1.1M4.2 16.8l1.9-1.1M17.9 8.3l1.9-1.1"
        strokeWidth="2"
        strokeLinecap="round"
      />
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

export function MapSection({
  initialNearby,
  cities,
  defaultCity,
  user: initialUser,
}: MapSectionProps) {
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

  /**
   * Die Marker der Karte kommen aus dem sichtbaren Ausschnitt, die Liste und
   * die Navigationsleiste aus der Nähe-Abfrage. Beides lädt der Server
   * nach – siehe `useSpots`.
   */
  const [bounds, setBounds] = useState<MapBounds | null>(null);
  const { spots: mapSpots, truncated } = useSpotsInBounds(bounds, initialNearby);

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
    setMapsPreference(readMapsPreference());
  }, []);

  // Die Wahl schlägt die Geräteerkennung; „auto" bedeutet weiter raten.
  const mapsTarget: MapsTarget = mapsPreference === "auto" ? detected : mapsPreference;

  // Standort direkt anfragen: Der Nutzen der App hängt daran, und der Browser
  // fragt selbst um Erlaubnis.
  useEffect(() => {
    geo.request();
  }, [geo.request]); // eslint-disable-line react-hooks/exhaustive-deps

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
      {/*
        Die Kopfzeile ist so klein wie möglich gehalten (auf Wunsch,
        2026-10-11). Sie trägt nichts bei, was beim Parkplatzsuchen hilft –
        jeder Millimeter hier fehlt der Karte, und die Karte ist die App.
      */}
      <header className="shrink-0 border-b border-neutral-200 px-3 py-1.5 dark:border-neutral-800">
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
          <h1 className="min-w-0 text-sm font-semibold break-words hyphens-auto">
            Behindertenparkplätze
          </h1>
          <div
            role="tablist"
            aria-label="Ansicht wählen"
            className="flex shrink-0 overflow-hidden rounded-lg border border-neutral-200 text-xs dark:border-neutral-800"
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
                className={`min-h-11 px-2.5 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                  view === option
                    ? "bg-blue-700 text-white"
                    : "bg-white text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                }`}
              >
                {/* Auf schmalen Displays sind „Einstellungen" und
                    „Rückmeldungen" zu lang – dort nur das Symbol, der Name
                    bleibt für Screenreader stehen. */}
                {option === "settings" || option === "feedback" ? (
                  <>
                    <span aria-hidden="true" className="sm:hidden">
                      {option === "settings" ? <GearIcon /> : <InboxIcon />}
                    </span>
                    <span className="max-sm:sr-only">{VIEW_LABELS[option]}</span>
                  </>
                ) : (
                  VIEW_LABELS[option]
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
              {geo.status === "locating" && "Standort wird ermittelt …"}
              {geo.status === "ready" &&
                (nearest
                  ? `Nächster Parkplatz: ${nearest.street ?? nearest.label} – ${formatDistance(nearest.distanceMeters)}`
                  : "Kein verorteter Parkplatz in der Nähe.")}
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
                aria-label="Standort erneut versuchen"
                className="min-h-11 shrink-0 rounded-lg border border-neutral-300 px-2.5 text-xs font-medium focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none dark:border-neutral-700"
              >
                Erneut
              </button>
            )}
          </div>
        )}
      </header>

      <main className="relative min-h-0 flex-1">
        {view === "map" ? (
          <>
            <ParkingMap
              spots={mapSpots}
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
              <div className="pointer-events-none absolute inset-x-0 top-0 z-[1000] flex flex-col items-stretch gap-1.5 p-2">
                <DestinationSearch
                  destination={destination}
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
            */}
            {truncated && (
              <p
                role="status"
                className="pointer-events-none absolute inset-x-0 bottom-10 z-[1000] mx-auto w-fit rounded-full bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-900 shadow dark:bg-amber-950 dark:text-amber-100"
              >
                Nicht alle Parkplätze dieses Ausschnitts sind geladen – näher heranzoomen.
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
          <div className="h-full overflow-y-auto px-4 py-4">
            {/* Ein gemeldeter Parkplatz führt über `select` auf die Karte –
                dieselbe Bewegung wie aus der Liste, samt Detailansicht und
                Luftlinie. Die Meldung wird damit sofort nachprüfbar. */}
            <FeedbackAdmin onShowSpot={select} />
          </div>
        ) : (
          <div className="h-full overflow-y-auto px-4 py-4">
            <SettingsPanel
              detected={detected}
              onMapsPreferenceChange={setMapsPreference}
              user={user}
              onUserChange={setUser}
            />
          </div>
        )}
      </main>
    </div>
  );
}
