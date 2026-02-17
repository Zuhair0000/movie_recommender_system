import { useState } from "react";
import axios from "axios";
import { Search, Film, Loader2 } from "lucide-react";

function App() {
  const [movieName, setMovieName] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!movieName.trim()) return;

    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      // 1. Call our FastAPI Backend
      const response = await axios.post("http://127.0.0.1:8000/recommend", {
        movies_name: movieName, // Ensure this matches your Pydantic model key
      });

      // 2. Update State
      setRecommendations(response.data.recommedations); // Check spelling in your API return!
    } catch (err) {
      setError("Movie not found! Try another title.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Film className="w-16 h-16 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
          CineMatch AI
        </h1>
        <p className="text-slate-400">Powered by Content-Based Filtering</p>
      </div>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="w-full max-w-md mb-12 relative">
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter a movie (e.g., Avatar)..."
          className="w-full px-6 py-4 rounded-full bg-slate-800 border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-lg transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-2 p-2 bg-emerald-500 rounded-full hover:bg-emerald-600 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Search className="w-6 h-6" />
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 mb-8">
          {error}
        </div>
      )}

      {/* Results Grid */}
      {recommendations.length > 0 && (
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-6 text-slate-300">
            Recommended for you:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((movie, index) => (
              <div
                key={index}
                className="p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition-all hover:transform hover:-translate-y-1 group"
              >
                <h3 className="text-lg font-medium group-hover:text-emerald-400 transition-colors">
                  {movie}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
