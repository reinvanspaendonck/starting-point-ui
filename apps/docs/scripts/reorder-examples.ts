// Reorder example files within a category.
//
// Renames files and rewrites internal numeric IDs that match the category
// prefix (e.g. `dialog-3` → `dialog-7`). Other content is untouched.
//
// Usage:
//   tsx scripts/reorder-examples.ts <type>/<category> swap <a> <b>
//   tsx scripts/reorder-examples.ts <type>/<category> insert <from> <to>
//
// Examples:
//   tsx scripts/reorder-examples.ts components/dialog swap 1 4
//   tsx scripts/reorder-examples.ts components/dialog insert 11 3

import { readdir, readFile, rename, writeFile } from "fs/promises";
import { join, basename } from "path";

const EXAMPLES_DIR = join(process.cwd(), "examples");

function fail(msg: string): never {
  console.error(`error: ${msg}`);
  process.exit(1);
}

async function getVariantNumbers(dir: string): Promise<number[]> {
  const files = await readdir(dir);
  return files
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => parseInt(f.replace(".tsx", ""), 10))
    .filter((n) => !isNaN(n))
    .sort((a, b) => a - b);
}

function planSwap(
  variants: number[],
  a: number,
  b: number,
): Array<[number, number]> {
  if (!variants.includes(a)) fail(`variant ${a} does not exist`);
  if (!variants.includes(b)) fail(`variant ${b} does not exist`);
  if (a === b) return [];
  return [
    [a, b],
    [b, a],
  ];
}

function planInsert(
  variants: number[],
  from: number,
  to: number,
): Array<[number, number]> {
  if (!variants.includes(from)) fail(`variant ${from} does not exist`);
  if (to < 1 || to > variants.length)
    fail(`target position ${to} out of range (1..${variants.length})`);
  if (from === to) return [];

  const moves: Array<[number, number]> = [];
  if (from < to) {
    // Shift down: 2,3,...,to → 1,2,...,to-1
    for (let i = from + 1; i <= to; i++) moves.push([i, i - 1]);
  } else {
    // Shift up: to,to+1,...,from-1 → to+1,to+2,...,from
    for (let i = from - 1; i >= to; i--) moves.push([i, i + 1]);
  }
  moves.push([from, to]);
  return moves;
}

async function rewriteIds(filePath: string, prefix: string, newNumber: number) {
  const contents = await readFile(filePath, "utf-8");
  // Match `<prefix>-<digits>` followed by either non-word boundary or `-`
  // (to also catch `dialog-3-title`, `dialog-3-description`, `#dialog-3` etc).
  const pattern = new RegExp(`\\b${prefix}-\\d+\\b`, "g");
  const next = contents.replace(pattern, () => `${prefix}-${newNumber}`);
  if (next !== contents) {
    await writeFile(filePath, next);
  }
}

async function applyMoves(
  dir: string,
  moves: Array<[number, number]>,
  prefix: string,
) {
  if (moves.length === 0) {
    console.log("no changes needed");
    return;
  }

  // Two-phase rename: first to .tmp suffix, then to final name.
  // This avoids collisions when a target name is also a source.
  for (const [from] of moves) {
    const src = join(dir, `${from}.tsx`);
    const tmp = join(dir, `${from}.tsx.tmp`);
    await rename(src, tmp);
  }
  for (const [from, to] of moves) {
    const tmp = join(dir, `${from}.tsx.tmp`);
    const dst = join(dir, `${to}.tsx`);
    await rename(tmp, dst);
    await rewriteIds(dst, prefix, to);
    console.log(`  ${from}.tsx → ${to}.tsx (rewrote ${prefix}-${from} → ${prefix}-${to})`);
  }
}

async function main() {
  const [, , categoryArg, op, aArg, bArg] = process.argv;
  if (!categoryArg || !op || !aArg || !bArg) {
    console.error(
      "usage:\n" +
        "  tsx scripts/reorder-examples.ts <type>/<category> swap <a> <b>\n" +
        "  tsx scripts/reorder-examples.ts <type>/<category> insert <from> <to>",
    );
    process.exit(1);
  }

  const dir = join(EXAMPLES_DIR, categoryArg);
  const prefix = basename(categoryArg);
  const a = parseInt(aArg, 10);
  const b = parseInt(bArg, 10);
  if (isNaN(a) || isNaN(b)) fail("arguments must be numbers");

  const variants = await getVariantNumbers(dir).catch(() => {
    fail(`category '${categoryArg}' not found at ${dir}`);
  });

  let moves: Array<[number, number]>;
  if (op === "swap") {
    moves = planSwap(variants, a, b);
    console.log(`swap ${a} ↔ ${b} in ${categoryArg}`);
  } else if (op === "insert") {
    moves = planInsert(variants, a, b);
    console.log(`insert ${a} → position ${b} in ${categoryArg}`);
  } else {
    fail(`unknown op '${op}' (expected swap or insert)`);
  }

  await applyMoves(dir, moves, prefix);
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
