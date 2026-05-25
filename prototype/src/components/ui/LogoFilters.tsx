/**
 * SVG filters used by <LogoMark /> to tint the white wordmark
 * into bolt-red and dune-cream slices for the RGB-split glitch.
 *
 * Rendered once at the document root.
 */
export default function LogoFilters() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <filter id="kiikio-tint-bolt" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 1
              0 0 0 0 0.165
              0 0 0 0 0.121
              0 0 0 1 0
            "
          />
        </filter>
        <filter id="kiikio-tint-dune" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="
              0 0 0 0 0.784
              0 0 0 0 0.714
              0 0 0 0 0.604
              0 0 0 1 0
            "
          />
        </filter>
      </defs>
    </svg>
  );
}
