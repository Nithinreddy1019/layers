import type { Metadata } from "next";
import localFont from "next/font/local";
import { Lexend } from "next/font/google";
import "@repo/ui/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "../components/query-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500"]
})



export const metadata: Metadata = {
  title: "Layers",
  description: "Automate your work",
  icons: {
    icon: [
      {
        url: "./assets/logo.svg",
        href: "/assets/logo.svg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${lexend.className}`}>
        <SessionProvider>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
