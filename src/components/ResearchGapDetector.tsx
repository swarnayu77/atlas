import React, { useState } from 'react';
import { ResearchGap } from '../types/scientific';
import { 
  Layers, 
  Search, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen, 
  ArrowRight
} from 'lucide-react';

interface ResearchGapDetectorProps {
  gaps: ResearchGap[];
  onAnalyzeGap: (domain: string, secondaryDomain: string) => Promise<void>;
  isLoading: boolean;
}

export const ResearchGapDetector: React.FC<ResearchGapDetectorProps> = ({
  gaps,
  onAnalyzeGap,
  isLoading,
}) => {
  const [selectedGap, setSelectedGap] = useState<ResearchGap>(gaps[0] || null);
  const [domainInput, setDomainInput] = useState('Solid-State Batteries');
  const [secondaryDomainInput, setSecondaryDomainInput] = useState('Geophysical Rock Mechanics');

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;
    try {
      await onAnalyzeGap(domainInput, secondaryDomainInput);
    } catch (err: any) {
      console.warn('Gap analyze captured:', err?.message || err);
    }
  };

  const getImpactBadge = (impact: ResearchGap['potentialImpact']) => {
    switch (impact) {
      case 'Paradigm Shift':
        return 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50';
      case 'High':
        return 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/50';
      case 'Incremental':
      default:
        return 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
          Research Gap Detector
        </h1>
        <p className="text-sm text-[#667085] dark:text-[#94A3B8]">
          Surface underexplored concept combinations, contradictory empirical results, and authors' acknowledged limitations.
        </p>
      </div>

      {/* Query Form */}
      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-6 shadow-xs">
        <form onSubmit={handleRun} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#172033] dark:text-slate-200">
              Primary Research Domain
            </label>
            <input
              type="text"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="e.g. Cryopreservation Biology"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-xs sm:text-sm text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#172033] dark:text-slate-200">
              Secondary / Intersection Domain
            </label>
            <input
              type="text"
              value={secondaryDomainInput}
              onChange={(e) => setSecondaryDomainInput(e.target.value)}
              placeholder="e.g. High-Entropy Alloy Metallurgy"
              className="w-full px-3.5 py-2.5 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-xs sm:text-sm text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading || !domainInput.trim()}
              className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Scanning Literature Gaps...</span>
                </>
              ) : (
                <>
                  <span>Detect research gaps</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Main Grid: Identified Gaps + Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Gaps List */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8] block px-1">
            Identified Research Gaps ({gaps.length})
          </span>

          <div className="space-y-2.5">
            {gaps.map((gap) => {
              const isSelected = selectedGap?.id === gap.id;
              return (
                <div
                  key={gap.id}
                  onClick={() => setSelectedGap(gap)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white dark:bg-[#111827] border-indigo-500 ring-1 ring-indigo-500/20 shadow-xs'
                      : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-[#667085] dark:text-[#94A3B8]">
                    <span>{gap.domain}</span>
                    <span className="font-mono text-[10px] text-indigo-600 dark:text-indigo-400">
                      Score: {gap.opportunityScore}/100
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-[#172033] dark:text-white line-clamp-2 leading-snug">
                    {gap.title}
                  </h4>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className={`px-2 py-0.2 rounded-full border text-[10px] font-medium ${getImpactBadge(gap.potentialImpact)}`}>
                      {gap.potentialImpact}
                    </span>
                    <span className="text-[#667085] dark:text-slate-400 font-mono text-[10px]">
                      {gap.authorAcknowledgedLimitations.length} paper citations
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Gap Dossier */}
        <div className="lg:col-span-2 space-y-6">
          {selectedGap ? (
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#E5E7EB] dark:border-[#1E293B] pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${getImpactBadge(selectedGap.potentialImpact)}`}>
                      {selectedGap.potentialImpact}
                    </span>
                    <span className="text-xs text-[#667085] dark:text-[#94A3B8]">
                      Intersection: {selectedGap.domain} ∩ {selectedGap.secondaryDomain}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#172033] dark:text-white leading-snug">
                    {selectedGap.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-[#172033] dark:text-slate-200 leading-relaxed p-4 rounded-lg bg-[#F7F8FA] dark:bg-slate-900/60 border border-[#E5E7EB] dark:border-[#1E293B]">
                {selectedGap.description}
              </div>

              {/* 2-column comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#1E293B] space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#667085] dark:text-slate-400 block">
                    Frequently Studied Conventional Paradigm
                  </span>
                  <p className="text-[#4B5563] dark:text-slate-300 leading-relaxed">
                    {selectedGap.frequentlyStudiedParadigm}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block">
                    Underexplored Intersectional Opportunity
                  </span>
                  <p className="text-[#172033] dark:text-slate-200 leading-relaxed">
                    {selectedGap.underexploredIntersection}
                  </p>
                </div>
              </div>

              {/* Contradictory Evidence */}
              <div className="p-4 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-1.5 text-xs">
                <span className="text-xs font-medium uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Identified Disagreements in Literature
                </span>
                <p className="text-[#4B5563] dark:text-slate-300 leading-relaxed">
                  {selectedGap.contradictoryEvidenceSummary}
                </p>
              </div>

              {/* Author Acknowledged Limitations */}
              <div className="space-y-3">
                <span className="text-xs font-medium uppercase tracking-wider text-[#667085] dark:text-slate-400 block flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Repeatedly Acknowledged Author Limitations ({selectedGap.authorAcknowledgedLimitations.length}):
                </span>
                <div className="space-y-2">
                  {selectedGap.authorAcknowledgedLimitations.map((lim, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-[#172033] dark:text-slate-200 font-medium">
                        <span>{lim.paperTitle}</span>
                        {lim.doi && (
                          <a
                            href={`https://doi.org/${lim.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-mono text-[10px]"
                          >
                            <span>doi:{lim.doi}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <blockquote className="text-[#667085] dark:text-slate-400 italic pl-2 border-l-2 border-slate-300 dark:border-slate-700">
                        "{lim.quote}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Directions */}
              <div className="space-y-2 pt-2 border-t border-[#E5E7EB] dark:border-[#1E293B] text-xs">
                <span className="text-xs font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                  Promising Research Directions:
                </span>
                <ul className="space-y-1.5 text-[#4B5563] dark:text-slate-300">
                  {selectedGap.suggestedDirections.map((dir, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{dir}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-12 text-center text-slate-400 text-sm">
              Select or detect a research gap to inspect literature blindspots.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
