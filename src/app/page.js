"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Zap, Target, AlertTriangle, CheckCircle2, Map, Star, 
  Crosshair, ShieldAlert, Sparkles, UserCheck, Share2 
} from "lucide-react";

const ALL_MAPS = ["Storm Point", "Worlds Edge", "District", "Olympus", "Kings Canyon", "Broken Moon"];

const ALL_LEGENDS = [
  // Assault
  { 
    id: "bangalore", name: "Bangalore", role: "Assault", tags: ["smoke", "rotations", "disruption"],
    tactical: "Rauchgranaten-Werfer", ult: "Donnerrollen (Airstrike)", passive: "Eilmarsch (Speed Boost)",
    bestMaps: ["Worlds Edge", "Storm Point", "District", "Olympus", "Kings Canyon", "Broken Moon"],
    counters: ["wattson", "caustic"], counteredBy: ["bloodhound", "crypto", "seer"]
  },
  { 
    id: "fuse", name: "Fuse", role: "Assault", tags: ["artillery", "zone-control", "entry"],
    tactical: "Knuster-Granate", ult: "Mutterlode (Feuerring)", passive: "Grenadier (Mehr Granaten)",
    bestMaps: ["Worlds Edge", "District", "Kings Canyon", "Broken Moon"],
    counters: ["wattson", "rampart", "caustic"], counteredBy: ["wattson"]
  },
  { 
    id: "ash", name: "Ash", role: "Assault", tags: ["teleport", "tether", "entry"],
    tactical: "Arc-Falle", ult: "Phasenriss (Einweg-Portal)", passive: "Markiert zum Sterben",
    bestMaps: ["Worlds Edge", "Storm Point", "Olympus", "Broken Moon"],
    counters: ["octane", "pathfinder"], counteredBy: ["wattson", "caustic"]
  },
  { 
    id: "madmaggie", name: "Mad Maggie", role: "Assault", tags: ["speed", "anti-cover", "entry"],
    tactical: "Taktischer Bohrer", ult: "Abrissbirne", passive: "Warlord-Wut (Shotgun Speed)",
    bestMaps: ["Worlds Edge", "District", "Kings Canyon", "Olympus"],
    counters: ["gibraltar", "newcastle", "rampart"], counteredBy: ["wattson"]
  },
  { 
    id: "ballistic", name: "Ballistic", role: "Assault", tags: ["weapon-buff", "overclock", "entry"],
    tactical: "Intelligentes Geschoss", ult: "Sturm (Unendliche Muni)", passive: "Schlingen-Spezialist",
    bestMaps: ["District", "Worlds Edge", "Kings Canyon"],
    counters: ["horizon", "wraith"], counteredBy: ["conduit", "gibraltar"]
  },

  // Skirmisher
  { 
    id: "wraith", name: "Wraith", role: "Skirmisher", tags: ["portal", "reposition", "scout"],
    tactical: "In den Riss", ult: "Dimensionales Portal", passive: "Stimmen aus den Riss",
    bestMaps: ["Worlds Edge", "District", "Kings Canyon", "Olympus"],
    counters: ["caustic", "fuse"], counteredBy: ["seer", "ash"]
  },
  { 
    id: "pathfinder", name: "Pathfinder", role: "Skirmisher", tags: ["zipline", "high-ground", "scout"],
    tactical: "Kletterhaken", ult: "Seilrutschen-Kanone", passive: "Insider-Wissen",
    bestMaps: ["Storm Point", "Worlds Edge", "Olympus", "Broken Moon"],
    counters: ["loba", "vantage"], counteredBy: ["ash", "alter"]
  },
  { 
    id: "octane", name: "Octane", role: "Skirmisher", tags: ["jump-pad", "speed", "entry"],
    tactical: "Stim", ult: "Sprungkissen", passive: "Schnelle Heilung",
    bestMaps: ["District", "Worlds Edge", "Olympus", "Kings Canyon"],
    counters: ["lifeline"], counteredBy: ["catalyst", "caustic", "ash"]
  },
  { 
    id: "horizon", name: "Horizon", role: "Skirmisher", tags: ["gravity-lift", "black-hole", "high-ground"],
    tactical: "Gravitationslift", ult: "Schwarzes Loch", passive: "Raumspaziergang",
    bestMaps: ["Storm Point", "Worlds Edge", "Olympus", "Broken Moon"],
    counters: ["rampart", "wattson"], counteredBy: ["ballistic", "crypto"]
  },
  { 
    id: "valkyrie", name: "Valkyrie", role: "Skirmisher", tags: ["skyward-launch", "rotations", "high-ground"],
    tactical: "Raketenschwarm", ult: "Himmels-Start", passive: "VTOL-Düsen",
    bestMaps: ["Storm Point", "Olympus", "Broken Moon"],
    counters: ["caustic"], counteredBy: ["vantage", "seer"]
  },
  { 
    id: "revenant", name: "Revenant", role: "Skirmisher", tags: ["shadow-pounce", "dueling", "entry"],
    tactical: "Schatten-Sprung", ult: "Schattenschmiede (Schild)", passive: "Instinkt des Assassinen",
    bestMaps: ["District", "Worlds Edge", "Kings Canyon", "Olympus"],
    counters: ["lifeline", "mirage"], counteredBy: ["conduit", "heavy-cc"]
  },
  { 
    id: "alter", name: "Alter", role: "Skirmisher", tags: ["void-passage", "nexus", "reposition"],
    tactical: "Leeren-Passage", ult: "Leeren-Nexus", passive: "Blick in den Abgrund",
    bestMaps: ["District", "Worlds Edge", "Olympus", "Broken Moon"],
    counters: ["caustic", "wattson", "rampart"], counteredBy: ["crypto", "bloodhound"]
  },

  // Recon
  { 
    id: "bloodhound", name: "Bloodhound", role: "Recon", tags: ["scan", "vision", "tracking"],
    tactical: "Auge des Allvaters", ult: "Jagdbeute", passive: "Tracker",
    bestMaps: ["Worlds Edge", "Storm Point", "District", "Olympus", "Kings Canyon", "Broken Moon"],
    counters: ["bangalore", "mirage"], counteredBy: ["catalyst"]
  },
  { 
    id: "crypto", name: "Crypto", role: "Recon", tags: ["scan", "emp", "drone", "beacon"],
    tactical: "Überwachungsdrohne", ult: "Drohnen-EMP", passive: "Neuro-Link",
    bestMaps: ["Storm Point", "Worlds Edge", "Broken Moon"],
    counters: ["wattson", "caustic", "gibraltar", "catalyst"], counteredBy: ["bangalore", "high-damage-bullets"]
  },
  { 
    id: "seer", name: "Seer", role: "Recon", tags: ["scan", "cancel", "vision"],
    tactical: "Fokus der Aufmerksamkeit", ult: "Enthüllung", passive: "Herzschlag-Sensor",
    bestMaps: ["District", "Worlds Edge", "Kings Canyon"],
    counters: ["wraith", "valkyrie", "lifeline"], counteredBy: ["crypto"]
  },
  { 
    id: "vantage", name: "Vantage", role: "Recon", tags: ["sniper", "scout", "scan"],
    tactical: "Echoversetzung", ult: "Markierung des Schützen", passive: "Aufklärer-Linse",
    bestMaps: ["Storm Point", "Olympus", "Broken Moon"],
    counters: ["valkyrie", "pathfinder"], counteredBy: ["gibraltar", "newcastle"]
  },

  // Controller
  { 
    id: "caustic", name: "Caustic", role: "Controller", tags: ["gas", "zone-control", "bunker"],
    tactical: "Nox-Gasbehälter", ult: "Nox-Gasgranate", passive: "Nox-Sicht",
    bestMaps: ["Worlds Edge", "District", "Kings Canyon"],
    counters: ["wraith", "octane"], counteredBy: ["crypto", "madmaggie"]
  },
  { 
    id: "wattson", name: "Wattson", role: "Controller", tags: ["fences", "pylon", "bunker", "ring-console"],
    tactical: "Knotenpunkt-Sicherheit", ult: "Abfang-Pylon", passive: "Funke des Genies",
    bestMaps: ["Worlds Edge", "Storm Point", "Olympus", "Broken Moon"],
    counters: ["fuse", "gibraltar", "bangalore"], counteredBy: ["crypto", "madmaggie"]
  },
  { 
    id: "rampart", name: "Rampart", role: "Controller", tags: ["walls", "minigun", "bunker"],
    tactical: "Verstärkte Deckung", ult: "Tragbare Minigun 'Sheila'", passive: "Modifizierte Lader",
    bestMaps: ["Worlds Edge", "District", "Kings Canyon"],
    counters: ["lifeline", "octane"], counteredBy: ["madmaggie", "crypto", "fuse"]
  },
  { 
    id: "catalyst", name: "Catalyst", role: "Controller", tags: ["wall", "reinforce", "zone-control", "ring-console"],
    tactical: "Meldungsstreifen", ult: "Dunkler Schleier", passive: "Barrikade",
    bestMaps: ["Worlds Edge", "Storm Point", "District", "Broken Moon"],
    counters: ["bloodhound", "seer"], counteredBy: ["crypto", "horizon"]
  },

  // Support
  { 
    id: "gibraltar", name: "Gibraltar", role: "Support", tags: ["dome", "bombardment", "anchor"],
    tactical: "Schutzkuppel", ult: "Defensiv-Bombardement", passive: "Waffenschild",
    bestMaps: ["Storm Point", "Worlds Edge", "Broken Moon"],
    counters: ["vantage", "ballistic"], counteredBy: ["madmaggie", "crypto"]
  },
  { 
    id: "lifeline", name: "Lifeline", role: "Support", tags: ["drone-heal", "res", "supply"],
    tactical: "D.O.C.-Heildrohne", ult: "Care-Paket", passive: "Kampf-Rettung",
    bestMaps: ["Worlds Edge", "Storm Point", "District", "Kings Canyon", "Olympus", "Broken Moon"],
    counters: ["loba"], counteredBy: ["seer", "revenant", "fuse"]
  },
  { 
    id: "mirage", name: "Mirage", role: "Support", tags: ["invis-res", "decoy", "reposition"],
    tactical: "Ausgefuchst", ult: "Spektakel", passive: "Tarnung",
    bestMaps: ["District", "Kings Canyon"],
    counters: ["ballistic"], counteredBy: ["bloodhound", "seer", "crypto"]
  },
  { 
    id: "loba", name: "Loba", role: "Support", tags: ["black-market", "loot", "anchor"],
    tactical: "Bester Freund des Diebes", ult: "Boutique", passive: "Blick für Qualität",
    bestMaps: ["Storm Point", "Worlds Edge", "Olympus", "Broken Moon"],
    counters: ["caustic"], counteredBy: ["pathfinder"]
  },
  { 
    id: "newcastle", name: "Newcastle", role: "Support", tags: ["mobile-shield", "wall", "res", "anchor"],
    tactical: "Mobiles Schutzschild", ult: "Kastell-Festung", passive: "Verwundeten-Rettung",
    bestMaps: ["Storm Point", "Worlds Edge", "Broken Moon"],
    counters: ["vantage"], counteredBy: ["madmaggie", "crypto"]
  },
  { 
    id: "conduit", name: "Conduit", role: "Support", tags: ["shield-heal", "zone-control", "anchor"],
    tactical: "Rettende Strahlen", ult: "Energie-Jammer", passive: "Geschwindigkeitsrausch",
    bestMaps: ["Worlds Edge", "Storm Point", "District", "Olympus", "Kings Canyon", "Broken Moon"],
    counters: ["revenant"], counteredBy: ["crypto"]
  },
];

