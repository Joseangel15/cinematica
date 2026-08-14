import Hero from "@/components/Hero";
import TvHomeBanner from "@/components/TvHomeBanner";
import MovieHomeBanner from "@/components/MovieHomeBanner";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <MovieHomeBanner />
      <TvHomeBanner />
    </>
  );
}
