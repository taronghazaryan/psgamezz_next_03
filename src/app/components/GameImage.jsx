"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const FALLBACK = "/images/default.jpg";

// Обёртка над next/image: если картинка не загрузилась (например, бэкенд
// вернул несуществующий /media/default-image.jpg), показываем локальную заглушку.
export default function GameImage({ src, alt = "", ...props }) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  // Если src изменился извне — синхронизируем.
  useEffect(() => {
    setImgSrc(src || FALLBACK);
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}
