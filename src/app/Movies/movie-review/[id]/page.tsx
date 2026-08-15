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
  const backdropUrl = getImageUrl(movie.poster_path, "w780");
  const cast = await getMovieCast(id);

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div className="flex flex-row gap-5 items-start mb-10">
        <div className="flex flex-col">
          {backdropUrl && (
            <Image
              src={backdropUrl}
              alt={movie.title}
              width={780}
              height={439}
              className="rounded-lg w-full"
              priority
            />
          )}
        </div>
        <div>
          <h1 className="text-4xl font-bold text-left mb-2">{movie.title} <span className="text-gray-500 text-xl">({movie.release_date?.slice(0, 4)})</span></h1>
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
          <p className="text-gray-500 mt-2 mb-2">
            {[
              movie.certification,
              movie.runtime ? `${movie.runtime} min` : null,
              movie.genres.map((genre) => genre.name).join(" / ") || null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <div className="post-content">
            <h2 className="text-2xl font-bold text-left mb-2">Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Watch Trailer</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-lg cursor-pointer">+ Add to Heat List</button>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer">🌶️ Rate this Movie</button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-left mb-2">Critic Reviews</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Write a Review</button>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-left mb-2">Audience Reviews</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Write a Review</button>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-left mb-2">Cast</h2>
        <Carousel showArrows={cast.length > 5}>
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
