import { readFile } from "fs/promises";
import { join } from "path";
import { cache } from "react";

// --- Presets ---

const presets = {
  default: "p-4 sm:p-12 flex flex-wrap items-center justify-center gap-2",
  dialog: "min-h-[800px] flex items-center justify-center p-4",
  fullpage: "",
} as const;

export type Preset = keyof typeof presets;

export type ExampleConfig = {
  preset: Preset;
  classList?: string;
  description: string;
};

export function getPresetClasses(preset: Preset): string {
  return presets[preset];
}

// --- Meta ---

export const allExamplesMeta = {
  title: "Browse Examples",
  description:
    "Explore ready-to-use components, sections, and page templates built with Tailwind CSS and Starting Point UI.",
};

export const exampleMeta: Record<
  string,
  Record<string, { title: string; description: string }>
> = {
  components: {
    card: {
      title: "Card Examples",
      description:
        "Free Tailwind CSS card examples. Copy and paste into your project. Built with Starting Point UI and works in any Tailwind project.",
    },
    dialog: {
      title: "Dialog Examples",
      description:
        "Free Tailwind CSS dialog examples. Copy and paste into your project. Built with Starting Point UI and works in any Tailwind project.",
    },
    sidebar: {
      title: "Sidebar Examples",
      description:
        "Free Tailwind CSS sidebar examples. Copy and paste into your project. Built with Starting Point UI and works in any Tailwind project.",
    },
  },
};

// --- Featured ---

export const featuredExamples: string[] = [
  "components/card/1",
  "components/card/3",
  "components/card/4",
  "components/card/5",
  "components/card/6",
  "components/card/10",
];

// --- Types ---

export type ExampleVariant = {
  variant: number;
  html: string;
  description: string;
  presetClasses: string;
};

export type ExampleCategory = {
  category: string;
  title: string;
  description: string;
  variants: ExampleVariant[];
};

export type ExamplesData = {
  types: {
    type: string;
    categories: ExampleCategory[];
  }[];
};

export type CategoryInfo = {
  type: string;
  category: string;
  title: string;
  description: string;
  variantCount: number;
};

// --- Data ---

const getData = cache(async (): Promise<ExamplesData> => {
  return JSON.parse(
    await readFile(join(process.cwd(), ".source", "examples.json"), "utf-8"),
  );
});

export async function getCategory(
  type: string,
  category: string,
): Promise<ExampleCategory> {
  const data = await getData();
  const cat = data.types
    .find((t) => t.type === type)
    ?.categories.find((c) => c.category === category);
  if (!cat) throw new Error(`Unknown example: ${type}/${category}`);
  return cat;
}

export async function getAllCategories(): Promise<CategoryInfo[]> {
  const data = await getData();
  return data.types.flatMap((t) =>
    t.categories.map((c) => ({
      type: t.type,
      category: c.category,
      title: c.title,
      description: c.description,
      variantCount: c.variants.length,
    })),
  );
}

export async function generateExampleStaticParams() {
  const data = await getData();
  return data.types.flatMap((t) =>
    t.categories.map((c) => ({ type: t.type, category: c.category })),
  );
}

export async function getVariant(
  type: string,
  category: string,
  variant: number,
): Promise<{ category: ExampleCategory; variant: ExampleVariant }> {
  const cat = await getCategory(type, category);
  const v = cat.variants.find((v) => v.variant === variant);
  if (!v) throw new Error(`Unknown variant: ${type}/${category}/${variant}`);
  return { category: cat, variant: v };
}

export async function generateVariantStaticParams() {
  const data = await getData();
  return data.types.flatMap((t) =>
    t.categories.flatMap((c) =>
      c.variants.map((v) => ({
        type: t.type,
        category: c.category,
        variant: String(v.variant),
      })),
    ),
  );
}

export type FeaturedVariant = {
  type: string;
  category: string;
  categoryTitle: string;
  variant: ExampleVariant;
};

export async function getFeaturedVariants(): Promise<FeaturedVariant[]> {
  const results: FeaturedVariant[] = [];
  for (const entry of featuredExamples) {
    const [type, category, variantStr] = entry.split("/");
    if (!type || !category || !variantStr) continue;
    const { category: cat, variant } = await getVariant(
      type,
      category,
      Number(variantStr),
    );
    results.push({
      type,
      category,
      categoryTitle: cat.title,
      variant,
    });
  }
  return results;
}
