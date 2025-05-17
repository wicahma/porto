import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/organisms/Providers";
import { ViewTransitions } from "next-view-transitions";

const openSans = Open_Sans({
    variable: "--font-open-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Portofolio Teguh Dwi Cahya Kusuma",
    description:
        "Kenali lebih dalam diri saya, riwayat pekerjaan, dan juga lainnya disini.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="en">
                <body className={`${openSans.variable} antialiased`}>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ViewTransitions>
    );
}
