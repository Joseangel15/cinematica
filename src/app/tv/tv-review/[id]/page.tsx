import Image from "next/image";
import { getImageUrl, getTvShowById, getTvShowCast } from "../../../../lib/tmdb";
import Ratings from "../../../../components/Ratings";
import Cast from "../../../../components/Cast";

export const dynamic = "force-dynamic";

export default async function TvReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const show = await getTvShowById(id);
  const backdropUrl = getImageUrl(show.backdrop_path, "w780");
  const cast = await getTvShowCast(id);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div>
        <h1 className="text-4xl font-bold text-left mb-2">{show.name}</h1>
        {show.tagline && (
          <h2 className="text-xl text-left text-gray-500 mb-2">
            {show.tagline}
          </h2>
        )}
        <div className="flex items-center mt-2">
          <Ratings voteAverage={show.vote_average} voteCount={show.vote_count} />
        </div>
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
          priority
        />
      )}
      <div className="post-content">
        <p>{show.overview}</p>
      </div>
      <div className="mt-5">
        <Cast cast={cast || []} />
      </div>
    </div>
  );
}
