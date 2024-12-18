import type { Metadata } from "next";
import { Roboto_Serif, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Are You The Match?",
  description: "Serious fun ahead: Complete this form to show you're aligned with what I want."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${robotoSerif.variable} ${robotoMono.variable} antialiased bg-slate-800`}
      >
        {children}
      </body>
    </html>
  );
}
