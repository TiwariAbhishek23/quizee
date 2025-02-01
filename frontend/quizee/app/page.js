"use client";
import HeroWithOutLogin from "@/components/heroWithOutLogin";
import Hero from "@/components/hero";
import { useAuth } from "@/firebase";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      {user ? (
        <Hero />
      ) : (
        <HeroWithOutLogin />
      )}
    </div>
  );
}
