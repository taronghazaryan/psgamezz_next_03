"use client";

import { useEffect } from "react";

export default function TelegramInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    // Signal the app is ready and expand to full available height
    tg.ready();
    tg.expand();

    // Match app dark theme with Telegram's header / background
    if (typeof tg.setHeaderColor === "function") tg.setHeaderColor("#0d0e14");
    if (typeof tg.setBackgroundColor === "function") tg.setBackgroundColor("#0d0e14");
    if (typeof tg.setBottomBarColor === "function") tg.setBottomBarColor("#0d0e14");

    // Request true fullscreen (hides Telegram header + "Mini Application" subtitle) — requires Telegram 7.8+
    if (typeof tg.requestFullscreen === "function" && parseFloat(tg.version) >= 7.8) {
      tg.requestFullscreen();
    }
  }, []);

  return null;
}
