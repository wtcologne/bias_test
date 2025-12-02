# Bias-App: Pygmalion-/Erwartungseffekt Experiment

Eine Web-App zur Demonstration des Erwartungseffekts im Seminar-Kontext.

## Features

- 📱 Mobile-first Design
- 🎲 Zufällige Zuweisung: "high expectation" vs. "low expectation"
- 📊 5 vordefinierte Szenarien (leicht anpassbar)
- 💾 Speicherung in Supabase
- ⚡ Deployment auf Vercel

## Setup

### 1. Dependencies installieren

```bash
npm install
```

### 2. Supabase einrichten

1. Erstelle ein Projekt auf [supabase.com](https://supabase.com)
2. Führe das SQL-Script aus (siehe unten)
3. Kopiere die API-Credentials

### 3. Environment-Variablen

Erstelle eine `.env.local` Datei:

```env
NEXT_PUBLIC_SUPABASE_URL=https://DEIN-PROJEKT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein-anon-key
```

Die Werte findest du in Supabase unter:
- **Project Settings → API → Project URL**
- **Project Settings → API → anon public key**

### 4. Starten

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000)

## Supabase SQL

Führe dieses Script im Supabase SQL Editor aus:

```sql
-- Tabelle für Antworten erstellen
CREATE TABLE responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  scenario TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('high', 'low')),
  rating NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security aktivieren
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Policy: Anonyme Benutzer dürfen einfügen
CREATE POLICY "allow anon insert" ON responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Anonyme Benutzer dürfen lesen
CREATE POLICY "allow anon select" ON responses
  FOR SELECT
  TO anon
  USING (true);
```

## Szenarien anpassen

Bearbeite die Datei `config/scenarios.ts` um:
- Texte zu ändern
- Neue Szenarien hinzuzufügen
- Bilder einzufügen (lege sie in `/public/images/` ab)

## Deployment auf Vercel

1. Push das Projekt zu GitHub
2. Verbinde das Repository mit Vercel
3. Füge die Environment-Variablen in Vercel hinzu:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Verwendung im Seminar

1. Öffne die Startseite und wähle ein Szenario
2. Teile den Link (z.B. als QR-Code) mit den Teilnehmenden
3. Jede Person erhält zufällig die "high" oder "low" Variante
4. Die Antworten werden in Supabase gespeichert

