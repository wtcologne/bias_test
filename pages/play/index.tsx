import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { SCENARIOS, ConditionId, ScenarioConfig } from "../../config/scenarios";
import { supabase } from "../../lib/supabaseClient";

type SubmitState = "idle" | "submitting";

export default function PlayAllScenarios() {
  const router = useRouter();
  const { session } = router.query;

  // Aktueller Szenario-Index (0-4)
  const [currentIndex, setCurrentIndex] = useState(0);
  // Für jedes Szenario eine zufällige Bedingung speichern
  const [conditions, setConditions] = useState<ConditionId[]>([]);
  const [rating, setRating] = useState<number | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [showWarning, setShowWarning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Beim Start: Für jedes Szenario zufällig high/low bestimmen
  useEffect(() => {
    const randomConditions = SCENARIOS.map(() =>
      Math.random() < 0.5 ? "high" : "low"
    ) as ConditionId[];
    setConditions(randomConditions);
  }, []);

  // Session-ID aus Query oder Default
  const sessionId =
    typeof session === "string" && session.trim()
      ? session
      : "default-session";

  // Aktuelles Szenario
  const scenario: ScenarioConfig | undefined = SCENARIOS[currentIndex];
  const condition: ConditionId | undefined = conditions[currentIndex];

  // Rating zurücksetzen wenn Szenario wechselt
  useEffect(() => {
    if (scenario) {
      const midValue = Math.round((scenario.minValue + scenario.maxValue) / 2);
      setRating(midValue);
      setShowWarning(false);
    }
  }, [currentIndex, scenario]);

  // Rating absenden und zum nächsten Szenario
  const handleSubmit = async () => {
    if (rating === null) {
      setShowWarning(true);
      return;
    }

    if (!scenario || !condition) return;

    setSubmitState("submitting");
    setShowWarning(false);

    const { error } = await supabase.from("responses").insert({
      session_id: sessionId,
      scenario: scenario.id,
      condition: condition,
      rating: rating,
    });

    if (error) {
      console.error("Fehler beim Speichern:", error);
      setSubmitState("idle");
      alert("Es gab ein Problem beim Speichern. Bitte versuche es erneut.");
      return;
    }

    // Zum nächsten Szenario oder fertig
    if (currentIndex < SCENARIOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSubmitState("idle");
    } else {
      setIsComplete(true);
    }
  };

  // Ladezustand
  if (!router.isReady || conditions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Lädt...</div>
      </div>
    );
  }

  // Alle Szenarien abgeschlossen
  if (isComplete) {
    return (
      <>
        <Head>
          <title>Fertig! | Bias-Experiment</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-slate-50 flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900 mb-3">
              Vielen Dank!
            </h1>
            <p className="text-slate-500 leading-relaxed">
              Du hast alle {SCENARIOS.length} Szenarien bewertet. Du kannst dein
              Handy jetzt weglegen.
            </p>
          </div>
        </div>
      </>
    );
  }

  // Erwartungstext basierend auf Bedingung
  const expectationLabel =
    condition === "high" ? scenario.highLabel : scenario.lowLabel;

  return (
    <>
      <Head>
        <title>
          {currentIndex + 1}/{SCENARIOS.length} – {scenario.title} | Bias-Experiment
        </title>
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="max-w-md mx-auto px-6 py-8">
          {/* Progress Counter */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="text-sm font-medium text-slate-600">
                Szenario
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
                {currentIndex + 1}
              </span>
              <span className="text-sm text-slate-400">von {SCENARIOS.length}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((currentIndex + 1) / SCENARIOS.length) * 100}%`,
              }}
            />
          </div>

          {/* Titel */}
          <h1 className="text-2xl font-semibold text-slate-900 text-center mb-6 tracking-tight">
            {scenario.title}
          </h1>

          {/* Kontext-Box mit Erwartungsmanipulation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Hintergrund
                </p>
                <p className="text-slate-800 leading-relaxed">
                  {expectationLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Bild (falls vorhanden) */}
          {scenario.imageUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <div className="relative aspect-[4/3]">
                <Image
                  src={scenario.imageUrl}
                  alt={scenario.title}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            </div>
          )}

          {/* Frage */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-slate-900 text-center mb-6">
              {scenario.question}
            </h2>

            {/* Slider */}
            <div className="px-2">
              <input
                type="range"
                min={scenario.minValue}
                max={scenario.maxValue}
                step={1}
                value={rating ?? scenario.minValue}
                onChange={(e) => {
                  setRating(parseInt(e.target.value));
                  setShowWarning(false);
                }}
                disabled={submitState === "submitting"}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-7
                           [&::-webkit-slider-thumb]:h-7
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:border-2
                           [&::-webkit-slider-thumb]:border-blue-500
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:shadow-md
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:w-7
                           [&::-moz-range-thumb]:h-7
                           [&::-moz-range-thumb]:bg-white
                           [&::-moz-range-thumb]:border-2
                           [&::-moz-range-thumb]:border-blue-500
                           [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:shadow-md
                           [&::-moz-range-thumb]:cursor-pointer
                           disabled:opacity-50"
              />

              {/* Skala-Labels */}
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>{scenario.minValue}</span>
                <span>{scenario.maxValue}</span>
              </div>
            </div>

            {/* Aktuelle Auswahl */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-100">
                <span className="text-3xl font-semibold text-blue-600">
                  {rating}
                </span>
              </span>
              <p className="mt-2 text-sm text-slate-500">Deine Bewertung</p>
            </div>
          </div>

          {/* Warnung */}
          {showWarning && (
            <p className="text-center text-sm text-amber-600 mb-4">
              Bitte wähle zuerst eine Bewertung.
            </p>
          )}

          {/* Absenden-Button */}
          <button
            onClick={handleSubmit}
            disabled={submitState === "submitting"}
            className="w-full py-4 px-6 rounded-2xl font-medium text-white
                       bg-blue-600 hover:bg-blue-700 
                       active:scale-[0.98]
                       disabled:bg-blue-400 disabled:cursor-not-allowed
                       transition-all duration-200
                       shadow-lg shadow-blue-600/20"
          >
            {submitState === "submitting" ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Wird gesendet...
              </span>
            ) : currentIndex < SCENARIOS.length - 1 ? (
              "Weiter →"
            ) : (
              "Abschließen"
            )}
          </button>

          {/* Session Info */}
          <p className="mt-8 text-center text-xs text-slate-300">
            Session: {sessionId}
          </p>
        </div>
      </main>
    </>
  );
}

