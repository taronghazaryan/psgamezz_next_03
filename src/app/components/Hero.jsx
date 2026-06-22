"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Gamepad2, Crown, ShieldCheck } from "lucide-react";

const Hero = () => {
  const handleScroll = () => {
    const target = document.getElementById("reviews");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#030712]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(/img/palmer.png)` }}
      ></div>
      <div className="absolute inset-0 bg-[#030712]/80"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-32 lg:py-40">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="text-2xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-display leading-tight mb-3 md:mb-8">
            <span className="text-white">Всё для вашей</span>
            <br />
            <span className="text-[#0047ff] inline-block">PlayStation</span>
            <br />
            <span className="text-white">без головной боли</span>
          </h1>

          <p className="text-sm md:text-2xl text-white/90 mb-6 md:mb-16 max-w-3xl mx-auto">
            Более 5000 игр и подписок по лучшим ценам. Быстро, безопасно, надежно.
          </p>

          {/* Лента компактных блоков (в духе gameswim) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto">
            {/* Клиенты */}
            <div className="bg-[#0b1c4a] rounded-2xl p-4 md:p-5 border border-white/10 flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0047ff]/15 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-[#0047ff]" strokeWidth={2} />
              </div>
              <div className="text-2xl md:text-3xl font-black font-display text-white leading-none">10 000+</div>
              <p className="text-white/55 text-xs md:text-sm mt-1.5 mb-3">довольных клиентов</p>
              <button onClick={handleScroll} className="mt-auto text-[#0047ff] hover:text-[#3b82f6] text-xs md:text-sm font-bold transition-colors">
                Отзывы →
              </button>
            </div>

            {/* Игры */}
            <Link href="/games" className="bg-[#0b1c4a] rounded-2xl p-4 md:p-5 border border-white/10 hover:border-[#0047ff]/60 transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-10 h-10 rounded-xl bg-[#0047ff]/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5 text-[#0047ff]" strokeWidth={2} />
              </div>
              <div className="text-2xl md:text-3xl font-black font-display text-white leading-none">5188+</div>
              <p className="text-white/55 text-xs md:text-sm mt-1.5 mb-3">игр в каталоге</p>
              <span className="mt-auto text-[#0047ff] group-hover:text-[#3b82f6] text-xs md:text-sm font-bold transition-colors">Смотреть →</span>
            </Link>

            {/* Подписки */}
            <Link href="/subscription" className="bg-[#0b1c4a] rounded-2xl p-4 md:p-5 border border-white/10 hover:border-[#fcc000]/60 transition-all duration-300 flex flex-col items-start text-left group">
              <div className="w-10 h-10 rounded-xl bg-[#fcc000]/15 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <Crown className="w-5 h-5 text-[#fcc000]" strokeWidth={2} />
              </div>
              <div className="text-lg md:text-xl font-black font-display text-white leading-tight">PS Plus<br/>& EA Play</div>
              <p className="text-white/55 text-xs md:text-sm mt-1.5 mb-3">по низкой цене</p>
              <span className="mt-auto text-[#fcc000] group-hover:text-[#ffd84d] text-xs md:text-sm font-bold transition-colors">Подключить →</span>
            </Link>

            {/* Гарантия */}
            <div className="bg-[#0b1c4a] rounded-2xl p-4 md:p-5 border border-white/10 flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-xl bg-[#0047ff]/15 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-[#0047ff]" strokeWidth={2} />
              </div>
              <div className="text-2xl md:text-3xl font-black font-display text-white leading-none">24/7</div>
              <p className="text-white/55 text-xs md:text-sm mt-1.5 mb-3">поддержка и гарантия</p>
              <span className="mt-auto text-white/40 text-xs md:text-sm font-bold">Всегда на связи</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
