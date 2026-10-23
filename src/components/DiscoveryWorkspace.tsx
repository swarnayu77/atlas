import React, { useState } from 'react';
import { 
  SavedProject, 
  CrossDisciplinaryConnection, 
  ResearchHypothesis, 
  ScientificPaper 
} from '../types/scientific';
import { 
  FolderArchive, 
  Plus, 
  Download, 
  FileText, 
  Printer, 
  Share2, 
  Bookmark, 
  Clock, 
  Users, 
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';

interface DiscoveryWorkspaceProps {
  projects: SavedProject[];
  activeProject: SavedProject;
  onSelectProject: (proj: SavedProject) => void;
  onCreateProject: (title: string, discipline: string) => void;
  onUpdateNotes: (projectId: string, notes: string) => void;
  onAddExperimentLog: (projectId: string, title: string, observations: string, outcome: any) => void;
  onDeleteProject: (projectId: string) => void;
  onSelectDiscovery: (disc: CrossDisciplinaryConnection) => void;
}

export const DiscoveryWorkspace: React.FC<DiscoveryWorkspaceProps> = ({
  projects,
  activeProject,
  onSelectProject,
  onCreateProject,
  onUpdateNotes,
  onAddExperimentLog,
  onDeleteProject,
  onSelectDiscovery,
}) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDiscipline, setNewDiscipline] = useState('Energy Storage & Biomaterials');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'notes' | 'experiments' | 'export'>('overview');

  // New Experiment Log Modal
  const [showExpModal, setShowExpModal] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expObs, setExpObs] = useState('');
  const [expOutcome, setExpOutcome] = useState<'Pending' | 'Success' | 'Inconclusive' | 'Negative Result'>('Pending');

  // Share Modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [collaboratorRole, setCollaboratorRole] = useState<'Viewer' | 'Editor'>('Editor');
  const [collaborators, setCollaborators] = useState<Array<{ email: string; role: string }>>([
    { email: 'pi.lab@university.edu', role: 'Principal Investigator (Owner)' },
    { email: 'postdoc.materials@mit.edu', role: 'Collaborator (Editor)' }
  ]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onCreateProject(newTitle, newDiscipline);
    setShowNewModal(false);
    setNewTitle('');
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle.trim()) return;
    onAddExperimentLog(activeProject.id, expTitle, expObs, expOutcome);
    setShowExpModal(false);
    setExpTitle('');
    setExpObs('');
  };

  const handleAddCollaborator = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collaboratorEmail.trim()) return;
    setCollaborators([...collaborators, { email: collaboratorEmail, role: collaboratorRole }]);
    setCollaboratorEmail('');
  };

  const generateMarkdownReport = () => {
    let md = `# ATLAS Scientific Discovery Report: ${activeProject.title}\n`;
    md += `**Discipline**: ${activeProject.discipline} | **Generated**: ${new Date().toISOString()}\n\n`;
    md += `## Saved Cross-Disciplinary Discoveries (${activeProject.connections.length})\n\n`;

    activeProject.connections.forEach((conn, i) => {
      md += `### ${i + 1}. ${conn.targetTechnique}\n`;
      md += `- **Originating Problem**: ${conn.originProblem} (${conn.originField})\n`;
      md += `- **Connecting Mechanism**: ${conn.connectingMechanism}\n`;
      md += `- **Overall Discovery Score**: ${conn.scoring.overallScore}/100\n`;
      md += `- **Scientific Maturity**: ${conn.scientificMaturity}\n`;
      md += `- **Proposed Validation Experiment**: ${conn.proposedExperiment.title}\n\n`;
      md += `#### Supporting Literature:\n`;
      conn.supportingEvidence.forEach((ev) => {
        md += `- **${ev.paperTitle}** (${ev.year}) - [DOI: ${ev.doi || 'N/A'}](${ev.url})\n  "${ev.excerpt}"\n`;
      });
      md += `\n`;
    });

    md += `## Research Notes\n\n${activeProject.notes || 'No private notes recorded.'}\n\n`;
    md += `## Experiment Tracking Log (${activeProject.experimentLogs.length})\n\n`;
    activeProject.experimentLogs.forEach((log) => {
      md += `- **[${log.date}] ${log.experimentTitle}** (Status: ${log.outcome})\n  ${log.observations}\n\n`;
    });

    return md;
  };

  const downloadReport = () => {
    const md = generateMarkdownReport();
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ATLAS_Report_${activeProject.title.replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
            Research Workspace
          </h1>
          <p className="text-sm text-[#667085] dark:text-[#94A3B8]">
            Organize research projects, track experiment logs, and export publication-ready discovery briefs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowShareModal(true)}
            className="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs sm:text-sm font-medium flex items-center gap-1.5 hover:bg-slate-50 transition-colors"
          >
            <Users className="w-4 h-4 text-slate-500" />
            <span>Sharing</span>
          </button>

          <button
            onClick={() => setShowNewModal(true)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New project</span>
          </button>
        </div>
      </div>

      {/* Project Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {projects.map((proj) => {
          const isActive = proj.id === activeProject.id;
          return (
            <button
              key={proj.id}
              onClick={() => onSelectProject(proj)}
              className={`px-3.5 py-2 rounded-lg font-medium whitespace-nowrap transition-all border flex items-center gap-2 ${
                isActive
                  ? 'bg-white dark:bg-[#111827] text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700 shadow-xs'
                  : 'bg-[#F7F8FA] dark:bg-slate-900 text-[#667085] dark:text-slate-400 border-transparent hover:border-[#E5E7EB]'
              }`}
            >
              <span>{proj.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {proj.connections.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Project Card */}
      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Project Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] dark:border-[#1E293B] pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#667085] dark:text-[#94A3B8]">
              <span className="font-medium text-indigo-600 dark:text-indigo-400">{activeProject.discipline}</span>
              <span>·</span>
              <span>Created {activeProject.createdAt}</span>
            </div>
            <h3 className="text-xl font-semibold text-[#172033] dark:text-white">
              {activeProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#667085] dark:text-slate-400">
              {activeProject.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={downloadReport}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 hover:bg-slate-50 text-xs font-medium text-[#172033] dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Markdown</span>
            </button>
            <button
              onClick={printReport}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 hover:bg-slate-50 text-xs font-medium text-[#172033] dark:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Brief</span>
            </button>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-2 border-b border-[#E5E7EB] dark:border-[#1E293B]">
          {[
            { id: 'overview', label: `Saved Discoveries (${activeProject.connections.length})`, icon: Bookmark },
            { id: 'experiments', label: `Experiment Logs (${activeProject.experimentLogs.length})`, icon: Clock },
            { id: 'notes', label: 'Private Notes', icon: FileText },
            { id: 'export', label: 'Report Preview', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 ${
                  active
                    ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                    : 'border-transparent text-[#667085] dark:text-slate-400 hover:text-[#172033]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Saved Discoveries */}
        {activeSubTab === 'overview' && (
          <div className="space-y-4">
            {activeProject.connections.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#E5E7EB] dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                No discoveries saved in this project yet. Use "Discover" and click "Save to workspace".
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3.5">
                {activeProject.connections.map((conn) => (
                  <div
                    key={conn.id}
                    className="p-5 rounded-xl bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#667085] dark:text-slate-400">
                          <span>{conn.originField} → {conn.targetField}</span>
                          <span>·</span>
                          <span className="font-mono">Score: {conn.scoring.overallScore}/100</span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#172033] dark:text-white">
                          {conn.targetTechnique}
                        </h4>
                      </div>

                      <button
                        onClick={() => onSelectDiscovery(conn)}
                        className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 text-[#172033] dark:text-white border border-[#E5E7EB] dark:border-slate-700 text-xs font-medium flex items-center gap-1 shrink-0 transition-colors"
                      >
                        <span>Open in Explorer</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed">
                      {conn.connectingMechanism}
                    </p>

                    <div className="pt-2 border-t border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between text-[11px] text-[#667085] dark:text-slate-400 font-mono">
                      <span>Protocol: {conn.proposedExperiment.title}</span>
                      <span>{conn.supportingEvidence.length} papers cited</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Experiment Tracking Log */}
        {activeSubTab === 'experiments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#667085] dark:text-slate-400">
                Track real benchtop or in-silico experimental observations
              </span>
              <button
                onClick={() => setShowExpModal(true)}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log new trial</span>
              </button>
            </div>

            {activeProject.experimentLogs.length === 0 ? (
              <div className="p-8 text-center border border-dashed border-[#E5E7EB] dark:border-slate-800 rounded-xl text-slate-400 text-xs">
                No experimental logs recorded yet. Track validation trials here.
              </div>
            ) : (
              <div className="space-y-3">
                {activeProject.experimentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-4 rounded-xl bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-[#172033] dark:text-white">
                        {log.experimentTitle}
                      </h4>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        log.outcome === 'Success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' :
                        log.outcome === 'Negative Result' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' :
                        'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {log.outcome}
                      </span>
                    </div>
                    <p className="text-[#4B5563] dark:text-slate-300 leading-relaxed">{log.observations}</p>
                    <div className="text-[10px] text-[#667085] dark:text-slate-400 font-mono pt-1 border-t border-[#E5E7EB] dark:border-slate-800">
                      Logged on {log.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Notes */}
        {activeSubTab === 'notes' && (
          <div className="space-y-2">
            <span className="text-xs text-[#667085] dark:text-slate-400 block font-medium">
              Private Research Notes & Protocol Documentation (Markdown supported)
            </span>
            <textarea
              rows={12}
              value={activeProject.notes}
              onChange={(e) => onUpdateNotes(activeProject.id, e.target.value)}
              placeholder="Record hypotheses, observations, equipment parameters, or references..."
              className="w-full p-4 rounded-xl bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-[#172033] dark:text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-600 leading-relaxed"
            />
          </div>
        )}

        {/* Tab 4: Report Preview */}
        {activeSubTab === 'export' && (
          <div className="p-5 rounded-xl bg-[#F7F8FA] dark:bg-slate-950 border border-[#E5E7EB] dark:border-slate-800 font-mono text-xs text-[#172033] dark:text-slate-300 whitespace-pre-wrap max-h-[500px] overflow-y-auto leading-relaxed">
            {generateMarkdownReport()}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-[#111827] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800 pb-3">
              <h3 className="text-base font-semibold text-[#172033] dark:text-white">Create Research Project</h3>
              <button onClick={() => setShowNewModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#172033] dark:text-slate-200 mb-1 font-medium">Project Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next-Gen Lithium Metal Interface Engineering"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block text-[#172033] dark:text-slate-200 mb-1 font-medium">Primary Discipline</label>
                <input
                  type="text"
                  value={newDiscipline}
                  onChange={(e) => setNewDiscipline(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E7EB] dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-1.5 text-xs text-[#667085] dark:text-slate-400 hover:text-[#172033]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Experiment Modal */}
      {showExpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-[#111827] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800 pb-3">
              <h3 className="text-base font-semibold text-[#172033] dark:text-white">Record Experiment Trial</h3>
              <button onClick={() => setShowExpModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddLog} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#172033] dark:text-slate-200 mb-1 font-medium">Experiment Title</label>
                <input
                  type="text"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="e.g. In-situ EIS of UPy-pSBMA coating at 10 mA cm-2"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div>
                <label className="block text-[#172033] dark:text-slate-200 mb-1 font-medium">Outcome Status</label>
                <select
                  value={expOutcome}
                  onChange={(e) => setExpOutcome(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-600 font-sans"
                >
                  <option value="Pending">Pending Validation</option>
                  <option value="Success">Success (Hypothesis Supported)</option>
                  <option value="Inconclusive">Inconclusive Data</option>
                  <option value="Negative Result">Negative Result (Falsified)</option>
                </select>
              </div>
              <div>
                <label className="block text-[#172033] dark:text-slate-200 mb-1 font-medium">Observations & Data</label>
                <textarea
                  rows={4}
                  value={expObs}
                  onChange={(e) => setExpObs(e.target.value)}
                  placeholder="Note metrics, voltage curves, scan rates, or failure conditions..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E7EB] dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowExpModal(false)}
                  className="px-3 py-1.5 text-xs text-[#667085] dark:text-slate-400 hover:text-[#172033]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-slate-700 bg-white dark:bg-[#111827] max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-slate-800 pb-3">
              <h3 className="text-base font-semibold text-[#172033] dark:text-white">Project Collaborators</h3>
              <button onClick={() => setShowShareModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCollaborator} className="flex gap-2 text-xs">
              <input
                type="email"
                value={collaboratorEmail}
                onChange={(e) => setCollaboratorEmail(e.target.value)}
                placeholder="colleague@institution.edu"
                className="flex-1 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                required
              />
              <select
                value={collaboratorRole}
                onChange={(e) => setCollaboratorRole(e.target.value as any)}
                className="bg-white dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 text-[#172033] dark:text-slate-200 text-xs rounded-lg px-2 py-2"
              >
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
              >
                Invite
              </button>
            </form>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB] dark:border-slate-800 text-xs">
              <span className="text-[#667085] dark:text-slate-400 font-medium block">
                Active Members:
              </span>
              <div className="space-y-1.5">
                {collaborators.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800">
                    <span className="text-[#172033] dark:text-slate-200 font-mono text-[11px] truncate max-w-[200px]">{c.email}</span>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{c.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
