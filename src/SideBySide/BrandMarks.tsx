import React from "react";

/**
 * Channel identity marks for the opening rail.
 *
 * Airbnb and Google use the canonical glyph outlines from simple-icons
 * (v16.30.0, CC0-1.0); the marks themselves remain trademarks of their
 * respective owners and are used here only to name the booking channel.
 * Vrbo has no symbol mark — its logo is a lowercase wordmark — so it is set
 * as type. "Direct" is not a brand at all and uses a neutral thin-line mark.
 *
 * All marks render in a single passed-in colour so the rail stays inside the
 * PBM palette rather than importing four sets of brand colours.
 */

const MARK_SIZE = 42;

type MarkProps = { color: string };

const Glyph: React.FC<MarkProps & { d: string }> = ({ color, d }) => (
  <svg width={MARK_SIZE} height={MARK_SIZE} viewBox="0 0 24 24" aria-hidden>
    <path d={d} fill={color} />
  </svg>
);

const AIRBNB_D =
  "M12.001 18.275c-1.353-1.697-2.148-3.184-2.413-4.457-.263-1.027-.16-1.848.291-2.465.477-.71 1.188-1.056 2.121-1.056s1.643.345 2.12 1.063c.446.61.558 1.432.286 2.465-.291 1.298-1.085 2.785-2.412 4.458zm9.601 1.14c-.185 1.246-1.034 2.28-2.2 2.783-2.253.98-4.483-.583-6.392-2.704 3.157-3.951 3.74-7.028 2.385-9.018-.795-1.14-1.933-1.695-3.394-1.695-2.944 0-4.563 2.49-3.927 5.382.37 1.565 1.352 3.343 2.917 5.332-.98 1.085-1.91 1.856-2.732 2.333-.636.344-1.245.558-1.828.609-2.679.399-4.778-2.2-3.825-4.88.132-.345.395-.98.845-1.961l.025-.053c1.464-3.178 3.242-6.79 5.285-10.795l.053-.132.58-1.116c.45-.822.635-1.19 1.351-1.643.346-.21.77-.315 1.246-.315.954 0 1.698.558 2.016 1.007.158.239.345.557.582.953l.558 1.089.08.159c2.041 4.004 3.821 7.608 5.279 10.794l.026.025.533 1.22.318.764c.243.613.294 1.222.213 1.858zm1.22-2.39c-.186-.583-.505-1.271-.9-2.094v-.03c-1.889-4.006-3.642-7.608-5.307-10.844l-.111-.163C15.317 1.461 14.468 0 12.001 0c-2.44 0-3.476 1.695-4.535 3.898l-.081.16c-1.669 3.236-3.421 6.843-5.303 10.847v.053l-.559 1.22c-.21.504-.317.768-.345.847C-.172 20.74 2.611 24 5.98 24c.027 0 .132 0 .265-.027h.372c1.75-.213 3.554-1.325 5.384-3.317 1.829 1.989 3.635 3.104 5.382 3.317h.372c.133.027.239.027.265.027 3.37.003 6.152-3.261 4.802-6.975z";

const GOOGLE_D =
  "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z";

export const AirbnbMark: React.FC<MarkProps> = ({ color }) => (
  <Glyph color={color} d={AIRBNB_D} />
);

export const GoogleMark: React.FC<MarkProps> = ({ color }) => (
  <Glyph color={color} d={GOOGLE_D} />
);

/** Vrbo is a wordmark brand — set it as type rather than invent a symbol. */
export const VrboMark: React.FC<MarkProps & { fontFamily: string }> = ({
  color,
  fontFamily,
}) => (
  <span
    style={{
      display: "flex",
      alignItems: "center",
      height: MARK_SIZE,
      fontFamily,
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: -0.5,
      color,
      textTransform: "lowercase",
    }}
  >
    vrbo
  </span>
);

/** Not a brand: a booking that comes straight to the owner's own site. */
export const DirectMark: React.FC<MarkProps> = ({ color }) => (
  <svg width={MARK_SIZE} height={MARK_SIZE} viewBox="0 0 24 24" aria-hidden>
    <g
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={9} />
      <ellipse cx={12} cy={12} rx={4} ry={9} />
      <line x1={3} y1={12} x2={21} y2={12} />
      <line x1={5} y1={6.5} x2={19} y2={6.5} opacity={0.7} />
      <line x1={5} y1={17.5} x2={19} y2={17.5} opacity={0.7} />
    </g>
  </svg>
);
