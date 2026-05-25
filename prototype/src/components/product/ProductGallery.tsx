"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { easing } from "@/lib/motion";

type Props = {
  images: string[];
  alt: string;
};

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-5">
      {/* Thumbnail rail */}
      <div className="order-2 md:order-1 flex md:flex-col gap-2 md:gap-2.5 md:w-20 overflow-x-auto md:overflow-y-auto hide-scrollbar">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            data-cursor={`${i + 1}`}
            className={[
              "shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden bg-storm relative transition-opacity",
              i === active ? "opacity-100 ring-1 ring-paper" : "opacity-55 hover:opacity-100",
            ].join(" ")}
            aria-label={`View image ${i + 1}`}
          >
            <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="order-1 md:order-2 flex-1 relative aspect-[3/4] md:aspect-[4/5] bg-storm overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={current}
            alt={alt}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: easing.storm }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Counter */}
        <div className="absolute top-4 right-4 font-tag text-tag-xs text-paper bg-ink/40 backdrop-blur-sm px-2.5 py-1">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>

        {/* Prev / Next invisible click zones */}
        <button
          onClick={() => setActive((a) => (a - 1 + images.length) % images.length)}
          aria-label="Previous image"
          data-cursor="Prev"
          className="absolute left-0 top-0 bottom-0 w-1/3 hidden md:block"
        />
        <button
          onClick={() => setActive((a) => (a + 1) % images.length)}
          aria-label="Next image"
          data-cursor="Next"
          className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:block"
        />
      </div>
    </div>
  );
}
