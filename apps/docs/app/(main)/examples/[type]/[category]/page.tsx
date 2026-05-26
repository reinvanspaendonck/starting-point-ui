import type { Metadata } from "next";
import { getCategory } from "@/lib/examples";
import { ExampleGallery } from "@/components/example-gallery";

type Params = Promise<{ type: string; category: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { type, category } = await params;
  const cat = await getCategory(type, category);
  return {
    title: cat.title,
    description: cat.description,
    alternates: { canonical: `/examples/${type}/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { type, category } = await params;
  const cat = await getCategory(type, category);
  return <ExampleGallery {...cat} activeCategory={category} />;
}
