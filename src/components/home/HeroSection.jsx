"use client";
import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import HeroScene from "./HeroScene";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };

const STATS = [["1,200+", "Verified owners"], ["100%", "Insured rentals"], ["24/7", "Support"]];

export default function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden bg-navy text-white">
      <div className="absolute inset-y-0 right-0 -z-10 w-full max-w-[940px] opacity-50 md:w-[68%] md:opacity-100"><HeroScene className="h-full w-full" /></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy from-30% via-navy/70 via-50% to-transparent max-md:from-navy/60 max-md:via-navy/70 max-md:to-navy/85" />
      <div className="container-x py-24">
        <motion.div className="max-w-xl" variants={container} initial={reduce ? "show" : "hidden"} animate="show">
          <motion.span variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />2,000+ renters trust RigRent
          </motion.span>
          <motion.h1 variants={item} className="font-heading text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">Rent professional equipment. Skip the ownership.</motion.h1>
          <motion.p variants={item} className="mb-8 mt-5 text-lg text-slate-300">Excavators, cinema cameras, tractors and event gear from verified owners. Book in minutes and pay only for the days you need.</motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-3">
            <Button href="/equipment" variant="accent" size="lg">Browse equipment</Button>
            <Button href="/#how-it-works" variant="light" size="lg">How it works</Button>
          </motion.div>
          <motion.dl variants={item} className="mt-11 flex flex-wrap gap-8 text-sm text-slate-300">
            {STATS.map(([v, l]) => (<div key={l}><dt className="font-heading text-2xl font-bold text-white">{v}</dt><dd>{l}</dd></div>))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}
