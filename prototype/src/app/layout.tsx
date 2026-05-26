import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Sacramento } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CartProvider from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import CustomCursor from "@/components/ui/CustomCursor";
import BrandRail from "@/components/ui/BrandRail";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const tag = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-tag",
  display: "swap",
  weight: ["400", "500", "600"],
});

// Hand-drawn script for editorial accents (cf. Hidden Room "Vivimos").
const script = Sacramento({
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kiikio — After the Storm",
  description:
    "Mid-premium dark streetwear. Each piece is an artifact returned from the storm. Chapter II — Lightning — dispatching now.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${tag.variable} ${script.variable}`}
    >
      <body className="bg-ink text-paper font-body antialiased world-grain overflow-x-hidden">
        <CartProvider>
          <SmoothScroll />
          <BrandRail />
          <Header />
          <main className="min-h-screen md:pl-nav">{children}</main>
          <Footer />
          <CartDrawer />
          <CustomCursor />
        </CartProvider>
      </body>
    </html>
  );
}
