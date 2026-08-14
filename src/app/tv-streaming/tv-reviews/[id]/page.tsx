import Image from "next/image";
import { getImageUrl, getTvShowById } from "../../../../lib/tmdb";
import Ratings from "../../../../components/Ratings";

export const dynamic = "force-dynamic";

export default async function TvReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await getTvShowById(id);
  const backdropUrl = getImageUrl(show.backdrop_path, "w780");

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div>
        <h1 className="text-4xl font-bold text-left mb-2">{show.name}</h1>
        {show.tagline && (
          <h2 className="text-xl text-left text-gray-500 mb-2">
            {show.tagline}
          </h2>
        )}
        <Ratings voteAverage={show.vote_average} voteCount={show.vote_count} />
        <p className="text-gray-500 mt-2">
          {[
            show.first_air_date?.slice(0, 4),
            show.number_of_seasons
              ? `${show.number_of_seasons} season${
                  show.number_of_seasons > 1 ? "s" : ""
                }`
              : null,
            show.genres.map((genre) => genre.name).join(", ") || null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={show.name}
          width={780}
          height={439}
          className="rounded-lg mt-5 mb-5 w-full"
        />
      )}
      <div className="post-content">
        <p>{show.overview}</p>
      </div>
    </div>
  );
}
