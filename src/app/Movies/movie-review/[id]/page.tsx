import Image from "next/image";
import { getImageUrl, getMovieById, getMovieCast } from "../../../../lib/tmdb";
import Ratings from "../../../../components/Ratings";
import Carousel from "../../../../components/Carousel";

export const dynamic = "force-dynamic";

export default async function MovieReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovieById(id);
  const backdropUrl = getImageUrl(movie.backdrop_path, "w780");
  const cast = await getMovieCast(id);

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
          priority
        />
      )}
      <div className="post-content">
        <p>{movie.overview}</p>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-left mb-2">Cast</h2>
        <Carousel>
          {cast.map((castMember) => {
            const profileUrl = getImageUrl(castMember.profile_path, "w185");
            return (
              <div key={castMember.id} className="flex flex-col items-center p-2 min-w-[150px]">
                {profileUrl && (
                  <Image
                    src={profileUrl}
                    alt={castMember.name}
                    width={185}
                    height={278}
                    className="rounded-lg"
                  />
                )}
                <p className="mt-2 font-semibold text-center">{castMember.name}</p>
                <p className="text-sm text-gray-500 text-center">{castMember.character}</p>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
