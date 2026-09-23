import { loadFont } from "@remotion/google-fonts/Poppins";

export const poppins = loadFont("normal", {
  weights: ["200", "300", "400", "600", "700", "800"],
  subsets: ["latin"],
}).fontFamily;
