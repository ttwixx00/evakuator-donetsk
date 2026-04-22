import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ttwixx00.github.io"),
  title: "Эвакуатор в Донецке за 15 минут | Вызвать эвакуатор в ДНР 24/7",
  description:
    "Вызвать эвакуатор в Донецке и по ДНР. Подача от 15 минут, онлайн расчет примерной стоимости, аккуратная погрузка, прозрачная цена до выезда, работа 24/7.",
  keywords: [
    "эвакуатор Донецк",
    "вызвать эвакуатор",
    "эвакуация авто ДНР",
    "эвакуатор ДНР",
    "эвакуатор 24/7",
    "стоимость эвакуатора Донецк",
    "эвакуатор после ДТП",
    "эвакуатор Макеевка"
  ],
  alternates: {
    canonical: "/evakuator-donetsk/"
  },
  openGraph: {
    title: "Эвакуатор в Донецке за 15 минут | Эвакуация авто ДНР",
    description:
      "Быстрая подача, онлайн расчет примерной стоимости, аккуратная погрузка и прозрачная цена до выезда.",
    url: "https://ttwixx00.github.io/evakuator-donetsk/",
    locale: "ru_RU",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090909"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
