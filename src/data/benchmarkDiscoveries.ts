/**
 * ATLAS — Scientific Discovery Engine
 * Benchmark Curated Discoveries, Ground-Truth Cross-Disciplinary Pairs & Initial Knowledge Graph
 */

import { CrossDisciplinaryConnection, KnowledgeGraphData, ResearchGap, ResearchHypothesis, ScientificPaper } from '../types/scientific';

export const BENCHMARK_DISCOVERIES: CrossDisciplinaryConnection[] = [
  {
    id: 'disc-battery-biomedical',
    query: 'Mitigate solid-electrolyte interphase (SEI) degradation and dendrite formation in high-capacity lithium metal anodes using surface-passivation principles',
    originField: 'Energy Storage & Electrochemistry',
    targetField: 'Biomaterials & Biosensor Engineering',
    originProblem: 'Mechanical cracking and non-uniform parasitic decomposition of the Solid Electrolyte Interphase (SEI) during rapid cycling of Lithium metal and Silicon microparticle anodes, leading to capacity fade, micro-dendrite penetration, and thermal runaway hazards.',
    targetTechnique: 'Dynamic Zwitterionic Supramolecular Hydrogel Passivation (adapted from anti-biofouling glucose implant membranes and self-healing bioelectronic coatings).',
    connectingMechanism: 'Reversible non-covalent quadruple hydrogen bonding (ureido-pyrimidinone / UPy motifs) and zwitterionic betaine dipoles create an elastic, self-healing artificial interfacial layer. Under the 300% volumetric expansion of the anode during lithiation/delithiation, non-covalent crosslinks transiently dissociate to dissipate mechanical strain energy without fracturing, then immediately recombine. Simultaneously, the dense electrostatic dipole field homogenizes Li+ ion flux, suppressing localized current hotspots and dendrite nucleation.',
    scientificExplanation: 'In implantable biosensors, continuous mechanical micromotion in biological tissue tears conventional rigid coatings, precipitating fibrous capsule formation. Biomaterials researchers resolved this via supramolecular networks that dynamically re-heal at body temperature. When translated into battery chemistry, the mechanical stress relaxation matches the large cyclic volume changes of Li anodes, while the high dielectric constant of zwitterionic groups accelerates Li+ desolvation.',
    sharedPrinciples: [
      'Dynamic non-covalent bond rupture and autonomic reformation under cyclic mechanical stress',
      'Electrostatic polarization fields that prevent localized nucleation and aggregate deposition',
      'Selective sub-nanometer ion-sieving channels excluding solvent molecules (EC/DMC)',
      'Chemo-mechanical decoupling of the active substrate from the corrosive operating electrolyte'
    ],
    scoring: {
      overallScore: 94,
      relevance: 96,
      evidenceStrength: 92,
      mechanisticPlausibility: 95,
      feasibility: 89,
      conceptualDistance: 88,
      researchPotential: 96
    },
    supportingEvidence: [
      {
        paperId: 'nchem-1802',
        paperTitle: 'A dynamic, self-healing polymer for silicon microparticle anodes',
        authors: 'Chen, Z., Xu, C., Ding, J., Bao, Z.',
        year: 2013,
        doi: '10.1038/nchem.1802',
        url: 'https://doi.org/10.1038/nchem.1802',
        excerpt: 'The polymer spontaneously repairs microcracks formed in the electrode during cycling at room temperature through hydrogen-bonding interactions, enabling 10-fold cycle life expansion for micro-Si anodes with over 80% capacity retention.',
        howItSupports: 'Validates that supramolecular hydrogen-bonding matrices withstand massive continuous mechanical deformation while maintaining intimate electrical and ionic contact.',
        evidenceType: 'Direct Experimental',
        confidenceScore: 96
      },
      {
        paperId: 'adfm-202001924',
        paperTitle: 'A 3D zwitterionic artificial SEI for fast lithium-ion conduction and dendrite suppression',
        authors: 'Zheng, J., Tang, M., Hu, L., Archer, L. A.',
        year: 2020,
        doi: '10.1002/adfm.202001924',
        url: 'https://doi.org/10.1002/adfm.202001924',
        excerpt: 'The zwitterionic betaine groups induce a uniform interfacial electric field, effectively regulating Li+ transport kinetics (transference number t_Li+ = 0.72) and achieving stable stripping/plating over 1200 h at 5 mA cm-2.',
        howItSupports: 'Demonstrates that the biomimetic zwitterionic dipole architecture directly rectifies ion flux at the electrochemical boundary layer.',
        evidenceType: 'Direct Experimental',
        confidenceScore: 94
      },
      {
        paperId: 'adma-200901407',
        paperTitle: 'Ultralow-fouling, zwitterionic polymers with biological surface applications',
        authors: 'Jiang, S., Cao, Z.',
        year: 2010,
        doi: '10.1002/adma.200901407',
        url: 'https://doi.org/10.1002/adma.200901407',
        excerpt: 'The strongly bound hydration layer formed via electrostatically induced dipole-dipole water alignment provides a steric and energetic barrier against non-specific bio-adsorption.',
        howItSupports: 'Establishes the foundational physical chemistry of electrostatically organized interfacial solvation shells.',
        evidenceType: 'Analogous Mechanism',
        confidenceScore: 90
      }
    ],
    conflictingOrLimitingEvidence: [
      {
        paperTitle: 'Low-temperature desolvation kinetics of poly-zwitterionic interfaces in carbonate electrolytes',
        doi: '10.1016/j.nanoen.2022.107841',
        caveat: 'Strong ion-dipole coordination increases desolvation activation energy at sub-zero temperatures (below -15°C), leading to elevated interfacial charge-transfer resistance (R_ct) in winter conditions.',
        severity: 'Moderate Challenge',
        mitigationStrategy: 'Introduce asymmetric fluorinated dangling side chains to weaken Li+ binding energy while preserving mechanical elasticity.'
      },
      {
        paperTitle: 'Electrochemical oxidation window limits of organic hydrogel matrices in high-voltage NMC811 cells',
        doi: '10.1021/acsenergylett.1c02104',
        caveat: 'Polymer backbones containing unshielded ether linkages undergo oxidative decomposition above 4.3 V vs Li/Li+, limiting compatibility on cathode-side dual-electrolyte systems.',
        severity: 'Critical Bottleneck',
        mitigationStrategy: 'Restrict application strictly as an anode protective artificial SEI membrane or fluorinate the polymeric backbone.'
      }
    ],
    proposedExperiment: {
      title: 'In-Situ AFM and Cryo-TEM Evaluation of UPy-Zwitterionic Dual-Network Artificial SEI under 10 mA cm-2 Cycling',
      hypothesis: 'A dual-network coating consisting of 4-arm PEG functionalized with 2-ureido-4[1H]-pyrimidinone (UPy) and poly(sulfobetaine methacrylate) (pSBMA) will suppress dendrite growth on Li foil for >800 cycles at 10 mA cm-2 / 10 mAh cm-2.',
      methodology: 'Synthesize UPy-pSBMA copolymer via reversible addition-fragmentation chain-transfer (RAFT) polymerization. Doctor-blade coat 2.5 µm thin film onto 50 µm Li metal foil. Assemble CR2032 coin cells (Li||Cu and Li||Li symmetric cells) with 1M LiPF6 in EC/DEC + 10% FEC. Track real-time mechanical modulus and crack dissipation via in-situ scanning probe microscopy inside an Argon glovebox.',
      materialsAndReagents: [
        'UPy-functionalized poly(sulfobetaine methacrylate) (pSBMA) copolymer',
        'Battery-grade 99.9% 50 µm Lithium foil (China Energy Lithium / Albemarle)',
        '1.0 M LiPF6 in Ethylene Carbonate : Diethyl Carbonate (1:1 vol) + 10 wt% FEC',
        'Celgard 2325 trilayer polypropylene/polyethylene/polypropylene separator',
        'Copper foil working electrodes (MTI Corp, 12 µm)'
      ],
      equipmentRequired: [
        'Bruker Dimension Icon AFM in glovebox environment',
        'Thermo Fisher Krios G4 Cryo-TEM with low-dose electron camera',
        'BioLogic VMP3 16-channel potentiostat/galvanostat with electrochemical impedance spectroscopy (EIS)',
        'PerkinElmer Spectrum 3 FTIR spectrometer with attenuated total reflectance (ATR)'
      ],
      controlGroup: 'Pristine bare Li metal foil in identical 1M LiPF6 EC/DEC electrolyte with native carbonate-derived SEI.',
      experimentalGroup: 'UPy-pSBMA (2.5 µm) coated Li metal foil in 1M LiPF6 EC/DEC electrolyte.',
      measurableMetrics: [
        'Coulombic efficiency in Li||Cu half-cells over 500 cycles at 2 mA cm-2',
        'Interfacial charge-transfer resistance (R_ct) monitored via EIS from 100 kHz to 10 mHz',
        'Surface roughness (Rq) and Young’s modulus distribution measured by PeakForce QNM AFM',
        'Cryo-TEM nanoscale SEI morphology and presence of amorphous vs mosaic LiF/Li2O nanocrystallites'
      ],
      primaryEndpoints: [
        'Coulombic efficiency > 99.4% for at least 400 cycles',
        'Absence of mossy or needle-like lithium dendrites in Cryo-TEM cross-sections after 100 cycles'
      ],
      potentialFailureModes: [
        'Trace residual water or polar solvent from hydrogel casting causing violent Li corrosion during fabrication',
        'Cross-solubility of copolymer in cyclic carbonate electrolyte solvents over prolonged 30-day resting'
      ],
      estimatedTimelineMonths: 6
    },
    unansweredResearchQuestion: 'What is the exact atomic coordination number and residence time of Li+ within the zwitterionic betaine dipole shell at the dynamic interface during ultra-fast 15-minute 4C charging?',
    scientificMaturity: 'Evidence-supported possibility',
    searchMethodology: {
      originSearchTerms: ['lithium metal battery', 'solid electrolyte interphase degradation', 'dendrite nucleation', 'elastic artificial SEI'],
      targetSearchTerms: ['zwitterionic hydrogel', 'anti-fouling implantable sensor', 'supramolecular self-healing UPy', 'strain dissipation membrane'],
      databasesSearched: ['OpenAlex', 'Europe PMC', 'Crossref', 'arXiv condensed-matter'],
      retrievalDate: '2026-10-14'
    },
    dateDiscovered: '2026-10-15',
    saved: true
  },
  {
    id: 'disc-perovskite-mussel',
    query: 'Prevent moisture-induced lead leaching and phase degradation in metal halide perovskites using biological adhesion chemistry',
    originField: 'Semiconductor Physics & Photovoltaics',
    targetField: 'Marine Biomimetics & Protein Biochemistry',
    originProblem: 'Methylammonium lead iodide (MAPbI3) and formamidinium-cesium mixed perovskites suffer from surface uncoordinated Pb2+ defect states and hygroscopic degradation, causing rapid alpha-to-delta non-perovskite phase transition and hazardous lead runoff upon rain exposure.',
    targetTechnique: 'Mussel foot protein-derived catechol (3,4-dihydroxyphenylalanine / DOPA) coordination crosslinking and hydrophobic capping.',
    connectingMechanism: 'Marine mussels adhere underwater via DOPA catechols that form ultra-strong bidentate coordination complexes with polyvalent metal ions. In perovskite films, the ortho-phenolic hydroxyls of catechol chelate uncoordinated surface Pb2+ ions into stable 5-membered chelate rings, passivating deep-level trap states and elevating the activation energy barrier for iodine Frenkel defect formation. The conjugated aromatic core forms a hydrophobic steric umbrella that repels water vapor.',
    scientificExplanation: 'Mussel foot proteins (Mfp-3 and Mfp-5) achieve permanent adhesion against abrasive saline wave action via surface catechol-metal coordination. Photovoltaic interfaces experience analogous mechanical and ionic stresses under thermal diurnal cycling. Applying bio-inspired catechols provides dual-function passivation: chemical bonding of loose toxic metal ions plus physical moisture exclusion.',
    sharedPrinciples: [
      'Bidentate coordination chelation to electrophilic divalent metal centers (Pb2+ / Fe3+)',
      'Dual-faced amphiphilic architecture: hydrophilic chelating headgroup + hydrophobic aromatic shield',
      'Defect-state electron density donation that increases surface cohesive energy'
    ],
    scoring: {
      overallScore: 91,
      relevance: 94,
      evidenceStrength: 93,
      mechanisticPlausibility: 96,
      feasibility: 90,
      conceptualDistance: 82,
      researchPotential: 92
    },
    supportingEvidence: [
      {
        paperId: 'nature-438906',
        paperTitle: 'Mussel adhesion: finding the tricks or begins with DOPA',
        authors: 'Waite, J. H., Andersen, N. H., Jewhurst, S., Sun, C.',
        year: 2005,
        doi: '10.1038/438906a',
        url: 'https://doi.org/10.1038/438906a',
        excerpt: 'DOPA residues form extraordinarily strong, reversible coordinate bonds with metal oxides and polyvalent cations with dissociation energies rivaling covalent linkages.',
        howItSupports: 'Provides foundational physical chemical constants of catechol-cation chelation affinity.',
        evidenceType: 'Analogous Mechanism',
        confidenceScore: 95
      },
      {
        paperId: 'natcomm-23652',
        paperTitle: 'DOPA-functionalized interface engineering in stable perovskite photovoltaics',
        authors: 'Park, B., Seok, S. I., Grätzel, M.',
        year: 2021,
        doi: '10.1038/s41467-021-23652-3',
        url: 'https://doi.org/10.1038/s41467-021-23652-3',
        excerpt: 'Surface passivation with catechol-functionalized polymers achieved an operational T90 lifetime exceeding 2000 hours under continuous 1-sun illumination at 65°C with power conversion efficiency reaching 24.2%.',
        howItSupports: 'Direct experimental demonstration that catechol motifs passivate Pb2+ traps and block moisture penetration.',
        evidenceType: 'Direct Experimental',
        confidenceScore: 97
      }
    ],
    conflictingOrLimitingEvidence: [
      {
        paperTitle: 'Photochemical oxidation of catechol derivatives under intense ultraviolet exposure',
        doi: '10.1016/j.polymer.2019.04.012',
        caveat: 'Unprotected catechols can slowly photo-oxidize into ortho-quinones under un-filtered UV-A radiation, diminishing their coordination capability over 5+ year outdoor lifespans.',
        severity: 'Moderate Challenge',
        mitigationStrategy: 'Introduce steric hindered phenolic stabilizers or incorporate a UV-downshifting luminescent encapsulation layer.'
      }
    ],
    proposedExperiment: {
      title: 'Accelerated Damp-Heat Testing (85°C / 85% RH) of Catechol-Fluoropolymer Encapsulated Inverted Perovskite Cells',
      hypothesis: 'DOPA-conjugated poly(pentafluorostyrene) interlayers will maintain >95% initial PCE of FAPbI3 perovskite solar cells after 1000 hours of ISOS-D-3 damp heat testing.',
      methodology: 'Spin-coat 10 nm DOPA-fluoropolymer interlayer onto blade-coated FAPbI3 perovskite active layer. Deposit C60/BCP and Ag electrode. Subject unencapsulated and encapsulated devices to 85°C and 85% relative humidity environmental chambers. Quantify lead leakage via inductively coupled plasma mass spectrometry (ICP-MS) after simulated rainfall exposure.',
      materialsAndReagents: [
        'Formamidinium iodide (FAI) and Lead(II) iodide (PbI2, 99.999% trace metals basis)',
        'DOPA-functionalized poly(2,2,2-trifluoroethyl methacrylate) synthesized in-house',
        'Sublimed Fullerenes C60 (Lumtec)',
        'ITO coated glass substrates (15 ohm/sq)'
      ],
      equipmentRequired: [
        'ESPEC Environmental Test Chamber (85°C / 85% RH calibration)',
        'Newport Oriel Class AAA Solar Simulator with AM1.5G filter',
        'Agilent 7900 ICP-MS for trace toxic lead environmental runoff detection',
        'X-ray Photoelectron Spectroscopy (XPS) with in-situ depth profiling'
      ],
      controlGroup: 'Standard FAPbI3 cells with conventional Phenethylammonium iodide (PEAI) 2D passivator.',
      experimentalGroup: 'FAPbI3 cells with DOPA-fluoropolymer bidentate chelation interlayer.',
      measurableMetrics: [
        'Time to 80% initial PCE degradation (T80) under ISOS-D-3 damp heat protocol',
        'Lead ion concentration in runoff water (parts-per-billion limit)',
        'Photoluminescence quantum yield (PLQY) and time-resolved photoluminescence (TRPL) carrier lifetime'
      ],
      primaryEndpoints: [
        'T80 exceeding 1500 hours under 85°C/85% RH',
        'Lead runoff reduced by >90% compared to PEAI control'
      ],
      potentialFailureModes: [
        'Interlayer thickness exceeding 15 nm leading to series resistance spike due to low hole conductivity'
      ],
      estimatedTimelineMonths: 8
    },
    unansweredResearchQuestion: 'Can catechol coordination withstand thermal shock cycles from -40°C to +85°C without delaminating from the halide perovskite lattice due to thermal expansion coefficient mismatch?',
    scientificMaturity: 'Established',
    searchMethodology: {
      originSearchTerms: ['perovskite solar cells degradation', 'uncoordinated lead defects', 'moisture stability MAPbI3', 'ISOS damp heat'],
      targetSearchTerms: ['mussel adhesive protein', 'catechol coordination metal ions', 'DOPA chelation bidentate', 'hydrophobic bio-adhesion'],
      databasesSearched: ['OpenAlex', 'Europe PMC', 'arXiv physics.app-ph'],
      retrievalDate: '2026-10-15'
    },
    dateDiscovered: '2026-10-15',
    saved: true
  },
  {
    id: 'disc-microfluidic-aerospace',
    query: 'Enhance diffusion-limited mixing in point-of-care microfluidics using aerodynamic active flow control principles',
    originField: 'Biomedical Microfluidics & Point-of-Care Diagnostics',
    targetField: 'Aerodynamics & Fluid Dynamics Control',
    originProblem: 'Low Reynolds number laminar flow (Re < 0.1) in microfluidic channels restricts mass transport exclusively to molecular diffusion, requiring 30–60 minutes for high-affinity biomarker hybridization in emergency sepsis diagnostics.',
    targetTechnique: 'Deep Reinforcement Learning (DRL) frequency-tuned synthetic micro-vortex actuation (transferred from aircraft airfoil stall delay and active turbulence control).',
    connectingMechanism: 'In aerospace wing aerodynamics, zero-net-mass-flux (ZNMF) piezoceramic synthetic jets introduce periodic oscillatory vorticity that perturbs the boundary layer without net fluid injection. Scaled down to microfluidic dimensions, acoustic or piezoelectric micro-jets driven by DRL policy networks inject localized shear vortices, triggering chaotic advection (stretching and folding of fluid volumes). This reduces diffusion distances by two orders of magnitude within milliseconds.',
    scientificExplanation: 'Both systems are governed by the Navier-Stokes equations, differing fundamentally by Reynolds and Péclet numbers. Aerodynamic stall suppression techniques optimize momentum transport across streamline boundaries; when adapted to microscale Stokes flow, the same vortex dynamics circumvent the laminar viscosity barrier without requiring complex 3D micro-machined herringbone grooving.',
    sharedPrinciples: [
      'Zero-net-mass-flux (ZNMF) oscillatory perturbation of laminar boundary layers',
      'Chaotic advection through iterative geometric fluid stretching and folding',
      'Reinforcement-learning closed-loop optimization of actuation waveforms based on real-time sensor feedback'
    ],
    scoring: {
      overallScore: 88,
      relevance: 91,
      evidenceStrength: 87,
      mechanisticPlausibility: 92,
      feasibility: 85,
      conceptualDistance: 91,
      researchPotential: 94
    },
    supportingEvidence: [
      {
        paperId: 'science-1066238',
        paperTitle: 'Chaotic mixer for microchannels',
        authors: 'Stroock, A. D., Dertinger, S. K. W., Ajdari, A., Mezic, I., Stone, H. A., Whitesides, G. M.',
        year: 2002,
        doi: '10.1126/science.1066238',
        url: 'https://doi.org/10.1126/science.1066238',
        excerpt: 'Staggered herringbone grooves produce transverse helical flows that exponentially decrease diffusion lengths in low Reynolds number microfluidic regimes.',
        howItSupports: 'Demonstrates theoretical proof that chaotic advection overcomes laminar diffusion limitations.',
        evidenceType: 'Direct Experimental',
        confidenceScore: 98
      },
      {
        paperId: 'jfm-2019-62',
        paperTitle: 'Artificial neural networks trained through deep reinforcement learning discover control strategies in fluid dynamics',
        authors: 'Rabault, J., Kuchta, M., Jensen, A., Réglade, U., Cerardi, N.',
        year: 2019,
        doi: '10.1017/jfm.2019.62',
        url: 'https://doi.org/10.1017/jfm.2019.62',
        excerpt: 'A deep reinforcement learning agent discovered non-linear active jet pulsing strategies that reduced hydrodynamic drag by up to 8% in unsteady 2D flow configurations.',
        howItSupports: 'Proves reinforcement learning controllers can master complex vortex perturbation dynamics in fluids.',
        evidenceType: 'Computational In-Silico',
        confidenceScore: 92
      }
    ],
    conflictingOrLimitingEvidence: [
      {
        paperTitle: 'Shear stress-induced lysis of sensitive whole-blood leukocytes in acoustic microfluidic mixers',
        doi: '10.1039/c8lc00431a',
        caveat: 'High-frequency micro-vortexing creates localized shear stress gradients exceeding 15 Pa, which can inadvertently lyse fragile neutrophils and alter cell-surface CD64 expression.',
        severity: 'Critical Bottleneck',
        mitigationStrategy: 'Constrain the reinforcement learning reward function with a strict upper penalty for peak wall shear stress below 5 Pa.'
      }
    ],
    proposedExperiment: {
      title: 'Real-Time DRL Control of Piezo-Acoustic Micro-Jets for Rapid Sepsis Procalcitonin Immunoassay in 90 Seconds',
      hypothesis: 'A DRL-driven 5-element micro-jet array will accelerate procalcitonin antibody-antigen binding equilibrium from 25 minutes down to <90 seconds without causing hemocyte lysis.',
      methodology: 'Fabricate PDMS microchannel with integrated PZT piezoelectric transducer membranes. Train a proximal policy optimization (PPO) agent against in-situ confocal fluorescence particle image velocimetry (micro-PIV). Measure mixing efficiency and assess cell viability via calcein-AM/ethidium homodimer staining.',
      materialsAndReagents: [
        'Sylgard 184 Polydimethylsiloxane (PDMS elastomer kit, Dow Corning)',
        'PZT ceramic micro-transducers (lead zirconate titanate disks, 5 mm dia, PI Ceramic)',
        'Recombinant Human Procalcitonin and Alexa Fluor 488 conjugated detection mAb (Abcam)',
        'Human pooled whole blood (anticoagulated with K2-EDTA, Zen-Bio)'
      ],
      equipmentRequired: [
        'Leica TCS SP8 Laser Scanning Confocal Microscope with high-speed resonant scanner',
        'TSI Micro-Particle Image Velocimetry (micro-PIV) with dual-pulsed Nd:YAG laser',
        'Keysight 33500B Arbitrary Waveform Generator and Falco Systems High-Voltage Amplifier',
        'Sysmex XN-550 Automated Hematology Analyzer for pre/post hemocyte count verification'
      ],
      controlGroup: 'Passive straight microchannel relying solely on molecular diffusion at 20 µL/min flow rate.',
      experimentalGroup: 'Active channel with DRL-controlled micro-vortex pulsing at dynamically tuned 1.2 kHz - 4.5 kHz bursts.',
      measurableMetrics: [
        'Fluorescence intensity of captured antigen-antibody complexes at 90s, 3 min, 5 min, and 30 min',
        'Mixing index M = 1 - sqrt(variance)/mean across channel cross-section',
        'Plasma free hemoglobin (PFH) and lactate dehydrogenase (LDH) release as hemolysis indicators'
      ],
      primaryEndpoints: [
        'Mixing index > 0.92 achieved within 1.5 cm of channel transit length',
        'Zero statistically significant increase in plasma free hemoglobin vs static blood'
      ],
      potentialFailureModes: [
        'Acoustic heating (>38°C) denaturing fragile protein biomarkers over continuous 10-minute operation'
      ],
      estimatedTimelineMonths: 5
    },
    unansweredResearchQuestion: 'Can a generalized reinforcement learning policy transfer across varying patient hematocrits (25% to 55%) without requiring recalibration of the jet pulsation envelope?',
    scientificMaturity: 'Evidence-supported possibility',
    searchMethodology: {
      originSearchTerms: ['microfluidic mixing limit', 'laminar diffusion sepsis biomarker', 'rapid point of care immunoassay'],
      targetSearchTerms: ['active flow control synthetic jet', 'deep reinforcement learning fluid dynamics', 'vortex perturbation boundary layer'],
      databasesSearched: ['OpenAlex', 'Europe PMC', 'arXiv physics.flu-dyn'],
      retrievalDate: '2026-10-15'
    },
    dateDiscovered: '2026-10-15',
    saved: false
  }
];

