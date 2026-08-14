import Image from "next/image";
import { getImageUrl, getMovieById } from "../../../../lib/tmdb";
import Ratings from "../../../../components/Ratings";

export const dynamic = "force-dynamic";

export default async function MovieReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);
  const backdropUrl = getImageUrl(movie.backdrop_path, "w780");

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div>
        <h1 className="text-4xl font-bold text-left mb-2">{movie.title}</h1>
        {movie.tagline && (
          <h2 className="text-xl text-left text-gray-500 mb-2">
            {movie.tagline}
          </h2>
        )}
        <div className="flex items-center mt-2">
          <Ratings
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
          />
        </div>
        <p className="text-gray-500 mt-2">
          {[
            movie.release_date?.slice(0, 4),
            movie.runtime ? `${movie.runtime} min` : null,
            movie.genres.map((genre) => genre.name).join(", ") || null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={movie.title}
          width={780}
          height={439}
          className="rounded-lg mt-5 mb-5 w-full"
        />
      )}
      <div className="post-content">
        <p>{movie.overview}</p>
      </div>
    </div>
  );
}
