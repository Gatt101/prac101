'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import Link from 'next/link';
import axios from 'axios';

interface Paper {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  pdfLink: string;
  primaryCategory?: string;
}

export default function PaperDetailPage() {
  const params = useParams();
  const { id } = params;

  const [paper, setPaper] = useState<Paper | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summaryMode, setSummaryMode] = useState<'beginner' | 'story' | 'buzz'>('beginner');
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Helper: extract arXiv id from a paper.id like "http://arxiv.org/abs/2401.12345"
  const extractIdFromPaper = (p: Paper | null): string | null => {
    if (!p?.id) return null;
    const m = p.id.match(/\/abs\/(.+)$/);
    return m ? m[1] : null;
  };

  // Try to hydrate from sessionStorage first, then fetch if needed
  useEffect(() => {
    if (!id) return;

    const idStr = typeof id === 'string' ? id : String(id);

    const tryHydrateFromStorage = () => {
      try {
        const raw = sessionStorage.getItem('selectedPaper');
        const rawId = sessionStorage.getItem('selectedPaperId');

        if (!raw) return false;

        const cached: Paper = JSON.parse(raw);
        const cachedIdFromField = extractIdFromPaper(cached);
        const matchByStoredId = rawId && rawId === idStr;
        const matchByAbs = cachedIdFromField && cachedIdFromField === idStr;
        const matchByPdf = cached?.pdfLink?.includes(idStr);

        if (matchByStoredId || matchByAbs || matchByPdf) {
          setPaper(cached);
          setLoading(false);

          // Optional: Clear after use to avoid stale data later
          try {
            sessionStorage.removeItem('selectedPaper');
            sessionStorage.removeItem('selectedPaperId');
          } catch {}

          return true;
        }
      } catch (e) {
        console.warn('Failed to read sessionStorage:', e);
      }
      return false;
    };

    const hydrated = tryHydrateFromStorage();
    if (!hydrated) {
      // Fallback: fetch by id (your original flow)
      fetchPaperDetails(idStr);
    }
  }, [id]);

  const fetchPaperDetails = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching paper details for:', searchQuery);
       
      // Try direct search first (the API will now use id_list for arXiv IDs)
      try {
        const response = await axios.get(`/api/arxiv/search?query=${encodeURIComponent(searchQuery)}&max=1`);
        
        if (response.data.papers && response.data.papers.length > 0) {
          const foundPaper = response.data.papers[0];
          console.log('Found paper:', foundPaper.title);
          setPaper(foundPaper);
        } else {
          console.log('No paper found in API response');
          setError('Paper not found in arXiv database');
        }
      } catch (apiError) {
        console.error('API error:', apiError);
        setError('Failed to fetch paper from arXiv');
      }
    } catch (err) {
      console.error('Error fetching paper:', err);
      setError('Failed to load paper details');
    } finally {
      setLoading(false);
    }
  };

  const generateAISummary = async () => {
    if (!paper) {
      console.log('Cannot generate summary: no paper data');
      return;
    }

    if (!isLoggedIn) {
      console.log('Cannot generate summary: user not logged in');
      setAiSummary('Please log in to view AI summaries');
      return;
    }

    try {
      setLoadingSummary(true);
      console.log('Generating AI summary...', { mode: summaryMode, paperTitle: paper.title });
      
      const response = await axios.post('/api/summarize', {
        text: `${paper.title}. ${paper.summary}`,
        mode: summaryMode
      });
      
      console.log('AI summary response:', response.data);
      setAiSummary(response.data.summary || 'Summary not available');
    } catch (error) {
      console.error('Error generating summary:', error);
      setAiSummary('Failed to generate AI summary. Please try again.');
    } finally {
      setLoadingSummary(false);
    }
  };
  // Check authentication when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/users/me');
        if (response.data.data) {
          // setUser(response.data.data); // Removed: setUser is not defined
          console.log("User data:", response.data.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
      }
    };
  
    checkAuth();
  }, []); // Run once when component mounts

  // Auto-generate summary whenever paper AND user login status changes
  useEffect(() => {
    if (paper && isLoggedIn) {
      console.log('Generating AI summary for logged in user');
      generateAISummary();
    }
  }, [paper, summaryMode, isLoggedIn, generateAISummary]); // Watch paper, summaryMode, and isLoggedIn

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading paper details...</p>
        </div>
      </div>
    );
  }

  if (error || !paper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold text-white mb-4">Paper Not Found</h1>
          <p className="text-gray-400 mb-6">{error || 'The requested paper could not be found.'}</p>
          <Link
            href="/explore"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
          >
            ← Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background elements */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px] opacity-20" />

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Back button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-xl transition-colors backdrop-blur-sm border border-gray-700/50"
          >
            ← Back to Explore
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-xl p-8 backdrop-blur-sm"
            >
              {/* Category badge */}
              {paper.primaryCategory && (
                <div className="inline-block px-3 py-1 bg-blue-600/20 text-blue-300 text-sm font-medium rounded-full border border-blue-500/30 mb-6">
                  {paper.primaryCategory}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl font-bold text-white mb-6 leading-tight">{paper.title}</h1>

              {/* Authors */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">AUTHORS</h3>
                <p className="text-lg text-gray-300">{paper.authors?.join(', ') || 'Unknown authors'}</p>
              </div>

              {/* Published date */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-400 mb-2">PUBLISHED</h3>
                <p className="text-lg text-gray-300">
                  {new Date(paper.published).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Original Abstract */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Abstract</h3>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <p className="text-gray-300 leading-relaxed text-lg">{paper.summary}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={paper.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-medium rounded-xl transition-colors shadow-lg"
                >
                  📄 View PDF
                </a>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-xl p-6 backdrop-blur-sm sticky top-8"
            >
              {
               isLoggedIn ? (
                <div>
                 {/* AI Summary */}
                 
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">AI Summary</h3>

              {/* Summary mode tabs */}
              <div className="flex gap-2 mb-4">
                {(['beginner', 'story', 'buzz'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSummaryMode(mode)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      summaryMode === mode
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                    }`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>

              {/* Manual generate button */}
              <div className="mb-4">
                <button
                  onClick={generateAISummary}
                  disabled={loadingSummary || !paper || !isLoggedIn}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  {loadingSummary ? 'Generating...' : 'Generate AI Summary'}
                </button>
              </div>

              {/* Summary content */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 min-h-[200px]">
                {loadingSummary ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <p className="text-gray-300 leading-relaxed">
                    {aiSummary || 'Click a summary mode to generate AI insights.'}
                  </p>
                )}
              </div>
            </div>
                 
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">AI Summary</h3>
                  <p className="text-gray-300 leading-relaxed">Plzz Login to get AI Summary</p>
        </div>
    )
              }

              {/* Paper Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-1">PAPER ID</h4>
                  <p className="text-sm text-gray-300 font-mono bg-gray-800/50 px-2 py-1 rounded">
                    {typeof id === 'string' ? id : String(id)}
                  </p>
                </div>

                {paper.primaryCategory && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">CATEGORY</h4>
                    <p className="text-sm text-gray-300">{paper.primaryCategory}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
