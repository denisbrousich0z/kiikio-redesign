import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F4EE",
        ink: "#0B0B0B",
        storm: "#1C1C1F",
        dune: "#C8B69A",
        bolt: "#C8201E",
        smoke: "#8A8A8E",
        line: "#1F1F22",
      },
      fontFamily: {
        // Loaded via next/font in app/layout.tsx; class names are referenced via CSS variables.
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        tag: ["var(--font-tag)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(4rem, 11vw, 11rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(3rem, 7vw, 6.5rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(1.5rem, 2.8vw, 2.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "tag-xs": ["10px", { lineHeight: "1.2", letterSpacing: "0.12em" }],
        "tag-sm": ["11px", { lineHeight: "1.2", letterSpacing: "0.14em" }],
        "tag-md": ["13px", { lineHeight: "1.3", letterSpacing: "0.1em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 3vw, 3rem)",
        chapter: "clamp(6rem, 12vw, 10rem)",
      },
      transitionTimingFunction: {
        storm: "cubic-bezier(0.25, 1, 0.5, 1)",
        weathered: "cubic-bezier(0.6, 0.05, 0.25, 0.95)",
      },
    },
  },
  plugins: [],
};

export default config;
