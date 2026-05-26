import { cache } from "react";

const PRO_URL =
  process.env.NEXT_PUBLIC_PRO_URL ?? "https://pro.startingpointui.com";

const revalidate = 3600;

// --- Types ---

export type ExampleVariant = {
  type: string;
  category: string;
  variant: number;
  title: string;
  description: string;
};

export type CategoryInfo = {
  type: string;
  category: string;
};

export type CategoryPage = {
  type: string;
  category: string;
  title: string;
  description: string;
  variants: ExampleVariant[];
};

export type FeaturedPage = {
  category: string;
  title: string;
  description: string;
  variants: ExampleVariant[];
};

// --- Helpers ---

export function categoryLabel(slug: string): string {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export function screenshotUrl(
  v: Pick<ExampleVariant, "type" | "category" | "variant">,
  theme: "light" | "dark",
): string {
  return `${PRO_URL}/screenshots/${v.type}-${v.category}-${v.variant}-${theme}.webp`;
}

// --- Fetchers (cached per render) ---

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${PRO_URL}${path}`, { next: { revalidate } });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

export const getAllCategories = cache(async (): Promise<CategoryInfo[]> => {
  const data = await fetchJson<{
    types: { type: string; categories: string[] }[];
  }>("/api/examples");
  return data.types.flatMap((t) =>
    t.categories.map((category) => ({ type: t.type, category })));
});

export const getCategory = cache(async (
  type: string,
  category: string,
): Promise<CategoryPage> => {
  return fetchJson<CategoryPage>(`/api/examples/${type}/${category}`);
});

export const getVariant = cache(async (
  type: string,
  category: string,
  variant: number,
): Promise<ExampleVariant & { source: string }> => {
  return fetchJson<ExampleVariant & { source: string }>(
    `/api/examples/${type}/${category}/${variant}`,
  );
});

export const getFeatured = cache(async (): Promise<FeaturedPage> => {
  return fetchJson<FeaturedPage>("/api/examples/featured");
});

export function proUrl(): string {
  return PRO_URL;
}
