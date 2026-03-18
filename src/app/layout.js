// layout.js
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BasketProvider } from "./context/BasketContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import TelegramInit from "./components/TelegramInit";

const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

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
      <body className={`overflow-x-hidden ${montserrat.variable} font-montserrat antialiased min-h-screen flex flex-col bg-[#0d0e14]`}>
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
