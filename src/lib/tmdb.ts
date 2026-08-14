const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
};

export type TmdbTvShow = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
};

export type TmdbMovieDetails = TmdbMovie & {
  tagline: string | null;
  runtime: number | null;
  genres: { id: number; name: string }[];
};

export type TmdbTvShowDetails = TmdbTvShow & {
  tagline: string | null;
  number_of_seasons: number | null;
  genres: { id: number; name: string }[];
};

export type TmdbCastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

type TmdbPagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

async function tmdbFetch<T>(
  path: string,
  searchParams: Record<string, string> = {}
): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing TMDB_API_KEY environment variable. Add it to .env.local (see .env.example)."
    );
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error(
      `TMDB request failed for ${path}: ${response.status} ${response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export function getImageUrl(
  path: string | null | undefined,
  size: "w185" | "w200" | "w300" | "w500" | "w780" | "original" = "w500"
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export async function getPopularMovies(): Promise<TmdbMovie[]> {
  const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>("/movie/popular");
  return data.results;
}

export async function getTrendingMovies(): Promise<TmdbMovie[]> {
  const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(
    "/trending/movie/week"
  );
  return data.results;
}

export async function getNowPlayingMovies(): Promise<TmdbMovie[]> {
  const data = await tmdbFetch<TmdbPagedResponse<TmdbMovie>>(
    "/movie/now_playing"
  );
  return data.results;
}

export async function getMovieById(id: string | number): Promise<TmdbMovieDetails> {
  return tmdbFetch<TmdbMovieDetails>(`/movie/${id}`);
}

export async function getPopularTvShows(): Promise<TmdbTvShow[]> {
  const data = await tmdbFetch<TmdbPagedResponse<TmdbTvShow>>("/tv/popular");
  return data.results;
}

export async function getTopRatedTvShows(): Promise<TmdbTvShow[]> {
  const data = await tmdbFetch<TmdbPagedResponse<TmdbTvShow>>("/tv/top_rated");
  return data.results;
}

export async function getTvShowById(
  id: string | number
): Promise<TmdbTvShowDetails> {
  return tmdbFetch<TmdbTvShowDetails>(`/tv/${id}`);
}

export async function getMovieCast(id: string | number): Promise<TmdbCastMember[]> {
  const data = await tmdbFetch<{ cast: TmdbCastMember[] }>(`/movie/${id}/credits`);
  return data.cast;
}

export async function getTvShowCast(id: string | number): Promise<TmdbCastMember[]> {
  const data = await tmdbFetch<{ cast: TmdbCastMember[] }>(`/tv/${id}/credits`);
  return data.cast;
}
