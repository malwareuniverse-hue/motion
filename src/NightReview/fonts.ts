import { loadFont } from "@remotion/google-fonts/Poppins";

export const poppins = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
}).fontFamily;
