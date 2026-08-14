import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getNowPlayingMovies } from "../lib/tmdb";

export default async function NewsBanner() {
  const nowPlaying = (await getNowPlayingMovies()).slice(0, 5);

  return (
    <section className="p-4 w-1/3 bg-neutral rounded-2xl">
      <div>
        <h2 className="text-2xl font-bold text-center p-4">Now In Theaters</h2>
        <div className="w-full justify-center">
          {nowPlaying.map((movie) => {
            const posterUrl = getImageUrl(movie.poster_path, "w200");

            return (
              <Link
                key={movie.id}
                href={`/movies/movie-review/${movie.id}`}
                className="flex items-center pb-3"
              >
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={movie.title}
                    width={100}
                    height={150}
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
