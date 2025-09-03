import { FaRegSnowflake, FaFireFlameCurved, FaRegSun } from "react-icons/fa6";
import Image from "next/image";

export default async function Ratings({ ratingPost }: { ratingPost: any }) {
  const movieRating = ratingPost.fields?.rating;
  const authorImage =
    ratingPost.fields.author?.fields.profilePicture?.fields.file?.url || "";
  const authorName = ratingPost.fields.author?.fields.name || "";

  const ratings = {
    1: { icon: FaRegSnowflake, color: "#B0E0E6", text: "Ice Cold" },
    2: { icon: FaRegSnowflake, color: "#1E90FF", text: "Cold" },
    3: { icon: FaRegSun, color: "#FFD700", text: "Warm" },
    4: { icon: FaFireFlameCurved, color: "#FF4500", text: "Hot" },
    5: { icon: FaFireFlameCurved, color: "#DC143C", text: "On Fire!" },
  };

  const getRatingData = (
    movieRating: number
  ): { icon: React.ElementType; color: string; text: string } | null => {
    if (typeof movieRating !== "number") return null;

    const ratingKey = Math.round(movieRating);
    return ratings[ratingKey as keyof typeof ratings] || null;
  };

  const ratingData =
    typeof movieRating === "number" ? getRatingData(movieRating) : null;

  const movieRatingElement = ratingData ? (
    <span className="text-lg text-left flex mr-5">
      <ratingData.icon
        className={`text-2xl text-left mr-1`}
        style={{ color: ratingData.color }}
      />
      <span className="text-lg text-left" style={{ color: ratingData.color }}>
        {ratingData.text}
      </span>
    </span>
  ) : null;

  return (
    <div className="flex items-center mt-2">
      {movieRatingElement}
      <span>
        {authorImage && (
          <Image
            src={`https:${authorImage}`}
            alt={authorName}
            width={30}
            height={30}
            className="rounded-full mr-2 inline"
          />
        )}{" "}
        {authorName}
      </span>
    </div>
  );
}
