import type { Metadata } from "next";
import { codeToHtml } from "shiki";
import { categoryLabel, getVariant, proUrl } from "@/lib/examples";
import { Example } from "@/components/example";

type Params = Promise<{ type: string; category: string; variant: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { type, category, variant } = await params;
  const v = await getVariant(type, category, Number(variant));
  return {
    title: `${categoryLabel(category)} ${variant} - ${v.title}`,
    description: v.description,
    alternates: { canonical: `/examples/${type}/${category}/${variant}` },
  };
}

export default async function VariantPage({ params }: { params: Params }) {
  const { type, category, variant } = await params;
  const variantNum = Number(variant);
  const v = await getVariant(type, category, variantNum);
  const label = categoryLabel(category);
  const html = await codeToHtml(v.source, {
    lang: "html",
    themes: { dark: "github-dark", light: "github-light" },
  });

  return (
    <Example
      breadcrumb={{
        type,
        category,
        variant: variantNum,
        categoryLabel: label,
      }}
      description={`${label} ${variantNum}`}
      viewSrc={`${proUrl()}/examples/${type}/${category}/${variantNum}`}
      html={html}
    />
  );
}