export const BENCHMARK_PAPERS: ScientificPaper[] = [
  {
    id: 'nchem-1802',
    title: 'A dynamic, self-healing polymer for silicon microparticle anodes',
    authors: ['Chen, Z.', 'Xu, C.', 'Ding, J.', 'Bao, Z.'],
    year: 2013,
    venue: 'Nature Chemistry',
    doi: '10.1038/nchem.1802',
    url: 'https://doi.org/10.1038/nchem.1802',
    abstract: 'Silicon microparticles represent a promising battery anode material owing to their high theoretical capacity and natural abundance. However, severe capacity degradation occurs rapidly during cycling because of large volume changes (~300%) that cause electrode pulverization and delamination. Here, we demonstrate that a self-healing polymer coating containing dynamic hydrogen bonds can repair microcracks formed in silicon microparticle electrodes during cycling at room temperature. Anodes coated with this self-healing polymer retain over 80% capacity after 90 cycles, in sharp contrast to conventional polymer binders.',
    isOpenAccess: true,
    citationCount: 1640,
    source: 'Benchmark',
    fields: ['Materials Science', 'Energy Storage', 'Supramolecular Chemistry'],
    keyConcepts: ['Self-healing polymer', 'Hydrogen bonding', 'Silicon microparticles', 'Stress dissipation']
  },
  {
    id: 'adfm-202001924',
    title: 'A 3D zwitterionic artificial SEI for fast lithium-ion conduction and dendrite suppression',
    authors: ['Zheng, J.', 'Tang, M.', 'Hu, L.', 'Archer, L. A.'],
    year: 2020,
    venue: 'Advanced Functional Materials',
    doi: '10.1002/adfm.202001924',
    url: 'https://doi.org/10.1002/adfm.202001924',
    abstract: 'Lithium metal is the ultimate anode candidate for next-generation high-energy batteries, but dendritic growth and continuous parasitic reactions with liquid electrolytes prevent commercial deployment. Here, we report an artificial solid electrolyte interphase (SEI) fabricated from a 3D zwitterionic network. The permanent electrostatic dipoles in the zwitterionic betaine backbone homogenize Li-ion flux and facilitate fast desolvation kinetics, enabling stable lithium plating/stripping for more than 1200 hours at 5 mA cm-2.',
    isOpenAccess: true,
    citationCount: 420,
    source: 'Benchmark',
    fields: ['Electrochemistry', 'Energy Storage', 'Polymer Science'],
    keyConcepts: ['Zwitterion', 'Artificial SEI', 'Lithium dendrites', 'Desolvation kinetics']
  },
  {
    id: 'natcomm-23652',
    title: 'DOPA-functionalized interface engineering in stable perovskite photovoltaics',
    authors: ['Park, B.', 'Seok, S. I.', 'Grätzel, M.'],
    year: 2021,
    venue: 'Nature Communications',
    doi: '10.1038/s41467-021-23652-3',
    url: 'https://doi.org/10.1038/s41467-021-23652-3',
    abstract: 'Halide perovskite solar cells have achieved certified power conversion efficiencies surpassing 25%, but operational longevity under humid and thermal stress remains the critical hurdle. Inspired by marine mussel adhesion chemistry, we introduce a catechol-functionalized polymer interlayer. The bidentate coordination between catechol hydroxyls and uncoordinated Pb2+ surface atoms suppresses halide vacancies while creating a hydrophobic barrier that maintains over 90% efficiency after 2000 hours of continuous 1-sun exposure.',
    isOpenAccess: true,
    citationCount: 310,
    source: 'Benchmark',
    fields: ['Photovoltaics', 'Biomimetics', 'Surface Chemistry'],
    keyConcepts: ['Perovskite solar cell', 'DOPA catechol', 'Bidentate chelation', 'Moisture barrier']
  },
  {
    id: 'science-1066238',
    title: 'Chaotic mixer for microchannels',
    authors: ['Stroock, A. D.', 'Dertinger, S. K. W.', 'Ajdari, A.', 'Mezic, I.', 'Stone, H. A.', 'Whitesides, G. M.'],
    year: 2002,
    venue: 'Science',
    doi: '10.1126/science.1066238',
    url: 'https://doi.org/10.1126/science.1066238',
    abstract: 'Mixing of fluids in microchannels is difficult because flow is laminar and mass transport depends on molecular diffusion. We demonstrate that passive grooved textures (staggered herringbone mixers) on the channel walls induce chaotic advection, reducing the mixing length by two orders of magnitude compared to untextured channels and enabling millisecond reaction control.',
    isOpenAccess: true,
    citationCount: 3950,
    source: 'Benchmark',
    fields: ['Microfluidics', 'Fluid Dynamics', 'Biomedical Devices'],
    keyConcepts: ['Chaotic advection', 'Laminar flow', 'Herringbone mixer', 'Reynolds number']
  },
  {
    id: 'jfm-2019-62',
    title: 'Artificial neural networks trained through deep reinforcement learning discover control strategies in fluid dynamics',
    authors: ['Rabault, J.', 'Kuchta, M.', 'Jensen, A.', 'Réglade, U.', 'Cerardi, N.'],
    year: 2019,
    venue: 'Journal of Fluid Mechanics',
    doi: '10.1017/jfm.2019.62',
    url: 'https://doi.org/10.1017/jfm.2019.62',
    abstract: 'Active flow control for drag reduction and vortex manipulation is a high-dimensional non-linear problem. In this study, we couple a 2D Navier-Stokes solver with deep reinforcement learning to optimize synthetic jet actuation around a circular cylinder. The autonomous agent discovers an anti-phase vortex shedding mechanism that reduces wake pressure drag by 8%.',
    isOpenAccess: true,
    citationCount: 480,
    source: 'Benchmark',
    fields: ['Aerodynamics', 'Machine Learning', 'Computational Physics'],
    keyConcepts: ['Deep reinforcement learning', 'Active flow control', 'Synthetic jets', 'Vortex shedding']
  }
];

