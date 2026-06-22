"use client";

import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";

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

      {/* Контроллеры по бокам заголовка (как gameswim) */}
      <Image
        src="/img/controller.png"
        alt=""
        width={420}
        height={420}
        aria-hidden
        className="hidden lg:block absolute left-0 xl:left-8 top-28 xl:top-32 w-[260px] xl:w-[330px] -rotate-[20deg] opacity-95 pointer-events-none select-none drop-shadow-2xl z-0"
      />
      <Image
        src="/img/controller.png"
        alt=""
        width={420}
        height={420}
        aria-hidden
        className="hidden lg:block absolute right-0 xl:right-8 top-28 xl:top-32 w-[260px] xl:w-[330px] rotate-[20deg] scale-x-[-1] opacity-95 pointer-events-none select-none drop-shadow-2xl z-0"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-28 lg:py-32">
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

          <div className="bg-[#0b1c4a] rounded-2xl md:rounded-3xl p-5 md:p-8 mb-6 md:mb-10 max-w-2xl mx-auto border border-white/10">
            <div className="flex flex-row items-center justify-between gap-4 md:gap-6">
              <div className="flex items-center gap-3 md:gap-4 text-left">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[#0047ff]/15 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-[#0047ff]" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-2xl md:text-4xl font-black font-display text-white leading-none mb-1">10 000+</div>
                  <p className="text-xs md:text-base text-white/60 font-medium">довольных пользователей с нами</p>
                </div>
              </div>
              <button
                onClick={handleScroll}
                className="bg-[#0047ff] hover:bg-[#0033b7] text-white px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl text-sm md:text-lg font-bold whitespace-nowrap transition-all duration-200 hover:scale-105 flex-shrink-0 shadow-lg shadow-[#0047ff]/30"
              >
                Отзывы
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-[#0b1c4a] rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/10 hover:border-[#0047ff]/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 md:w-24 md:h-24 mb-3 md:mb-5 rounded-2xl bg-[#0047ff]/12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 p-2.5">
                  <Image src="/icons/games_ic.png" alt="Игры" width={108} height={108} className="object-contain w-full h-full" />
                </div>
                <h3 className="text-lg md:text-3xl font-black text-white mb-1 md:mb-2">Игры</h3>
                <p className="text-white/55 text-xs md:text-base mb-4 md:mb-6 flex-grow">Свыше 5188 игр в коллекции</p>
                <Link href="/games" className="bg-[#0047ff] hover:bg-[#0033b7] text-white px-4 py-2.5 md:py-3.5 rounded-xl text-sm md:text-lg font-bold w-full transition-all duration-200 shadow-lg shadow-[#0047ff]/25">
                  Смотреть
                </Link>
              </div>
            </div>

            <div className="bg-[#0b1c4a] rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/10 hover:border-[#fcc000]/60 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-16 h-16 md:w-24 md:h-24 mb-3 md:mb-5 rounded-2xl bg-[#fcc000]/12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 p-2.5">
                  <Image src="/icons/subs_ic.png" alt="Подписки" width={108} height={108} className="object-contain w-full h-full" />
                </div>
                <h3 className="text-lg md:text-3xl font-black text-white mb-1 md:mb-2">Подписки</h3>
                <p className="text-white/55 text-xs md:text-base mb-4 md:mb-6 flex-grow">PS Plus и EA Play по низкой цене</p>
                <Link href="/subscription" className="bg-[#fcc000] hover:bg-[#d9a800] text-[#1a1302] px-4 py-2.5 md:py-3.5 rounded-xl text-sm md:text-lg font-bold w-full transition-all duration-200 shadow-lg shadow-[#fcc000]/25">
                  Подключить
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
