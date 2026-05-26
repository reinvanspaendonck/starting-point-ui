import { getFeatured } from "@/lib/examples";
import { ExampleGallery } from "@/components/example-gallery";

export async function generateMetadata() {
  const featured = await getFeatured();
  return {
    title: featured.title,
    description: featured.description,
    alternates: { canonical: "/examples" },
  };
}

export default async function FeaturedExamplesPage() {
  const featured = await getFeatured();
  return <ExampleGallery {...featured} />;
}