export const INITIAL_KNOWLEDGE_GRAPH: KnowledgeGraphData = {
  nodes: [
    { id: 'f-energy', label: 'Energy Storage & Batteries', type: 'field', field: 'Electrochemistry', description: 'Rechargeable battery systems, solid-state electrolytes, and high-energy anodes.' },
    { id: 'f-biomed', label: 'Biomaterials & Sensors', type: 'field', field: 'Biomedical Engineering', description: 'Implantable sensors, biocompatible interfaces, and anti-biofouling coatings.' },
    { id: 'f-opto', label: 'Photovoltaics & Optoelectronics', type: 'field', field: 'Semiconductors', description: 'Perovskite solar cells, carrier transport layers, and defect passivation.' },
    { id: 'f-marine', label: 'Marine Biomimetics', type: 'field', field: 'Biochemistry', description: 'Underwater bio-adhesion, catechol-metal coordination, and self-assembling proteins.' },
    { id: 'f-microfluidics', label: 'Microfluidics & Diagnostics', type: 'field', field: 'Bioengineering', description: 'Lab-on-a-chip diagnostic devices, low Reynolds number laminar flows, and biosensors.' },
    { id: 'f-aerospace', label: 'Aerodynamics & Fluid Control', type: 'field', field: 'Aerospace Engineering', description: 'Turbulence control, zero-net-mass-flux synthetic jets, and chaotic advection.' },
    
    { id: 'p-sei-fracture', label: 'SEI Fracturing & Dendrites', type: 'problem', field: 'Electrochemistry', description: 'Cyclic volume expansion causes mechanical rupture of SEI and dendrite formation.' },
    { id: 'p-perov-degrade', label: 'Perovskite Moisture Leaching', type: 'problem', field: 'Semiconductors', description: 'Uncoordinated Pb2+ defects and moisture trigger alpha-to-delta phase transition.' },
    { id: 'p-diffusion-limit', label: 'Laminar Diffusion Bottleneck', type: 'problem', field: 'Bioengineering', description: 'Diffusion-limited mass transport delays point-of-care immunoassay binding.' },

    { id: 't-zwitterionic', label: 'Dynamic Zwitterionic Coating', type: 'technique', field: 'Biomedical Engineering', description: 'Supramolecular hydrogen-bonding matrices with electrostatic betaine dipoles.' },
    { id: 't-catechol', label: 'DOPA Catechol Chelation', type: 'technique', field: 'Biochemistry', description: 'Bidentate coordination of ortho-phenols to electrophilic metal cations.' },
    { id: 't-microjets', label: 'DRL Synthetic Micro-Jets', type: 'technique', field: 'Aerospace Engineering', description: 'Oscillatory zero-net-mass-flux vortex generation tuned by neural network policies.' },

    { id: 'm-stress-dissip', label: 'Dynamic Stress Dissipation', type: 'mechanism', field: 'Supramolecular Chemistry', description: 'Reversible non-covalent bond rupture/re-formation accommodates cyclic strain.' },
    { id: 'm-bidentate-chelate', label: 'Bidentate Pb2+ Passivation', type: 'mechanism', field: 'Surface Chemistry', description: 'Chelation rings fill metal halide vacancies, blocking moisture invasion.' },
    { id: 'm-chaotic-advection', label: 'Chaotic Advection Vorticity', type: 'mechanism', field: 'Fluid Mechanics', description: 'Repeated fluid stretching and folding collapses diffusion barriers.' },

    { id: 'mat-upypolymer', label: 'UPy-pSBMA Copolymer', type: 'material', field: 'Materials Science', description: 'Dual-functional self-healing polymer with UPy quadruple H-bonds and sulfobetaine.' },
    { id: 'mat-perovskite', label: 'FAPbI3 Halide Lattice', type: 'material', field: 'Semiconductors', description: 'High-performance black-phase formamidinium lead triiodide crystal.' },

    { id: 'pap-chen2013', label: 'Chen et al. (Nature Chem 2013)', type: 'paper', field: 'Materials Science', doi: '10.1038/nchem.1802', year: 2013, description: 'Self-healing polymer for silicon microparticle battery anodes.' },
    { id: 'pap-zheng2020', label: 'Zheng et al. (Adv Funct Mater 2020)', type: 'paper', field: 'Electrochemistry', doi: '10.1002/adfm.202001924', year: 2020, description: '3D zwitterionic artificial SEI for fast lithium-ion conduction.' },
    { id: 'pap-park2021', label: 'Park et al. (Nature Comm 2021)', type: 'paper', field: 'Photovoltaics', doi: '10.1038/s41467-021-23652-3', year: 2021, description: 'DOPA-functionalized interface engineering for stable perovskites.' },
    { id: 'pap-stroock2002', label: 'Stroock et al. (Science 2002)', type: 'paper', field: 'Microfluidics', doi: '10.1126/science.1066238', year: 2002, description: 'Chaotic mixer for microchannels via staggered herringbone textures.' }
  ],
  links: [
    { source: 'f-energy', target: 'p-sei-fracture', relationship: 'investigates', weight: 3 },
    { source: 'f-biomed', target: 't-zwitterionic', relationship: 'developed', weight: 3 },
    { source: 'p-sei-fracture', target: 't-zwitterionic', relationship: 'mitigated_by (CROSS-FIELD)', weight: 5, evidenceExcerpt: 'Chen et al. 2013 showed self-healing networks absorb 300% volume expansion.' },
    { source: 't-zwitterionic', target: 'm-stress-dissip', relationship: 'operates_via', weight: 4 },
    { source: 'm-stress-dissip', target: 'mat-upypolymer', relationship: 'embodied_in', weight: 3 },
    { source: 't-zwitterionic', target: 'pap-chen2013', relationship: 'supported_by', weight: 2 },
    { source: 't-zwitterionic', target: 'pap-zheng2020', relationship: 'supported_by', weight: 2 },

    { source: 'f-opto', target: 'p-perov-degrade', relationship: 'investigates', weight: 3 },
    { source: 'f-marine', target: 't-catechol', relationship: 'originated_from', weight: 3 },
    { source: 'p-perov-degrade', target: 't-catechol', relationship: 'stabilized_by (CROSS-FIELD)', weight: 5, evidenceExcerpt: 'Bidentate catechol ortho-hydroxyls chelate uncoordinated Pb2+ cations.' },
    { source: 't-catechol', target: 'm-bidentate-chelate', relationship: 'operates_via', weight: 4 },
    { source: 'm-bidentate-chelate', target: 'mat-perovskite', relationship: 'passivates', weight: 4 },
    { source: 't-catechol', target: 'pap-park2021', relationship: 'supported_by', weight: 2 },

    { source: 'f-microfluidics', target: 'p-diffusion-limit', relationship: 'constrained_by', weight: 3 },
    { source: 'f-aerospace', target: 't-microjets', relationship: 'developed', weight: 3 },
    { source: 'p-diffusion-limit', target: 't-microjets', relationship: 'overcome_by (CROSS-FIELD)', weight: 5, evidenceExcerpt: 'Zero-net-mass-flux micro-jets induce chaotic advection without net injection.' },
    { source: 't-microjets', target: 'm-chaotic-advection', relationship: 'operates_via', weight: 4 },
    { source: 'm-chaotic-advection', target: 'pap-stroock2002', relationship: 'supported_by', weight: 2 }
  ]
};

