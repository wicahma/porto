import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/organisms/wrapper/Providers";
import { ViewTransitions } from "next-view-transitions";
import { vals } from "@/constants/val";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portofolio Teguh Dwi Cahya Kusuma",
    template: "%s | Teguh Dwi Cahya Kusuma",
  },
  description:
    "Kenali lebih dalam diri saya, riwayat pekerjaan, dan juga lainnya disini.",
  keywords: [
    "portofolio",
    "web developer",
    "software engineer",
    "teguh dwi cahya kusuma",
    "fullstack developer",
    "next.js",
    "react",
    "typescript",
  ],
  authors: [{ name: "Teguh Dwi Cahya Kusuma" }],
  creator: "Teguh Dwi Cahya Kusuma",
  publisher: "Teguh Dwi Cahya Kusuma",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Portofolio Teguh Dwi Cahya Kusuma",
    description:
      "Kenali lebih dalam diri saya, riwayat pekerjaan, dan juga lainnya disini.",
    siteName: "Teguh Dwi Cahya Kusuma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portofolio Teguh Dwi Cahya Kusuma",
    description:
      "Kenali lebih dalam diri saya, riwayat pekerjaan, dan juga lainnya disini.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const resolvedVal: Partial<Awaited<ReturnType<typeof vals>>> = await vals();

  // resolvedVal is now from the Go API; no Supabase cleanup needed
  delete resolvedVal.email;

  return (
    <ViewTransitions>
      <html lang="en" className="dark">
        <body className={`${openSans.variable} antialiased`}>
          <Providers resolvedVal={resolvedVal}>{children}</Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
