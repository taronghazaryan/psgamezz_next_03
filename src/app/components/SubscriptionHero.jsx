"use client";

import { Gamepad2, Percent, Users } from "lucide-react";

export default function SubscriptionHero() {
  const handleScroll = () => {
    const target = document.getElementById("subscriptions");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#030712]">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(/fifa.jpg)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-[#030712]/90"></div>

      <div className="relative z-10 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center py-20 md:py-32">
          <div className="w-full">
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
                Подписки для
                <br />
                <span className="text-[#0047ff] inline-block">
                  настоящих геймеров
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                Получите доступ к сотням игр, эксклюзивным скидкам и онлайн-мультиплееру по лучшим ценам на рынке
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              {[
                { Icon: Gamepad2, title: "Сотни игр", text: "Доступ к огромной библиотеке игр" },
                { Icon: Percent, title: "Эксклюзивные скидки", text: "Специальные предложения только для подписчиков" },
                { Icon: Users, title: "Онлайн-мультиплеер", text: "Играйте с друзьями по всему миру" },
              ].map((c, i) => (
                <div key={i} className="premium-card premium-card-hover rounded-3xl p-8 md:p-10 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl premium-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#0047ff]/30">
                    <c.Icon className="w-11 h-11 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2">{c.title}</h3>
                  <p className="text-white/70 text-base md:text-lg">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center animate-fade-in">
              <button 
                onClick={handleScroll} 
                className="bg-[#d9a800] hover:bg-[#fcc000] text-white px-12 md:px-16 py-5 md:py-6 rounded-2xl text-xl md:text-2xl lg:text-3xl font-black shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                Подключить подписку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
