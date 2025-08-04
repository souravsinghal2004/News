// ✅ Force dynamic behavior for live fetches (important for Vercel)
export const dynamic = "force-dynamic";

export async function GET(req, { params }) {
  const apiKey = process.env.GNEWS_API_KEY;
  const category = params.category; // Extract dynamic slug from URL

  const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=${category}&apikey=${apiKey}`;

  try {
    const res = await fetch(url, {
      // ✅ Prevent Vercel from caching this API call
      cache: "no-store",
    });

    const data = await res.json();
    return Response.json(data); // ✅ Send to frontend
  } catch (error) {
    return Response.json(
      {
        error: "Failed to fetch news",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
