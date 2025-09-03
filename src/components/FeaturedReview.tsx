import Image from "next/image";
import Link from "next/link";
import { Entry } from "contentful";
import { getEntryById } from "../lib/contenful";

export default async function FeaturedReview() {
  // Main post ID
  const postId = "3hmvWQufqUwc2D1z1news"; // Replace with your actual post ID
  const post: Entry = await getEntryById(postId);
  console.log(post);

  if (post) {
    const firstPost = post;
    const movieImageUrl =
      firstPost.fields.movieImage &&
      typeof firstPost.fields.movieImage === "object" &&
      "fields" in firstPost.fields.movieImage
        ? (firstPost.fields.movieImage.fields as { file: { url: string } }).file
            .url
        : "";
    const movieTitle = firstPost.fields.postTitle || "";
    const movieHeader = firstPost.fields.header || "";
    const movieRating = firstPost.fields.rating || "";
    const authorImage =
      firstPost.fields.author?.fields.profilePicture?.fields.file?.url || "";
    const authorName = firstPost.fields.author?.fields.name || "Unknown Author";
    const featuredImage = firstPost.fields.featuredImage?.fields.file?.url || "";
    const backgroundStyle = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.9) 100%), url(https:${featuredImage})`,
    };

    return (
      <section className={`w-2/3 flex items-end p-5 bg-cover bg-center rounded-lg`} style={backgroundStyle}>
        <Link href={`/movies/movie-review/${firstPost.sys.id}`} className="rounded-lg flex w-full">
          <div className="mr-5">
            <Image
              src={`https:${movieImageUrl ? movieImageUrl : ""}`}
              alt={String(movieTitle)}
              width={150}
              height={150}
            />
          </div>
          <div>
            <h2 className="text-6xl font-bold">{String(movieTitle)}</h2>
            <p className="mt-2 text-xl">{String(movieHeader)}</p>
            <p className="mt-2">{String(movieRating)}</p>
            <div className="flex items-center mt-4">
              <Image
                src={`https:${authorImage ? authorImage : ""}`}
                alt={String(authorImage)}
                width={200}
                height={200}
                className="w-10 h-10 rounded-full mr-2"
              />
              <p>{String(authorName)}</p>
            </div>
          </div>
        </Link>
      </section>
    );
  } else {
    return <div>No posts found</div>;
  }
}
