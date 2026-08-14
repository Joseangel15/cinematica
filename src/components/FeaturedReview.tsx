import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getTrendingMovies } from "../lib/tmdb";
import Ratings from "./Ratings";

export default async function FeaturedReview() {
  const [featuredMovie] = await getTrendingMovies();

  if (!featuredMovie) {
    return <div>No movies found</div>;
  }

  const posterUrl = getImageUrl(featuredMovie.poster_path, "w300");
  const backdropUrl = getImageUrl(featuredMovie.backdrop_path, "original");
  const backgroundStyle = backdropUrl
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.9) 100%), url(${backdropUrl})`,
      }
    : undefined;

  return (
    <section
      className="w-2/3 flex items-end p-5 bg-cover bg-center rounded-lg"
      style={backgroundStyle}
    >
      <Link
        href={`/Movies/movie-review/${featuredMovie.id}`}
        className="rounded-lg flex w-full"
      >
        {posterUrl && (
          <div className="mr-5">
            <Image
              src={posterUrl}
              alt={featuredMovie.title}
              width={150}
              height={225}
            />
          </div>
        )}
        <div>
          <h2 className="text-6xl font-bold">{featuredMovie.title}</h2>
          <p className="mt-2 text-xl line-clamp-3">{featuredMovie.overview}</p>
          <Ratings
            voteAverage={featuredMovie.vote_average}
            voteCount={featuredMovie.vote_count}
          />
        </div>
      </Link>
    </section>
  );
}
