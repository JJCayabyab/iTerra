import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import { auth } from "@/auth";
import { Toaster } from "react-hot-toast";
import Footer from "./component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "iTerra",
  description: "A travel planner app to organize your trips and locations.",
  icons: {
    icon: '/iterra-icon.svg'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mb-0`}
      >

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
          }}
        />

        <Navbar session={session} />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
