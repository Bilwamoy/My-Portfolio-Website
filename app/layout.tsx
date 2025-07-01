import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./styles/global.css";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name - Developer Portfolio",
  description: "Developer that puts your Ideas everywhere. AI-powered portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
