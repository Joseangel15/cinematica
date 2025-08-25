import Image from "next/image";
import Link from "next/link";

export default function TvHomeBanner() {
    const movieCards = [
        {
            title: "Inception",
            imageUrl: "https://theposterdb.com/api/assets/52633/view"
        },
        {
            title: "The Dark Knight",
            imageUrl: "https://theposterdb.com/api/assets/21708/view"
        },
        {
            title: "Interstellar",
            imageUrl: "https://theposterdb.com/api/assets/16258/view"
        }
    ]

    return (
        <section className="py-8 px-8">
            <div>
                <h2 className="text-2xl font-bold text-center p-8"><Link href="/tv-streaming">Featured Shows</Link></h2>
                <div className="carousel w-full justify-center">
                    {
                        movieCards.map((movie, index) => (
                            <div key={index} className="carousel-item flex flex-col items-center justify-center p-4">
                                <Image src={movie.imageUrl} alt={movie.title} width={300} height={300} />
                                <h3 className="text-lg font-semibold p-4">{movie.title}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
                    
