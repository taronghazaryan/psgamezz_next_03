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
      <div className="bg-[#070c1b]  border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-center gap-2 md:gap-4 py-6 md:py-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  relative 
                  px-4 sm:px-8 md:px-12 lg:px-16 
                  py-1 sm:py-1 md:py-1 
                  font-bold 
                  text-sm max-sm:text-sm sm:text-base md:text-lg lg:text-xl 
                  transition-all duration-300 cursor-pointer
                  ${activeTab === tab
                    ? "text-white scale-105"
                    : "text-white/60 hover:text-white "}
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
