"use client";

import { useState } from "react";
import { Trophy, Calendar, Zap, Share2 } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  const standings = [
    { rank: 1, team: "Team Falcons", kills: 112, pts: 184 },
    { rank: 2, team: "Alliance", kills: 98, pts: 162 },
    { rank: 3, team: "TSM", kills: 89, pts: 145 },
    { rank: 4, team: "Fnatic", kills: 138, pts: 138 },
    { rank: 5, team: "Moist Esports", kills: 71, pts: 120 },
  ];

  return (
    <div className="flex-1 flex flex-col pb-20">
      <header className="p-4 bg-apexCard border-b border-white/10 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-black tracking-wider text-apexRed">ALGS PRO LEAGUE</h1>
          <p className="text-xs text-gray-400">EMEA & NA Split 1</p>
        </div>
        <button 
          onClick={() => alert("Tippe im Browser-Menü auf 'Zum Home-Bildschirm hinzufügen', um die App zu installieren!")}
          className="bg-apexRed/20 border border-apexRed text-apexRed p-2 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-apexRed hover:text-white transition"
        >
          <Share2 size={14} /> App Installieren
        </button>
      </header>

      <main className="p-4 flex-1 space-y-6">
        {activeTab === "overview" && (
          <>
            <div className="bg-gradient-to-br from-apexRed/20 to-apexCard border border-apexRed/40 rounded-xl p-5 shadow-lg">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-apexRed text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                  EMEA - Group A vs B
                </span>
                <span className="text-apexGold text-xs font-bold animate-pulse flex items-center gap-1">
                  <Zap size={12} /> IN 02h 15m
                </span>
              </div>
              <h2 className="text-lg font-bold">Split 1 Pro League - Matchday 4</h2>
              <p className="text-xs text-gray-400 mt-1">Maps: World's Edge & Storm Point</p>
              
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-gray-300">Offizieller Stream:</span>
                <a 
                  href="https://www.twitch.tv/playapex" 
                  target="_blank" 
                  rel="noreferrer"
                  className="bg-apexRed text-white font-bold text-xs px-3 py-1.5 rounded hover:bg-red-600 transition"
                >
                  Twitch Live
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Top Contenders</h3>
              <div className="grid grid-cols-2 gap-3">
                {standings.slice(0, 4).map((team) => (
                  <div key={team.rank} className="bg-apexCard border border-white/5 p-3 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">{team.team}</p>
                      <p className="text-xs text-gray-400">{team.kills} Kills</p>
                    </div>
                    <span className="text-apexRed font-bold text-sm">{team.pts} PTS</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "standings" && (
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-apexGold" /> Leaderboard Standings
            </h2>
            <div className="bg-apexCard rounded-xl border border-white/5 overflow-hidden">
              {standings.map((team) => (
                <div 
                  key={team.rank} 
                  className="flex items-center justify-between p-3.5 border-b border-white/5 last:border-0 hover:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      team.rank === 1 ? "bg-apexGold text-black" : "bg-white/10 text-gray-300"
                    }`}>
                      {team.rank}
                    </span>
                    <div>
                      <p className="font-bold text-sm">{team.team}</p>
                      <p className="text-xs text-gray-400">{team.kills} Kills</p>
                    </div>
                  </div>
                  <span className="font-bold text-apexRed">{team.pts} PTS</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="space-y-3">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-apexRed" /> Upcoming Matchdays
            </h2>
            <div className="bg-apexCard p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <div>
                <p className="font-bold text-sm">Matchday 4 (EMEA)</p>
                <p className="text-xs text-gray-400">Sa, 18:00 Uhr UTC</p>
              </div>
              <span className="text-xs bg-white/10 px-2.5 py-1 rounded text-gray-300">Group A vs B</span>
            </div>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 w-full max-w-md bg-apexCard border-t border-white/10 flex justify-around py-3 px-2">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`flex flex-col items-center gap-1 text-xs ${activeTab === "overview" ? "text-apexRed font-bold" : "text-gray-400"}`}
        >
          <Zap size={18} /> Live
        </button>
        <button 
          onClick={() => setActiveTab("standings")}
          className={`flex flex-col items-center gap-1 text-xs ${activeTab === "standings" ? "text-apexRed font-bold" : "text-gray-400"}`}
        >
          <Trophy size={18} /> Standings
        </button>
        <button 
          onClick={() => setActiveTab("schedule")}
          className={`flex flex-col items-center gap-1 text-xs ${activeTab === "schedule" ? "text-apexRed font-bold" : "text-gray-400"}`}
        >
          <Calendar size={18} /> Termine
        </button>
</nav>
      {/* Hier fügst du diesen Block neu ein: */}
      <footer className="p-4 text-center text-[10px] text-gray-500 border-t border-white/5 space-y-2 mb-16">
        <p>
          Diese Website ist ein inoffizielles Fan-Projekt und steht in keiner Verbindung mit Electronic Arts Inc. oder Respawn Entertainment.
        </p>
        <p>
          Apex Legends und ALGS sind eingetragene Marken von Electronic Arts Inc.
        </p>
        <div className="pt-1">
          <a href="/impressum" className="underline hover:text-gray-300">Impressum & Datenschutz</a>
        </div>
      </footer>

      <nav className="fixed bottom-0 w-full max-w-md bg-apexCard border-t border-white/10 flex justify-around py-3 px-2">
      </nav>
    </div>
  );
}