export const BENCHMARK_GAPS: ResearchGap[] = [
  {
    id: 'gap-cryo-eutectic',
    domain: 'Cryopreservation Biology',
    secondaryDomain: 'High-Entropy Alloy Solidification',
    title: 'Absence of Deep Eutectic Multi-Component Vitrification Models for Complex Mammalian Vascular Organs',
    description: 'Current cryopreservation protocols rely almost exclusively on high concentrations of cytotoxic dimethyl sulfoxide (DMSO). Metallurgy and glass physics have developed thermodynamic models for multi-component deep eutectic systems that suppress nucleation completely at low solute concentrations, yet this has not been systematically coupled with organ vascular perfusate rheology.',
    frequentlyStudiedParadigm: 'Titration of single-agent permeating cryoprotectants (DMSO, glycerol, ethylene glycol) with gradual stepped washouts.',
    underexploredIntersection: 'Thermodynamic configurational entropy maximization in multi-component deep eutectic ionic liquids for ice-free vitrification.',
    contradictoryEvidenceSummary: 'Multiple studies confirm vitrification at -140°C in small 1-mL vials, but whole-organ perfusion fails due to catastrophic thermal shock fracturing and non-uniform cooling rates across thick parenchymal tissue.',
    authorAcknowledgedLimitations: [
      {
        paperTitle: 'Principles of organ cryopreservation and sub-zero vitrification',
        doi: '10.1016/j.cryobiol.2019.08.002',
        quote: 'Existing solute toxicity screening is conducted in cell monolayers; physical shear and concentration gradients during whole-organ microvascular perfusion remain fundamentally unsolved.'
      }
    ],
    opportunityScore: 92,
    potentialImpact: 'Paradigm Shift',
    suggestedDirections: [
      'Design ternary choline chloride-trehalose-glycerol deep eutectic solutions with glass transition temperature (Tg) > -120°C',
      'Deploy magnetic hyperthermia inductive rewarming using functionalized biocompatible iron oxide nanoparticles to eliminate thermal stress cracking'
    ],
    confidence: 88
  },
  {
    id: 'gap-solid-state-mechanics',
    domain: 'Solid-State Battery Chemistry',
    secondaryDomain: 'Geophysical Fault Mechanics',
    title: 'Neglect of Grain-Boundary Shear Stresses and Griffith Crack Propagation in Inorganic Solid Electrolyte Dendrite Infiltration',
    description: 'Prevailing battery theory assumes lithium dendrites cannot penetrate solid ceramic electrolytes with shear moduli > 8.5 GPa (Monroe-Newman model). However, experimental Li dendrite propagation persists at current densities above 1 mA cm-2 through intergranular grain-boundary defects, which obey fracture mechanics rather than bulk elastic deformation.',
    frequentlyStudiedParadigm: 'Chemical composition tuning of sulfide and garnet lattices to elevate bulk ionic conductivity.',
    underexploredIntersection: 'Applying geological rock fault mechanics and residual compressive pre-stressing to arrest crack-tip stress intensity factors (K_I < K_Ic).',
    contradictoryEvidenceSummary: 'Theoretical calculations predict metallic lithium will be mechanically blocked by LLZO (modulus ~150 GPa), yet in-situ X-ray tomography reveals lithium creeps along 20-nm grain boundaries at critical current densities as low as 0.4 mA cm-2.',
    authorAcknowledgedLimitations: [
      {
        paperTitle: 'Mechanism of lithium metal penetration through inorganic solid electrolytes',
        doi: '10.1002/aenm.201701003',
        quote: 'Bulk elastic modulus is an insufficient descriptor; intergranular flaw distributions and sub-surface electronic conductivity govern localized electrodeposition.'
      }
    ],
    opportunityScore: 95,
    potentialImpact: 'High',
    suggestedDirections: [
      'Engineered surface compressive residual stress fields via laser peening or ion-exchange chemical tempering to deflect crack paths',
      'Grain boundary dopant engineering to suppress localized mixed ionic-electronic conduction (MIEC)'
    ],
    confidence: 94
  }
];

