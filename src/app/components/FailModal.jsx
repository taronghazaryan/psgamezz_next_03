'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FailModal({ onClose }) {
  const router = useRouter();

  // блокировка скролла при открытой модалке
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative premium-card bg-[#0d0e14]/80 text-white w-full max-w-lg rounded-3xl border border-white/10 shadow-xl px-8 py-8 flex flex-col gap-6">
        <button
          onClick={() => {
            onClose();
            router.replace('/');
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 text-white"
        >
          ×
        </button>

        <div className="flex flex-col items-center gap-2 pt-2">
          <h2 className="text-2xl md:text-3xl font-black text-center">Ошибка оплаты</h2>
        </div>

        <div className="flex flex-col gap-3 text-center text-white/70 text-base leading-relaxed">
          <p>К сожалению, произошла ошибка при обработке платежа. Попробуйте повторить попытку или свяжитесь с нашей поддержкой.</p>
          <p className="text-white/50 text-sm">Поддержка работает ежедневно 09:00–23:00 (мск)</p>
          <p className="text-white/50 text-sm">Свяжитесь с нами: <span className="text-white font-semibold"><a href="https://t.me/ivanitwo"
              target="_blank">Telegram</a> </span></p>
        </div>

        <button
          onClick={() => { onClose(); router.replace('/'); }}
          className="w-full bg-[#6366f1] hover:bg-[#5555e0] text-white py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg"
        >
          На главную
        </button>
      </div>
    </div>
  );
}
