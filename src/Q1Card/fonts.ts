import { continueRender, delayRender, staticFile } from "remotion";

export const poppins = "Poppins";

const WEIGHTS: Array<"200" | "300" | "400" | "600" | "700" | "800"> = [
  "200", "300", "400", "600", "700", "800",
];

// Mirrors the @remotion/google-fonts pattern but loads from local public/fonts/poppins/
(function loadLocalPoppins() {
  if (typeof FontFace === "undefined") return;
  for (const w of WEIGHTS) {
    const handle = delayRender(`Loading Poppins ${w}`);
    const face = new FontFace(
      "Poppins",
      `url(${staticFile(`fonts/poppins/${w}.woff2`)}) format('woff2')`,
      { weight: w, style: "normal" },
    );
    face
      .load()
      .then(() => {
        document.fonts.add(face);
        continueRender(handle);
      })
      .catch(() => continueRender(handle));
  }
})();
