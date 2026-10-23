import React, { useState, useRef, useMemo } from 'react';
import { 
  KnowledgeGraphData, 
  GraphNode, 
  GraphLink, 
  NodeType 
} from '../types/scientific';
import { 
  Network, 
  Search, 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ExternalLink, 
  Layers, 
  BookOpen, 
  Atom, 
  Wrench, 
  AlertCircle, 
  Info,
  X
} from 'lucide-react';

interface KnowledgeGraphProps {
  graphData: KnowledgeGraphData;
  onSelectNode?: (node: GraphNode) => void;
}

export const InteractiveKnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  graphData,
  onSelectNode,
}) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedLink, setSelectedLink] = useState<GraphLink | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilters, setActiveTypeFilters] = useState<Set<NodeType>>(
    new Set(['field', 'problem', 'technique', 'mechanism', 'material', 'paper'])
  );
  
  // Canvas viewport transform
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPan, setStartPan] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<GraphNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize node positions in a force-like circular layout
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(() => {
    const map = new Map<string, { x: number; y: number }>();
    const total = graphData.nodes.length;
    const centerX = 440;
    const centerY = 300;
    const radius = 220;

    graphData.nodes.forEach((node, i) => {
      let ringRadius = radius;
      if (node.type === 'field') ringRadius = 120;
      if (node.type === 'mechanism') ringRadius = 190;
      if (node.type === 'paper') ringRadius = 270;

      const angle = (i / total) * 2 * Math.PI;
      map.set(node.id, {
        x: centerX + ringRadius * Math.cos(angle) + (Math.random() - 0.5) * 30,
        y: centerY + ringRadius * Math.sin(angle) + (Math.random() - 0.5) * 30,
      });
    });
    return map;
  });

  const nodeColor = (type: NodeType) => {
    switch (type) {
      case 'field': return '#4F46E5'; // Indigo
      case 'problem': return '#D97706'; // Amber
      case 'technique': return '#0F9D8A'; // Teal
      case 'mechanism': return '#2563EB'; // Blue
      case 'material': return '#7C3AED'; // Purple
      case 'paper': return '#DB2777'; // Pink
      default: return '#64748B';
    }
  };

  const toggleFilter = (type: NodeType) => {
    const next = new Set(activeTypeFilters);
    if (next.has(type)) {
      if (next.size > 1) next.delete(type);
    } else {
      next.add(type);
    }
    setActiveTypeFilters(next);
  };

  const filteredNodes = useMemo(() => {
    return graphData.nodes.filter((node) => {
      if (!activeTypeFilters.has(node.type)) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        node.label.toLowerCase().includes(q) ||
        node.field.toLowerCase().includes(q) ||
        node.description.toLowerCase().includes(q)
      );
    });
  }, [graphData.nodes, activeTypeFilters, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredLinks = useMemo(() => {
    return graphData.links.filter((link) => {
      const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
      const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;
      return filteredNodeIds.has(sourceId) && filteredNodeIds.has(targetId);
    });
  }, [graphData.links, filteredNodeIds]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && !draggedNode) {
      setIsPanning(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNode) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;
      const mouseX = (e.clientX - containerRect.left - pan.x) / zoom;
      const mouseY = (e.clientY - containerRect.top - pan.y) / zoom;
      setNodePositions((prev) => {
        const next = new Map(prev);
        next.set(draggedNode.id, { x: mouseX, y: mouseY });
        return next;
      });
      return;
    }

    if (isPanning) {
      setPan({
        x: e.clientX - startPan.x,
        y: e.clientY - startPan.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedNode(null);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Intro */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#172033] dark:text-[#F1F5F9]">
          Knowledge Graph
        </h1>
        <p className="text-sm text-[#667085] dark:text-[#94A3B8]">
          Interactive graph mapping relationships between scientific problems, mechanisms, and literature citations.
        </p>
      </div>

      {/* Compact Toolbar */}
      <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, fields, papers..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs text-[#172033] dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-600"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[#667085] dark:text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Filters:
          </span>
          {(['field', 'problem', 'technique', 'mechanism', 'material', 'paper'] as NodeType[]).map((type) => {
            const active = activeTypeFilters.has(type);
            const color = nodeColor(type);
            return (
              <button
                key={type}
                onClick={() => toggleFilter(type)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                  active
                    ? 'bg-slate-100 dark:bg-slate-800 text-[#172033] dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                    : 'bg-transparent text-slate-400 dark:text-slate-600 border border-transparent opacity-60'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: active ? color : '#CBD5E1' }}
                />
                <span className="capitalize">{type}</span>
              </button>
            );
          })}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-700 rounded-lg p-0.5 shrink-0 self-end md:self-auto">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.15, 2.5))}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.15, 0.4))}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded border-l border-slate-200 dark:border-slate-800"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Viewport + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Canvas Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className="lg:col-span-3 h-[620px] rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-[#FAFAFC] dark:bg-[#070B12] relative overflow-hidden cursor-grab active:cursor-grabbing select-none shadow-xs"
        >
          {/* Subtle Grid dots */}
          <div
            className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#4F46E5 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <svg
            className="w-full h-full"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
            }}
          >
            <defs>
              <marker
                id="arrowhead-clean"
                markerWidth="8"
                markerHeight="6"
                refX="18"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#94A3B8" />
              </marker>
              <marker
                id="arrowhead-cross-clean"
                markerWidth="10"
                markerHeight="8"
                refX="22"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 10 4, 0 8" fill="#0F9D8A" />
              </marker>
            </defs>

            {/* Links */}
            {filteredLinks.map((link, idx) => {
              const sourceId = typeof link.source === 'string' ? link.source : (link.source as any).id;
              const targetId = typeof link.target === 'string' ? link.target : (link.target as any).id;
              const sPos = nodePositions.get(sourceId) || { x: 200, y: 200 };
              const tPos = nodePositions.get(targetId) || { x: 400, y: 400 };

              const isCrossField = link.relationship.includes('CROSS-FIELD');
              const isSelected = selectedLink === link;

              return (
                <g
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLink(link);
                  }}
                  className="cursor-pointer"
                >
                  <line
                    x1={sPos.x}
                    y1={sPos.y}
                    x2={tPos.x}
                    y2={tPos.y}
                    stroke={
                      isSelected
                        ? '#4F46E5'
                        : isCrossField
                        ? '#0F9D8A'
                        : '#CBD5E1'
                    }
                    strokeWidth={isSelected ? 2.5 : isCrossField ? 2 : 1.25}
                    strokeDasharray={isCrossField ? '4 2' : undefined}
                    markerEnd={isCrossField ? 'url(#arrowhead-cross-clean)' : 'url(#arrowhead-clean)'}
                    className="transition-colors"
                  />
                  <text
                    x={(sPos.x + tPos.x) / 2}
                    y={(sPos.y + tPos.y) / 2 - 4}
                    fill={isCrossField ? '#0F9D8A' : '#64748B'}
                    fontSize="9"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    className="pointer-events-none select-none font-medium"
                  >
                    {link.relationship.replace(' (CROSS-FIELD)', ' · cross-field')}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions.get(node.id) || { x: 300, y: 300 };
              const isSelected = selectedNode?.id === node.id;
              const color = nodeColor(node.type);
              const radius = node.type === 'field' ? 20 : node.type === 'mechanism' ? 17 : 14;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDraggedNode(node);
                    setSelectedNode(node);
                    onSelectNode?.(node);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Selection indicator */}
                  {isSelected && (
                    <circle
                      r={radius + 6}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      opacity="0.75"
                    />
                  )}

                  {/* Main Circle */}
                  <circle
                    r={radius}
                    fill="#FFFFFF"
                    stroke={color}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-transform group-hover:scale-105"
                  />

                  {/* Label */}
                  <text
                    y={radius + 14}
                    fill="#172033"
                    fontSize="11"
                    fontWeight="500"
                    textAnchor="middle"
                    className="pointer-events-none select-none dark:fill-slate-200"
                  >
                    {node.label.length > 20 ? node.label.slice(0, 18) + '...' : node.label}
                  </text>

                  <text
                    y={radius + 24}
                    fill="#667085"
                    fontSize="9"
                    textAnchor="middle"
                    className="pointer-events-none select-none uppercase font-mono tracking-wider dark:fill-slate-400"
                  >
                    {node.type}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] text-[#667085] dark:text-slate-400 bg-white/90 dark:bg-slate-900/90 px-2.5 py-1 rounded-md border border-[#E5E7EB] dark:border-slate-800 shadow-xs">
            Drag to pan canvas • Drag node to reposition • Click to inspect
          </div>
        </div>

        {/* Right Side Details Panel */}
        <div className="space-y-4">
          {selectedNode ? (
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#1E293B] pb-3">
                <span
                  className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-md"
                  style={{
                    backgroundColor: `${nodeColor(selectedNode.type)}15`,
                    color: nodeColor(selectedNode.type),
                  }}
                >
                  {selectedNode.type}
                </span>
                <span className="text-xs text-[#667085] dark:text-[#94A3B8] font-mono">
                  {selectedNode.field}
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-[#172033] dark:text-white leading-snug">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-[#4B5563] dark:text-slate-300 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {selectedNode.doi && (
                <div className="p-3 rounded-lg bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-xs space-y-1">
                  <span className="text-[#667085] dark:text-slate-400 text-[10px] uppercase font-mono block">
                    Verified Publication Reference:
                  </span>
                  <a
                    href={`https://doi.org/${selectedNode.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-mono break-all"
                  >
                    <span>doi:{selectedNode.doi}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              )}

              {/* Connected Entities */}
              <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#1E293B] space-y-2">
                <span className="text-xs font-semibold text-[#172033] dark:text-white block">
                  Connected Entities:
                </span>
                <div className="space-y-1.5 text-xs">
                  {graphData.links
                    .filter(
                      (l) =>
                        (typeof l.source === 'string' ? l.source : (l.source as any).id) === selectedNode.id ||
                        (typeof l.target === 'string' ? l.target : (l.target as any).id) === selectedNode.id
                    )
                    .map((l, i) => {
                      const isSource =
                        (typeof l.source === 'string' ? l.source : (l.source as any).id) === selectedNode.id;
                      const otherId = isSource
                        ? typeof l.target === 'string' ? l.target : (l.target as any).id
                        : typeof l.source === 'string' ? l.source : (l.source as any).id;
                      const otherNode = graphData.nodes.find((n) => n.id === otherId);

                      return (
                        <div
                          key={i}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="p-2.5 rounded-lg bg-[#F7F8FA] dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-[#E5E7EB] dark:border-slate-800 cursor-pointer transition-colors flex items-center justify-between"
                        >
                          <span className="text-[#172033] dark:text-slate-200 font-medium truncate max-w-[140px]">
                            {otherNode?.label || otherId}
                          </span>
                          <span className="text-[10px] text-[#667085] dark:text-slate-400 font-mono">
                            {l.relationship.replace(' (CROSS-FIELD)', '')}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : selectedLink ? (
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-5 space-y-3 shadow-xs">
              <span className="text-xs font-medium uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Relationship Details
              </span>
              <h3 className="text-sm font-semibold text-[#172033] dark:text-white">
                {selectedLink.relationship}
              </h3>
              {selectedLink.evidenceExcerpt && (
                <div className="p-3 rounded-lg bg-[#F7F8FA] dark:bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 text-xs text-[#4B5563] dark:text-slate-300 italic">
                  "{selectedLink.evidenceExcerpt}"
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] p-6 text-center space-y-2 shadow-xs">
              <Info className="w-6 h-6 text-slate-400 mx-auto" />
              <h4 className="text-xs font-semibold text-[#172033] dark:text-slate-300">
                Entity Inspector
              </h4>
              <p className="text-xs text-[#667085] dark:text-slate-400 leading-relaxed">
                Click any node or connection link on the graph to inspect underlying evidence passages and literature citations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
