import { NewsCard } from "@/components/News-Card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default async function Page() {
  const categories = ["business", "crime", "technology", "entertainment", "science"];
  const articlesByCategory = {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  for (const category of categories) {
    try {
      const res = await fetch(`/api/news/${category}`, {
  cache: "no-store",
});

      const data = await res.json();
      articlesByCategory[category] = data.articles || [];
      await delay(1000); // Optional: delay 1s between requests to avoid rate limit
    } catch (err) {
      console.error(`Error fetching ${category}:`, err);
      articlesByCategory[category] = [];
    }
  }

  // Extract each category's articles
  const businessArticles = articlesByCategory["business"];
  const crimeArticles = articlesByCategory["crime"];
  const techArticles = articlesByCategory["technology"];
  const entertainmentArticles = articlesByCategory["entertainment"];
  const scienceArticles = articlesByCategory["science"];

  return (
    <main className="bg-black container space-y-10 py-8">
      <CategorySection title="Business" articles={businessArticles} />
      <CategorySection title="Crime" articles={crimeArticles} />
      <CategorySection title="Technology" articles={techArticles} />
      <CategorySection title="Entertainment" articles={entertainmentArticles} />
      <CategorySection title="Science" articles={scienceArticles} />
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
          .filter((item) => item.image) // Only render articles with images
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
