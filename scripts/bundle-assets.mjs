import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "assets", "build");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function stripGoogleFontImport(css) {
  return css.replace(/@import\s+url\([^)]+\);\s*/g, "");
}

export function bundleAssets() {
  fs.mkdirSync(outDir, { recursive: true });

  const css = [
    read("assets/css/fonts.css"),
    read("assets/css/normalize.css"),
    read("assets/css/bootstrap.purged.css"),
    stripGoogleFontImport(read("assets/css/base.css")),
    read("assets/css/layout.css"),
    read("assets/css/sections/home.css"),
    read("assets/css/sections/education.css"),
    read("assets/css/sections/skill.css"),
    read("assets/css/sections/experience.css"),
    read("assets/css/sections/project.css"),
    read("assets/css/sections/certificate.css"),
    read("assets/css/sections/contact.css"),
  ].join("\n");

  const js = [
    read("assets/js/currentYear.js"),
    read("assets/js/copyPaste.js"),
    read("assets/js/email.js"),
    read("assets/js/selectLanguage.js"),
    read("assets/js/script.js"),
    read("assets/js/side.js"),
    read("assets/js/appInit.js"),
  ].join("\n;\n");

  fs.writeFileSync(path.join(outDir, "app.css"), css);
  fs.writeFileSync(path.join(outDir, "app.js"), js);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  bundleAssets();
}
