# 🧪 Oberflächenspannung Lernmodul

Ein interaktives, wissenschaftlich akkurater Lernmodul für Schüler der 9. Klasse Gymnasium Bayern zum Thema Oberflächenspannung. Die Progressive Web App (PWA) kombiniert theoretische Grundlagen mit praktischen Experimenten und interaktiven Übungen.

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-blue?logo=tailwindcss)](https://tailwindcss.com/)

## 🎯 Lernziele

- **Verstehen der Grundlagen**: Wasserstoffbrücken, Dipole und molekulare Anziehungskräfte
- **Unterscheidung**: Kohäsion vs. Adhäsion in praktischen Beispielen
- **Experimentelle Beobachtung**: Oberflächenspannung in drei verschiedenen Experimenten
- **Physikalische Formeln**: Druck, Gewichtskraft, Dichte und Oberflächenspannung
- **Alltagsbezug**: Wissenschaftliche Erklärung alltäglicher Phänomene

## 📚 Kapitelübersicht

### 1. 🧬 Einführung: Was ist Oberflächenspannung?
- Grundlagen der Wasserstoffbrücken
- H₂O-Moleküle als Dipole
- Kohäsion und Adhäsion
- Wissenschaftliche Definitionen und exakte Werte

### 2. 🧪 Experiment 1: Münzen im Reagenzglas
- Praktische Demonstration der Oberflächenspannung
- Meniskus-Bildung (konkav bei Wasser-Glas)
- Kräftegleichgewicht verstehen
- Interaktiver Verständnistest

### 3. 📄 Experiment 2: Das Papiertuch-Experiment
- Zusammenspiel von Oberflächenspannung, Adhäsion und Luftdruck
- Wissenschaftlich korrekte Druckwerte (1013,25 hPa)
- Physikalische Formeln in der Praxis
- Video-basiertes Lernen

### 4. 🪙 Experiment 3: Haftende Münzen
- Wasserfilme und Adhäsionskräfte
- Interaktive Drag-&-Drop-Zuordnung
- Abschluss-Zertifikat
- Zusammenfassung aller Konzepte

## ✨ Features

### 🎓 Pädagogische Features
- **Wissenschaftlich akkurat**: Alle Werte und Formeln wurden überprüft
- **Interaktive Quizzes**: Multiple-Choice und Drag-&-Drop-Aufgaben
- **Video-Integration**: Experimentvideos mit benutzerdefinierten Kontrollen
- **Fortschrittsverfolgung**: Visueller Lernfortschritt
- **Responsive Design**: Optimiert für Desktop, Tablet und Smartphone

### 💻 Technische Features
- **Progressive Web App (PWA)**: Offline-Funktionalität und App-Installation
- **Service Worker**: Caching für schnelle Ladezeiten
- **Modern UI**: shadcn/ui-Komponenten mit Tailwind CSS
- **TypeScript**: Typisierte Entwicklung für bessere Codequalität
- **Docker-Support**: Einfache Containerisierung und Deployment

## 🚀 Installation & Entwicklung

### Voraussetzungen
- Node.js 21+ oder Docker
- pnpm, npm oder yarn
- Moderne Browser-Unterstützung

### Lokale Entwicklung

```bash
# Repository klonen
git clone https://github.com/rgxdev/oberflaechenspannnung-lern-tool.git
cd oberflaechenspannnung-lern-tool

# Abhängigkeiten installieren
npm install --legacy-peer-deps
# oder
pnpm install --legacy-peer-deps

# Entwicklungsserver starten
npm run dev
# Öffnet http://localhost:3000
```

### Docker Deployment

```bash
# Docker Image erstellen
docker build -t oberflächenspannung-app .

# Container starten
docker run -p 4001:4001 oberflächenspannung-app
# Öffnet http://localhost:4001
```

### Build für Produktion

```bash
# Produktions-Build erstellen
npm run build

# Produktionsserver starten
npm start
```

## 📱 PWA-Installation

Die App kann als Progressive Web App installiert werden:

1. **Desktop**: Klicken Sie auf das Install-Icon in der Adressleiste
2. **Mobile**: "Zum Startbildschirm hinzufügen" im Browser-Menü
3. **Automatischer Prompt**: Die App zeigt eine Installationsaufforderung an

## 🧪 Wissenschaftliche Genauigkeit

Alle physikalischen und chemischen Angaben wurden sorgfältig überprüft:

- **Oberflächenspannung Wasser**: 0,0728 N/m bei 20°C
- **Standard-Luftdruck**: 1013,25 hPa auf Meereshöhe
- **Erdbeschleunigung**: g ≈ 9,81 m/s²
- **Meniskus**: Konkav bei Wasser-Glas-Kontakt
- **Wasserstoffbrücken**: Korrekte Darstellung der Dipol-Wechselwirkungen

## 🎨 Design System

Das UI basiert auf einem modernen Design System:

- **Farbschema**: Teal-Blue Gradient mit semantischen Farben
- **Typografie**: Responsive Schriftgrößen und Hierarchien
- **Komponenten**: Wiederverwendbare shadcn/ui-Komponenten
- **Icons**: React Icons und Lucide React für wissenschaftliche Symbole
- **Animationen**: Smooth Transitions mit Tailwind CSS

## 📊 Technologie-Stack

### Frontend
- **Next.js 15.2.4**: React-Framework mit App Router
- **React 19**: Modernste React-Features
- **TypeScript 5**: Statische Typisierung
- **Tailwind CSS 3.4.17**: Utility-first CSS-Framework

### UI-Komponenten
- **shadcn/ui**: Hochwertige, accessible Komponenten
- **Radix UI**: Headless UI-Primitives
- **Lucide React**: Moderne Icons
- **React Icons**: Umfangreiche Icon-Bibliothek

### PWA & Performance
- **Workbox**: Service Worker für Caching
- **Next.js PWA**: Progressive Web App-Features
- **Responsive Design**: Mobile-first Ansatz


## 🤝 Beitragen

Verbesserungen und Beiträge sind willkommen! Besonders in den Bereichen:

- **Wissenschaftliche Genauigkeit**: Korrekturen oder Ergänzungen
- **Pädagogik**: Verbesserung der Lernmethoden
- **Accessibility**: Barrierefreiheit verbessern
- **Internationalisierung**: Übersetzungen hinzufügen

### Contribution Guidelines
1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📜 Lizenz

Dieses Projekt steht unter der [MIT License](LICENSE).

## 👨‍💻 Autor

**Aaron (rgxdev)**
- Website: [d-aaron.dev](https://d-aaron.dev)
- Email: contact@d-aaron.dev
- GitHub: [@rgxdev](https://github.com/rgxdev)

---

Entwickelt mit ❤️ für bessere naturwissenschaftliche Bildung
