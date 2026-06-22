"use client";

import { useState, useEffect, useRef } from "react";
import { IoSearch, IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import GameImage from "./GameImage";
import { useBasket } from "../context/BasketContext";
import { searchGames } from "../api/games";
import Script from "next/script";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { basket } = useBasket();
  const totalItems = basket.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
  const menuRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchGames(query);
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectGame = (game) => {
    localStorage.setItem("lastClickedProductId", game.id);
    setQuery("");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header
      className="relative md:sticky md:top-0 z-50 w-full bg-[#070c1b]/85 backdrop-blur-lg border-b border-white/10 shadow-lg"
      style={{ paddingTop: "var(--tg-safe-area-inset-top, env(safe-area-inset-top, 0px))" }}
    >
            {/* Яндекс.Метрика */}
      <Script id="yandex-metrika" strategy="afterInteractive">
        {`
          (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js','ym');

          ym(108035842, 'init', {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
          });
        `}
      </Script>
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/108035842" style={{ position:"absolute", left:"-9999px" }} alt="" />
        </div>
      </noscript>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">

        {/* ── MOBILE HEADER — лого слева, поиск справа ── */}
        <div className="flex md:hidden items-center justify-between h-14">
          <Link href="/" className="hover:opacity-90 transition-opacity duration-200">
            <Image
              className="h-9 w-auto"
              src="/logo/1.png"
              alt="PSGamezz Logo"
              width={120}
              height={54}
              priority
            />
          </Link>
          <button
            onClick={() => setMobileSearchOpen((v) => !v)}
            className="p-2.5 -mr-1 rounded-xl hover:bg-white/10 transition-all duration-200 text-white"
            aria-label="Поиск"
          >
            {mobileSearchOpen ? <IoClose size={22} /> : <IoSearch size={22} />}
          </button>
        </div>

        {/* ── DESKTOP HEADER ── */}
        <div className="hidden md:flex items-center justify-between h-24">
          {/* Hamburger for tablet (md, hides at lg) */}
          <button
            className="lg:hidden p-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-white"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex-shrink-0 hover:opacity-90 transition-opacity duration-200"
          >
            <Image
              className="h-16 w-auto lg:h-20"
              src="/logo/1.png"
              alt="PSGamezz Logo"
              width={160}
              height={96}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link
              href="/games"
              className={`relative px-6 py-3 rounded-xl font-semibold text-sm xl:text-base transition-all duration-300 ${
                pathname === "/games"
                  ? "bg-[#0047ff] text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  className="h-5 w-5"
                  src={pathname === "/games" ? "/logo/3blue.png" : "/logo/33.png"}
                  alt="Игры"
                  width={20}
                  height={20}
                />
                <span>Игры</span>
              </div>
            </Link>

            <Link
              href="/subscription"
              className={`relative px-6 py-3 rounded-xl font-semibold text-sm xl:text-base transition-all duration-300 ${
                pathname === "/subscription"
                  ? "bg-[#fcc000] text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  className="h-5 w-5"
                  src={pathname === "/subscription" ? "/logo/2yellow.png" : "/logo/2.png"}
                  alt="Подписки"
                  width={20}
                  height={20}
                />
                <span>Подписки</span>
              </div>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <IoSearch className="text-white/40 text-lg" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск игр..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#0047ff] focus:bg-white/15 focus:ring-2 focus:ring-[#0047ff]/20 transition-all duration-200"
              />
              {query && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#0e2148] rounded-xl shadow-xl border border-white/10 max-h-[400px] overflow-y-auto z-50">
                  {loading ? (
                    <div className="p-4 text-center text-white/60">Загрузка...</div>
                  ) : results.length > 0 ? (
                    <div className="p-2">
                      {results.map((game) => (
                        <Link
                          key={game.id}
                          href={`/games/${game.slug}`}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                          onClick={() => handleSelectGame(game)}
                        >
                          <GameImage
                            src={game.main_image_url}
                            alt={game.title}
                            width={60}
                            height={80}
                            className="w-15 h-20 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white group-hover:text-[#0047ff] transition-colors truncate">{game.title}</p>
                            <p className="text-sm text-white/60">
                              от {game.prices?.without_activation?.[0]?.PS4 || game.prices?.without_activation?.[0]?.PS5 || "—"} ₽
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-white/60">Ничего не найдено</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <Link
            href="/basket"
            onClick={() => setMenuOpen(false)}
            className="relative flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
          >
            <div className="relative">
              <Image
                className="h-6 w-6 md:h-7 md:w-7"
                src="/logo/55.png"
                alt="Корзина"
                width={28}
                height={28}
              />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center min-w-[20px] h-5 px-1.5 shadow-lg">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden xl:inline font-semibold text-white/90 group-hover:text-white">Корзина</span>
          </Link>
        </div>
      </div>

      {/* ── MOBILE: search bar (раскрывается по тапу на лупу) ── */}
      <div className={`md:hidden px-4 pb-3 animate-fade-in ${mobileSearchOpen ? "" : "hidden"}`}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <IoSearch className="text-white/50" size={18} />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск игр..."
            autoFocus
            className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#0047ff] focus:bg-white/10 focus:ring-2 focus:ring-[#0047ff]/20 transition-all duration-200"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/70"
            >
              <IoClose size={16} />
            </button>
          )}
        </div>

        {/* Mobile search results */}
        {query && (
          <div className="mt-2 bg-[#0e2148] rounded-xl shadow-xl border border-white/10 max-h-[60vh] overflow-y-auto animate-fade-in">
            {loading ? (
              <div className="p-3 text-center text-white/60 text-sm">Загрузка...</div>
            ) : results.length > 0 ? (
              <div className="p-2">
                {results.map((game) => (
                  <Link
                    key={game.id}
                    href={`/games/${game.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all"
                    onClick={() => handleSelectGame(game)}
                  >
                    <GameImage
                      src={game.main_image_url}
                      alt={game.title}
                      width={50}
                      height={66}
                      className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{game.title}</p>
                      <p className="text-xs text-white/60">
                        от {game.prices?.without_activation?.[0]?.PS4 || game.prices?.without_activation?.[0]?.PS5 || "—"} ₽
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-white/60 text-sm">Ничего не найдено</div>
            )}
          </div>
        )}
      </div>

      {/* Desktop tablet menu (md only, hides at lg which shows inline nav) */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:flex lg:hidden border-t border-white/10 bg-[#070c1b] animate-fade-in"
        >
          <nav className="flex flex-col py-4 w-full">
            <Link href="/" onClick={() => setMenuOpen(false)} className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#0047ff] transition-all duration-200">Главная</Link>
            <Link href="/games" onClick={() => setMenuOpen(false)} className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#0047ff] transition-all duration-200">Игры</Link>
            <Link href="/subscription" onClick={() => setMenuOpen(false)} className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#fcc000] transition-all duration-200">Подписки</Link>
            <Link href="/basket" onClick={() => setMenuOpen(false)} className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#0047ff] transition-all duration-200">Корзина</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
