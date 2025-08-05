import { NewsCard } from "@/components/News-Card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

// ✅ Force server to fetch fresh data every time
export const dynamic = "force-dynamic";

export default async function Page() {
  const categories = ["business", "crime", "technology", "entertainment", "science"];
  const articlesByCategory = {};

  // ✅ Dynamically set base URL for server-side fetch
  const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";


  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  for (const category of categories) {
    try {
      const res = await fetch(`${baseUrl}/api/news/${category}`, {
        cache: "no-store",
      });

      const data = await res.json();
      articlesByCategory[category] = data.articles || [];
      await delay(1000); // Optional: delay between calls
    } catch (err) {
      console.error(`Error fetching ${category}:`, err);
      articlesByCategory[category] = [];
    }
  }

  return (
    <main className="bg-black container space-y-10 py-8">
      <CategorySection title="Business" articles={articlesByCategory["business"]} />
      <CategorySection title="Crime" articles={articlesByCategory["crime"]} />
      <CategorySection title="Technology" articles={articlesByCategory["technology"]} />
      <CategorySection title="Entertainment" articles={articlesByCategory["entertainment"]} />
      <CategorySection title="Science" articles={articlesByCategory["science"]} />
    </main>
  );
}

// ✅ Reusable category section
function CategorySection({ title, articles }) {
  return (
    <section>
      <div className="flex justify-between items-center px-2">
        <h1 className="font-bold text-2xl ml-1 text-white">{title}</h1>
        <Button variant="ghost" className="flex items-center" asChild>
          <Link href={`/news/${title.toLowerCase()}`}>
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 px-2">
        {articles
          .filter((item) => item.image)
          .slice(0, 3)
          .map((item) => (
            <NewsCard
              key={item.url}
              title={item.title}
              image={item.image}
              description={item.description}
              url={item.url}
              publishedAt={item.publishedAt}
              source={item.source?.name}
            />
          ))}
      </div>
    </section>
  );
}
