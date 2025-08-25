import { getEntries } from "../../../lib/contenful";
import { Entry } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";

export default async function TvReviewPage() {
  const posts: Entry[] = await getEntries("blogPost");

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Movie Review</h1>
      <ul>
        {posts.map((post: Entry) => (
          <li key={post.sys.id} className="post-item">
            {post.fields.movieImage && (
              <Image
                src={
                  "https:" +
                  (post.fields.movieImage as { fields: { file: { url: string } } })?.fields?.file?.url
                }
                alt={post.fields.postTitle?.toString() || "Movie image"}
                width={500}
                height={300}
              />
            )}
            <h2 className="text-xl font-bold">
              {post.fields.postTitle?.toString()}
            </h2>
            {post.fields.postContent && 
              typeof post.fields.postContent === "object" && documentToReactComponents(post.fields.postContent as unknown as Document)}
          </li>
        ))}
      </ul>
    </div>
  );
}
