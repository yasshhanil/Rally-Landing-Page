import type { Metadata } from "next";
import { Nunito, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const SITE_URL = "https://rallywell.co";
const SITE_DESCRIPTION =
  "A mascot-powered diet companion that helps you recover from off-plan moments instead of just tracking them. Join the wishlist for early access.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Rally — Stay consistent, not perfect",
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Rally",
    title: "Rally — Stay consistent, not perfect",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rally — Stay consistent, not perfect",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF9] text-zinc-900">
        {children}
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rally",
              url: SITE_URL,
              logo: `${SITE_URL}/mascot/Logo.jpg`,
              description: SITE_DESCRIPTION,
            }),
          }}
        />
      </body>
    </html>
  );
}
