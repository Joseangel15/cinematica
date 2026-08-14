import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getPopularMovies } from "../../lib/tmdb";
import Ratings from "../../components/Ratings";

export const dynamic = "force-dynamic";

export default async function Movies() {
  const movies = await getPopularMovies();

  return (
    <section>
      <h1 className="text-3xl font-bold text-center">Movies</h1>
      <p className="mt-4 text-center">
        Explore the latest movies and find out where to watch them.
      </p>
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => {
          const posterUrl = getImageUrl(movie.poster_path, "w300");

          return (
            <Link
              key={movie.id}
              href={`/Movies/movie-review/${movie.id}`}
              className="flex gap-4 border-b border-gray-200 py-4"
            >
              {posterUrl && (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  width={120}
                  height={180}
                  className="rounded-lg"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-gray-500">
                  {movie.release_date?.slice(0, 4)}
                </p>
                <Ratings
                  voteAverage={movie.vote_average}
                  voteCount={movie.vote_count}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
