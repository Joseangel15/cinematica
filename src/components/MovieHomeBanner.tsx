import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getPopularMovies } from "../lib/tmdb";

export default async function MovieHomeBanner() {
  const movies = (await getPopularMovies()).slice(0, 6);

  return (
    <section className="py-8 px-8">
      <div>
        <h2 className="text-2xl font-bold text-center p-8">
          <Link href="/Movies">Featured Movies</Link>
        </h2>
        <div className="carousel w-full justify-center">
          {movies.map((movie) => {
            const posterUrl = getImageUrl(movie.poster_path, "w300");

            return (
              <Link
                key={movie.id}
                href={`/Movies/movie-review/${movie.id}`}
                className="carousel-item flex flex-col items-center justify-center p-4"
              >
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    width={300}
                    height={450}
                  />
                )}
                <h3 className="text-lg font-semibold p-4">{movie.title}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
