import { loadFont } from "@remotion/google-fonts/Poppins";

export const poppins = loadFont("normal", {
  weights: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
}).fontFamily;
