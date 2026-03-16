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

    console.log("Fetching payment status for pid:", pid);

    fetch(`https://psgamezz.ru/api/payment/status/?pid=${pid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Payment status data:", data);

        if (data.status === "success") {
          setInvoiceId(data.inv_id);
          setShowSuccessModal(true);
          clearBasket();
        } else {
          setShowFailModal(true);
        }
      })
      .catch((err) => {
        console.error("Payment status fetch error:", err);
        setShowFailModal(true);
      })
      .finally(() => {
        const url = new URL(window.location);
        url.searchParams.delete('pid');
        window.history.replaceState({}, '', url);
      });
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
