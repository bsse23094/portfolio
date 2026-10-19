// An explanatory model of the CV's seven-agent Reply Mirror pipeline.
// This is an architecture walkthrough, not a live fraud inference service.
export const systemNodes = [
  {
    id: "ingest",
    name: "Ingestion",
    short: "Ingest",
    layer: "Input",
    position: [-3.7, 0, 0],
    detail:
      "Bring the available signals into one case before specialist agents inspect them.",
    output: "A shared case context",
  },
  {
    id: "behavior",
    name: "Behavior",
    short: "Behavior",
    layer: "Signal checks",
    position: [-1.15, 0, -2.4],
    detail:
      "Inspect behavioral signals for anomalies. These inexpensive checks help decide which cases need closer analysis.",
    output: "Behavioral risk signals",
  },
  {
    id: "geo",
    name: "Geography",
    short: "Geo",
    layer: "Signal checks",
    position: [-1.15, 0, -0.8],
    detail:
      "Look at geographic inconsistencies alongside the behavioral evidence.",
    output: "Geographic risk signals",
  },
  {
    id: "comms",
    name: "Communications",
    short: "Comms",
    layer: "Context review",
    position: [-1.15, 0, 0.8],
    detail:
      "Analyze suspicious communications. Language-model calls are directed to higher-risk cases to control cost.",
    output: "Communication risk signals",
  },
  {
    id: "audio",
    name: "Audio",
    short: "Audio",
    layer: "Context review",
    position: [-1.15, 0, 2.4],
    detail:
      "Add audio analysis when a case includes voice evidence, extending the pipeline beyond text.",
    output: "Audio risk signals",
  },
  {
    id: "fusion",
    name: "Signal fusion",
    short: "Fusion",
    layer: "Decision",
    position: [1.45, 0, 0],
    detail:
      "Combine the specialist signals into a shared assessment. Langfuse traces make the agent stages inspectable.",
    output: "A combined risk assessment",
  },
  {
    id: "decision",
    name: "Decision",
    short: "Decision",
    layer: "Decision",
    position: [3.7, 0, 0],
    detail:
      "Apply adaptive risk thresholds to the combined evidence and produce the pipeline’s decision.",
    output: "A traceable fraud decision",
  },
];

export const systemEdges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [1, 5],
  [2, 5],
  [3, 5],
  [4, 5],
  [5, 6],
];
export const traceSteps = [
  { active: [0], selected: 0, label: "01 / Ingest the case" },
  { active: [1, 2], selected: 1, label: "02 / Check behavior and geography" },
  { active: [3, 4], selected: 3, label: "03 / Review higher-risk evidence" },
  { active: [5], selected: 5, label: "04 / Combine the signals" },
  { active: [6], selected: 6, label: "05 / Produce a decision" },
];
