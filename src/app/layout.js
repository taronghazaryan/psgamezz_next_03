// layout.js
import { Montserrat, Unbounded } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BasketProvider } from "./context/BasketContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import TelegramInit from "./components/TelegramInit";

const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

// Дисплейный шрифт заголовков — как на gameswim
const unbounded = Unbounded({
  weight: ["600", "700", "900"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

// Базовые метаданные для всех страниц (og:type, og:site_name наследуются).
export const metadata = {
  metadataBase: new URL("https://psgamezz.ru"),
  openGraph: {
    type: "website",
    siteName: "PSGamezz",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preload" as="image" href="/img/palmer.png" />
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`overflow-x-hidden ${montserrat.variable} ${unbounded.variable} font-montserrat antialiased min-h-screen flex flex-col bg-[#030712]`}>
        <BasketProvider>
          <TelegramInit />
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <BottomNav />
        </BasketProvider>
      </body>
    </html>
  );
}
