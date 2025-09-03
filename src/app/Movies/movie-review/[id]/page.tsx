import { getEntryById } from "../../../../lib/contenful";
import { Entry } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Image from "next/image";
import Ratings from "../../../../components/Ratings";

export default async function MovieReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: postId } = await params;
  const post: Entry = await getEntryById(postId);
  const movieHeader = post.fields.header?.toString() || "";

  return (
    <div className="max-w-4xl mx-auto p-5">
      <div>
        <h1 className="text-4xl font-bold text-left mb-2">
          {post.fields.postTitle?.toString()}
        </h1>
        <h2 className="text-xl text-left text-gray-500 mb-2">{movieHeader}</h2>
        <div className="flex items-center mt-2">
          <Ratings ratingPost={post} />
        </div>
      </div>
      {Array.isArray(post.fields.otherImages) &&
        post.fields.otherImages[0]?.fields?.file?.url && (
          <Image
            src={`https:${post.fields.otherImages[0].fields.file.url}`}
            alt={post.fields.postTitle?.toString() || "Movie image"}
            width={500}
            height={300}
            className="rounded-lg mt-5 mb-5 w-full"
          />
        )}
      <div className="post-content">
        {post.fields.postContent &&
          typeof post.fields.postContent === "object" &&
          documentToReactComponents(
            post.fields.postContent as unknown as Document
          )}
      </div>
    </div>
  );
}
