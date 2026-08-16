import Image from "next/image";
import { getImageUrl, getMovieById, getMovieCast, getWhereToWatch, isInTheaters } from "../../../../lib/tmdb";
import Ratings from "../../../../components/Ratings";
import Cast from "../../../../components/Cast";

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
  const whereToWatch = await getWhereToWatch(id);

  return (
    <div className="max-w-7xl mx-auto p-5">
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
          <div className="flex flex-row items-center gap-6">
            <h1 className="text-4xl font-bold text-left mb-2">{movie.title} <span className="text-gray-500 text-xl">({movie.release_date?.slice(0, 4)})</span></h1>
            {isInTheaters(movie.theatrical_release_date) && (
              <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">In Theaters</span>
            )}
          </div>
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
      <div className="mt-5 flex flex-row gap-6">
        <div className="w-3/5 flex flex-col gap-4 bg-slate-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-left mb-2">Critic Reviews</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Write a Review</button>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-left mb-2">Audience Reviews</h2>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">Write a Review</button>
          </div>
        </div>
        <div className="w-2/5 bg-slate-800 p-4 rounded-lg">
          <div>
            <h2 className="text-2xl font-bold text-left mb-2">Where to watch</h2>
            {whereToWatch.flat_rate && whereToWatch.flat_rate.length > 0 ? (
              <div className="flex flex-col gap-3">
                {whereToWatch.flat_rate.map((provider) => {
                  const logoUrl = getImageUrl(provider.logo_path, "w45");
                  return (
                    <div key={provider.provider_id} className="flex items-center gap-2">
                      {logoUrl && (
                        <Image
                          src={logoUrl}
                          alt={provider.provider_name}
                          width={45}
                          height={45}
                          className="rounded"
                        />
                      )}
                      <p className="text-sm">{provider.provider_name}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No streaming providers available</p>
            )}
            {isInTheaters(movie.theatrical_release_date) && (
              <p className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2 mt-2">In Theaters</p>
            )}
          </div>
          <div className="mt-5">
            <Cast cast={cast} />
          </div>
        </div>
      </div>
    </div>
  );
}
