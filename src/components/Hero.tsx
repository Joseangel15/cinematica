import NewsBanner from "../components/NewsBanner";
import FeaturedReview from "./FeaturedReview";

export default async function Hero() {
  return (
    <div className="flex gap-5">
      <FeaturedReview />
      <NewsBanner />
    </div>
  )
}
