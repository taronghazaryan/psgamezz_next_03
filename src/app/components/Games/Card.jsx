"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import GameImage from "../GameImage";

function truncateText(text, maxLength = 30) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 5) + "..." : text;
}

export default function Card({ activationType, prices, ...product }) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const allPrices = Object.values(prices || {}).flat();

  const activationPriceData = (() => {
    const discountedPrices = allPrices
      .map(entry => {
        const platform = Object.keys(entry).find(key => key === "PS4" || key === "PS5");
        if (!platform) return null;
        const basePrice = entry[platform];
        const saleAmount = entry.sale_amount || 0;
        if (!basePrice) return null;
        if (saleAmount > 0) {
          return {
            basePrice,
            discountedPrice: Math.round(basePrice * (1 - saleAmount / 100)),
            hasDiscount: true,
            sale: saleAmount
          };
        }
        return null;
      })
      .filter(Boolean);

    if (discountedPrices.length > 0) {
      return discountedPrices.reduce((min, p) =>
        p.discountedPrice < min.discountedPrice ? p : min
      );
    }

    const normalPrice = allPrices
      .map(entry => {
        const platform = Object.keys(entry).find(key => key === "PS4" || key === "PS5");
        if (!platform) return null;
        const basePrice = entry[platform];
        if (!basePrice) return null;
        return {
          basePrice,
          discountedPrice: basePrice,
          hasDiscount: false,
        };
      })
      .filter(Boolean);

    return normalPrice[0] || null;
  })();

  const hasDiscount = activationPriceData?.hasDiscount || false;
  const hasRussianVoice = Object.values(product.voice_acting || {}).some(
    arr => Array.isArray(arr) && arr.includes("ru")
  );

  const handleClick = () => {
    if (product.id) localStorage.setItem("lastClickedProductId", product.id);
  };

  const normalizedTitle = product.title?.replace(/’/g, "'");

  return (
    <Link
      href={`/games/${product.slug}`}
      onClick={handleClick}
      className="w-full max-w-[250px] group"
    >
      <div
        className="premium-card premium-card-hover flex flex-col overflow-hidden rounded-2xl p-2.5 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden rounded-xl">
          <GameImage
            src={product.main_image_url}
            alt={product.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {/* затемнение снизу для читаемости бейджей */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/50 via-transparent to-transparent" />

          {/* SALE */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-[#ff0000] flex items-center gap-1 px-2 py-1 rounded-lg text-white text-xs font-bold shadow-lg shadow-red-900/40">
              <Image src="/icons/fire.svg" alt="fire" width={14} height={14} />
              SALE
            </div>
          )}

          {/* Русская озвучка */}
          {hasRussianVoice && (
            <div className="absolute top-2 left-2 bg-white/95 backdrop-blur flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-[#030712] shadow-md">
              <Image src="/img/russia.png" alt="russian" width={16} height={16} />
              Рус. озв
            </div>
          )}

          {/* Консоли — чипы поверх картинки снизу */}
          {product.consoles?.length > 0 && (
            <div className="absolute bottom-2 left-2 flex gap-1">
              {product.consoles.map((console, idx) => (
                <span
                  key={idx}
                  className="bg-[#030712]/70 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-white/15"
                >
                  {console}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 mt-3 px-0.5 flex-grow">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-white font-bold text-sm leading-tight flex-1 group-hover:text-[#0047ff] transition-colors">
              {truncateText(normalizedTitle, 24)}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Image src="/star.svg" alt="star" width={13} height={13} />
              <span className="text-[#fcc000] font-bold text-xs">5</span>
            </div>
          </div>

          <div className="mt-auto pt-1.5 flex items-center gap-2 flex-wrap">
            {activationPriceData ? (
              <>
                <p className="text-white text-lg font-black">
                  от {activationPriceData.discountedPrice}₽
                </p>
                {hasDiscount && (
                  <>
                    <p className="text-white/40 line-through text-xs">
                      {activationPriceData.basePrice}₽
                    </p>
                    <div className="bg-[#ff0000] text-white font-bold px-1.5 py-0.5 rounded-md text-xs">
                      −{Math.round(activationPriceData.sale)}%
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-white/50 text-sm font-bold">Нет в наличии</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
