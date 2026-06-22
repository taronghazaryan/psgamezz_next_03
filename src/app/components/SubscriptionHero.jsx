"use client";

export default function SubscriptionHero() {
  const handleScroll = () => {
    const target = document.getElementById("subscriptions");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden border-b border-white/10 bg-[#070c1b]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14 text-center">
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#0047ff]/15 border border-[#0047ff]/30 text-[#0047ff] text-xs md:text-sm font-bold uppercase tracking-wide">
          Подписки PlayStation
        </span>
        <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-3 md:mb-4">
          PS&nbsp;Plus и EA&nbsp;Play
        </h1>
        <p className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto mb-7 md:mb-8">
          Сотни игр, эксклюзивные скидки и онлайн-мультиплеер — по лучшим ценам на рынке.
        </p>
        <button
          onClick={handleScroll}
          className="bg-[#0047ff] hover:bg-[#0033b7] text-white px-8 py-3 md:py-3.5 rounded-xl text-sm md:text-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg shadow-[#0047ff]/30"
        >
          Выбрать подписку
        </button>
      </div>
    </div>
  );
}
