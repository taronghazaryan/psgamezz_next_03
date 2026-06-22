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
      <div className="bg-[#070c1b] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-center gap-2 md:gap-3 py-5 md:py-7">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative rounded-xl
                  px-5 sm:px-8 md:px-10 lg:px-14
                  py-2.5 md:py-3
                  font-bold font-display
                  text-sm sm:text-base md:text-lg
                  transition-all duration-300 cursor-pointer
                  ${activeTab === tab
                    ? "bg-[#0047ff] text-white shadow-lg shadow-[#0047ff]/30"
                    : "text-white/60 hover:text-white hover:bg-white/5"}
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12 bg-[#030712]">
        {activeTab === "Главная" && <Main />}
        {activeTab === "Все игры" && <div className="px-4 md:px-6 lg:px-8"><AllGames /></div>}
        {activeTab === "Скидки" && <div className="px-4 md:px-6 lg:px-8"><Sales /></div>}
      </div>
    </div>
  );
}
