'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useBasket } from './context/BasketContext';
import Hero from './components/Hero';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import PaymentHandler from './components/PaymentHandler';
import SuccessModal from './components/SuccessModal';
import FailModal from './components/FailModal';


export default function HomepageClient() {
  const router = useRouter();
  const { clearBasket } = useBasket();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get('pid');

    if (!pid) return;

    let cancelled = false;

    // Опрашиваем статус несколько раз: вебхук pal24 может проставить "success"
    // чуть позже, чем браузер вернулся с оплаты. Без ретраев один промах
    // показал бы "Ошибка оплаты" при реально успешном платеже.
    const checkStatus = async () => {
      const tries = 5;
      const delay = 1500;

      for (let i = 0; i < tries; i++) {
        try {
          const res = await fetch(`https://psgamezz.ru/api/payment/status/?pid=${pid}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
          });
          if (res.ok) {
            const data = await res.json();
            if (data.status === "success") {
              if (!cancelled) {
                setInvoiceId(data.inv_id);
                setShowSuccessModal(true);
                clearBasket();
              }
              return;
            }
          }
        } catch (err) {
          console.error("Payment status fetch error:", err);
        }
        if (i < tries - 1) await new Promise((r) => setTimeout(r, delay));
      }
      // За все попытки success так и не пришёл — показываем ошибку
      if (!cancelled) setShowFailModal(true);
    };

    checkStatus().finally(() => {
      const url = new URL(window.location);
      url.searchParams.delete('pid');
      window.history.replaceState({}, '', url);
    });

    return () => { cancelled = true; };
  }, [clearBasket]);


  useEffect(() => {
    document.body.style.overflow = showSuccessModal || showFailModal ? 'hidden' : 'auto';
  }, [showSuccessModal, showFailModal]);

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowFailModal(false);
    router.replace('/');
  };

  return (
    <div className="relative">
      <Hero />
      <div className="px-4">
        <Section2 />
        <Section3 />
      </div>

      <PaymentHandler
        onSuccess={() => {
          setShowSuccessModal(true);
          clearBasket();
        }}
        onFail={() => setShowFailModal(true)}
      />

      {showSuccessModal && <SuccessModal invoiceId={invoiceId} onClose={handleCloseModal} />}
      {showFailModal && <FailModal onClose={handleCloseModal} />}
    </div>
  );
}
