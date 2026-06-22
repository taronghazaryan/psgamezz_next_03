'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SuccessModal({ invoiceId, onClose }) {
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
      <div className="relative premium-card bg-[#030712]/80 text-white w-full max-w-lg rounded-3xl border border-white/10 shadow-xl px-8 py-8 flex flex-col gap-6">
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
          Чтобы получить вашу игру(ы) или подписку, а также инструкции по активации, пожалуйста, свяжитесь с нашим менеджером в Telegram или ВКонтакте и отправьте ваш код заказа:
        </p>

        {/* Код заказа с фоном и большим шрифтом */}
        <div className="mx-auto my-2 px-6 py-3 bg-yellow-500/20 rounded-lg text-center font-bold text-xl md:text-2xl text-yellow-400 select-all">
          {invoiceId}
        </div>

        <p className="text-white/50 italic text-center text-sm">
            Если случайно закроете это окно, не волнуйтесь — ваш код заказа был также отправлен на электронную почту.
        </p>

        <div className="flex justify-center gap-3">
          <a
            href="https://t.me/ivanitwo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#229ED9] hover:bg-[#1a8bbf] text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Image className="h-6 w-6" src="/images/telegram.png" width={24} height={24} alt="telegram" />
            Telegram
          </a>
          <a
            href="https://vk.ru/psgamezz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#0077FF] hover:bg-[#0066dd] text-white px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Image className="h-6 w-6" src="/images/vk.png" width={24} height={24} alt="vk" />
            ВКонтакте
          </a>
        </div>
      </div>
    </div>
  );
}
