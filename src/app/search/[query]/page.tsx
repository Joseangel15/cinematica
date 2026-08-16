import Image from "next/image";
import Link from "next/link";
import { getImageUrl, searchMovies, searchTvShows } from "../../../lib/tmdb";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const decodedQuery = q ? decodeURIComponent(q) : "";
  const [movies, tvShows] = await Promise.all([
    searchMovies(decodedQuery),
    searchTvShows(decodedQuery),
  ]);

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Search results for "{decodedQuery}"</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Movies</h2>
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie) => {
              const posterUrl = getImageUrl(movie.poster_path, "w300");
              return (
                <Link
                  key={movie.id}
                  href={`/movies/movie-review/${movie.id}`}
                  className="flex flex-col"
                >
                  {posterUrl && (
                    <Image
                      src={posterUrl}
                      alt={movie.title}
                      width={300}
                      height={450}
                      className="rounded-lg"
                    />
                  )}
                  <h3 className="font-semibold mt-2">{movie.title}</h3>
                  <p className="text-sm text-gray-500">{movie.release_date?.slice(0, 4)}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No movies found</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">TV Shows</h2>
        {tvShows.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tvShows.map((show) => {
              const posterUrl = getImageUrl(show.poster_path, "w300");
              return (
                <Link
                  key={show.id}
                  href={`/tv/tv-review/${show.id}`}
                  className="flex flex-col"
                >
                  {posterUrl && (
                    <Image
                      src={posterUrl}
                      alt={show.name}
                      width={300}
                      height={450}
                      className="rounded-lg"
                    />
                  )}
                  <h3 className="font-semibold mt-2">{show.name}</h3>
                  <p className="text-sm text-gray-500">{show.first_air_date?.slice(0, 4)}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No TV shows found</p>
        )}
      </div>
    </div>
  );
}