function LabContent() {
  const searchParams = useSearchParams();
  const [selectedIds, setSelectedIds] = useState([]);
  const [copied, setCopied] = useState(false);

  // Smart Recommendation States
  const [targetMap, setTargetMap] = useState("Storm Point");
  const [playstyle, setPlaystyle] = useState("zone");
  const [comfortLegends, setComfortLegends] = useState([]);

  useEffect(() => {
    const compParam = searchParams.get("c");
    if (compParam) {
      const ids = compParam.split(",");
      const validIds = ids.filter(id => ALL_LEGENDS.some(l => l.id === id));
      if (validIds.length > 0) {
        setSelectedIds(validIds.slice(0, 3));
      }
    }
  }, [searchParams]);

  const toggleLegend = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      }
    }
  };

  const toggleComfortLegend = (id) => {
    if (comfortLegends.includes(id)) {
      setComfortLegends(comfortLegends.filter((item) => item !== id));
    } else {
      setComfortLegends([...comfortLegends, id]);
    }
  };

  const copyShareLink = () => {
    if (selectedIds.length === 0) return;
    const shareUrl = `${window.location.origin}?c=${selectedIds.join(",")}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const selectedLegends = ALL_LEGENDS.filter((l) => selectedIds.includes(l.id));

  // Smart Recommendation Logic
  const getRecommendedComps = () => {
    let rec1, rec2, rec3;

    if (playstyle === "zone") {
      rec1 = ["wattson", "bangalore", "crypto"];
      rec2 = ["catalyst", "newcastle", "bloodhound"];
      rec3 = ["caustic", "gibraltar", "pathfinder"];
    } else if (playstyle === "edge") {
      rec1 = ["horizon", "bangalore", "bloodhound"];
      rec2 = ["revenant", "conduit", "madmaggie"];
      rec3 = ["alter", "fuse", "pathfinder"];
    } else {
      rec1 = ["crypto", "bangalore", "wattson"];
      rec2 = ["bloodhound", "bangalore", "horizon"];
      rec3 = ["seer", "catalyst", "valkyrie"];
    }

    return [rec1, rec2, rec3];
  };

  const recommendedComps = getRecommendedComps();

  const applyRecommendedComp = (compArray) => {
    setSelectedIds(compArray);
  };

  // Analyse der Comp
  const analyzeComp = () => {
    if (selectedLegends.length < 3) return null;

    const roles = selectedLegends.map((l) => l.role);
    const tags = selectedLegends.flatMap((l) => l.tags);

    const allCounters = selectedLegends.flatMap((l) => l.counters);
    const allThreats = selectedLegends.flatMap((l) => l.counteredBy);

    const hardCounterTargets = Array.from(new Set(allCounters));
    const majorThreats = Array.from(new Set(allThreats));

    let compType = "Balanced Hybrid Comp";
    let desc = "Flexible Aufstellung für Rotations und 3v3 Fights.";
    let synergies = [];
    let weaknesses = [];

    if (tags.includes("smoke") && tags.includes("scan")) {
      synergies.push({
        title: "Smoke & Vision Wallhack Combo",
        detail: "Rauch schützt eure Sicht, während Scans Gegner im Rauch markieren.",
      });
    }

    if (tags.includes("emp") && (tags.includes("entry") || tags.includes("speed"))) {
      synergies.push({
        title: "EMP Push Synergy",
        detail: "Crypto schwächt Schilde & Fallen, damit Entry-Fragger sofort pushen können.",
      });
    }

    if (tags.includes("bunker") && tags.includes("anchor")) {
      compType = "Hard Zone & Defense";
      desc = "Perfekt um Häuser / POIs im Endgame dauerhaft zu halten.";
    }

    if (roles.filter((r) => r === "Skirmisher" || r === "Assault").length >= 2) {
      compType = "Aggressive Edge & Fighting";
      desc = "Fokussiert auf schnelle 3v3 Fights und Zone-Edge Interceptions.";
    }

    if (!roles.includes("Support")) {
      weaknesses.push("Kein Support: Keine Schnell-Ressurrects oder garantiertes Reset-Potenzial.");
    }

    if (!roles.includes("Controller")) {
      weaknesses.push("Kein Controller: Kein Zugriff auf Ring-Consolen für Zonen-Vorhersagen.");
    }

    const mapScores = {};
    ALL_MAPS.forEach((mapName) => {
      mapScores[mapName] = selectedLegends.filter((l) => l.bestMaps.includes(mapName)).length;
    });

    return { compType, desc, synergies, weaknesses, mapScores, hardCounterTargets, majorThreats };
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
          <p className="text-xs text-gray-400">Squad & Counter Optimizer</p>
        </div>
        <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-gray-300 font-mono">v1.5</span>
      </header>

      {/* SMART RECOMMENDATION GENERATOR */}
      <div className="bg-gradient-to-br from-apexCard to-white/5 border border-apexGold/30 rounded-xl p-4 mb-6 shadow-xl">
        <h2 className="text-xs font-bold text-apexGold uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Sparkles size={16} /> Smart Recommendation Generator
        </h2>

        {/* Step 1: Map Selection */}
        <div className="mb-3">
          <p className="text-[11px] text-gray-400 mb-1">1. Welche Map spielt ihr?</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ALL_MAPS.map((m) => (
              <button
                key={m}
                onClick={() => setTargetMap(m)}
                className={`py-1.5 text-[11px] rounded border transition ${
                  targetMap === m
                    ? "bg-apexGold text-black font-bold border-apexGold"
                    : "bg-white/5 border-white/10 text-gray-300"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Playstyle Selection */}
        <div className="mb-3">
          <p className="text-[11px] text-gray-400 mb-1">2. Was ist euer präferierter Spielstil?</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "zone", label: "Hard Zone / Anchor" },
              { id: "edge", label: "Aggressive Edge" },
              { id: "vision", label: "Heavy Vision / Scan" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPlaystyle(p.id)}
                className={`py-1.5 text-[11px] rounded border transition ${
                  playstyle === p.id
                    ? "bg-apexRed text-white font-bold border-apexRed"
                    : "bg-white/5 border-white/10 text-gray-300"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Comfort Pool */}
        <div className="mb-4">
          <p className="text-[11px] text-gray-400 mb-1 flex items-center gap-1">
            <UserCheck size={12} /> 3. Welcher Legenden-Pool beherrscht euer Team? (Optional):
          </p>
          <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto p-1 bg-black/20 rounded border border-white/5">
            {ALL_LEGENDS.map((l) => {
              const isComfort = comfortLegends.includes(l.id);
              return (
                <button
                  key={l.id}
                  onClick={() => toggleComfortLegend(l.id)}
                  className={`text-[10px] px-2 py-0.5 rounded border transition ${
                    isComfort
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                      : "bg-white/5 text-gray-400 border-white/5"
                  }`}
                >
                  {l.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggestions Outputs */}
        <div className="border-t border-white/10 pt-3">
          <p className="text-[11px] font-bold text-gray-300 mb-2">Empfohlene Lineups übernehmen:</p>
          <div className="space-y-2">
            {recommendedComps.map((comp, idx) => (
              <div key={idx} className="flex justify-between items-center bg-black/30 p-2 rounded border border-white/5">
                <span className="text-xs font-bold text-gray-200">
                  {comp.map((id) => ALL_LEGENDS.find((l) => l.id === id)?.name).join(" + ")}
                </span>
                <button
                  onClick={() => applyRecommendedComp(comp)}
                  className="bg-apexRed/80 hover:bg-apexRed text-white text-[10px] font-bold px-2.5 py-1 rounded transition"
                >
                  Übernehmen
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trio Auswahlanzeige */}
      <div className="bg-apexCard border border-white/10 rounded-xl p-4 mb-6 shadow-xl">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Dein Aktuelles Trio ({selectedIds.length}/3)
          </h2>
          <div className="flex gap-2">
            {selectedIds.length > 0 && (
              <>
                <button
                  onClick={copyShareLink}
                  className="text-[11px] bg-white/10 hover:bg-white/20 text-white font-bold px-2.5 py-1 rounded flex items-center gap-1 transition"
                >
                  {copied ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Share2 size={12} />}
                  {copied ? "Link kopiert!" : "Teilen"}
                </button>
                <button onClick={() => setSelectedIds([])} className="text-apexRed text-[11px] underline">
                  Zurücksetzen
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((slotIndex) => {
            const legend = selectedLegends[slotIndex];
            return (
              <div
                key={slotIndex}
                className={`rounded-lg border flex flex-col p-3 transition ${
                  legend
                    ? "border-apexRed/60 bg-gradient-to-b from-apexRed/10 to-apexCard"
                    : "border-dashed border-white/10 bg-white/5 items-center justify-center h-28"
                }`}
              >
                {legend ? (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">{legend.name}</span>
                      <span className="text-[9px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded">
                        {legend.role}
                      </span>
                    </div>
                    <div className="space-y-1 text-[10px] text-gray-300 border-t border-white/10 pt-2">
                      <p><strong className="text-apexRed">Taktisch:</strong> {legend.tactical}</p>
                      <p><strong className="text-apexGold">Ult:</strong> {legend.ult}</p>
                    </div>
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
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Manuell auswählen oder anpassen:</h2>
        
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

      {/* Analyse-Ergebnis */}
      {analysis && (
        <div className="space-y-6 bg-apexCard border border-apexRed/40 rounded-xl p-5 shadow-2xl">
          <div className="border-b border-white/10 pb-3">
            <span className="text-[10px] bg-apexRed text-white px-2 py-0.5 rounded font-bold uppercase">
              Comp-Analyse
            </span>
            <h3 className="text-lg font-black text-white mt-2">{analysis.compType}</h3>
            <p className="text-xs text-gray-300 mt-1">{analysis.desc}</p>
          </div>

          {/* Map Rating System (Alle 6 Maps) */}
          <div>
            <h4 className="text-xs font-bold text-apexGold uppercase mb-3 flex items-center gap-1.5">

<Map size={14} />
Map-Eignung (Alle 6 Maps)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(analysis.mapScores).map(([mapName, score]) => (
                <div key={mapName} className="bg-white/5 p-2.5 rounded border border-white/5 text-center">
                  <p className="text-[11px] font-bold mb-1">{mapName}</p>
                  <div className="flex justify-center text-amber-400 gap-0.5">
                    {[1, 2, 3].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={star <= score ? "fill-amber-400 text-amber-400" : "text-gray-600"}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COUNTER-SECTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
              <h4 className="text-xs font-bold text-emerald-400 uppercase mb-2 flex items-center gap-1">
                <Crosshair size={14} /> Stark Gegen (Counters)
              </h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Eure Comp hat direkte Konter-Vorteile gegen:
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {analysis.hardCounterTargets.slice(0, 5).map((target) => (
                  <span key={target} className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded font-bold capitalize">
                    {target}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg">
              <h4 className="text-xs font-bold text-rose-400 uppercase mb-2 flex items-center gap-1">
                <ShieldAlert size={14} /> Vorsicht Vor (Gefahren)
              </h4>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                Diese Legenden können eure Comp auskontern:
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {analysis.majorThreats.slice(0, 5).map((threat) => (
                  <span key={threat} className="bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded font-bold capitalize">
                    {threat}
                  </span>
                ))}
              </div>
            </div>
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

          {/* IGL Hinweise */}
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

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center p-8 text-white text-xs">Lade Synergy Lab...</div>}>
      <LabContent />
    </Suspense>
  );
}