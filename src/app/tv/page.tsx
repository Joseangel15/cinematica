import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getPopularTvShows } from "../../lib/tmdb";
import Ratings from "../../components/Ratings";

export const dynamic = "force-dynamic";

export default async function Tv() {
  const shows = await getPopularTvShows();

  return (
    <section>
      <h1 className="text-3xl font-bold text-center">TV Shows</h1>
      <p className="mt-4 text-center">
        Discover the best TV shows and streaming options available.
      </p>
      <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {shows.map((show) => {
          const posterUrl = getImageUrl(show.poster_path, "w300");

          return (
            <Link
              key={show.id}
              href={`/tv/tv-review/${show.id}`}
              className="flex gap-4 border-b border-gray-200 py-4"
            >
              {posterUrl && (
                <Image
                  src={posterUrl}
                  alt={show.name}
                  width={120}
                  height={180}
                  className="rounded-lg"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold">{show.name}</h2>
                <p className="text-gray-500">
                  {show.first_air_date?.slice(0, 4)}
                </p>
                <Ratings
                  voteAverage={show.vote_average}
                  voteCount={show.vote_count}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
