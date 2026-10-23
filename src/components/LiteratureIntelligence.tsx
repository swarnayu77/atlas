import React, { useState } from 'react';
import { ScientificPaper } from '../types/scientific';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  Columns, 
  Filter, 
  Check, 
  Copy, 
  X,
  ArrowRight
} from 'lucide-react';

interface LiteratureIntelligenceProps {
  initialPapers: ScientificPaper[];
}

export const LiteratureIntelligence: React.FC<LiteratureIntelligenceProps> = ({
  initialPapers,
}) => {
  const [papers, setPapers] = useState<ScientificPaper[]>(initialPapers);
  const [query, setQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [onlyOpenAccess, setOnlyOpenAccess] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  // Side-by-side comparison state
  const [comparisonPapers, setComparisonPapers] = useState<ScientificPaper[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const res = await fetch(
        `/api/literature/search?q=${encodeURIComponent(query)}&source=${sourceFilter}&limit=15`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.papers && data.papers.length > 0) {
        setPapers(data.papers);
      }
    } catch (err) {
      console.error('Literature search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleCompare = (paper: ScientificPaper) => {
    if (comparisonPapers.some((p) => p.id === paper.id)) {
      setComparisonPapers((prev) => prev.filter((p) => p.id !== paper.id));
    } else {
      if (comparisonPapers.length >= 2) {
        setComparisonPapers([comparisonPapers[1], paper]);
      } else {
        setComparisonPapers((prev) => [...prev, paper]);
      }
    }
  };

  const copyBibtex = (paper: ScientificPaper) => {
    const bib = `@article{${paper.authors[0]?.split(' ')[0] || 'author'}${paper.year},
  title = {${paper.title}},
  author = {${paper.authors.join(' and ')}},
  journal = {${paper.venue}},
  year = {${paper.year}},
  doi = {${paper.doi || ''}},
  url = {${paper.url}}
}`;
    navigator.clipboard.writeText(bib);
    setCopiedDoi(paper.id);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  const filtered = papers.filter((p) => {
    if (onlyOpenAccess && !p.isOpenAccess) return false;
    return true;
  });

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
            Literature & Patents
          </h1>
          <p className="text-sm text-[#667085] dark:text-[#94A3B8]">
            Multi-source scholarly search querying OpenAlex (250M+ works), Europe PMC, and arXiv preprints.
          </p>
        </div>

        {comparisonPapers.length > 0 && (
          <button
            onClick={() => setShowComparisonModal(true)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <Columns className="w-4 h-4" />
            <span>Compare Selected ({comparisonPapers.length}/2)</span>
          </button>
        )}
      </div>

      {/* Search Bar & Filters */}
      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-6 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search papers by keyword, topic, author, or DOI..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-100 placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-indigo-600 focus:bg-white dark:focus:bg-slate-900 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1.5 text-[#667085] dark:text-slate-400">
                <span>Repository:</span>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs rounded-md px-2 py-1 focus:outline-none focus:border-indigo-600 font-sans"
                >
                  <option value="all">Unified (All Sources)</option>
                  <option value="openalex">OpenAlex Scholarly Graph</option>
                  <option value="europepmc">Europe PMC / PubMed</option>
                  <option value="arxiv">arXiv Preprints</option>
                </select>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer text-[#4B5563] dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={onlyOpenAccess}
                  onChange={(e) => setOnlyOpenAccess(e.target.checked)}
                  className="rounded border-[#E5E7EB] dark:border-slate-700 text-indigo-600 focus:ring-0"
                />
                <span>Open Access Only</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-1.5 disabled:opacity-50 transition-colors shadow-xs"
            >
              {isSearching ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Search Literature</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs text-[#667085] dark:text-[#94A3B8]">
          <span>Showing {filtered.length} Authoritative Publications</span>
          <span>Click "Compare" to benchmark two methodologies</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {filtered.map((paper) => {
            const isComparing = comparisonPapers.some((p) => p.id === paper.id);

            return (
              <div
                key={paper.id}
                className={`p-5 rounded-xl border transition-all space-y-2.5 ${
                  isComparing
                    ? 'bg-white dark:bg-[#111827] border-indigo-500 ring-1 ring-indigo-500/20 shadow-xs'
                    : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs">
                      <span className="font-mono text-[10px] text-[#667085] dark:text-slate-400 px-1.5 py-0.2 rounded bg-[#F1F4F8] dark:bg-slate-800">
                        {paper.source}
                      </span>
                      <span className="text-[#667085] dark:text-slate-400">
                        {paper.venue} ({paper.year})
                      </span>
                      {paper.isOpenAccess && (
                        <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded">
                          Open Access
                        </span>
                      )}
                      {paper.citationCount > 0 && (
                        <span className="text-[11px] text-[#667085] dark:text-slate-400 font-mono">
                          {paper.citationCount.toLocaleString()} citations
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-semibold text-[#172033] dark:text-white leading-snug">
                      {paper.title}
                    </h3>

                    <p className="text-xs text-[#667085] dark:text-slate-400">
                      {paper.authors.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleCompare(paper)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isComparing
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800'
                          : 'bg-white dark:bg-slate-800 text-[#4B5563] dark:text-slate-300 border-[#E5E7EB] dark:border-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {isComparing ? '✓ Comparing' : '+ Compare'}
                    </button>

                    <button
                      onClick={() => copyBibtex(paper)}
                      className="p-1.5 rounded-lg border border-[#E5E7EB] dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      title="Copy BibTeX Citation"
                    >
                      {copiedDoi === paper.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg border border-[#E5E7EB] dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 transition-colors"
                        title="View Source Link / DOI"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {paper.abstract && (
                  <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed line-clamp-3 hover:line-clamp-none transition-all">
                    {paper.abstract}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && comparisonPapers.length === 2 && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-[#111827] max-w-5xl w-full p-6 sm:p-8 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#1E293B] pb-4">
              <div className="flex items-center gap-2 text-base font-semibold text-[#172033] dark:text-white">
                <Columns className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>Side-by-Side Methodology Comparison</span>
              </div>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {comparisonPapers.map((p, idx) => (
                <div key={p.id} className="p-5 rounded-xl bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 uppercase font-semibold">
                      Paper #{idx + 1} ({p.year})
                    </span>
                    <h4 className="text-sm font-semibold text-[#172033] dark:text-white leading-snug">{p.title}</h4>
                    <p className="text-xs text-[#667085] dark:text-slate-400">{p.venue}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white dark:bg-slate-950 border border-[#E5E7EB] dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-medium text-[#667085] dark:text-slate-400 uppercase">Abstract Summary:</span>
                    <p className="text-[#172033] dark:text-slate-200 leading-relaxed text-xs">{p.abstract}</p>
                  </div>

                  {p.doi && (
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 pt-2 border-t border-[#E5E7EB] dark:border-slate-800 font-mono">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                        <span>doi:{p.doi}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
