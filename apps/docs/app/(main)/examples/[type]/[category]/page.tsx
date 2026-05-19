import Link from "next/link";
import type { Metadata } from "next";
import { getCategory, generateExampleStaticParams } from "@/lib/examples";
import { ExampleHeader } from "@/components/example-header";

export const dynamicParams = false;

type Params = Promise<{ type: string; category: string }>;

export const generateStaticParams = generateExampleStaticParams;

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

  return (
    <div className="max-w-384 mx-auto px-4 sm:px-6 pb-12">
      <ExampleHeader
        title={cat.title}
        description={cat.description}
        activeCategory={category}
      />

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {cat.variants.map((v) => (
          <Link
            key={v.variant}
            href={`/examples/${type}/${category}/${v.variant}`}
            className="mb-4 break-inside-avoid block overflow-hidden rounded-md bg-muted"
          >
            <div className="m-3 p-1 rounded bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/screenshots/${type}-${category}-${v.variant}-light.webp`}
                alt={`${cat.title} variant ${v.variant}`}
                className="w-full rounded-md overflow-hidden dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/screenshots/${type}-${category}-${v.variant}-dark.webp`}
                alt={`${cat.title} variant ${v.variant}`}
                className="w-full rounded-md overflow-hidden hidden dark:block"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
