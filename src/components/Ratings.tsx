import { FaRegSnowflake, FaFireFlameCurved, FaRegSun } from "react-icons/fa6";

const ratings = {
  1: { icon: FaRegSnowflake, color: "#B0E0E6", text: "Ice Cold" },
  2: { icon: FaRegSnowflake, color: "#1E90FF", text: "Cold" },
  3: { icon: FaRegSun, color: "#FFD700", text: "Warm" },
  4: { icon: FaFireFlameCurved, color: "#FF4500", text: "Hot" },
  5: { icon: FaFireFlameCurved, color: "#DC143C", text: "On Fire!" },
};

function getRatingData(voteAverage: number) {
  const ratingKey = Math.min(5, Math.max(1, Math.round(voteAverage / 2)));
  return ratings[ratingKey as keyof typeof ratings];
}

export default function Ratings({
  voteAverage,
  voteCount,
}: {
  voteAverage: number;
  voteCount?: number;
}) {
  if (typeof voteAverage !== "number" || voteAverage <= 0) {
    return <span className="text-lg text-left">Not rated yet</span>;
  }

  const ratingData = getRatingData(voteAverage);

  return (
    <div className="flex items-center mt-2">
      <span className="text-lg text-left flex mr-5">
        <ratingData.icon
          className="text-2xl text-left mr-1"
          style={{ color: ratingData.color }}
        />
        <span className="text-lg text-left" style={{ color: ratingData.color }}>
          {ratingData.text}
        </span>
      </span>
      <span>
        {voteAverage.toFixed(1)}/10
        {typeof voteCount === "number" ? ` (${voteCount} votes)` : ""}
      </span>
    </div>
  );
}
