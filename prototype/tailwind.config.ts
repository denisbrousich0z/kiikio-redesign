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
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        // Restrained editorial scale — designed for impact at sane sizes,
        // not for visibility from across the room.
        "kinetic": ["clamp(3.5rem, 14vw, 14rem)", { lineHeight: "0.86", letterSpacing: "-0.045em" }],
        "display-xl": ["clamp(2.75rem, 8.5vw, 8.5rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 5.6vw, 5.2rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.6rem, 3.6vw, 3.4rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.25rem, 2.2vw, 2rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "tag-xs": ["10px", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        "tag-sm": ["11px", { lineHeight: "1.2", letterSpacing: "0.16em" }],
        "tag-md": ["13px", { lineHeight: "1.3", letterSpacing: "0.12em" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 3vw, 3rem)",
        chapter: "clamp(6rem, 12vw, 10rem)",
        rail: "56px",
        nav: "180px",
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
