/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
