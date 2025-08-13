'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

interface Paper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  pdfLink: string;
  primaryCategory?: string;
}

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [feed, setFeed] = useState<Paper[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [loading, setLoading] = useState(false);

  

  // Fetch feed data
  useEffect(() => {
    const fetchData = async () => {
      await handleFeed();
    };
    fetchData();
  }, [limit]);

  const handleFeed = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/arxiv/feed", { limit });
      const data = response.data;
      if (limit === 10) {
        setFeed(data.papers); // First load
      } else {
        setFeed(prevFeed => [...prevFeed, ...data.papers]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll for feed mode
  useEffect(() => {
    const handleScroll = () => {
      if (isSearchMode || loading) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 100) {
        setLimit(prevLimit => prevLimit + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearchMode, loading]);

  const handleClear = () => {
    setSearchTerm("");
    setPapers([]);
    setIsSearchMode(false);
    setLimit(10);
    setFeed([]);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setIsSearchMode(true);
      const response = await axios.post("/api/arxiv/search", { searchItem: searchTerm });
      const data = response.data;
      setPapers(data.papers);
    } catch (error) {
      console.error("Error during search:", error);
      alert("Error during search. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Extract paper ID from arXiv URL (for building /explore/[id] path)
  const extractPaperId = (paper: Paper, index: number) => {
    if (paper.id) {
      const match = paper.id.match(/\/abs\/(.+)$/);
      return match ? match[1] : `paper-${index}`;
    }
    return `paper-${index}`;
  };

  // ===== CHILD CARD (saves to sessionStorage before navigation) =====
  const PaperCard = ({ paper, index, isSearch = false }: { paper: Paper; index: number; isSearch?: boolean }) => {
    const paperId = extractPaperId(paper, index);

    return (
      <div className="group">
        <Link
          href={`/explore/${encodeURIComponent(paperId)}`}
          className="block h-full"
          onClick={() => {
            // Save the full paper object so the detail page can hydrate instantly
            try {
              sessionStorage.setItem("selectedPaper", JSON.stringify(paper));
              sessionStorage.setItem("selectedPaperId", paperId); // quick check on the other side
            } catch (e) {
              // If user has disabled storage or it fails, we’ll just fetch on the detail page
              console.warn("Unable to use sessionStorage:", e);
            }
          }}
        >
          <div className="relative h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-blue-500/50 backdrop-blur-sm">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Category badge */}
            {paper.primaryCategory && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                {paper.primaryCategory}
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
                {paper.title}
              </h3>

              {/* Summary */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                {paper.summary}
              </p>

              {/* Authors */}
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-1">
                  <span className="font-medium text-gray-300">Authors:</span>
                </p>
                <p className="text-sm text-gray-300 line-clamp-2">
                  {paper.authors?.join(", ") || "Unknown authors"}
                </p>
              </div>

              {/* Published date */}
              <p className="text-xs text-gray-500 mb-4">
                <span className="font-medium">Published:</span>{" "}
                {new Date(paper.published).toLocaleDateString()}
              </p>

              {/* Bottom actions */}
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-blue-400 font-medium">Read More →</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="p-2 bg-red-600/20 text-red-300 hover:bg-red-600/30 rounded-lg transition-colors text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(paper.pdfLink, '_blank');
                    }}
                  >
                    📄 PDF
                  </button>
                  <button
                    className="p-2 bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 rounded-lg transition-colors text-xs"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Add summarize functionality here
                    }}
                  >
                    ✨ AI
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px] opacity-20" />

      <div className="relative flex flex-col items-center py-12 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4">
            Explore Research Papers
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the latest advancements in AI research and beyond. Click any paper to dive deep into the details.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-4xl mb-12"
        >
          <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-2">
            <input
              type="text"
              value={searchTerm}
              className="flex-1 bg-transparent border-none px-4 py-3 focus:outline-none text-white placeholder-gray-400 text-lg"
              placeholder="Search for papers, topics, authors..."
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium rounded-xl shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "🔄" : "🔍"} Search
            </button>
            {isSearchMode && (
              <button
                onClick={handleClear}
                className="px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white font-medium rounded-xl transition-all duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Results */}
        {isSearchMode ? (
          <div className="w-full max-w-7xl">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : papers.length > 0 ? (
              <>
                <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-2xl font-semibold mb-8">
                  Search Results ({papers.length} papers found)
                </motion.h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {papers.map((paper, idx) => (
                    <PaperCard key={`search-${idx}`} paper={paper} index={idx} isSearch />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-xl">No search results found.</p>
                <p className="text-gray-600 mt-2">Try different keywords or check your spelling.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-7xl">
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-2xl font-semibold mb-8">
              Latest Research Feed
            </motion.h2>
            {feed.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {feed.map((paper, idx) => (
                  <PaperCard key={`feed-${idx}`} paper={paper} index={idx} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-500 text-xl">Loading research papers...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
