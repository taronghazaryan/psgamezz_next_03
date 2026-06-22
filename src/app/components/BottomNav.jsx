"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gamepad2, Star, ShoppingCart } from "lucide-react";
import { useBasket } from "../context/BasketContext";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
  const { basket } = useBasket();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const totalItems = basket.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  const links = [
    { href: "/", label: "Главная", icon: Home },
    { href: "/games", label: "Игры", icon: Gamepad2 },
    { href: "/subscription", label: "Подписки", icon: Star },
    { href: "/basket", label: "Корзина", icon: ShoppingCart, badge: totalItems },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#070c1b]/95 backdrop-blur-md border-t border-white/10">
      <div
        className="grid grid-cols-4"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
      >
        {links.map(({ href, label, icon: Icon, badge }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center justify-center py-3 gap-1 transition-all duration-200 active:scale-95 ${
                isActive ? "text-[#0047ff]" : "text-white/45"
              }`}
            >
              <div className="relative">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="transition-all duration-200"
                />
                {badge !== undefined && mounted && badge > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center min-w-[15px] h-[15px] px-1 leading-none">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-semibold leading-none transition-colors duration-200 ${
                  isActive ? "text-[#0047ff]" : "text-white/40"
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#0047ff] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
