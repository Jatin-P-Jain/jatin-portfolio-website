import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./sections/navbar";

const inter = Inter({
  variable: "--font-inter ",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jatin Prakash Jain | Full Stack Developer",
  description:
    "Portfolio of Jatin Prakash Jain, a Full Stack Developer specializing in React.js and Node.js.",
  icons: "/favicon/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased max-w-screen-xl mx-auto`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
