import { Entry } from "contentful";
import { getEntryBlogPosts } from "..//../lib/contenful";


export default async function Movies() {
    const movieListings: Entry[] = await getEntryBlogPosts();
    console.log(movieListings);

    return (
        <section>
            <h1 className="text-3xl font-bold text-center">Movies</h1>
            <p className="mt-4 text-center">
                Explore the latest movies and find out where to watch them.
            </p>
            <div>
                {movieListings.map((movie) => (
                    <div key={movie.sys.id} className="border-b border-gray-200 py-4">
                        <h2 className="text-xl font-semibold">{movie.fields.postTitle}</h2>
                        <p className="text-gray-600">{movie.fields.rating}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}