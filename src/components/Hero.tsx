import Image from "next/image";
import { Entry } from "contentful";
import { getEntryById } from "../lib/contenful";

export default async function Hero() {
  // Main post ID
  const postId = "3hmvWQufqUwc2D1z1news"; // Replace with your actual post ID
  const post: Entry = await getEntryById(postId);
  console.log(post);

  if (post) {
    const firstPost = post;
    return (
      <section className="hero pt-10">
        <div className="hero-content flex-col lg:flex-row">
          <div className="relative mr-2.5">
            <Image
              src={`https:${
                firstPost.fields.movieImage &&
                typeof firstPost.fields.movieImage === "object" &&
                "fields" in firstPost.fields.movieImage
                  ? "fields" in firstPost.fields.movieImage &&
                    firstPost.fields.movieImage.fields?.file?.url
                  : ""
              }`}
              alt={
                firstPost.fields.movieImage &&
                typeof firstPost.fields.movieImage === "object" &&
                "fields" in firstPost.fields.movieImage &&
                firstPost.fields.movieImage.fields?.title
                  ? firstPost.fields.movieImage.fields.title
                  : ""
              }
              width={200}
              height={200}
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              {String(firstPost.fields.postTitle)}
            </h2>
            <p className="mt-2">{String(firstPost.fields.header)}</p>
            <p className="mt-2">{String(firstPost.fields.rating)}</p>
            <div className="flex items-center mt-4">
              <Image
                src={`https:${
                  firstPost.fields.author &&
                  firstPost.fields.author.fields.profilePicture &&
                  firstPost.fields.author.fields.profilePicture.fields.file?.url
                    ? String(
                        firstPost.fields.author.fields.profilePicture.fields
                          .file.url
                      )
                    : ""
                }`}
                alt={firstPost.fields.author.fields.name}
                width={200}
                height={200}
                className="w-10 h-10 rounded-full mr-2"
              />
              <p>{firstPost.fields.author?.fields.name || "Unknown Author"}</p>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <div>No posts found</div>;
  }
}
