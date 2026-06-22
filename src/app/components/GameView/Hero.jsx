"use client";

import { useState } from "react";
import Image from "next/image";
import GameImage from "../GameImage";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useBasket } from "../../context/BasketContext";

export default function Hero({ productItem }) {
  const { basket, addToBasket } = useBasket();
  const [psType, setPsType] = useState("PS5");
  const [activation, setActivation] = useState("с активацией");
  const [openIndex, setOpenIndex] = useState(null);
  const [openTab, setOpenTab] = useState(null);
  const [displayedMainImage, setDisplayedMainImage] = useState(null);

  const questions = [
    {
      question: 'Что такое "с активацией"?',
      answer: `Вы получаете логин и пароль от игрового аккаунта.
Далее добавляете его на консоль, включаете активацию аккаунта (общий доступ) в настройках по инструкции.
После ставите игру на установку, и она появляется на вашем аккаунте любого региона.`,
    },
    {
      question: 'Что такое "без активации"?',
      answer: `Вы получаете логин и пароль от игрового аккаунта.
Далее добавляете его на консоль, не активируете(общий доступ), и ставите игру на установку по инструкции.
После завершения установки играете на игровом аккаунте.`,
    },
    {
      question: "После оплаты. Как получить заказ?",
      answer: `После оплаты игры вы получите код заказа, который дублируется на вашу почту.
Код необходимо отправить в нашу поддержку для получения игрового аккаунта.`,
    },
    {
      question: "Что делать если РФ аккаунт?",
      answer: "Аккаунт любого региона подойдет.",
    },
  ];

  const languageMap = {
    ru: "🇷🇺 Русский",
    en: "🇬🇧 Английский",
    es: "🇪🇸 Испанский",
    fr: "🇫🇷 Французский",
    de: "🇩🇪 Немецкий",
    it: "🇮🇹 Итальянский",
    ja: "🇯🇵 Японский",
    zh: "🇨🇳 Китайский",
    ar: "🇸🇦 Арабский",
    tr: "🇹🇷 Турецкий",
    не: "❌ Нет"
  };


  const translateLang = (value) => {
    if (!value) return "";

    if (Array.isArray(value)) {
      return value
        .map((code) => languageMap[code] || code)
        .join(", ");
    }
    
    return languageMap[value] || value;
  };

  const getPriceData = () => {
    if (!productItem?.prices) return null;
    const key = activation === "с активацией" ? "with_activation" : "without_activation";
    const list = productItem.prices[key] || [];
    const match = list.find((el) => el[psType] !== undefined);
    if (!match) return null;

    return {
      price: match[psType],
      saleAmount: match.sale_amount || 0,
      price_id: match.id || null,
    };
  };

  const priceData = getPriceData();
  const selectedPrice = priceData?.price ?? null;
  const saleAmount = priceData?.saleAmount ?? 0;
  const finalPrice =
    saleAmount > 0
      ? Math.round(selectedPrice * (1 - saleAmount / 100))
      : selectedPrice;

  const alreadyInBasket = basket.some(
    (item) =>
      item.id === productItem.id &&
      item.psType === psType &&
      item.activation === activation
  );

  const mainImageUrl = productItem.main_image_url?.startsWith("http")
    ? productItem.main_image_url
    : productItem.main_image_url
    ? "http://psgamezz.ru" + productItem.main_image_url
    : "/images/default.jpg";

  const currentMainImage = displayedMainImage || mainImageUrl;

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#030712]">
        {/* Background image */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center opacity-15 pointer-events-none"
          style={{
            backgroundImage: `url(${productItem.images?.[0] || "/images/default.jpg"})`,
          }}
        />
        <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none bg-[#030712]"></div>

        <div className="relative flex flex-col lg:flex-row justify-center items-start px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto gap-8 lg:gap-10 text-white">
          
          {/* Left side - Images - Fixed width */}
          <div className="w-full max-w-[300px] flex-shrink-0 flex flex-col items-center mx-auto lg:mx-0">
            <div className="relative w-full">
              <GameImage
                src={currentMainImage}
                alt={productItem.title}
                width={300}
                height={320}
                className="rounded-3xl w-full h-[300px] md:w-[300px] md:h-[320px] object-cover shadow-2xl border border-white/10"
              />
            </div>
            {productItem.images?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {productItem.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative cursor-pointer"
                    onClick={() => setDisplayedMainImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`screenshot ${i + 1}`}
                      width={80}
                      height={80}
                      className={`rounded-lg object-cover border transition-all duration-300 ${
                        currentMainImage === img
                          ? "border-[#0047ff] opacity-100"
                          : "border-white/10 opacity-60 hover:opacity-90 hover:border-white/30"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Content - Fixed layout */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Main card - Fixed height */}
            <div className="flex flex-col md:flex-row bg-[#0b1c4a] rounded-3xl px-5 md:px-8 py-6 shadow-xl border border-white/10">
              {/* Left part - Fixed width */}
              <div className="flex-1 min-w-0 mb-4 md:mb-0 md:mr-6">
                <h1 className="text-2xl md:text-3xl font-black mb-4 text-white line-clamp-2">{productItem.title}</h1>

                {/* Console selection - Fixed */}
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-white/80 text-sm">Консоль</p>
                  <div className="flex flex-wrap gap-2">
                    {productItem.consoles.map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setPsType(btn)}
                        className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                          psType === btn 
                            ? "bg-[#0047ff] text-white shadow-lg" 
                            : "bg-white/10 border border-white/20 text-white hover:bg-[#0047ff]/20"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activation selection - Fixed */}
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-white/80 text-sm">Варианты покупки</p>
                  <div className="flex flex-wrap gap-2">
                    {["без активации", "с активацией"].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setActivation(btn)}
                        className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                          activation === btn 
                            ? "bg-[#0047ff] text-white shadow-lg" 
                            : "bg-white/10 border border-white/20 text-white hover:bg-[#0047ff]/20"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right part - Fixed width for price and button */}
              <div className="flex flex-col justify-end items-start md:items-end shrink-0 w-full md:w-auto">
                {selectedPrice !== null && (
                  <div className="flex items-center gap-3 mb-6 w-full md:w-auto justify-start md:justify-end">
                    {saleAmount > 0 ? (
                      <>
                        <span className="text-2xl md:text-3xl font-black text-[#0047ff]">{finalPrice}₽</span>
                        <span className="line-through text-white/40 text-lg">{selectedPrice}₽</span>
                        <div className="bg-red-600 text-white font-bold px-1.5 py-1 rounded-lg text-xs ">
                          <p>-{saleAmount}%</p>
                        </div>
                      </>
                    ) : (
                      <span className="text-2xl md:text-3xl font-black text-white">{selectedPrice}₽</span>
                    )}
                  </div>
                )}

                <button
                  className={`w-full md:w-[200px] lg:w-[240px] h-[44px] rounded-lg text-sm md:text-[15px] font-black transition-all duration-200 ${
                    alreadyInBasket 
                      ? "bg-white/20 cursor-not-allowed text-white/50" 
                      : "bg-[#0047ff] hover:bg-[#0033b7] text-white hover:scale-105 shadow-lg"
                  }`}
                  onClick={() => {
                    if (!alreadyInBasket && priceData?.price_id) {
                      addToBasket({
                        id: productItem.id,
                        title: productItem.title,
                        psType,
                        activation,
                        prices: productItem.prices,
                        price: finalPrice,
                        saleAmount,
                        quantity: 1,
                        product_type: "game",
                        price_id: priceData.price_id,
                        main_image_url: productItem.main_image_url,
                      });
                    }
                  }}
                  disabled={alreadyInBasket || selectedPrice === null}
                >
                  {alreadyInBasket ? "Уже в корзине" : "В корзину"}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: "about", label: "Об игре" },
                  { key: "details", label: "Детали" },
                  { key: "faq", label: "Частые вопросы" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`bg-[#0b1c4a] py-2 px-3 md:py-[7px] md:px-[12px] rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-105 border ${
                      openTab === tab.key 
                        ? "border-[#0047ff]/50 shadow-lg bg-[#0047ff]/20" 
                        : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
                  >
                    <span className="text-white font-semibold text-sm">{tab.label}</span>
                    {openTab === tab.key ? <ChevronUp className="w-4 h-4 text-[#0047ff]" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-col gap-3">
                <div className={`transition-all duration-700 overflow-hidden ${openTab === "about" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-[#0b1c4a] rounded-xl p-4 border border-white/10">
                    <p className="text-white/90">{productItem.about}</p>
                  </div>
                </div>
              <div className={`transition-all duration-700 overflow-hidden ${openTab === "details" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="bg-[#0b1c4a] rounded-xl p-4 border border-white/10">

                  {/* Субтитры */}
                  {productItem.subtitle && (
                    <div className="mb-4 text-white/90">
                      <p className="font-semibold mb-1">Субтитры:</p>
                      {productItem.subtitle.PS4 && <p>PS4: {translateLang(productItem.subtitle.PS4)}</p>}
                      {productItem.subtitle.PS5 && <p>PS5: {translateLang(productItem.subtitle.PS5)}</p>}
                    </div>
                  )}

                  {/* Озвучка */}
                  {productItem.voice_acting && (
                    <div className="mb-4 text-white/90">
                      <p className="font-semibold mb-1">Озвучка:</p>
                      {productItem.voice_acting.PS4 && <p>PS4: {translateLang(productItem.voice_acting.PS4)}</p>}
                      {productItem.voice_acting.PS5 && <p>PS5: {translateLang(productItem.voice_acting.PS5)}</p>}
                    </div>
                  )}
                </div>
              </div>



                <div className={`transition-all duration-700 overflow-hidden ${openTab === "faq" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-[#0b1c4a] rounded-xl p-4 flex flex-col gap-2 border border-white/10">
                    {questions.map((item, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between cursor-pointer bg-[#0e2148] p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all" onClick={() => setOpenIndex(isOpen ? null : index)}>
                            <p className="font-semibold text-white text-sm flex-1">{item.question}</p>
                            {isOpen ? <ChevronUp className="w-4 h-4 text-[#0047ff]" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
                          </div>
                          <div className={`transition-all duration-700 overflow-hidden ${isOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                            <div className="bg-[#0e2148] py-2 px-3 rounded-xl border border-white/10">
                              <p className="text-white/80 text-sm">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
