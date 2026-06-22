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
        className="flex flex-col  overflow-hidden  transition-shadow h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full aspect-square overflow-hidden rounded-2xl">
          <GameImage
            src={product.main_image_url}
            alt={product.title}
            fill
            className={`object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* SALE */}
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-600 flex items-center gap-1 px-2 py-1 rounded-lg text-white text-xs shadow-md">
              <Image src="/icons/fire.svg" alt="fire" width={14} height={14} />
              SALE
            </div>
          )}

          {/* Русская озвучка */}
          {hasRussianVoice && (
            <div className="absolute top-2 left-2 bg-white flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-primary shadow-md">
              <Image src="/img/russia.png" alt="russian" width={16} height={16} />
              Рус. озв
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1 mt-2">
          <h3 className="text-white font-bold text-sm">
            {truncateText(normalizedTitle, 20)}
          </h3>

          <div className="flex items-center gap-1.5">
            <Image src="/star.svg" alt="star" width={13} height={13} />
            <span className="text-white font-bold text-xs">
              5
            </span>
            {product.consoles?.map((console, idx) => (
              <span key={idx} className="text-white font-bold text-xs">
                {console}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-1">
            {activationPriceData ? (
              <>
                <p className="text-white text-base font-bold">
                  {`${activationPriceData.discountedPrice}Р`}
                </p>
                {hasDiscount && (
                  <>
                    <p className="text-gray-500 line-through text-xs">
                      {activationPriceData.basePrice}Р
                    </p>
                    <div className="bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-lg text-xs">
                      -{Math.round(activationPriceData.sale)}%
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-primary text-base font-bold">
                Нет в наличии
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
