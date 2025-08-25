import Hero from "@/components/Hero";
import TvHomeBanner from "@/components/TvHomeBanner";
import MovieHomeBanner from "@/components/MovieHomeBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <MovieHomeBanner />
      <TvHomeBanner />
    </>
  );
}
