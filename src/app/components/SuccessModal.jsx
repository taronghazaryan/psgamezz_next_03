'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SuccessModal({ onClose }) {
  const router = useRouter();

  // блокировка скролла
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
          <h2 className="text-2xl md:text-3xl font-black text-center">Благодарим вас за заказ!</h2>
        </div>

        <p className="text-white/70 text-base text-center leading-relaxed">
          Чтобы получить вашу игру(ы) или подписку, а также инструкции по активации, проверьте электронную почту, которую вы указали при оплате. На этот адрес был отправлен код подтверждения. Пожалуйста, сообщите этот код нашему менеджеру в Telegram для проверки.
        </p>

        <div className="flex justify-center">
          <a
            href="https://t.me/ivanitwo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#6366f1] hover:bg-[#5555e0] text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Image className="h-6 w-6" src="/images/telegram.png" width={24} height={24} alt="telegram" />
            Написать менеджеру
          </a>
        </div>
      </div>
    </div>
  );
}
