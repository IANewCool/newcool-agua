import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agua Chile - DGA | NewCooltura Informada",
  description: "Oficinas DGA, derechos de agua, cuencas hidrograficas y calculadora de consumo en Chile",
  keywords: ["DGA Chile", "derechos de agua", "cuencas hidrograficas", "recursos hidricos", "agua potable"],
  openGraph: {
    title: "Agua Chile - NewCooltura Informada",
    description: "Derechos de agua, cuencas y recursos hidricos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
