import { NextRequest, NextResponse } from "next/server";
import { searchMulti } from "../../../lib/tmdb";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchMulti(query);
    return NextResponse.json({ results: results.slice(0, 5) });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
