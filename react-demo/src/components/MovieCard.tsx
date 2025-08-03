
// Define proper types for the movie prop
interface Movie {
  id: number;
  title: string;
  url: string;
  description?: string;
  rating?: number;
}

interface MovieCardProps {
  movie: Movie;
  onWatchClick?: (movieId: number) => void;
}

function MovieCard({ movie, onWatchClick }: MovieCardProps) {

    function handleWatchClick() {
        // Use the provided callback if available, otherwise use a default alert
        if (onWatchClick) {
            onWatchClick(movie.id);
        } else {
            alert(`You clicked on ${movie.title}`);
        }
    }
    
    return (
        <div className="movie-card w-64 m-4">
            <div className="flex flex-col relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                    src={movie.url} 
                    alt={movie.title} 
                    className="w-full h-96 object-cover"
                />
                <div className="p-4 bg-gray-800">
                    <h3 className="text-xl font-bold text-white mb-2">{movie.title}</h3>
                    {movie.description && (
                        <p className="text-gray-300 text-sm mb-2">{movie.description}</p>
                    )}
                    {movie.rating && (
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-400">★</span>
                            <span className="text-white ml-1">{movie.rating}/10</span>
                        </div>
                    )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <button 
                        className="bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition duration-300 font-bold"
                        onClick={handleWatchClick}
                    >
                        Watch Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;