import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F1EA",
        ink: "#0A0A0A",
        storm: "#131316",
        dune: "#C8B69A",
        bolt: "#FF2A1F",
        smoke: "#8A8A8E",
        line: "#1F1F22",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        tag: ["var(--font-tag)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "kinetic": ["clamp(5rem, 22vw, 22rem)", { lineHeight: "0.82", letterSpacing: "-0.05em" }],
        "display-xl": ["clamp(4rem, 13vw, 13rem)", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(1.5rem, 2.8vw, 2.5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "tag-xs": ["10px", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        "tag-sm": ["11px", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        "tag-md": ["13px", { lineHeight: "1.3", letterSpacing: "0.12em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 3vw, 3rem)",
        chapter: "clamp(6rem, 12vw, 10rem)",
        rail: "56px",
      },
      transitionTimingFunction: {
        storm: "cubic-bezier(0.25, 1, 0.5, 1)",
        weathered: "cubic-bezier(0.6, 0.05, 0.25, 0.95)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        glitch: {
          "0%,100%": { transform: "translate(0,0) skewX(0)" },
          "10%": { transform: "translate(-1px,1px) skewX(-2deg)" },
          "20%": { transform: "translate(1px,-1px) skewX(2deg)" },
          "30%": { transform: "translate(0,0) skewX(0)" },
        },
      },
      animation: {
        floaty: "floaty 4.5s ease-in-out infinite",
        glitch: "glitch 320ms steps(2) 1",
      },
    },
  },
  plugins: [],
};

export default config;
