"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (q: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [q, setQ] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(q);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input 
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        value={q} 
        onChange={e => setQ(e.target.value)} 
        placeholder="Search arXiv (e.g., diffusion models, transformer architecture)" 
      />
      <button 
        type="submit"
        className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
