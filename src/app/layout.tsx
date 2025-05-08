import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import ClientBootstrapLoader from "@/components/ClientBootstrapLoader";
import "../styles/bootstrap.min.css";
import "../styles/bootstrap-icons.css";
import "../styles/modern-dark.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "santyago of the dreams",
  description: "The official website for santyago of the dreams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <ClientBootstrapLoader />
      </body>
    </html>
  );
}