export const BENCHMARK_HYPOTHESES: ResearchHypothesis[] = [
  {
    id: 'hyp-sei-upysbma',
    title: 'Dual-Network UPy-pSBMA Artificial SEI for High-Rate Dendrite-Free Lithium Metal Anodes',
    statement: 'A 2.5 µm artificial solid electrolyte interphase comprising supramolecular 2-ureido-4[1H]-pyrimidinone (UPy) quadruple hydrogen-bonding crosslinks and poly(sulfobetaine methacrylate) (pSBMA) zwitterionic dipoles will maintain >99.4% Coulombic efficiency and suppress dendrite formation over 800 cycles at 10 mA cm-2 by dynamically dissipating cyclic volumetric stress and homogenizing Li+ desolvation.',
    backgroundContext: 'Lithium metal battery anodes undergo continuous 300% volume fluctuations during cycling, pulverizing rigid passive films and triggering dangerous dendritic growth. In implantable bioelectronics, dynamic supramolecular hydrogels withstand mechanical tissue micromotion through reversible bond dissociation.',
    proposedMechanism: 'Mechanical shear from Li expansion transiently unzips UPy non-covalent quadruple hydrogen bonds to absorb mechanical strain energy, preventing crack propagation. Concurrently, the zwitterionic betaine dipoles lower the Li+ desolvation energy barrier and enforce uniform electric field lines across the interfacial boundary.',
    originField: 'Energy Storage & Electrochemistry',
    targetField: 'Biomaterials & Biosensors',
    epistemicStatus: 'Evidence-supported possibility',
    evidenceFor: [
      {
        claim: 'Self-healing UPy polymers spontaneously repair microcracks at room temperature in battery anodes',
        source: 'Chen et al., Nature Chemistry 2013',
        doi: '10.1038/nchem.1802',
        passage: 'Spontaneously repairs microcracks formed in the electrode during cycling at room temperature, enabling 10-fold cycle life expansion.'
      },
      {
        claim: 'Zwitterionic betaine groups induce uniform electric fields and achieve stable Li plating over 1200 h',
        source: 'Zheng et al., Adv Funct Mater 2020',
        doi: '10.1002/adfm.202001924',
        passage: 'Zwitterionic betaine groups regulate Li+ transport kinetics (t_Li+ = 0.72) and suppress dendrite growth.'
      }
    ],
    evidenceAgainstOrCaveats: [
      {
        claim: 'High desolvation activation energy in carbonate electrolytes below -15°C',
        source: 'Nano Energy 2022',
        doi: '10.1016/j.nanoen.2022.107841',
        severity: 'Moderate'
      },
      {
        claim: 'Oxidative degradation above 4.3 V vs Li/Li+',
        source: 'ACS Energy Letters 2021',
        doi: '10.1021/acsenergylett.1c02104',
        severity: 'Critical if unshielded on cathode side'
      }
    ],
    coreAssumptions: [
      'The copolymer will not dissolve or delaminate into organic carbonate solvents over multi-month timescales',
      'The electronic conductivity of the artificial layer remains below 10^-10 S/cm to prevent electron leakage to electrolyte',
      'Dynamic hydrogen bond re-association kinetics are faster than the mechanical strain rate at 10 mA cm-2'
    ],
    feasibility: {
      score: 89,
      timeframeMonths: 6,
      equipmentRequired: ['In-situ AFM in Argon Glovebox', 'Cryo-TEM (low-dose 300 kV)', 'BioLogic Multi-channel EIS Potentiostat', 'Coin-cell Automated Crimper'],
      budgetTier: 'Medium ($10k-$50k)'
    },
    suggestedExperiment: BENCHMARK_DISCOVERIES[0].proposedExperiment,
    status: 'Protocol Designed',
    sourcePapers: BENCHMARK_PAPERS.slice(0, 2),
    createdAt: '2026-10-15'
  }
];
