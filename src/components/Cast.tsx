"use client";

import { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "../lib/tmdb";
import { TmdbCastMember } from "../lib/tmdb";

interface CastProps {
  cast: TmdbCastMember[];
}

export default function Cast({ cast }: CastProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedCast = isExpanded ? cast : cast.slice(0, 5);

  return (
    <div>
      <h2 className="text-2xl font-bold text-left mb-4">Cast</h2>
      <div className="flex flex-col gap-2">
        {displayedCast.map((castMember) => {
          const profileUrl = getImageUrl(castMember.profile_path, "w185");
          return (
            <div key={castMember.id} className="flex items-start gap-4 bg-slate-800 rounded-lg">
              {profileUrl ? (
                <Image
                  src={profileUrl}
                  alt={castMember.name}
                  width={92}
                  height={138}
                  className="rounded flex-shrink-0 w-[52px] h-[52px] object-cover object-center"
                />
              ) : (
                <div className="w-[52px] h-[52px] bg-slate-700 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No image</span>
                </div>
              )}
              <div className="flex flex-col">
                <p className="font-semibold text-lg">{castMember.name}</p>
                <p className="text-gray-400">{castMember.character}</p>
              </div>
            </div>
          );
        })}
      </div>
      {cast.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-blue-500 hover:text-blue-400 font-semibold cursor-pointer"
        >
          {isExpanded ? "Show less" : `Show all ${cast.length} cast members`}
        </button>
      )}
    </div>
  );
}
