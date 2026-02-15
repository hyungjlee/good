"use client";

import Image from "next/image";
import { motion } from "motion/react";
import weddingConfig from "@/config/wedding";
import { formatWeddingDate } from "@/lib/date";

export default function HeroSection() {
  const { groom, bride, date, venue, heroImage } = weddingConfig;

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col">
      {/* Hero Image */}
      <div className="relative w-full flex-1 min-h-0">
        <Image
          src={heroImage}
          alt={`${groom.name} & ${bride.name}`}
          fill
          priority
          className="object-cover"
          sizes="430px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
      </div>

      {/* Text Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute bottom-0 left-0 right-0 p-8 text-center text-white"
      >
        <p className="font-accent text-xs tracking-[0.3em] uppercase mb-3 opacity-80">
          Wedding Invitation
        </p>
        <h1 className="text-2xl font-light tracking-wide mb-2">
          {groom.name}
          <span className="inline-block mx-3 text-primary-light text-lg">&amp;</span>
          {bride.name}
        </h1>
        <p className="text-sm opacity-80 font-light">
          {formatWeddingDate(date)}
        </p>
        <p className="text-sm opacity-70 font-light mt-1">
          {venue.name} {venue.hall}
        </p>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-8 mb-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mx-auto opacity-60">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
