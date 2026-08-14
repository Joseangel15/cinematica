import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getTopRatedTvShows } from "../../../lib/tmdb";
import Ratings from "../../../components/Ratings";

export const dynamic = "force-dynamic";

export default async function TvReviewsPage() {
  const shows = await getTopRatedTvShows();

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">TV Reviews</h1>
      <ul className="mt-8">
        {shows.map((show) => {
          const posterUrl = getImageUrl(show.poster_path, "w300");

          return (
            <li key={show.id} className="post-item border-b border-gray-200 py-4">
              <Link
                href={`/tv-streaming/tv-reviews/${show.id}`}
                className="flex gap-4"
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
                  <h2 className="text-xl font-bold">{show.name}</h2>
                  <Ratings
                    voteAverage={show.vote_average}
                    voteCount={show.vote_count}
                  />
                  <p className="mt-2 text-gray-500">{show.overview}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
