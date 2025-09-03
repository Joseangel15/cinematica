import Image from "next/image";

export default function NewsBanner() {
    const newsArticles = [
        {
            title: "Breaking: New Movie Released",
            imageUrl: "https://theposterdb.com/api/assets/52633/view"
        },
        {
            title: "Celebrity Interview: Behind the Scenes",
            imageUrl: "https://theposterdb.com/api/assets/52634/view"
        },
        {
            title: "Box Office: This Week's Top Movies",
            imageUrl: "https://theposterdb.com/api/assets/52635/view"
        }
    ];

    return (
        <section className="p-4 w-1/3 bg-neutral rounded-2xl">
            <div>
                <h2 className="text-2xl font-bold text-center p-4">Latest News</h2>
                <div className="w-full justify-center">
                    {
                        newsArticles.map((article, index) => (
                            <div key={index} className="flex items-center pb-3">
                                <Image src={article.imageUrl} alt={article.title} width={100} height={100} />
                                <h3 className="text-lg font-semibold p-4">{article.title}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
