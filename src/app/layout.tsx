import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import Navbar from "@/components/Navbar";
import ClientBootstrapLoader from "@/components/ClientBootstrapLoader";
import "../styles/bootstrap.min.css";
import "../styles/bootstrap-icons.css";
import "../styles/modern-dark.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const unbounded = Unbounded({ subsets: ["latin"], weight: ["300", "400", "700"] });

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
        {/* Removed direct font links, will be handled by next/font */}
      </head>
      <body className={`${inter.className} ${unbounded.className}`}>
        <Navbar />
        {children}
        <ClientBootstrapLoader />
      </body>
    </html>
  );
}
