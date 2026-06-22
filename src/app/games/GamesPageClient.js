"use client";

import { useState } from "react";
import AllGames from "../components/Games/AllGames";
import Main from "../components/Games/Main";
import Sales from "../components/Games/Sales";

export default function GamesPage() {
  const tabs = ["Главная", "Все игры", "Скидки"];
  const [activeTab, setActiveTab] = useState("Главная");

  return (
    <div className="min-h-screen bg-[#030712]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-center py-5 md:py-7">
          <div className="inline-flex gap-1 p-1.5 rounded-2xl bg-white/5 border border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  rounded-xl
                  px-4 sm:px-7 md:px-9 lg:px-12
                  py-2 md:py-2.5
                  font-bold font-display
                  text-sm sm:text-base md:text-lg
                  transition-all duration-300 cursor-pointer
                  ${activeTab === tab
                    ? "bg-[#0047ff] text-white shadow-lg shadow-[#0047ff]/30"
                    : "text-white/55 hover:text-white"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={activeTab} className="py-8 md:py-12 bg-[#030712] min-h-[60vh] animate-fade-in">
        {activeTab === "Главная" && <Main />}
        {activeTab === "Все игры" && <div className="px-4 md:px-6 lg:px-8"><AllGames /></div>}
        {activeTab === "Скидки" && <div className="px-4 md:px-6 lg:px-8"><Sales /></div>}
      </div>
    </div>
  );
}
