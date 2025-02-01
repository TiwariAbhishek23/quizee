import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import GotoTop from "@/components/common/gototop";
import { AuthProvider } from "@/firebase";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quizee",
  description: "Fixit AI Task Submitted By Abhishek Tiwari",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Header />
        {children}
        <GotoTop />
        {/* <Footer /> */}
        </AuthProvider>
      </body>
    </html>
  );
}
