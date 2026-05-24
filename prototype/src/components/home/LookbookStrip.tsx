"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

const lookbook = [
  {
    src: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/20260515-180939.jpg",
    caption: "Dune / Lightning",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/13_8cee2481-7d79-41b6-8e2e-014fdd62198d.jpg",
    caption: "Ground / II — 04",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/img_v3_02q5_80796cf2-f48a-4769-9438-c1cdcafbf8eg.jpg",
    caption: "ATM / II — 02",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/10_bc166ddc-d22d-4a0c-88e6-f67b6051dcd4.jpg",
    caption: "Festival / I — return",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0785/8618/3955/files/1_80f63832-0c35-4725-b9d1-64695aedf901.jpg",
    caption: "Studio / Sherpa",
  },
];

export default function LookbookStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-12%"]);

  return (
    <section ref={ref} className="bg-paper text-ink py-chapter overflow-hidden">
      <div className="px-gutter mb-12 md:mb-16 grid md:grid-cols-12 items-end gap-10">
        <Reveal className="md:col-span-7">
          <div className="font-tag text-tag-xs text-ink/55 mb-4">— Dispatch / Lookbook</div>
          <h2 className="font-display text-display-md tracking-[-0.03em] leading-[0.98] max-w-[20ch]">
            Photographed the day the dust began to settle.
          </h2>
        </Reveal>
        <Reveal delay={1} className="md:col-span-4 md:col-start-9">
          <p className="font-body text-ink/65 text-[15px] leading-relaxed max-w-[44ch]">
            Five frames from Chapter II. Shot on sand-set, single-source light, no retouch on the weather.
          </p>
        </Reveal>
      </div>

      <motion.div style={{ x }} className="flex gap-6 px-gutter pr-[20vw]">
        {lookbook.map((item, i) => (
          <motion.div
            key={item.src + i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
            className={[
              "shrink-0 grain relative bg-storm/5",
              i % 2 === 0 ? "w-[62vw] md:w-[36vw] aspect-[3/4]" : "w-[80vw] md:w-[44vw] aspect-[4/3]",
            ].join(" ")}
          >
            <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
            <div className="absolute bottom-3 left-3 font-tag text-tag-xs text-paper">{item.caption}</div>
            <div className="absolute top-3 right-3 font-tag text-tag-xs text-paper">SS26 / {String(i + 1).padStart(2, "0")}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16 border-y border-ink/12 py-5 -mx-0">
        <Marquee duration={42}>
          <span className="font-display text-[44px] md:text-[64px] tracking-[-0.02em] leading-none">
            After the storm — Chapter II Lightning — Edition of 200 — Dispatching now —
          </span>
          <span className="font-display text-[44px] md:text-[64px] italic text-dune tracking-[-0.02em] leading-none">
            Kiikio
          </span>
        </Marquee>
      </div>
    </section>
  );
}
