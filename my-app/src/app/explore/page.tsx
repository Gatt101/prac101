'use client'
import axios from "axios";
import { useState } from "react";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [papers, setPapers] = useState<any[]>([]);

  const handleFeed = async () => {
    try {
      const response = await axios.get("/api/arxiv/feed", {
        params: { limit }
      });
      setLimit(limit + 10);
      setPapers(response.data.papers || []);
    } catch (error) {
      console.error("Error fetching feed:", error);
      alert("Error fetching feed. Please try again.");
    } 
  };
  const handleClear = () => {
    setSearchTerm("");
    setPapers([]);
  }

  const handleSearch = async () => {
    try {
      console.log("Searching for:", searchTerm);
      const response = await axios.post("/api/arxiv/search", { searchItem: searchTerm });
      const data = response.data;
      setPapers(data.papers);
      console.log(data);
      setSearchTerm("");
    } 
    catch (error) {
      console.error("Error during search:", error);
      alert("Error during search. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-10 px-4">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-white mb-2">Explore Research Papers</h1>
      <p className="text-gray-400 mb-8">
        Discover the latest advancements in AI research and beyond.
      </p>

      {/* Search Bar */}
      <div className="flex w-full max-w-3xl items-center gap-3 mb-10">
        <input
          type="text"
          value={searchTerm}
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          placeholder="Search papers..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow transition duration-200"
        >
          🔍 Search
        </button>
        <button
          onClick={handleClear}
          className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow transition duration-200"
        >
          🔄 Clear
        </button>
      </div>

      {/* Papers Grid */}
      <div className="w-full max-w-6xl grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-gray-800 border border-gray-700 rounded-xl shadow-sm p-5 hover:shadow-lg transition duration-300 hover:border-gray-600"
          >
            {/* Title */}
            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
              {paper.title}
            </h3>

            {/* Summary */}
            <p className="text-gray-300 text-sm mb-3 line-clamp-4">
              {paper.summary}
            </p>

            {/* Metadata */}
            <p className="text-sm text-gray-400 mb-1">
              <span className="font-medium text-gray-300">Authors:</span> {paper.authors.join(", ")}
            </p>
            <p className="text-sm text-gray-400 mb-4">
              <span className="font-medium text-gray-300">Published:</span> {paper.published}
            </p>

            {/* PDF Link */}
            <a
              href={paper.pdfLink || paper.linkPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-block text-blue-400 hover:text-blue-300 font-medium transition"
            >
              📄 View PDF
            </a>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {papers.length === 0 && (
        <p className="text-gray-500 mt-10">
            Search for papers to explore the latest research in AI and beyond.
        </p>
      )}
    </div>
  );
}