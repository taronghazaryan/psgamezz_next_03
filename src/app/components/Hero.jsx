"use client";

import Link from "next/link";
import Image from "next/image";

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

      {/* Контроллеры по бокам блоков (оранжевый слева, белый справа) */}
      <Image
        src="/images/lcont.png"
        alt=""
        width={520}
        height={520}
        aria-hidden
        className="hidden lg:block absolute left-0 xl:left-4 top-[42%] w-[360px] xl:w-[460px] -rotate-[18deg] opacity-95 pointer-events-none select-none drop-shadow-2xl z-0"
      />
      <Image
        src="/images/rcont.png"
        alt=""
        width={520}
        height={520}
        aria-hidden
        className="hidden lg:block absolute right-0 xl:right-4 top-[42%] w-[360px] xl:w-[460px] rotate-[18deg] opacity-95 pointer-events-none select-none drop-shadow-2xl z-0"
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

          <div className="bg-[#0b1c4a]/50 rounded-2xl md:rounded-3xl p-5 md:p-12 mb-6 md:mb-16 max-w-2xl mx-auto border border-white/10 shadow-xl">
            <div className="flex flex-row md:flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
              <div className="text-left">
                <div className="text-3xl md:text-5xl font-black text-[#0047ff] mb-1 md:mb-2">
                  10,000+
                </div>
                <p className="text-sm md:text-xl text-white/90 font-semibold mb-0.5 md:mb-1">
                  Довольных пользователей
                </p>
                <p className="text-white/70 text-xs md:text-base hidden md:block">
                  постоянно играют с нами
                </p>
              </div>
              <button
                onClick={handleScroll}
                className="border border-[#0047ff] hover:bg-[#0033b7] text-white px-5 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-xl font-bold whitespace-nowrap transition-all duration-200 hover:scale-105 flex-shrink-0"
              >
                Отзывы
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-[#0b1c4a]/50 rounded-2xl md:rounded-3xl p-5 md:p-10 border border-white/10 shadow-xl hover:border-[#0047ff]/50 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 md:w-24 md:h-24 mb-3 md:mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Image src="/icons/games_ic.png" alt="Иконка" width={108} height={108} className="object-contain" />
                </div>
                <h3 className="text-base md:text-3xl font-black text-white mb-1 md:mb-3">Игры</h3>
                <p className="text-white/80 text-xs mb-4 md:hidden flex-grow">5188+ игр</p>
                <p className="text-white/80 text-lg mb-8 flex-grow hidden md:block">Свыше 5188 игр в коллекции</p>
                <Link href="/games" className="border border-[#0047ff] hover:bg-[#0033b7] text-white px-4 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-xl font-bold w-full transition-all duration-200 hover:scale-105">
                  Смотреть
                </Link>
              </div>
            </div>

            <div className="bg-[#0b1c4a]/50 rounded-2xl md:rounded-3xl p-5 md:p-10 border border-white/10 shadow-xl hover:border-[#fcc000]/50 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 md:w-24 md:h-24 mb-3 md:mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Image src="/icons/subs_ic.png" alt="Иконка" width={108} height={108} className="object-contain" />
                </div>
                <h3 className="text-base md:text-3xl font-black text-white mb-1 md:mb-3">Подписки</h3>
                <p className="text-white/80 text-xs mb-4 md:hidden flex-grow">PS Plus & EA Play</p>
                <p className="text-white/80 text-lg mb-8 flex-grow hidden md:block">и EA Play по низкой цене</p>
                <Link href="/subscription" className="border border-[#fcc000] hover:bg-[#d9a800] text-white px-4 py-2.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl text-sm md:text-xl font-bold w-full transition-all duration-200 hover:scale-105">
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
