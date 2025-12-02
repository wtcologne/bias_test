import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { SCENARIOS } from "../config/scenarios";

export default function Home() {
  // Standard: aktuelles Datum als Session-ID
  const today = new Date().toISOString().split("T")[0];
  const [sessionId, setSessionId] = useState(today);

  return (
    <>
      <Head>
        <title>Bias-Experiment | Start</title>
        <meta
          name="description"
          content="Erwartungseffekt-Experiment für Seminare"
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto px-6 py-12 w-full">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
              Bias-Experiment
            </h1>
            <p className="mt-3 text-slate-500 text-base leading-relaxed">
              Demonstration des Erwartungseffekts
            </p>
          </div>

          {/* Session ID Input */}
          <div className="mb-8">
            <label
              htmlFor="session"
              className="block text-sm font-medium text-slate-600 mb-2"
            >
              Session-ID
            </label>
            <input
              id="session"
              type="text"
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              placeholder="z.B. seminar-2025-12-10"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 
                         bg-white text-slate-900 placeholder-slate-400
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
            />
            <p className="mt-2 text-xs text-slate-400">
              Gleiche Session-ID = Antworten werden gruppiert
            </p>
          </div>

          {/* Haupt-Button: Alle Szenarien */}
          <Link
            href={`/play?session=${encodeURIComponent(sessionId)}`}
            className="block w-full px-6 py-5 rounded-2xl 
                       bg-blue-600 hover:bg-blue-700
                       active:scale-[0.98]
                       transition-all duration-200
                       shadow-lg shadow-blue-600/20"
          >
            <div className="text-center text-white">
              <div className="font-semibold text-lg">Experiment starten</div>
              <div className="text-blue-200 text-sm mt-1">
                {SCENARIOS.length} Szenarien nacheinander
              </div>
            </div>
          </Link>

          {/* Footer Hinweis */}
          <p className="mt-10 text-center text-xs text-slate-400">
            Teile den Link mit deiner Gruppe (z.B. als QR-Code).
          </p>
        </div>
      </main>
    </>
  );
}
