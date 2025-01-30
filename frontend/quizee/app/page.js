"use client";
import Footer from "@/components/footer";
import GotoTop from "@/components/gototop";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head >
        <title>Quizee</title>
        <meta name="description" content="Quiz website for all your quiz needs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="quiz, quizee, quiz website, Abhishek Tiwari, Abhishek NSUT, Abhishek" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <Hero />
        <GotoTop />
        <Footer />
      </main>
    </div>
  );
}
