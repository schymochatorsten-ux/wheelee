## 1. Ziel

Entwicklung einer einfachen, mobiloptimierten Web-App für Rollstuhlfahrer und Menschen mit entsprechendem Parkausweis. Die App zeigt öffentliche Behindertenparkplätze auf einer interaktiven Karte an und hilft dabei, den nächstgelegenen Parkplatz zu finden.

## 2. Kernfunktionen

### Karte und Standort

- Anzeige des aktuellen Nutzerstandorts auf einer interaktiven Karte, sofern der Nutzer den Standortzugriff erlaubt.

- Darstellung aller bekannten öffentlichen Behindertenparkplätze als Kartenmarker.

- Automatische Hervorhebung des nächstgelegenen Parkplatzes inklusive Entfernung.

- Nutzung einer Kartenlösung wie OpenStreetMap mit einer geeigneten Kartenbibliothek.

- Optimierung für Smartphones und einfache Bedienung.

### Parkplatzdetails und Navigation

Beim Anklicken eines Parkplatzmarkers werden folgende Informationen angezeigt:

- Adresse des Parkplatzes, sofern vorhanden.

- Entfernung zum aktuellen Standort.

- Schaltfläche „In Google Maps oder in Applekarten öffnen“, die Google Maps mit dem Parkplatz als Ziel öffnet.

### Nutzerbewertungen

Für jeden Parkplatz gibt es zwei Möglichkeiten:

- **👍 Existiert:** Nutzer bestätigt, dass der Parkplatz vorhanden ist.

- **👎 Existiert nicht mehr:** Nutzer meldet, dass der Parkplatz nicht mehr existiert.

Alle Bewertungen werden mit Datum gespeichert. Andere Nutzer sehen die Anzahl der positiven und negativen Bewertungen sowie, wann die Bewertungen abgegeben wurden und wann dies geschah.

Die Bewertungen lösen zunächst keine automatischen Änderungen an den Parkplatzdaten aus. Ein Parkplatz wird beispielsweise durch negative Bewertungen nicht automatisch gelöscht.

## 3. Datenbasis und Testgebiet

- Zu Beginn werden ausschließlich die bereitgestellten Parkplatzdaten einer einzelnen Stadt verwendet. (Siehe Liste_allgemeiner_Parkplaetze unter D:\Repositories\wheelee\Parkplätze\Frankfurt)

- Jeder Parkplatz erhält eine eindeutige ID sowie möglichst Koordinaten und eine Adresse.

- Die Architektur soll später die Erweiterung um weitere Städte und Datenquellen ermöglichen.

- Es erfolgt keine automatische Suche nach Parkplätzen in anderen Städten.

## 4. Technische Anforderungen

- Web-App mit responsivem Design für Smartphone und Desktop.

- Interaktive Karte auf Basis von OpenStreetMap.

- Browserbasierte Standortbestimmung mit Zustimmung des Nutzers.

- Speicherung der Parkplatzdaten und Bewertungen in einer geeigneten Datenbank.

- Einfache, wartbare Architektur mit klarer Trennung von Kartendarstellung, Parkplatzdaten und Bewertungen.

- Datenschutz beachten, insbesondere keine dauerhafte Speicherung des Nutzerstandorts ohne Notwendigkeit.

## 5. Entwicklungsansatz

Zunächst ein funktionsfähiger MVP (Minimum Viable Product) für eine Stadt. Fokus auf zuverlässiger Standortbestimmung, übersichtlicher Kartendarstellung, schneller Ermittlung des nächstgelegenen Parkplatzes und einfacher Bewertung.

Claude Code soll zunächst einen geeigneten Technologie-Stack vorschlagen und anschließend die Anwendung schrittweise umsetzen. Vorhandene Parkplatzdaten werden nach Bereitstellung importiert.

## 6. Bewusst nicht im ersten Umfang

- Benutzerkonten und Registrierung.

- Automatische Prüfung oder Löschung gemeldeter Parkplätze.

- Echtzeitinformationen über freie oder belegte Parkplätze.

- Automatische Beschaffung von Parkplatzdaten aus anderen Städten.

- Navigation innerhalb der App.

Diese Funktionen können später ergänzt werden.
