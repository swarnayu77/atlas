/**
 * ATLAS — Scientific Discovery Engine
 * TypeScript Data Models and Types
 */

export interface ScientificPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  doi?: string;
  url: string;
  abstract: string;
  isOpenAccess: boolean;
  citationCount: number;
  source: 'OpenAlex' | 'Europe PMC' | 'arXiv' | 'Benchmark';
  fields: string[];
  keyConcepts: string[];
  pdfUrl?: string;
}

export interface SupportingEvidence {
  paperId?: string;
  paperTitle: string;
  authors: string;
  year: number;
  doi?: string;
  url: string;
  excerpt: string;
  howItSupports: string;
  evidenceType: 'Direct Experimental' | 'Analogous Mechanism' | 'Theoretical Model' | 'Computational In-Silico';
  confidenceScore: number; // 0 - 100
}

export interface ConflictingEvidence {
  paperTitle: string;
  doi?: string;
  caveat: string;
  severity: 'Low Risk' | 'Moderate Challenge' | 'Critical Bottleneck';
  mitigationStrategy?: string;
}

export interface ProposedExperiment {
  title: string;
  hypothesis: string;
  methodology: string;
  materialsAndReagents: string[];
  equipmentRequired: string[];
  controlGroup: string;
  experimentalGroup: string;
  measurableMetrics: string[];
  primaryEndpoints: string[];
  potentialFailureModes: string[];
  estimatedTimelineMonths: number;
}

export interface ConnectionScoring {
  overallScore: number; // 0 - 100
  relevance: number; // 0 - 100
  evidenceStrength: number; // 0 - 100
  mechanisticPlausibility: number; // 0 - 100
  feasibility: number; // 0 - 100
  conceptualDistance: number; // 0 - 100 (degree of disciplinary jump)
  researchPotential: number; // 0 - 100
}

export type EpistemicStatus = 'Established' | 'Evidence-supported possibility' | 'Speculative';

export interface CrossDisciplinaryConnection {
  id: string;
  query: string;
  originField: string;
  targetField: string;
  originProblem: string;
  targetTechnique: string;
  connectingMechanism: string;
  scientificExplanation: string;
  sharedPrinciples: string[];
  scoring: ConnectionScoring;
  supportingEvidence: SupportingEvidence[];
  conflictingOrLimitingEvidence: ConflictingEvidence[];
  proposedExperiment: ProposedExperiment;
  unansweredResearchQuestion: string;
  scientificMaturity: EpistemicStatus;
  searchMethodology: {
    originSearchTerms: string[];
    targetSearchTerms: string[];
    databasesSearched: string[];
    retrievalDate: string;
  };
  dateDiscovered: string;
  saved?: boolean;
}

export type NodeType =
  | 'field'
  | 'problem'
  | 'technique'
  | 'mechanism'
  | 'material'
  | 'paper'
  | 'hypothesis'
  | 'disease';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  field: string;
  description: string;
  doi?: string;
  year?: number;
  metric?: string;
  evidenceCount?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  relationship: string;
  weight: number;
  evidenceExcerpt?: string;
  doi?: string;
}

export interface KnowledgeGraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface ResearchHypothesis {
  id: string;
  title: string;
  statement: string;
  backgroundContext: string;
  proposedMechanism: string;
  originField: string;
  targetField: string;
  epistemicStatus: EpistemicStatus;
  evidenceFor: Array<{
    claim: string;
    source: string;
    doi?: string;
    passage?: string;
  }>;
  evidenceAgainstOrCaveats: Array<{
    claim: string;
    source: string;
    doi?: string;
    severity: string;
  }>;
  coreAssumptions: string[];
  feasibility: {
    score: number;
    timeframeMonths: number;
    equipmentRequired: string[];
    budgetTier: 'Low (<$10k)' | 'Medium ($10k-$50k)' | 'High ($50k-$250k)' | 'Major Capital ($250k+)';
  };
  suggestedExperiment: ProposedExperiment;
  status: 'Formulated' | 'Protocol Designed' | 'In Silico Validated' | 'Bench Testing' | 'Under Peer Review';
  sourcePapers: ScientificPaper[];
  createdAt: string;
}

export interface ResearchGap {
  id: string;
  domain: string;
  secondaryDomain: string;
  title: string;
  description: string;
  frequentlyStudiedParadigm: string;
  underexploredIntersection: string;
  contradictoryEvidenceSummary: string;
  authorAcknowledgedLimitations: Array<{
    paperTitle: string;
    doi?: string;
    quote: string;
  }>;
  opportunityScore: number;
  potentialImpact: 'Incremental' | 'High' | 'Paradigm Shift';
  suggestedDirections: string[];
  confidence: number;
}

export interface CopilotMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: Array<{
    paperTitle: string;
    doi?: string;
    year?: number;
    excerpt?: string;
    source?: string;
  }>;
  structuredComparison?: {
    theoryA: { name: string; mechanism: string; strengths: string[]; limitations: string[] };
    theoryB: { name: string; mechanism: string; strengths: string[]; limitations: string[] };
    unresolvedControversy: string;
  };
  suggestedNextQuestions?: string[];
}

export interface SavedProject {
  id: string;
  title: string;
  description: string;
  discipline: string;
  createdAt: string;
  updatedAt: string;
  connections: CrossDisciplinaryConnection[];
  hypotheses: ResearchHypothesis[];
  savedPapers: ScientificPaper[];
  notes: string;
  experimentLogs: Array<{
    id: string;
    date: string;
    experimentTitle: string;
    stage: string;
    observations: string;
    outcome: 'Pending' | 'Success' | 'Inconclusive' | 'Negative Result';
  }>;
}
