/**
 * Local content CRUD (laptop only).
 * Usage: npm run add
 */
import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const PATHS = {
  projects: path.join(root, "src/_data/projects.json"),
  experience: path.join(root, "src/_data/experience.json"),
  en: path.join(root, "assets/js/locales/en.json"),
  id: path.join(root, "assets/js/locales/id.json"),
  projectsImg: path.join(root, "assets/img/projects"),
  logosImg: path.join(root, "assets/img/logos"),
};

const JOB_KEYS = [
  "jobOne",
  "jobTwo",
  "jobThree",
  "jobFour",
  "jobFive",
  "jobSix",
  "jobSeven",
  "jobEight",
  "jobNine",
  "jobTen",
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((resolve) => rl.question(q, (a) => resolve(a.trim())));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function nextSectionKey(obj, prefix = "section") {
  let max = 0;
  for (const key of Object.keys(obj || {})) {
    const m = key.match(new RegExp(`^${prefix}(\\d+)$`));
    if (m) max = Math.max(max, Number(m[1]));
  }
  return `${prefix}${max + 1}`;
}

function assertWebp(filePath) {
  if (!filePath) throw new Error("Image path is required.");
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`File not found: ${resolved}`);
  }
  if (path.extname(resolved).toLowerCase() !== ".webp") {
    throw new Error("Image must be a .webp file.");
  }
  return resolved;
}

function copyWebp(srcAbs, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  const name = path.basename(srcAbs);
  const dest = path.join(destDir, name);
  fs.copyFileSync(srcAbs, dest);
  return dest;
}

function relativeAsset(absPath) {
  return path.relative(root, absPath).split(path.sep).join("/");
}

async function addProject() {
  const titleEn = await ask("Title (EN): ");
  const titleId = await ask("Title (ID): ");
  const dateEn = await ask("Date (EN), e.g. May - July 2025: ");
  const dateId = await ask("Date (ID), e.g. Mei - Juli 2025: ");
  const descEn = await ask("Description (EN): ");
  const descId = await ask("Description (ID): ");
  const url = await ask("Project URL: ");
  const categoriesRaw = await ask(
    "Categories (comma: web,mobile,uix,data,desktop-app): "
  );
  const techRaw = await ask(
    "Tech badges (comma, use kind:label e.g. tech:PHP,framework:Laravel): "
  );
  const imgPath = await ask("Image path (.webp only): ");

  const srcImg = assertWebp(imgPath);
  const destImg = copyWebp(srcImg, PATHS.projectsImg);

  const categories = categoriesRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const tech = techRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const [kind, ...rest] = pair.split(":");
      const label = rest.join(":").trim() || kind;
      const k = rest.length ? kind.trim() : "tech";
      return { kind: k || "tech", label };
    });

  const en = readJson(PATHS.en);
  const id = readJson(PATHS.id);
  const projects = readJson(PATHS.projects);

  const i18nKey = nextSectionKey(en.pjct);
  en.pjct[i18nKey] = { title: titleEn, date: dateEn, desc: descEn };
  id.pjct[i18nKey] = { title: titleId, date: dateId, desc: descId };

  projects.unshift({
    id: i18nKey,
    i18nKey,
    image: relativeAsset(destImg),
    alt: titleEn,
    url: url || "#",
    contentType: "desc",
    jobs: [],
    jobFallbacks: {},
    titleFallback: titleEn,
    dateFallback: dateEn,
    descFallback: descEn,
    tech,
    categories,
  });

  writeJson(PATHS.en, en);
  writeJson(PATHS.id, id);
  writeJson(PATHS.projects, projects);

  console.log(`\nAdded project ${i18nKey}`);
  console.log(`Image → ${relativeAsset(destImg)}`);
}

async function addExperience() {
  const titleEn = await ask("Company / title (EN): ");
  const titleId = await ask("Company / title (ID): ");
  const roleEn = await ask("Role (EN): ");
  const roleId = await ask("Role (ID): ");
  const dateEn = await ask("Date (EN): ");
  const dateId = await ask("Date (ID): ");
  const jobsEnRaw = await ask(
    "Job bullets EN (separate with | ): "
  );
  const jobsIdRaw = await ask(
    "Job bullets ID (separate with | ): "
  );
  const imgPath = await ask("Logo path (.webp only): ");
  const imgClass = (await ask("Logo CSS class (mob/ina/hack/bmc) [mob]: ")) || "mob";
  const alt = (await ask(`Logo alt text [${titleEn}]: `)) || titleEn;

  const srcImg = assertWebp(imgPath);
  const destImg = copyWebp(srcImg, PATHS.logosImg);

  const jobsEn = jobsEnRaw.split("|").map((s) => s.trim()).filter(Boolean);
  const jobsId = jobsIdRaw.split("|").map((s) => s.trim()).filter(Boolean);
  if (!jobsEn.length) throw new Error("At least one EN job bullet is required.");

  const en = readJson(PATHS.en);
  const id = readJson(PATHS.id);
  const experience = readJson(PATHS.experience);

  const i18nKey = nextSectionKey(en.exp);
  const dateKey = "date";
  const jobs = jobsEn.map((_, i) => JOB_KEYS[i] || `job${i + 1}`);
  if (jobsEn.length > JOB_KEYS.length) {
    throw new Error(`Max ${JOB_KEYS.length} job bullets for CLI add.`);
  }

  const enSection = {
    title: titleEn,
    defJob: roleEn,
    [dateKey]: dateEn,
  };
  const idSection = {
    title: titleId,
    defJob: roleId,
    [dateKey]: dateId,
  };
  const jobFallbacks = {};
  jobs.forEach((key, i) => {
    enSection[key] = jobsEn[i];
    idSection[key] = jobsId[i] || jobsEn[i];
    jobFallbacks[key] = jobsEn[i];
  });

  en.exp[i18nKey] = enSection;
  id.exp[i18nKey] = idSection;

  experience.unshift({
    i18nKey,
    logo: relativeAsset(destImg),
    alt,
    imgClass,
    dateKey,
    layout: "jobs",
    jobs,
    titleFallback: titleEn,
    defJobFallback: roleEn,
    dateFallback: dateEn,
    jobFallbacks,
  });

  writeJson(PATHS.en, en);
  writeJson(PATHS.id, id);
  writeJson(PATHS.experience, experience);

  console.log(`\nAdded experience ${i18nKey}`);
  console.log(`Logo → ${relativeAsset(destImg)}`);
}

async function main() {
  console.log("Local content add (not published until you git push)\n");
  console.log("1) project");
  console.log("2) experience");
  const choice = await ask("Choose 1 or 2: ");

  try {
    if (choice === "1" || choice.toLowerCase() === "project") {
      await addProject();
    } else if (choice === "2" || choice.toLowerCase() === "experience") {
      await addExperience();
    } else {
      throw new Error("Invalid choice.");
    }
    console.log("\nNext: npm run build  →  then git push (Vercel).");
  } catch (err) {
    console.error("\nError:", err.message);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

main();
