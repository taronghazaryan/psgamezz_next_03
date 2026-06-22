"use client";

import { useEffect } from "react";

export default function TelegramInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup = null;

    const init = (tg) => {
      // Signal ready and expand to full available height
      tg.ready();
      tg.expand();

      // Match app dark theme with Telegram's header / background
      if (typeof tg.setHeaderColor === "function") tg.setHeaderColor("#030712");
      if (typeof tg.setBackgroundColor === "function") tg.setBackgroundColor("#030712");
      if (typeof tg.setBottomBarColor === "function") tg.setBottomBarColor("#030712");

      // Push safe-area values to CSS vars (more reliable than auto-set ones on older clients)
      const applyInsets = () => {
        const top = tg.safeAreaInset?.top ?? tg.contentSafeAreaInset?.top ?? 0;
        const bottom = tg.safeAreaInset?.bottom ?? 0;
        document.documentElement.style.setProperty("--tg-safe-area-inset-top", `${top}px`);
        document.documentElement.style.setProperty("--tg-safe-area-inset-bottom", `${bottom}px`);
      };
      applyInsets();
      tg.onEvent?.("safeAreaChanged", applyInsets);
      tg.onEvent?.("contentSafeAreaChanged", applyInsets);

      // Настоящий полный экран — только мобильный Telegram с Bot API 8.0+
      const mobilePlatforms = ["ios", "android", "android_x"];
      const requestFullscreenIfSupported = () => {
        if (
          mobilePlatforms.includes(tg.platform) &&
          typeof tg.requestFullscreen === "function" &&
          parseFloat(tg.version) >= 8.0
        ) {
          try {
            tg.requestFullscreen();
          } catch (_) {
            /* старый клиент — остаёмся на expand() */
          }
        }
      };
      requestFullscreenIfSupported();

      // Перезапросить разворот/фуллскрин при возврате (например, после оплаты)
      const handleActivated = () => {
        tg.expand();
        requestFullscreenIfSupported();
      };
      tg.onEvent?.("activated", handleActivated);

      cleanup = () => {
        tg.offEvent?.("activated", handleActivated);
        tg.offEvent?.("safeAreaChanged", applyInsets);
        tg.offEvent?.("contentSafeAreaChanged", applyInsets);
      };
    };

    // Скрипт telegram-web-app.js грузится afterInteractive и может быть ещё
    // не готов на момент монтирования — ждём появления WebApp (до ~3 сек).
    const existing = window.Telegram?.WebApp;
    if (existing) {
      init(existing);
    } else {
      let tries = 0;
      const timer = setInterval(() => {
        const tg = window.Telegram?.WebApp;
        if (tg) {
          clearInterval(timer);
          init(tg);
        } else if (++tries > 30) {
          clearInterval(timer); // не Telegram — тихо выходим
        }
      }, 100);
      cleanup = () => clearInterval(timer);
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return null;
}
