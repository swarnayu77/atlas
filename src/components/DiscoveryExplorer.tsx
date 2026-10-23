import React, { useState } from 'react';
import { 
  CrossDisciplinaryConnection, 
  EpistemicStatus, 
  SupportingEvidence, 
  ConflictingEvidence 
} from '../types/scientific';
import { 
  Search, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  BookmarkCheck, 
  Network, 
  Lightbulb, 
  ExternalLink, 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  HelpCircle,
  Clock,
  Layers,
  FileText,
  Sliders,
  Scale
} from 'lucide-react';

interface DiscoveryExplorerProps {
  currentDiscovery: CrossDisciplinaryConnection | null;
  onRunDiscovery: (query: string, originField: string, targetField: string, constraints: string) => Promise<void>;
  isLoading: boolean;
  onSaveDiscovery: (disc: CrossDisciplinaryConnection) => void;
  isSaved: boolean;
  onSendToHypothesisLab: (disc: CrossDisciplinaryConnection) => void;
  onExploreInGraph: (disc: CrossDisciplinaryConnection) => void;
  onSelectBenchmark?: (id: string) => void;
  savedDiscoveries?: CrossDisciplinaryConnection[];
}

export const DiscoveryExplorer: React.FC<DiscoveryExplorerProps> = ({
  currentDiscovery,
  onRunDiscovery,
  isLoading,
  onSaveDiscovery,
  isSaved,
  onSendToHypothesisLab,
  onExploreInGraph,
  onSelectBenchmark,
  savedDiscoveries = [],
}) => {
  const [query, setQuery] = useState(
    currentDiscovery?.query || 'How could self-healing materials improve the stability of next-generation batteries?'
  );
  const [originField, setOriginField] = useState(
    currentDiscovery?.originField || 'Energy Storage & Electrochemistry'
  );
  const [targetField, setTargetField] = useState(
    currentDiscovery?.targetField || 'Biomaterials & Biosensor Engineering'
  );
  const [constraints, setConstraints] = useState(
    'Room-temperature processable, scalable polymer coating, carbonate electrolyte compatible'
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const curatedExamples = [
    {
      label: 'Battery Degradation ↔ Bio-Sensor Hydrogels',
      query: 'Mitigate solid-electrolyte interphase (SEI) degradation and dendrite formation in high-capacity lithium metal anodes',
      origin: 'Energy Storage & Electrochemistry',
      target: 'Biomaterials & Biosensor Engineering',
      id: 'disc-battery-biomedical'
    },
    {
      label: 'Perovskite Stability ↔ Marine Mussel DOPA',
      query: 'Prevent moisture-induced lead leaching and phase degradation in metal halide perovskites using biological adhesion chemistry',
      origin: 'Semiconductor Physics & Photovoltaics',
      target: 'Marine Biomimetics & Protein Biochemistry',
      id: 'disc-perovskite-mussel'
    },
    {
      label: 'Microfluidic Mixing ↔ Aerodynamic Active Jets',
      query: 'Enhance diffusion-limited mixing in point-of-care microfluidics using aerodynamic active flow control principles',
      origin: 'Biomedical Microfluidics & Point-of-Care Diagnostics',
      target: 'Aerodynamics & Fluid Dynamics Control',
      id: 'disc-microfluidic-aerospace'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      await onRunDiscovery(query, originField, targetField, constraints);
    } catch (err: any) {
      console.warn('Discovery run captured:', err?.message || err);
    }
  };

  const handleSave = () => {
    if (!currentDiscovery) return;
    setIsSaving(true);
    onSaveDiscovery(currentDiscovery);
    setTimeout(() => setIsSaving(false), 600);
  };

  const getMaturityStyle = (status: EpistemicStatus) => {
    switch (status) {
      case 'Established':
        return 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50';
      case 'Evidence-supported possibility':
        return 'text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/50';
      case 'Speculative':
      default:
        return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50';
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* A. Page Introduction */}
      <div className="relative space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
            Discover Connections
          </h1>
          <span className="text-xs text-[#667085] dark:text-[#94A3B8] font-mono">
            Cross-Disciplinary Transfer Engine
          </span>
        </div>
        <p className="text-sm sm:text-base text-[#667085] dark:text-[#94A3B8] max-w-3xl leading-relaxed">
          Explore scientific ideas across disciplines. Find evidence-backed connections worth investigating.
        </p>
      </div>

      {/* B. Research Query Composer */}
      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] shadow-xs p-6 sm:p-8 transition-colors">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Multiline Input */}
          <div className="space-y-2">
            <label 
              htmlFor="research-query" 
              className="block text-sm font-semibold text-[#172033] dark:text-[#F1F5F9]"
            >
              What problem are you investigating?
            </label>
            <div className="relative">
              <textarea
                id="research-query"
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How could self-healing materials improve the stability of next-generation batteries?"
                className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#334155] rounded-lg text-[#172033] dark:text-slate-100 placeholder-[#9CA3AF] text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all resize-y"
                required
              />
            </div>
          </div>

          {/* Field Selectors: 2-column on desktop, 1-column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#667085] dark:text-[#94A3B8]">
                Originating Field (Where problem resides)
              </label>
              <input
                type="text"
                value={originField}
                onChange={(e) => setOriginField(e.target.value)}
                placeholder="e.g. Energy Storage & Electrochemistry"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#334155] rounded-lg text-xs sm:text-sm text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-[#667085] dark:text-[#94A3B8]">
                Target Field (Potential source of transferable principles)
              </label>
              <input
                type="text"
                value={targetField}
                onChange={(e) => setTargetField(e.target.value)}
                placeholder="e.g. Biomaterials, Aerodynamics, Geophysics, Polymers..."
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#334155] rounded-lg text-xs sm:text-sm text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Collapsible Advanced Constraints */}
          <div className="space-y-3 pt-1">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#667085] dark:text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] transition-colors focus-visible:outline-none"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
              <span>{showAdvanced ? 'Hide advanced constraints' : 'Add constraints (materials, temperatures, budget, equipment)'}</span>
              {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAdvanced && (
              <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-slate-900/60 border border-[#E5E7EB] dark:border-[#1E293B] space-y-2">
                <label className="block text-xs font-medium text-[#667085] dark:text-[#94A3B8]">
                  Boundary Conditions & Constraints
                </label>
                <input
                  type="text"
                  value={constraints}
                  onChange={(e) => setConstraints(e.target.value)}
                  placeholder="e.g. Operating below 60°C, scalable roll-to-roll, non-toxic, standard laboratory equipment"
                  className="w-full px-3.5 py-2 bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#334155] rounded-md text-xs text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>
            )}
          </div>

          {/* Action Row & Benchmark Prompts */}
          <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#667085] dark:text-[#94A3B8]">Try verified example:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {curatedExamples.map((ex) => (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => {
                      if (onSelectBenchmark) onSelectBenchmark(ex.id);
                      setQuery(ex.query);
                      setOriginField(ex.origin);
                      setTargetField(ex.target);
                    }}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#F1F4F8] dark:bg-slate-800 text-[#4B5563] dark:text-slate-300 hover:text-[#172033] dark:hover:text-white hover:bg-[#E5E7EB] dark:hover:bg-slate-700 transition-colors"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-medium inline-flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Cross-Referencing Literature...</span>
                </>
              ) : (
                <>
                  <span>Discover connections</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-8 sm:p-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <div className="w-6 h-6 border-2 border-indigo-600/30 dark:border-indigo-400/30 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-[#172033] dark:text-[#F1F5F9]">
              Querying Scientific Repositories
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] dark:text-[#94A3B8] max-w-lg mx-auto">
              Extracting candidate papers across OpenAlex, Europe PMC, and arXiv to construct verifiable cross-domain transfer mechanisms...
            </p>
          </div>
        </div>
      )}

      {/* D. Redesigned Discovery Results */}
      {currentDiscovery && !isLoading && (
        <div className="space-y-8">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] shadow-xs p-6 sm:p-8 space-y-6 transition-colors">
            {/* Top Classification & Actions Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] dark:border-[#1E293B] pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${getMaturityStyle(currentDiscovery.scientificMaturity)}`}>
                    {currentDiscovery.scientificMaturity}
                  </span>
                  <span className="text-[#667085] dark:text-[#94A3B8]">
                    {currentDiscovery.originField} → {currentDiscovery.targetField}
                  </span>
                  <span className="text-[#667085] dark:text-[#94A3B8] font-mono text-[11px]">
                    {currentDiscovery.supportingEvidence.length} verified sources
                  </span>
                </div>

                {/* 22-26px Natural Wrapping Title */}
                <h2 className="text-xl sm:text-2xl font-semibold text-[#172033] dark:text-[#F1F5F9] leading-snug">
                  {currentDiscovery.targetTechnique}
                </h2>
              </div>

              {/* Action Buttons: 1 primary, quieter secondary actions */}
              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                    isSaved
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-800 text-[#172033] dark:text-slate-200 border-[#E5E7EB] dark:border-[#334155] hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                      <span>{isSaving ? 'Saving...' : 'Save to workspace'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onSendToHypothesisLab(currentDiscovery)}
                  className="px-3.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Explore hypothesis</span>
                </button>

                <button
                  onClick={() => onExploreInGraph(currentDiscovery)}
                  className="px-3.5 py-2 rounded-lg text-xs font-medium text-[#4B5563] dark:text-slate-300 hover:text-[#172033] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Network className="w-3.5 h-3.5 text-slate-500" />
                  <span>View in graph</span>
                </button>
              </div>
            </div>

            {/* Explanation of Potential Connection: 14-16px Body */}
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-[#172033] dark:text-slate-200 leading-relaxed">
                {currentDiscovery.scientificExplanation || currentDiscovery.connectingMechanism}
              </p>
            </div>

            {/* F. Structured Two-Column Evidence Presentation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* Left Column: Problem & Connecting Mechanism */}
              <div className="space-y-6">
                <div className="rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F7F8FA] dark:bg-slate-900/40 p-5 space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#667085] dark:text-[#94A3B8] block">
                    Original Research Problem
                  </span>
                  <p className="text-xs sm:text-sm text-[#172033] dark:text-slate-200 leading-relaxed">
                    {currentDiscovery.originProblem}
                  </p>
                </div>

                <div className="rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F7F8FA] dark:bg-slate-900/40 p-5 space-y-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    Connecting Mechanism
                  </span>
                  <p className="text-xs sm:text-sm text-[#172033] dark:text-slate-200 leading-relaxed font-sans">
                    {currentDiscovery.connectingMechanism}
                  </p>

                  <div className="pt-3 border-t border-[#E5E7EB] dark:border-[#1E293B] space-y-1.5">
                    <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8] block">
                      Underlying Shared Principles:
                    </span>
                    <ul className="space-y-1 text-xs text-[#4B5563] dark:text-slate-300">
                      {currentDiscovery.sharedPrinciples.map((sp, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                          <span>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Unanswered Research Question */}
                <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-[#667085] dark:text-[#94A3B8] flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                    Unanswered Research Question
                  </span>
                  <p className="text-xs sm:text-sm text-[#172033] dark:text-slate-200 italic font-medium">
                    "{currentDiscovery.unansweredResearchQuestion}"
                  </p>
                </div>
              </div>

              {/* Right Column: Supporting Sources & Counterevidence */}
              <div className="space-y-6">
                {/* Supporting Sources */}
                <div className="rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-slate-900/60 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-[#172033] dark:text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Supporting Literature ({currentDiscovery.supportingEvidence.length})
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentDiscovery.supportingEvidence.map((ev, i) => (
                      <div key={i} className="p-3.5 rounded-md bg-[#F7F8FA] dark:bg-slate-800/50 border border-[#E5E7EB] dark:border-slate-700/60 space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-[#172033] dark:text-white leading-snug">
                            {ev.paperTitle}
                          </h4>
                        </div>
                        <div className="text-[11px] text-[#667085] dark:text-slate-400 font-mono">
                          {ev.authors} ({ev.year})
                          {ev.doi && (
                            <a
                              href={ev.url || `https://doi.org/${ev.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>doi:{ev.doi}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                        <blockquote className="text-xs text-[#4B5563] dark:text-slate-300 italic pl-2 border-l-2 border-indigo-400 dark:border-indigo-500">
                          "{ev.excerpt}"
                        </blockquote>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Counterevidence & Limitations */}
                {currentDiscovery.conflictingOrLimitingEvidence.length > 0 && (
                  <div className="rounded-lg border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-5 space-y-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      Limitations & Conflicting Findings
                    </span>
                    <div className="space-y-2">
                      {currentDiscovery.conflictingOrLimitingEvidence.map((caveat, i) => (
                        <div key={i} className="p-3 rounded bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs">
                          <div className="flex items-center justify-between text-amber-900 dark:text-amber-200 font-medium">
                            <span>{caveat.paperTitle}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                              {caveat.severity}
                            </span>
                          </div>
                          <p className="text-[#4B5563] dark:text-slate-300 leading-relaxed">
                            {caveat.caveat}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Validation Experiment */}
                <div className="rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5" />
                      Suggested Validation Experiment
                    </span>
                    <span className="text-[11px] font-mono text-[#667085] dark:text-slate-400">
                      {currentDiscovery.proposedExperiment.estimatedTimelineMonths} mo. timeline
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#172033] dark:text-white">
                    {currentDiscovery.proposedExperiment.title}
                  </h4>
                  <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed">
                    {currentDiscovery.proposedExperiment.methodology}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-[#667085] dark:text-slate-400">
                    <div>
                      <strong className="text-[#172033] dark:text-slate-300">Control: </strong>
                      {currentDiscovery.proposedExperiment.controlGroup}
                    </div>
                    <div>
                      <strong className="text-[#172033] dark:text-slate-300">Experimental: </strong>
                      {currentDiscovery.proposedExperiment.experimentalGroup}
                    </div>
                  </div>
                </div>

                {/* Empirical Score Breakdown */}
                <div className="rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] bg-[#F7F8FA] dark:bg-slate-900/40 p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#667085] dark:text-[#94A3B8] font-medium flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-slate-400" />
                      Composite Evidence Score
                    </span>
                    <span className="font-mono font-semibold text-[#172033] dark:text-slate-200">
                      {currentDiscovery.scoring.overallScore}/100
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-[#667085] dark:text-slate-400 pt-1">
                    <div>Evidence: {currentDiscovery.scoring.evidenceStrength}%</div>
                    <div>Plausibility: {currentDiscovery.scoring.mechanisticPlausibility}%</div>
                    <div>Feasibility: {currentDiscovery.scoring.feasibility}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* G. Compact Results List for Multiple Saved Discoveries */}
      {savedDiscoveries.length > 1 && (
        <div className="space-y-4 pt-4 border-t border-[#E5E7EB] dark:border-[#1E293B]">
          <h3 className="text-sm font-semibold text-[#172033] dark:text-[#F1F5F9]">
            Saved Discoveries in Active Workspace
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDiscoveries.map((disc) => (
              <div
                key={disc.id}
                onClick={() => onSelectBenchmark?.(disc.id)}
                className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] hover:border-indigo-300 dark:hover:border-indigo-700/60 shadow-xs cursor-pointer transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between text-[11px] text-[#667085] dark:text-[#94A3B8]">
                  <span>{disc.originField} → {disc.targetField}</span>
                  <span className="font-mono">{disc.dateDiscovered}</span>
                </div>
                <h4 className="text-sm font-semibold text-[#172033] dark:text-white line-clamp-2 leading-snug">
                  {disc.targetTechnique}
                </h4>
                <p className="text-xs text-[#667085] dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {disc.connectingMechanism}
                </p>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className={`px-2 py-0.2 rounded-full border text-[10px] ${getMaturityStyle(disc.scientificMaturity)}`}>
                    {disc.scientificMaturity}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium text-xs">
                    Inspect →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
