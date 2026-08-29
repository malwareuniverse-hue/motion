import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadJost } from "@remotion/google-fonts/Jost";

export const serif = loadPlayfair("normal", {
  weights: ["500", "600", "700"],
  subsets: ["latin"],
}).fontFamily;

export const sans = loadJost("normal", {
  weights: ["300", "400", "500", "600"],
  subsets: ["latin"],
}).fontFamily;
