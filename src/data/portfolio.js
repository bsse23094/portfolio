import resumePdf from "../assets/documents/Ahmed_Ayyan_Mukhtar_AI_Resume.pdf";
import portrait from "../assets/images/profile/ahmed-portrait.webp";
import codegen from "../assets/images/projects/Codegen.webp";
import studybuddy from "../assets/images/projects/studybuddy.webp";
import cinetex from "../assets/images/projects/cinetex.webp";
import orionex from "../assets/images/projects/orionex.webp";
import issues from "../assets/images/projects/issue-beacon.webp";
import ideal from "../assets/images/projects/ideal.webp";
import humanrights from "../assets/images/projects/hrs.webp";
import restaurant from "../assets/images/projects/skime.webp";

export const profile = {
  name: "Ahmed Ayyan Mukhtar",
  email: "ahmedayyan555@gmail.com",
  github: "https://github.com/bsse23094",
  linkedin: "https://linkedin.com/in/ahmed-ayyan",
  resumePdf,
  portrait,
};

// Professional claims and dates follow the supplied October 2026 CV.
export const experience = [
  {
    company: "Systems Limited",
    location: "Lahore, Pakistan",
    role: "AI Engineering Intern",
    start: "Jul 2026",
    end: "Sep 2026",
    description: "Backend engineering for an agentic commerce platform.",
    points: [
      "Contributed to ASP.NET Core APIs, including controllers, request/response models, JSON serialization, and validation.",
      "Tested and debugged request flows across service boundaries to support reliable AI-agent and backend integration.",
    ],
    stack: ["ASP.NET Core", "C#", "REST APIs", "Agentic commerce"],
  },
  {
    company: "CyberSoft Solutions",
    location: "Remote",
    role: "AI Engineer",
    start: "Feb 2025",
    end: "Jun 2026",
    description: "Connecting agentic AI to enterprise software.",
    points: [
      "Designed agentic workflows with LLM orchestration, tool/function calling, and multi-step execution to automate business processes.",
      "Built C#/.NET services and REST APIs connecting agents to enterprise applications, databases, and external tools.",
      "Implemented RAG and knowledge retrieval with prompt engineering and context management; collaborated remotely on integration testing and framework evaluation.",
    ],
    stack: ["C# / .NET", "LLM orchestration", "RAG", "Tool calling"],
  },
];

export const selectedProjects = [
  {
    id: "reply-mirror",
    number: "01",
    title: "Reply Mirror",
    category: "Agentic AI / Fraud detection",
    description:
      "Seven specialized agents. One coordinated fraud decision. LLM analysis is routed to higher-risk cases to keep the pipeline cost-aware.",
    metric: "7",
    metricLabel: "specialized agents",
    stack: ["Python", "LangGraph", "Langfuse"],
    repository: "https://github.com/bsse23094/reply-mirror-fraud-detection",
    challenge:
      "Fraud signals arrive across behavior, geography, messages, and audio. Running expensive language-model analysis on every case wastes resources.",
    approach:
      "Built a graph spanning ingestion, behavior, geo, communications, audio, fusion, and decision. Deterministic signals guide which cases need deeper LLM analysis.",
    evidence:
      "Adaptive risk thresholds and end-to-end Langfuse traces make individual agent stages and final decisions inspectable.",
  },
  {
    id: "medisense",
    number: "02",
    title: "MediSense AI",
    category: "Retrieval systems / Healthcare",
    description:
      "A clinical assistant that grounds responses in WHO/NIH guidance and OCR-extracted patient reports, with isolated vector-store collections.",
    metric: "5th",
    metricLabel: "of 200+ hackathon teams",
    stack: ["Python", "LangChain", "ChromaDB"],
    repository: "https://github.com/BSSE23102/MediSense",
    challenge:
      "Clinical questions need relevant medical guidance and the context inside a patient report, often supplied as a scan.",
    approach:
      "Developed a hybrid retrieval pipeline combining WHO/NIH guidelines with OCR-extracted report content. Patient report collections are isolated in the vector store.",
    evidence:
      "Placed 5th among 200+ teams at the HEC Generative AI National Hackathon 2025. A project prototype, not a clinical service.",
  },
  {
    id: "cicd",
    number: "03",
    title: "CI/CD Build Failure Predictor",
    category: "Applied ML / Developer tooling",
    description:
      "Pre-build risk assessment from 20,000 Travis CI logs, with explainable predictions served through a containerized API.",
    metric: "0.77",
    metricLabel: "ROC-AUC",
    stack: ["XGBoost", "SHAP", "FastAPI", "Docker", "AWS"],
    repository: "https://github.com/bsse23094/cicd-predictor",
    challenge:
      "Build failures consume developer time and compute. The goal was to assess failure risk before a build runs.",
    approach:
      "Modeled 20,000 Travis CI logs with tuned XGBoost and added SHAP explanations to make the model’s predictions understandable.",
    evidence:
      "Achieved 0.77 ROC-AUC and deployed a Dockerized FastAPI prediction service to AWS Elastic Beanstalk.",
  },
  {
    id: "ufc",
    number: "04",
    title: "UFC Fight Predictor",
    category: "Applied ML / Data engineering",
    description:
      "A prediction pipeline built around leakage-safe pre-fight data, careful feature engineering, and automated validation.",
    metric: "155",
    metricLabel: "automated tests",
    stack: ["Python", "Polars", "XGBoost", "FastAPI"],
    repository: "https://github.com/bsse23094/ufc-predictor",
    challenge:
      "Sports models can accidentally learn from information that would not have been available before a fight.",
    approach:
      "Engineered 130 features from 9,068 bouts and 18,136 leakage-safe pre-fight snapshots, keeping the data timeline central to the pipeline.",
    evidence:
      "Added 155 automated tests to validate the pipeline, with an emphasis on reproducible data preparation and evaluation.",
  },
];

