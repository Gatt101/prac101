"use client";

interface Paper {
  id: string;
  title: string;
  authors: string[];
  summary: string;
  published: string;
  primaryCategory: string;
  linkPdf: string;
}

interface PaperListProps {
  papers: Paper[];
  activePaper: Paper | null;
  onPaperSelect: (paper: Paper) => void;
}

export default function PaperList({ papers, activePaper, onPaperSelect }: PaperListProps) {
  if (papers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No papers found. Try searching for topics like "machine learning", "neural networks", or "computer vision".</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {papers.map((paper) => (
        <div 
          key={paper.id} 
          className={`p-4 border rounded cursor-pointer transition-all hover:shadow-md ${
            activePaper?.id === paper.id 
              ? "border-black bg-blue-50" 
              : "border-gray-200 hover:border-gray-300"
          }`} 
          onClick={() => onPaperSelect(paper)}
        >
          <div className="font-semibold text-lg mb-2 line-clamp-2">
            {paper.title}
          </div>
          
          <div className="text-sm text-gray-600 mb-2">
            {paper.authors?.join(", ") || "Unknown authors"}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span>{new Date(paper.published).toLocaleDateString()}</span>
            <span className="px-2 py-1 bg-gray-100 rounded">
              {paper.primaryCategory}
            </span>
            {paper.linkPdf && (
              <a 
                href={paper.linkPdf} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                PDF
              </a>
            )}
          </div>
          
          <div className="text-sm text-gray-700 line-clamp-3">
            {paper.summary}
          </div>
        </div>
      ))}
    </div>
  );
}
