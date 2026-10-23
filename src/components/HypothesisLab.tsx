import React, { useState } from 'react';
import { 
  ResearchHypothesis, 
  EpistemicStatus, 
  ScientificPaper 
} from '../types/scientific';
import { 
  Lightbulb, 
  Plus, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Scale, 
  X,
  ChevronRight
} from 'lucide-react';

interface HypothesisLabProps {
  hypotheses: ResearchHypothesis[];
  onAddNewHypothesis: (hyp: ResearchHypothesis) => void;
  onUpdateStatus: (id: string, status: ResearchHypothesis['status']) => void;
  contextPapers: ScientificPaper[];
}

export const HypothesisLab: React.FC<HypothesisLabProps> = ({
  hypotheses,
  onAddNewHypothesis,
  onUpdateStatus,
  contextPapers,
}) => {
  const [selectedHypothesis, setSelectedHypothesis] = useState<ResearchHypothesis>(
    hypotheses[0] || null
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStatement, setNewStatement] = useState('');
  const [newMechanism, setNewMechanism] = useState('');
  const [newOriginField, setNewOriginField] = useState('Energy Storage');
  const [newTargetField, setNewTargetField] = useState('Biomaterials');

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

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStatement.trim()) return;

    const hyp: ResearchHypothesis = {
      id: `hyp-${Date.now()}`,
      title: newTitle,
      statement: newStatement,
      backgroundContext: `Formulated based on cross-disciplinary transfer between ${newOriginField} and ${newTargetField}.`,
      proposedMechanism: newMechanism || 'Interfacial kinetic and thermodynamic coupling.',
      originField: newOriginField,
      targetField: newTargetField,
      epistemicStatus: 'Evidence-supported possibility',
      evidenceFor: [
        {
          claim: 'Initial analogous evidence supports transport across boundary layers',
          source: 'Primary Literature Review',
        }
      ],
      evidenceAgainstOrCaveats: [
        {
          claim: 'Thermal sensitivity under non-ambient operating conditions requires verification',
          source: 'Boundary Analysis',
          severity: 'Moderate',
        }
      ],
      coreAssumptions: [
        'Chemical stability under prolonged cycling',
        'Scalability without secondary phase separation'
      ],
      feasibility: {
        score: 85,
        timeframeMonths: 6,
        equipmentRequired: ['In-situ Spectrometer', 'AFM', 'Impedance Potentiostat'],
        budgetTier: 'Medium ($10k-$50k)'
      },
      suggestedExperiment: {
        title: `Empirical validation of ${newTitle}`,
        hypothesis: newStatement,
        methodology: 'Controlled comparative testing using benchtop spectroscopy.',
        materialsAndReagents: ['Substrate material', 'Polymeric cross-linker'],
        equipmentRequired: ['AFM', 'Spectrophotometer'],
        controlGroup: 'Uncoated pristine baseline',
        experimentalGroup: 'Treated with cross-disciplinary coating',
        measurableMetrics: ['Degradation rate', 'Cycle life'],
        primaryEndpoints: ['Statistically significant (p < 0.01) improvement'],
        potentialFailureModes: ['Interfacial delamination during rapid thermal cycling'],
        estimatedTimelineMonths: 6,
      },
      status: 'Formulated',
      sourcePapers: contextPapers.slice(0, 2),
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddNewHypothesis(hyp);
    setSelectedHypothesis(hyp);
    setShowCreateModal(false);
    setNewTitle('');
    setNewStatement('');
    setNewMechanism('');
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
            Research Hypotheses
          </h1>
          <p className="text-sm text-[#667085] dark:text-[#94A3B8]">
            Formulate, pressure-test, and design experimental protocols for evidence-backed hypotheses.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Formulate new hypothesis</span>
        </button>
      </div>

      {/* Main Grid: Left Selector + Right Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Registered Hypotheses */}
        <div className="space-y-3">
          <span className="text-xs font-medium text-[#667085] dark:text-[#94A3B8] block px-1">
            Registered Hypotheses ({hypotheses.length})
          </span>

          <div className="space-y-2.5">
            {hypotheses.map((hyp) => {
              const isSelected = selectedHypothesis?.id === hyp.id;
              return (
                <div
                  key={hyp.id}
                  onClick={() => setSelectedHypothesis(hyp)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white dark:bg-[#111827] border-indigo-500 ring-1 ring-indigo-500/20 shadow-xs'
                      : 'bg-white dark:bg-[#111827] border-[#E5E7EB] dark:border-[#1E293B] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-[#667085] dark:text-[#94A3B8]">
                    <span>{hyp.originField} → {hyp.targetField}</span>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
                      {hyp.status}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-semibold text-[#172033] dark:text-white line-clamp-2 leading-snug">
                    {hyp.title}
                  </h4>

                  <div className="flex items-center justify-between pt-1">
                    <span className={`px-2 py-0.2 rounded-full border text-[10px] font-medium ${getMaturityStyle(hyp.epistemicStatus)}`}>
                      {hyp.epistemicStatus}
                    </span>
                    <span className="text-[10px] text-[#667085] dark:text-[#94A3B8] font-mono">
                      {hyp.createdAt}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Hypothesis Dossier */}
        <div className="lg:col-span-2 space-y-6">
          {selectedHypothesis ? (
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-6 sm:p-8 space-y-6 shadow-xs">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#E5E7EB] dark:border-[#1E293B] pb-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${getMaturityStyle(selectedHypothesis.epistemicStatus)}`}>
                      {selectedHypothesis.epistemicStatus}
                    </span>
                    <span className="text-xs text-[#667085] dark:text-[#94A3B8]">
                      {selectedHypothesis.originField} ↔ {selectedHypothesis.targetField}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#172033] dark:text-white leading-snug">
                    {selectedHypothesis.title}
                  </h3>
                </div>

                {/* Stage dropdown */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#667085] dark:text-[#94A3B8]">Stage:</span>
                  <select
                    value={selectedHypothesis.status}
                    onChange={(e) => onUpdateStatus(selectedHypothesis.id, e.target.value as any)}
                    className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-600 font-sans"
                  >
                    <option value="Formulated">Formulated</option>
                    <option value="Protocol Designed">Protocol Designed</option>
                    <option value="In Silico Validated">In Silico Validated</option>
                    <option value="Bench Testing">Bench Testing</option>
                    <option value="Under Peer Review">Under Peer Review</option>
                  </select>
                </div>
              </div>

              {/* Hypothesis Statement Box */}
              <div className="p-4 sm:p-5 rounded-lg bg-[#F7F8FA] dark:bg-slate-900/60 border border-[#E5E7EB] dark:border-[#1E293B] space-y-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                  Hypothesis Statement
                </span>
                <p className="text-xs sm:text-sm text-[#172033] dark:text-slate-200 leading-relaxed font-sans">
                  {selectedHypothesis.statement}
                </p>
              </div>

              {/* Molecular / Physical Mechanism */}
              <div className="space-y-1.5">
                <span className="text-xs font-medium uppercase tracking-wider text-[#667085] dark:text-[#94A3B8] block">
                  Proposed Mechanism
                </span>
                <p className="text-xs sm:text-sm text-[#172033] dark:text-slate-200 leading-relaxed p-4 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#1E293B]">
                  {selectedHypothesis.proposedMechanism}
                </p>
              </div>

              {/* Evidence For vs Caveats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Supporting Evidence ({selectedHypothesis.evidenceFor.length})
                  </span>
                  <div className="space-y-2 text-xs">
                    {selectedHypothesis.evidenceFor.map((ev, i) => (
                      <div key={i} className="p-3 rounded bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/40 space-y-1">
                        <p className="text-[#172033] dark:text-slate-200 font-medium">{ev.claim}</p>
                        <div className="text-[11px] text-[#667085] dark:text-slate-400 flex items-center justify-between">
                          <span>{ev.source}</span>
                          {ev.doi && (
                            <a
                              href={`https://doi.org/${ev.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                            >
                              <span>doi</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2.5">
                  <span className="text-xs font-medium uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Uncertainties & Limitations ({selectedHypothesis.evidenceAgainstOrCaveats.length})
                  </span>
                  <div className="space-y-2 text-xs">
                    {selectedHypothesis.evidenceAgainstOrCaveats.map((caveat, i) => (
                      <div key={i} className="p-3 rounded bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/40 space-y-1">
                        <p className="text-[#172033] dark:text-slate-200 font-medium">{caveat.claim}</p>
                        <div className="text-[11px] text-[#667085] dark:text-slate-400 flex items-center justify-between">
                          <span>{caveat.source}</span>
                          <span className="text-amber-700 dark:text-amber-300 font-mono text-[10px]">{caveat.severity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feasibility Matrix */}
              <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-slate-900/60 border border-[#E5E7EB] dark:border-[#1E293B] space-y-2">
                <span className="text-xs font-medium uppercase tracking-wider text-[#667085] dark:text-[#94A3B8] block">
                  Feasibility & Execution Matrix
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#1E293B]">
                    <span className="text-[#667085] dark:text-slate-400 text-[10px] block">Feasibility Index</span>
                    <span className="text-base font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                      {selectedHypothesis.feasibility.score}/100
                    </span>
                  </div>
                  <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#1E293B]">
                    <span className="text-[#667085] dark:text-slate-400 text-[10px] block">Estimated Timeline</span>
                    <span className="text-base font-semibold text-[#172033] dark:text-white font-mono">
                      {selectedHypothesis.feasibility.timeframeMonths} Months
                    </span>
                  </div>
                  <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#1E293B]">
                    <span className="text-[#667085] dark:text-slate-400 text-[10px] block">Budget Tier</span>
                    <span className="text-base font-semibold text-indigo-600 dark:text-indigo-400">
                      {selectedHypothesis.feasibility.budgetTier}
                    </span>
                  </div>
                  <div className="p-3 rounded-md bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-[#1E293B]">
                    <span className="text-[#667085] dark:text-slate-400 text-[10px] block">Core Assumptions</span>
                    <span className="text-base font-semibold text-[#172033] dark:text-white font-mono">
                      {selectedHypothesis.coreAssumptions.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Validation Protocol */}
              <div className="rounded-lg border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-slate-900/40 p-5 space-y-2.5">
                <span className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  Validation Protocol: {selectedHypothesis.suggestedExperiment.title}
                </span>
                <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed">
                  {selectedHypothesis.suggestedExperiment.methodology}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-[#667085] dark:text-slate-400">
                  <div>
                    <strong className="text-[#172033] dark:text-white block mb-1">Required Equipment:</strong>
                    <ul className="space-y-1">
                      {selectedHypothesis.suggestedExperiment.equipmentRequired.map((eq, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <strong className="text-[#172033] dark:text-white block mb-1">Primary Endpoints:</strong>
                    <ul className="space-y-1">
                      {selectedHypothesis.suggestedExperiment.primaryEndpoints.map((ep, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{ep}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-12 text-center text-slate-400 text-sm">
              Select or formulate a research hypothesis to inspect its experimental validation protocol.
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#334155] bg-white dark:bg-[#111827] max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#1E293B] pb-3">
              <h3 className="text-base font-semibold text-[#172033] dark:text-white">
                Formulate Research Hypothesis
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[#172033] dark:text-slate-200 font-medium mb-1">
                  Hypothesis Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Supramolecular Catechol Passivation for Ambient Perovskite Stability"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#172033] dark:text-slate-200 font-medium mb-1">
                    Origin Field
                  </label>
                  <input
                    type="text"
                    value={newOriginField}
                    onChange={(e) => setNewOriginField(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-[#172033] dark:text-slate-200 font-medium mb-1">
                    Target Field
                  </label>
                  <input
                    type="text"
                    value={newTargetField}
                    onChange={(e) => setNewTargetField(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#172033] dark:text-slate-200 font-medium mb-1">
                  Hypothesis Statement
                </label>
                <textarea
                  rows={3}
                  value={newStatement}
                  onChange={(e) => setNewStatement(e.target.value)}
                  placeholder="State the testable, falsifiable proposition with explicit conditions..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>

              <div>
                <label className="block text-[#172033] dark:text-slate-200 font-medium mb-1">
                  Underlying Mechanism
                </label>
                <textarea
                  rows={2}
                  value={newMechanism}
                  onChange={(e) => setNewMechanism(e.target.value)}
                  placeholder="Explain why the physical or chemical principle transfers..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E5E7EB] dark:border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 text-xs text-[#667085] dark:text-slate-400 hover:text-[#172033] dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-xs"
                >
                  Register Hypothesis
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
