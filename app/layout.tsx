import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://evakuator-donetsk.local"),
  title: "Эвакуатор в Донецке за 15 минут | Эвакуация авто ДНР 24/7",
  description:
    "Вызвать эвакуатор в Донецке и по ДНР. Подача от 15 минут, аккуратная погрузка, расчет стоимости онлайн, работа 24/7.",
  keywords: [
    "эвакуатор Донецк",
    "вызвать эвакуатор",
    "эвакуация авто ДНР",
    "эвакуатор ДНР",
    "эвакуатор 24/7"
  ],
  openGraph: {
    title: "Эвакуатор в Донецке за 15 минут",
    description: "Быстрая подача, аккуратная погрузка и прозрачная стоимость.",
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
