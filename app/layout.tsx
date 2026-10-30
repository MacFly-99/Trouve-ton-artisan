import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trouve ton artisan - Auvergne-Rhône-Alpes",
  description: "Trouvez facilement un artisan qualifié dans la région Auvergne-Rhône-Alpes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-region-bg text-region-text antialiased flex flex-col min-h-screen`}>
        <Header />
        {/* Le pt-24 sert à compenser la hauteur du Header qui est fixe */}
        <main className="grow pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}