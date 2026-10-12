"use client";

import { useState } from "react";
import { Shield, Zap, Target, Eye, Crosshair, CheckCircle2, AlertTriangle, Layers, Info } from "lucide-react";

// Alle Legenden nach Klassen aufgeteilt
const ALL_LEGENDS = [
  // Assault
  { id: "bangalore", name: "Bangalore", role: "Assault", tags: ["smoke", "rotations", "disruption"] },
  { id: "fuse", name: "Fuse", role: "Assault", tags: ["artillery", "zone-control", "entry"] },
  { id: "ash", name: "Ash", role: "Assault", tags: ["teleport", "tether", "entry"] },
  { id: "madmaggie", name: "Mad Maggie", role: "Assault", tags: ["speed", "anti-cover", "entry"] },
  { id: "ballistic", name: "Ballistic", role: "Assault", tags: ["weapon-buff", "overclock", "entry"] },

  // Skirmisher
  { id: "wraith", name: "Wraith", role: "Skirmisher", tags: ["portal", "reposition", "scout"] },
  { id: "pathfinder", name: "Pathfinder", role: "Skirmisher", tags: ["zipline", "high-ground", "scout"] },
  { id: "octane", name: "Octane", role: "Skirmisher", tags: ["jump-pad", "speed", "entry"] },
  { id: "horizon", name: "Horizon", role: "Skirmisher", tags: ["gravity-lift", "black-hole", "high-ground"] },
  { id: "valkyrie", name: "Valkyrie", role: "Skirmisher", tags: ["skyward-launch", "rotations", "high-ground"] },
  { id: "revenant", name: "Revenant", role: "Skirmisher", tags: ["shadow-pounce", "dueling", "entry"] },
  { id: "alter", name: "Alter", role: "Skirmisher", tags: ["void-passage", "nexus", "reposition"] },

  // Recon
  { id: "bloodhound", name: "Bloodhound", role: "Recon", tags: ["scan", "vision", "tracking"] },
  { id: "crypto", name: "Crypto", role: "Recon", tags: ["scan", "emp", "drone", "beacon"] },
  { id: "seer", name: "Seer", role: "Recon", tags: ["scan", "cancel", "vision"] },
  { id: "vantage", name: "Vantage", role: "Recon", tags: ["sniper", "scout", "scan"] },

  // Controller
  { id: "caustic", name: "Caustic", role: "Controller", tags: ["gas", "zone-control", "bunker"] },
  { id: "wattson", name: "Wattson", role: "Controller", tags: ["fences", "pylon", "bunker", "ring-console"] },
  { id: "rampart", name: "Rampart", role: "Controller", tags: ["walls", "minigun", "bunker"] },
  { id: "catalyst", name: "Catalyst", role: "Controller", tags: ["wall", "reinforce", "zone-control", "ring-console"] },

  // Support
  { id: "gibraltar", name: "Gibraltar", role: "Support", tags: ["dome", "bombardment", "anchor"] },
  { id: "lifeline", name: "Lifeline", role: "Support", tags: ["drone-heal", "res", "supply"] },
  { id: "mirage", name: "Mirage", role: "Support", tags: ["invis-res", "decoy", "reposition"] },
  { id: "loba", name: "Loba", role: "Support", tags: ["black-market", "loot", "anchor"] },
  { id: "newcastle", name: "Newcastle", role: "Support", tags: ["mobile-shield", "wall", "res", "anchor"] },
  { id: "conduit", name: "Conduit", role: "Support", tags: ["shield-heal", "zone-control", "anchor"] },
];

