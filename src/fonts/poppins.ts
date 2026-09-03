import { continueRender, delayRender, staticFile } from "remotion";

/**
 * Poppins, served from `public/fonts` instead of fonts.gstatic.com.
 *
 * @remotion/google-fonts fetches its woff2 files at render time, so a render
 * fails wherever the browser cannot reach Google - offline machines, CI, and
 * any network that re-terminates TLS. The faces below are the same v24 latin
 * and latin-ext subsets that package would have downloaded, vendored into the
 * repo so every render is reproducible and network-independent.
 *
 * To refresh: pull the CSS from
 * https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=block
 * and re-download the latin / latin-ext woff2 files it points at.
 */

type Face = {
  weight: string;
  file: string;
  unicodeRange: string;
};

const FACES: Face[] = [
  {
    weight: "300",
    file: "fonts/poppins-300-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    weight: "300",
    file: "fonts/poppins-300-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
  {
    weight: "400",
    file: "fonts/poppins-400-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    weight: "400",
    file: "fonts/poppins-400-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
  {
    weight: "500",
    file: "fonts/poppins-500-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    weight: "500",
    file: "fonts/poppins-500-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
  {
    weight: "600",
    file: "fonts/poppins-600-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    weight: "600",
    file: "fonts/poppins-600-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
  {
    weight: "700",
    file: "fonts/poppins-700-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    weight: "700",
    file: "fonts/poppins-700-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
  {
    weight: "800",
    file: "fonts/poppins-800-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    weight: "800",
    file: "fonts/poppins-800-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
];

export const POPPINS_FAMILY = "Poppins";

let started = false;

const loadPoppins = () => {
  if (started || typeof document === "undefined") {
    return;
  }
  started = true;

  const handle = delayRender("Loading Poppins from public/fonts");

  Promise.all(
    FACES.map(async (face) => {
      const fontFace = new FontFace(
        POPPINS_FAMILY,
        `url(${staticFile(face.file)}) format("woff2")`,
        {
          weight: face.weight,
          style: "normal",
          display: "block",
          unicodeRange: face.unicodeRange,
        },
      );
      await fontFace.load();
      document.fonts.add(fontFace);
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      // Never hang a render on a font - fall back to the system stack.
      console.warn("Poppins failed to load, falling back to system sans", err);
      continueRender(handle);
    });
};

loadPoppins();

/** Font-family string, matching what @remotion/google-fonts used to return. */
export const poppins = `${POPPINS_FAMILY}, system-ui, -apple-system, "Segoe UI", sans-serif`;
