import Link from "next/link";
import { allExamplesMeta, getFeaturedVariants } from "@/lib/examples";
import { ExampleHeader } from "@/components/example-header";

export const metadata = {
  title: allExamplesMeta.title,
  description: allExamplesMeta.description,
  alternates: { canonical: "/examples" },
};

export default async function FeaturedExamplesPage() {
  const featured = await getFeaturedVariants();

  return (
    <div className="max-w-384 mx-auto px-4 sm:px-6 pb-12">
      <ExampleHeader
        title={allExamplesMeta.title}
        description={allExamplesMeta.description}
      />

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
        {featured.map((f) => (
          <Link
            key={`${f.type}-${f.category}-${f.variant.variant}`}
            href={`/examples/${f.type}/${f.category}/${f.variant.variant}`}
            className="mb-4 break-inside-avoid block overflow-hidden rounded-md bg-muted"
          >
            <div className="m-3 p-1 rounded bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/screenshots/${f.type}-${f.category}-${f.variant.variant}-light.webp`}
                alt={`${f.categoryTitle} variant ${f.variant.variant}`}
                className="w-full rounded-md overflow-hidden dark:hidden"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/screenshots/${f.type}-${f.category}-${f.variant.variant}-dark.webp`}
                alt={`${f.categoryTitle} variant ${f.variant.variant}`}
                className="w-full rounded-md overflow-hidden hidden dark:block"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
