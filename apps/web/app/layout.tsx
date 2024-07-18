import type { Metadata } from "next";
import "@repo/ui/globals.css"
import { Inter } from "next/font/google";
import { ThemeProvider } from "@repo/ui/theme-provider";
const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Blinde",
  description: "Your all in one automation center",
  icons: {
    icon: [
      {
        url: "/logo.svg",
        href: "/logo.svg"
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}