import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

import { auth } from "@/auth";

import { siteConfig } from "@/config";

import { cn } from "@/lib/utils";

import "./globals.css";
import "@uploadthing/react/styles.css";
import { Toaster } from "react-hot-toast";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "800", "900"],
//   variable: "--font-montserrat",
// });

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = siteConfig;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            nunito.variable,
            "antialiased flex flex-col min-h-screen bg-background text-foreground text-base"
          )}
        >
          <NextTopLoader color="#2463eb" showSpinner={false} />
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </body>
      </html>
    </SessionProvider>
  );
}
