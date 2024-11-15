import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import SEO from "@/components/Providers/seo";
import { cn } from "@/lib/utils";
import { Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SEO />
      <body className={cn(poppins.variable, robotoMono.variable)}>
        <div className="relative flex min-h-screen flex-col transition-colors duration-300 bg-gray-100 dark:bg-transparent font-poppins">
          <Header />
          <main className="flex-1 transition-colors duration-300">
            {children}
          </main>
          <Footer />
        </div>
        <CookieBanner />
      </body>
    </html>
  );
}
