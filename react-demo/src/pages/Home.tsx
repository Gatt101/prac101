import MovieCard from "../components/MovieCard"

function Home() {
    // Sample movie data with all required properties
    const movies = [
        { 
            id: 1, 
            title: "John Wick ", 
            url: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_.jpg",
            description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog and took his car.",
            rating: 7.4
        },
        { 
            id: 2, 
            title: "The Matrix", 
            url: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
            description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
            rating: 8.7
        },
        { 
            id: 3, 
            title: "Inception", 
            url: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.",
            rating: 8.8
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-white mb-8 text-center">Popular Movies</h1>
            <div className="flex flex-wrap justify-center">
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        onWatchClick={(id) => alert(`Added movie #${id} to your watchlist!`)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Home;