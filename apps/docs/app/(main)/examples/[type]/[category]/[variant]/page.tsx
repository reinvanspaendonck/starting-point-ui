import type { Metadata } from "next";
import { getVariant, generateVariantStaticParams } from "@/lib/examples";
import { Example } from "@/components/example";

export const dynamicParams = false;

type Params = Promise<{ type: string; category: string; variant: string }>;

export const generateStaticParams = generateVariantStaticParams;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { type, category, variant } = await params;
  const { category: cat, variant: v } = await getVariant(
    type,
    category,
    Number(variant),
  );
  const image = `/screenshots/${type}-${category}-${v.variant}-light.webp`;
  return {
    title: `${cat.title.replace(" Examples", "")} Example ${v.variant}`,
    description: v.description,
    alternates: { canonical: `/examples/${type}/${category}/${variant}` },
    openGraph: { images: [image] },
    twitter: { card: "summary_large_image", images: [image] },
  };
}

export default async function VariantPage({ params }: { params: Params }) {
  const { type, category, variant } = await params;
  const { category: cat, variant: v } = await getVariant(
    type,
    category,
    Number(variant),
  );

  return (
    <Example
      breadcrumb={{
        type,
        category,
        variant: v.variant,
        categoryLabel: cat.title.replace(" Examples", ""),
      }}
      description={`${v.variant}: ${v.description}`}
      viewSrc={`/view/${type}/${category}/${v.variant}`}
      highlightedCode={v.html}
    />
  );
}
