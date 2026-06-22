"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

const reviews = [
  {
    id: 1,
    name: "Александр",
    role: "",
    review: "Покупка прошла отлично , всё подробно объяснили . Возникли не большие проблемы , решили всё быстро (не смотря на поздний вечер). Буду обращаться ещё . К покупке рекомендую .",
    avatar: "https://70.img.avito.st/image/1/1.0-vjGLayaQIx3-HAiXRaAFezdWQxu30.yowvpI3sBXAgFA8JfmbNYJrRPO8ySuW9qQWWB1Jq_GI",
    rating: 5,
  },
  {
    id: 2,
    name: "Сергей",
    role: "",
    review: "Отличный продавец, помог на всех этапах. Рекомендую",
    avatar: "https://00.img.avito.st/image/1/1.3cO4draxZypqsfPIkgfPKg7XeyBqsXMo.skvan_VZTpcM73SM0M7pamVkrDCfgDzIIE82Jelztns?cqp=2.pGdjs5fBvl5-fB-fm84xxYDAkt8GM2Wgr1fOyxua9Q",
    rating: 4,
  },
  {
    id: 3,
    name: "Михаил",
    role: "",
    review: "Не первый раз обращаюсь, всегда все оперативно и без проблем! С очень хорошей инструкцией",
    avatar: "https://30.img.avito.st/image/1/1.W_PAibay4RoSTnmqoumjGHQi_XwSKvU.BfxwqDzu2NmSfSDtymuvf8p4pMTsqzGLDr-7l8pcJCE?cqp=2.pGdjs5fBvl5-fB-fm84xxYDAkt8GM2Wgr1fOyxua9Q",
    rating: 5,
  },
  {
    id: 4,
    name: "Илья Тимофеев",
    role: "",
    review: "Все супер. Быстро ответили , все объяснили ,помогли в активации.",
    avatar: "https://30.img.avito.st/image/1/1.ZPNpELay3hq71ziyJzDrGN27wny7s8o.oifD5MnQVPNPYj6Ild47sX_LV9HpCbAoc4ULWC_cJm4?cqp=2.pGdjs5fBvl5-fB-fm84xxYDAkt8GM2Wgr1fOyxua9Q",
    rating: 5,
  },
  {
    id: 5,
    name: "Валентина",
    role: "",
    review: "Ну я конечно в полном восторге от продавца😍 Я ничего не понимаю в играх) покупала дополнение дочке на др) но мне всё грамотно объяснили) рассказали что,где и как) от души советую🫶🏽 Если необходима помощь Вам её предложат заранее сами)",
    avatar: "https://70.img.avito.st/image/1/1.GL7t37axolc_GDz2mOxnVFt-vl0_GLZV.lDf3WaO8tQP85rGVOwgpgW2wN87N33T6-InrWWE3w-Y",
    rating: 4,
  },
];

const Section3 = () => {
  const bonusCards = [
    {
      title: "Получай кешбек за покупки",
      texts: ["2% бонусов до 4000 рублей", "5% бонусов до 10000 рублей", "7% бонусов до 50000 рублей"],
      icon: "💰"
    },
    {
      title: "Прошёл игру?",
      texts: ["Верни аккаунт и получи 25% её стоимости на бонусный счёт"],
      icon: "🔄"
    },
    {
      title: "100 бонусов за регистрацию",
      button: "Зарегистрироваться",
      icon: "🎁"
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 bg-[#070c1b]" id="reviews">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        
        <div className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <button className="swiper-button-prev-custom hidden md:flex w-14 h-14 rounded-xl premium-card border border-white/10 text-white hover:text-[#0047ff] flex items-center justify-center transition-all duration-200 hover:scale-110">
              <FaArrowLeft size={20} />
            </button>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white text-center flex-1">
              Отзывы наших клиентов
            </h2>
            <button className="swiper-button-next-custom hidden md:flex w-14 h-14 rounded-xl premium-card border border-white/10 text-white hover:text-[#0047ff] flex items-center justify-center transition-all duration-200 hover:scale-110">
              <FaArrowRight size={20} />
            </button>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            spaceBetween={24}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 16 },
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <div className="premium-card rounded-3xl p-6 md:p-8 h-full flex flex-col premium-card-hover border border-white/10 min-h-[280px]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="rounded-full border-2 border-[#0047ff]/50"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-white mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-white/60">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-white/90 italic mb-4 flex-grow text-base leading-relaxed">
                    "{item.review}"
                  </p>
                  <div className="flex items-center gap-1">
                    {Array(item.rating)
                      .fill(0)
                      .map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-[#fcc000]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="mt-20 md:mt-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display text-white text-center mb-12 md:mb-16 max-w-4xl mx-auto">
            Оплачивай game-бонусами покупку игр или пополнение кошелька
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {bonusCards.map((card, i) => (
              <div 
                key={i} 
                className="premium-card rounded-3xl p-8 md:p-10 flex flex-col items-center text-center premium-card-hover border border-white/10"
              >
                <div className="text-6xl md:text-7xl mb-6">{card.icon}</div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                  {card.title}
                </h3>
                {card.texts?.map((text, idx) => (
                  <p key={idx} className="text-white/80 text-lg mb-2 font-medium">
                    {text}
                  </p>
                ))}
                {card.button && (
                  <a 
                    href="https://t.me/psgamezz"
                    className="mt-6 premium-button px-8 py-4 rounded-2xl text-lg md:text-xl font-bold w-full"
                  >
                    {card.button}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
