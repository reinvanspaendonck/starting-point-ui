import puppeteer from "puppeteer";
import sharp from "sharp";
import { readFile, mkdir, rm, stat } from "fs/promises";
import { join } from "path";

const SOURCE_DIR = join(process.cwd(), ".source");
const PUBLIC_DIR = join(process.cwd(), "public");
const OUTPUT_DIR = join(process.cwd(), "public/screenshots");

// Open Graph card width.
const OUTPUT_WIDTH = 1200;

const DEFAULT_WIDTH = 1536;
const NARROW_WIDTH = 1024;
const NARROW_CATEGORIES = new Set<string>([
  "components/card",
  "components/dialog",
]);

const FORCE_OPEN_DIALOG_CATEGORIES = new Set<string>([
  "components/dialog",
]);

function pickViewportWidth(type: string, category: string): number {
  return NARROW_CATEGORIES.has(`${type}/${category}`) ? NARROW_WIDTH : DEFAULT_WIDTH;
}

function shouldForceOpenDialogs(type: string, category: string): boolean {
  return FORCE_OPEN_DIALOG_CATEGORIES.has(`${type}/${category}`);
}

type VariantData = { variant: number; html: string; presetClasses: string };
type CategoryData = { category: string; variants: VariantData[] };
type TypeData = { type: string; categories: CategoryData[] };

type Target = {
  type: string;
  category: string;
  variant: number;
  html: string;
  presetClasses: string;
};

function resolveTargets(
  types: TypeData[],
  filterType?: string,
  filterCategory?: string,
  filterVariant?: string,
): Target[] {
  const targets: Target[] = [];
  for (const t of types) {
    if (t.type === "docs") continue;
    if (filterType && t.type !== filterType) continue;
    for (const c of t.categories) {
      if (filterCategory && c.category !== filterCategory) continue;
      for (const v of c.variants) {
        if (filterVariant && v.variant !== Number(filterVariant)) continue;
        targets.push({
          type: t.type,
          category: c.category,
          variant: v.variant,
          html: v.html,
          presetClasses: v.presetClasses,
        });
      }
    }
  }
  return targets;
}

async function run() {
  const [filterType, filterCategory, filterVariant] = process.argv.slice(2);

  const { types } = JSON.parse(
    await readFile(join(SOURCE_DIR, "examples.json"), "utf-8"),
  ) as { types: TypeData[] };
  const targets = resolveTargets(types, filterType, filterCategory, filterVariant);

  if (targets.length === 0) {
    console.error("No examples found.");
    process.exit(1);
  }

  const shell = await readFile(join(SOURCE_DIR, "examples.html"), "utf-8");

  console.log(`\nCapturing ${targets.length} example(s)...\n`);

  if (!filterType && !filterCategory && !filterVariant) {
    await rm(OUTPUT_DIR, { recursive: true, force: true });
  }
  await mkdir(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--font-render-hinting=none",
      "--disable-font-subpixel-positioning",
    ],
  });

  const page = await browser.newPage();

  // Serve root-relative URLs from the docs public/ directory.
  await page.setRequestInterception(true);
  page.on("request", async (req) => {
    const url = req.url();
    if (url.startsWith("file://") || url.startsWith("data:")) {
      req.continue();
      return;
    }
    let pathname: string;
    try {
      pathname = new URL(url).pathname;
    } catch {
      req.continue();
      return;
    }
    if (!pathname.startsWith("/")) {
      req.continue();
      return;
    }
    const filePath = join(PUBLIC_DIR, pathname);
    try {
      const exists = await stat(filePath).then((s) => s.isFile()).catch(() => false);
      if (!exists) {
        req.continue();
        return;
      }
      const body = await readFile(filePath);
      const contentType =
        pathname.endsWith(".svg") ? "image/svg+xml" :
        pathname.endsWith(".png") ? "image/png" :
        pathname.endsWith(".jpg") || pathname.endsWith(".jpeg") ? "image/jpeg" :
        pathname.endsWith(".webp") ? "image/webp" :
        pathname.endsWith(".gif") ? "image/gif" :
        "application/octet-stream";
      req.respond({ status: 200, contentType, body });
    } catch {
      req.continue();
    }
  });

  await page.setContent(shell, { waitUntil: "load" });
  await page.waitForNetworkIdle();
  await page.evaluate(() =>
    Promise.all(Array.from(document.fonts).map((f) => f.load())),
  );

  for (const target of targets) {
    const viewportWidth = pickViewportWidth(target.type, target.category);
    const baseKey = `${target.type}-${target.category}-${target.variant}`;

    console.log(`  ${target.type}/${target.category}/${target.variant} (${viewportWidth}px)`);

    await page.setViewport({ width: viewportWidth, height: 900, deviceScaleFactor: 1 });

    const bodyClasses = [
      "font-sans antialiased min-h-screen bg-background",
      target.presetClasses,
    ]
      .filter(Boolean)
      .join(" ");
    const forceOpenDialogs = shouldForceOpenDialogs(target.type, target.category);

    await page.evaluate(
      ({ shikiHtml, bodyClasses, forceOpenDialogs }) => {
        document.body.className = bodyClasses;
        // Strip shiki spans to recover the original source.
        const tmp = document.createElement("div");
        tmp.innerHTML = shikiHtml;
        document.body.innerHTML = tmp.textContent ?? "";

        if (forceOpenDialogs) {
          document.querySelectorAll<HTMLDialogElement>("dialog.dialog").forEach((d) => {
            d.setAttribute("open", "");
            d.querySelectorAll<HTMLElement>(".dialog-backdrop, .dialog-panel").forEach((el) => {
              el.setAttribute("data-state", "open");
            });
          });
        }
      },
      { shikiHtml: target.html, bodyClasses, forceOpenDialogs },
    );
    await page.waitForNetworkIdle();

    // Blur any focused element to drop focus rings.
    await page.evaluate(() => (document.activeElement as HTMLElement)?.blur?.());

    for (const theme of ["light", "dark"] as const) {
      await page.evaluate(
        (isDark) => document.documentElement.classList.toggle("dark", isDark),
        theme === "dark",
      );
      await page.evaluate(() => new Promise((r) => setTimeout(r, 200)));

      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      await page.setViewport({
        width: viewportWidth,
        height: bodyHeight,
        deviceScaleFactor: 1,
      });

      const buffer = await page.screenshot({
        type: "webp",
        quality: 90,
        fullPage: true,
      });
      const outputPath = join(OUTPUT_DIR, `${baseKey}-${theme}.webp`);
      await sharp(buffer)
        .resize({ width: OUTPUT_WIDTH })
        .webp({ quality: 90 })
        .toFile(outputPath);
      console.log(`    ✓ ${theme}`);
    }
  }

  await page.close();
  await browser.close();
  console.log(`\n✅ Done.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
