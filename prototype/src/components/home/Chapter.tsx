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

        <div className="grid md:grid-cols-3 gap-6">
          {chapters.map((c, i) => (
            <Reveal key={c.slug} delay={i} className="group">
              <Link href={`/collections/${c.slug}`} data-cursor={c.title} className="block">
                <motion.div
                  style={{ y: i % 2 === 0 ? y1 : y2 }}
                  className="relative aspect-[3/4] overflow-hidden bg-storm mb-4 card-storm"
                >
                  <motion.img
                    src={c.hero}
                    alt={`Chapter ${c.number} — ${c.title}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
                    viewport={{ once: true }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/15 to-transparent" />
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
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="font-display text-[40px] md:text-[52px] tracking-[-0.03em] text-paper leading-[0.92]">
                      {c.title}
                    </div>
                  </div>
                </motion.div>
                <div className="font-tag text-tag-xs text-paper/50">{c.subtitle}</div>
                <p className="font-body text-paper/60 text-[14px] mt-2 max-w-[36ch] leading-relaxed">
                  {c.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