export default function Home() {
  const [selectedIds, setSelectedIds] = useState([]);

  // Legende auswählen / abwählen (Max. 3)
  const toggleLegend = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const selectedLegends = ALL_LEGENDS.filter((l) => selectedIds.includes(l.id));

  // Analyse der Comp
  const analyzeComp = () => {
    if (selectedLegends.length < 3) return null;

    const roles = selectedLegends.map((l) => l.role);
    const tags = selectedLegends.flatMap((l) => l.tags);

    let compType = "Balanced Hybrid Comp";
    let desc = "Eine ausgeglichene Aufstellung mit guten Optionen für Fights und Positionierung.";
    let synergies = [];
    let weaknesses = [];

    // Specific Synergies & Combos
    if (tags.includes("smoke") && tags.includes("scan")) {
      synergies.push({
        title: "Smoke & Vision Combo",
        detail: "Rauch schützt eure Sicht, während Scans (Bloodhound/Crypto/Seer) Gegner im Rauch sichtbar machen.",
      });
    }

    if (tags.includes("emp") && (tags.includes("entry") || tags.includes("speed"))) {
      synergies.push({
        title: "EMP Push Synergy",
        detail: "Crypto schwächt gegnerische Schilde und Fallen, damit Entry-Fragger sofort den Vorteil nutzen können.",
      });
    }

    if (tags.includes("bunker") && tags.includes("anchor")) {
      compType = "Hard Zone & Defense";
      desc = "Exzellent, um Gebäude oder POIs im Endgame dauerhaft zu halten und Angriffe abzuwehren.";
    }

    if (roles.filter((r) => r === "Skirmisher" || r === "Assault").length >= 2) {
      compType = "Aggressive Edge & Fighting";
      desc = "Fokussiert auf schnelle Rotation, 3v3-Fights und das Abfangen von Teams am Rande der Zone.";
    }

    if (!roles.includes("Support")) {
      weaknesses.push("Kein Support in der Comp: Keine Schnell-Ressurrects oder garantiertes Reset-Potenzial in langen Fights.");
    }

    if (!roles.includes("Controller")) {
      weaknesses.push("Kein Controller: Kein direkter Zugriff auf Ring-Consolen zum Vorhersehen der nächsten Zone.");
    }

    return { compType, desc, synergies, weaknesses, roles, tags };
  };

  const analysis = analyzeComp();

  return (
    <div className="min-h-screen bg-apexBg text-white p-4 max-w-2xl mx-auto font-sans pb-24">
      {/* Header */}
      <header className="py-4 border-b border-white/10 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-black text-apexRed tracking-wider flex items-center gap-2">
            <Zap className="text-apexRed fill-apexRed" size={20} /> LEGEND SYNERGY LAB
          </h1>
          <p className="text-xs text-gray-400">Apex Legends Squad & Comp Optimizer</p>
        </div>
        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300 font-mono">v1.0</span>
      </header>

      {/* Trio Auswahlanzeige */}
      <div className="bg-apexCard border border-white/10 rounded-xl p-4 mb-6 shadow-xl">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex justify-between items-center">
          <span>Dein Trio ({selectedIds.length}/3)</span>
          {selectedIds.length > 0 && (
            <button onClick={() => setSelectedIds([])} className="text-apexRed text-[11px] underline">
              Zurücksetzen
            </button>
          )}
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((slotIndex) => {
            const legend = selectedLegends[slotIndex];
            return (
              <div
                key={slotIndex}
                className={`h-24 rounded-lg border flex flex-col items-center justify-center p-2 text-center transition ${
                  legend
                    ? "border-apexRed/60 bg-gradient-to-b from-apexRed/10 to-apexCard"
                    : "border-dashed border-white/10 bg-white/5"
                }`}
              >
                {legend ? (
                  <>
                    <span className="text-xs font-bold text-white mb-1">{legend.name}</span>
                    <span className="text-[10px] bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">
                      {legend.role}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-gray-500 font-mono">+ Legende</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legenden-Auswahl-Raster */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Wähle 3 Legenden:</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ALL_LEGENDS.map((legend) => {
            const isSelected = selectedIds.includes(legend.id);
            const isDisabled = !isSelected && selectedIds.length >= 3;

            return (
              <button
                key={legend.id}
                onClick={() => toggleLegend(legend.id)}
                disabled={isDisabled}
                className={`p-3 rounded-lg border text-left flex justify-between items-center transition ${
                  isSelected
                    ? "border-apexRed bg-apexRed/20 text-white font-bold"
                    : isDisabled
                    ? "border-white/5 bg-white/5 text-gray-600 cursor-not-allowed"
                    : "border-white/5 bg-apexCard text-gray-300 hover:border-white/20 hover:text-white"
                }`}
              >
                <div>
                  <p className="text-xs">{legend.name}</p>
                  <p className="text-[9px] text-gray-500 uppercase">{legend.role}</p>
                </div>
                {isSelected && <CheckCircle2 size={16} className="text-apexRed shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Analyse-Ergebnis (nur wenn 3 gewählt sind) */}
      {analysis && (
        <div className="space-y-4 bg-apexCard border border-apexRed/40 rounded-xl p-5 shadow-2xl animate-fade-in">
          <div className="border-b border-white/10 pb-3">
            <span className="text-[10px] bg-apexRed text-white px-2 py-0.5 rounded font-bold uppercase">
              Comp-Analyse
            </span>
            <h3 className="text-lg font-black text-white mt-2">{analysis.compType}</h3>
            <p className="text-xs text-gray-300 mt-1">{analysis.desc}</p>
          </div>

          {/* Synergien */}
          {analysis.synergies.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-apexGold uppercase mb-2 flex items-center gap-1">
                <Zap size={14} /> Erkannte Synergien & Combos
              </h4>
              <div className="space-y-2">
                {analysis.synergies.map((syn, idx) => (
                  <div key={idx} className="bg-white/5 p-3 rounded border border-white/5 text-xs">
                    <p className="font-bold text-white mb-0.5">{syn.title}</p>
                    <p className="text-gray-400">{syn.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Schwächen / IGL-Tipps */}
          {analysis.weaknesses.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-1">
                <AlertTriangle size={14} /> IGL Taktik-Hinweise
              </h4>
              <ul className="space-y-1">
                {analysis.weaknesses.map((w, idx) => (
                  <li key={idx} className="text-xs text-gray-400 flex items-start gap-2 bg-amber-500/10 p-2 rounded border border-amber-500/20">
                    <span>•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Footer & Disclaimer */}
      <footer className="mt-12 p-4 text-center text-[10px] text-gray-500 border-t border-white/5 space-y-2">
        <p>
          Diese App ist ein inoffizielles Fan-Tool und steht in keiner Verbindung mit Electronic Arts Inc. oder Respawn Entertainment.
        </p>
        <p>Apex Legends ist eine eingetragene Marke von Electronic Arts Inc.</p>
        <div>
          <a href="/impressum" className="underline hover:text-gray-300">
            Impressum & Datenschutz
          </a>
        </div>
      </footer>
    </div>
  );
}