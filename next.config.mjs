/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Оптимизатор Next отключён: он фетчил исходники картинок через nginx
    // (browser→nginx→оптимизатор→nginx→/media), петля забивала воркеры nginx
    // и вешала 443. Теперь картинки отдаются напрямую с /media, без петли.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // разрешает любые хосты по https
      },
      {
        protocol: "http",
        hostname: "psgamezz.ru", // картинки игр отдаются по http (301 → https)
      },
      {
        protocol: "http",
        hostname: "i.pravatar.cc",
      },
    ],
  },
};

export default nextConfig;
