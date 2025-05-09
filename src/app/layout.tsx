import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

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
        <html lang="en">
            <body className={`${openSans.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
