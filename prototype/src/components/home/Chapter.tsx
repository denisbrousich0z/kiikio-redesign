"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { chapters } from "@/lib/chapters";

export default function Chapter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section ref={ref} className="bg-ink text-paper relative py-chapter">
      <div className="px-gutter">
        <div className="grid md:grid-cols-12 gap-10 items-end mb-14 md:mb-20">
          <Reveal className="md:col-span-6">
            <div className="font-tag text-tag-xs text-paper/50 mb-4">— The chapters</div>
            <h2 className="font-display text-display-lg tracking-[-0.03em] leading-[0.95]">
              Three storms.
              <br />
              <em className="not-italic text-paper/45">Three chapters.</em>
            </h2>
          </Reveal>
          <Reveal delay={1} className="md:col-span-5 md:col-start-8">
            <p className="font-body text-paper/60 text-[15px] leading-relaxed max-w-[44ch]">
              Each Kiikio chapter is a dispatch from a single moment in a longer weather cycle.
              Read in order, or read sideways. The pieces survive both ways.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {chapters.map((c, i) => (
            <Reveal key={c.slug} delay={i} className="group">
              <Link href={`/collections/${c.slug}`} data-cursor={c.title} className="block">
                {/* Photo — clean, only chapter # and status corner badges (no large title on image) */}
                <motion.div
                  style={{ y: i % 2 === 0 ? y1 : y2 }}
                  className="relative aspect-[3/4] overflow-hidden bg-storm mb-6 card-storm"
                >
                  <motion.img
                    src={c.hero}
                    alt={`Chapter ${c.number} — ${c.title}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.05]"
                    initial={{ scale: 1.08, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
                    viewport={{ once: true }}
                  />
                  {/* Tiny corner meta only — no big titles on photos */}
                  <div className="absolute top-4 left-4 font-tag text-tag-xs text-paper/85">
                    Chapter {c.number}
                  </div>
                  <div className="absolute top-4 right-4 font-tag text-tag-xs text-paper/85">
                    {c.status === "live" && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-bolt animate-pulse" />
                        Live
                      </span>
                    )}
                    {c.status === "archive" && "Archive"}
                    {c.status === "incoming" && "Incoming"}
                  </div>
                </motion.div>

                {/* Title and meta live BELOW the image on clean ground */}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[22px] md:text-[28px] tracking-[-0.025em] leading-[1.05] text-paper group-hover:text-dune transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    {c.title}
                  </h3>
                  <span className="font-tag text-tag-xs text-paper/55 whitespace-nowrap">
                    {c.subtitle}
                  </span>
                </div>
                <p className="font-body text-paper/60 text-[14px] mt-3 max-w-[40ch] leading-relaxed">
                  {c.description}
                </p>
                <div className="mt-5 font-tag text-tag-xs text-paper/50 inline-flex items-center gap-2">
                  <span className="w-6 h-px bg-paper/45 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-12 group-hover:bg-paper" />
                  Enter chapter
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
