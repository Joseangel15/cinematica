import Image from "next/image";
import Link from "next/link";
import { getImageUrl, getPopularTvShows } from "../lib/tmdb";
import Carousel from "./Carousel";

export default async function TvHomeBanner() {
  const shows = (await getPopularTvShows()).slice(0, 6);

  return (
    <section className="py-8 px-8">
      <div>
        <h2 className="text-2xl font-bold text-center p-8">
          <Link href="/tv">Featured Shows</Link>
        </h2>
        <Carousel>
          {shows.map((show) => {
            const posterUrl = getImageUrl(show.poster_path, "w300");

            return (
              <Link
                key={show.id}
                href={`/tv/tv-review/${show.id}`}
                className="flex flex-col items-center justify-center p-4 min-w-[200px]"
              >
                {posterUrl && (
                  <Image
                    src={posterUrl}
                    alt={show.name}
                    width={300}
                    height={450}
                  />
                )}
                <h3 className="text-lg font-semibold p-4">{show.name}</h3>
              </Link>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
