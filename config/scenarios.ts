export type ConditionId = "high" | "low";

export type ScenarioId =
  | "kunstwerk"
  | "aufsatz"
  | "person"
  | "lebenslauf"
  | "produkt";

export type ScenarioConfig = {
  id: ScenarioId;
  title: string;
  question: string;
  minValue: number;
  maxValue: number;
  highLabel: string;
  lowLabel: string;
  // Optionale Bild-URL, die du später befüllen kannst
  imageUrl?: string;
};

/**
 * Konfiguration der 5 Szenarien für den Pygmalion-/Erwartungseffekt
 *
 * Du kannst die Texte hier direkt anpassen.
 * Für Bilder: Lege sie in /public/images/ ab und setze den Pfad als imageUrl.
 */
export const SCENARIOS: ScenarioConfig[] = [
  {
    id: "kunstwerk",
    title: "Bewertung eines Kunstwerks",
    question: "Wie künstlerisch wertvoll findest du dieses Bild?",
    minValue: 1,
    maxValue: 10,
    highLabel:
      "Dieses Bild stammt aus einer Ausstellung eines international bekannten modernen Künstlers.",
    lowLabel:
      "Dieses Bild stammt aus einer Schülerarbeit einer 9. Klasse.",
    imageUrl: "/images/kunstwerk.png",
  },
  {
    id: "aufsatz",
    title: "Bewertung eines Schüleraufsatzes",
    question: "Welche Note würdest du für diesen Text geben?",
    minValue: 1,
    maxValue: 6,
    highLabel:
      "Text von Lara, 9. Klasse. Laut Lehrkraft sehr gut in Deutsch, liest viel und ist engagiert.",
    lowLabel:
      "Text von Lara, 9. Klasse. Laut Lehrkraft hat sie häufig Schwierigkeiten in Deutsch, liest selten und wirkt eher unmotiviert.",
    imageUrl: "/images/aufsatz.png",
  },
  {
    id: "person",
    title: "Eindruck von einer Person",
    question: "Wie sympathisch wirkt diese Person auf dich?",
    minValue: 1,
    maxValue: 10,
    highLabel:
      "Das ist Alex (17). Alex engagiert sich ehrenamtlich im Sportverein und hilft jüngeren Schüler*innen bei den Hausaufgaben.",
    lowLabel:
      "Das ist Alex (17). Alex hatte kürzlich Ärger wegen eines Diebstahl-Verdachts und gilt bei einigen Lehrkräften als eher unzuverlässig.",
    imageUrl: "/images/person.png",
  },
  {
    id: "lebenslauf",
    title: "Eindruck von einem Lebenslauf",
    question: "Wie kompetent wirkt diese Person auf dich?",
    minValue: 1,
    maxValue: 10,
    highLabel:
      "Bewerbung von Mara K. – Abschluss an einem renommierten Elite-Gymnasium, mehrfach für besondere Leistungen ausgezeichnet.",
    lowLabel:
      "Bewerbung von Mara K. – Abschluss an einer beliebigen Gesamtschule, ohne besondere Auszeichnungen.",
    imageUrl: "/images/lebenslauf.png",
  },
  {
    id: "produkt",
    title: "Bewertung eines Produkts",
    question: "Wie hochwertig schätzt du dieses Produkt ein?",
    minValue: 1,
    maxValue: 10,
    highLabel:
      "Marke: AURORA Pro Audio. UVP: 199 €. Beliebt bei vielen Musiker*innen.",
    lowLabel:
      "Marke: SoundMax Basic. Preis: 24,99 € beim Discounter. Einfaches Einsteigermodell.",
    imageUrl: "/images/produkt.png",
  },
];

