// app/api/news/[category]/route.js

export async function GET(req, { params }) {
  const apiKey = process.env.GNEWS_API_KEY;
  const category = params.category; // extract dynamic slug from URL

  const url = `https://gnews.io/api/v4/top-headlines?country=in&lang=en&topic=${category}&apikey=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();


      
    return Response.json(data); // ✅ Send the data to frontend
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch news", detail: error.message },
      { status: 500 }
    );
  }
}
