import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-apexBg text-white p-6 max-w-3xl mx-auto font-sans pb-20">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-6 transition"
      >
        <ArrowLeft size={16} /> Zurück zum Lab
      </Link>

      <h1 className="text-2xl font-black text-apexRed mb-6 border-b border-white/10 pb-3">
        Impressum & Kontakt
      </h1>

      <section className="space-y-4 mb-10 text-xs text-gray-300 leading-relaxed">
        <p>
          <strong>Angaben gemäß § 5 DDG:</strong><br />
          Dieses Angebot befindet sich aktuell im privaten Testbetrieb für ein geschlossenes Nutzerumfeld (Private Testing / Closed Beta).
        </p>
        <p>
          <strong>Kontakt:</strong><br />
          E-Mail: [Deine E-Mail-Adresse]
        </p>
        <p>
          <strong>Haftungsausschluss & Markenhinweis:</strong><br />
          Legend Synergy Lab ist ein inoffizielles, kostenloses Fan-Projekt und steht in keiner Verbindung mit Electronic Arts Inc. oder Respawn Entertainment. Apex Legends ist eine eingetragene Marke von Electronic Arts Inc.
        </p>
      </section>
    </div>
  );
}