export const capabilities = [
  {
    title: "Agentic systems",
    description:
      "Orchestration, tool calling, retrieval, and observable multi-step workflows.",
    tools: "LangGraph · LangChain · ChromaDB · Langfuse · Ollama",
  },
  {
    title: "Backend engineering",
    description:
      "The APIs and data services that connect intelligence to an actual product.",
    tools: "C# / .NET · ASP.NET Core · FastAPI · SQL · PostgreSQL",
  },
  {
    title: "Applied machine learning",
    description:
      "Careful feature engineering, explainable models, and deployable inference.",
    tools: "Python · XGBoost · scikit-learn · SHAP · Docker · AWS",
  },
  {
    title: "Product interfaces",
    description:
      "Clear, responsive interfaces that make complex systems usable.",
    tools: "TypeScript · Angular · React · Next.js",
  },
];

export const archiveProjects = [
  {
    title: "A-EYE / J.A.R.V.I.S.",
    category: "AI & ML",
    description:
      "A local multimodal assistant combining local language models, voice, and computer vision.",
    stack: ["Python", "Ollama", "YOLOv8"],
    repository: "https://github.com/bsse23094/A-EYE",
  },
  {
    title: "SentinelAI",
    category: "AI & ML",
    description:
      "AI-assisted code analysis inside VS Code, with inline diagnostics and quick fixes.",
    stack: ["TypeScript", "VS Code API", "LLMs"],
    repository: "https://github.com/bsse23094/SentinelAI",
  },
  {
    title: "CodeGen",
    category: "Web applications",
    image: codegen,
    description:
      "A visual landing-page builder with drag-and-drop editing and code export.",
    stack: ["Angular", "TypeScript"],
    demo: "https://bsse23094.github.io/codeGen/",
  },
  {
    title: "StudyBuddy",
    category: "Web applications",
    image: studybuddy,
    description:
      "An AI learning workspace for study plans, quizzes, and progress tracking.",
    stack: ["Angular", "Cloudflare Workers", "AI"],
    demo: "https://bsse23094.github.io/studyBuddy/",
    repository: "https://github.com/bsse23094/studyBuddy",
  },
  {
    title: "Cinetex",
    category: "Web applications",
    image: cinetex,
    description:
      "Movie discovery with search, ratings, favorites, and personal watchlists.",
    stack: ["Angular", "TMDB API"],
    demo: "https://bsse23094.github.io/cinetex_/",
    repository: "https://github.com/bsse23094/cinetex_",
  },
  {
    title: "Issue Beacon",
    category: "Web applications",
    image: issues,
    description:
      "A focused interface for exploring and filtering GitHub repository issues.",
    stack: ["Angular", "GitHub API", "TypeScript"],
    demo: "https://bsse23094.github.io/issue-beacon/",
    repository: "https://github.com/bsse23094/issue-beacon",
  },
  {
    title: "Orionex",
    category: "Client work",
    image: orionex,
    description:
      "A digital agency portfolio with an interactive WebGL galaxy and motion design.",
    stack: ["React", "WebGL", "GSAP"],
    demo: "https://bsse23094.github.io/orionex/",
    repository: "https://github.com/bsse23094/orionex-revamped",
  },
  {
    title: "Ideal Janitorial Services",
    category: "Client work",
    image: ideal,
    description:
      "A responsive service-business website with clear paths to inquiry.",
    stack: ["HTML", "CSS", "JavaScript"],
    // Retain the old destination for maintenance, without linking to a dead domain.
    archivedUrl: "https://idealjanitorialservices.org/",
    status: "Archived client project",
  },
  {
    title: "Human Rights Organisation",
    category: "Client work",
    image: humanrights,
    description:
      "A mission-led website supporting a human-rights organization’s online presence.",
    stack: ["JavaScript", "Tailwind CSS", "MySQL"],
    demo: "https://humanrightsitu.site/",
  },
  {
    title: "Restaurant Management System",
    category: "Web applications",
    image: restaurant,
    description:
      "A restaurant interface for exploring menus and managing reservations.",
    stack: ["JavaScript", "Bootstrap", "LocalStorage"],
    demo: "https://bsse23094.github.io/RMS/",
    repository: "https://github.com/bsse23094/RMS",
  },
];
