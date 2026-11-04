export const projects = [
  {
    id: "careerlens",
    slug: "careerlens",
    number: "01",
    title: "CareerLens",
    subtitle: "AI Resume Analysis Platform",
    category: "Agentic AI & LLM Applications",
    categories: ["Agentic AI & LLMs", "Full-Stack Development"],
    tagline: "Intelligent resume evaluation and skill-gap detection orchestrated with LangGraph and FastAPI.",
    description: "An AI-powered resume analysis application designed to identify technical competencies, detect skill gaps, and generate personalized, context-aware evaluations.",
    fullOverview: "CareerLens transforms the hiring feedback loop by orchestrating a modular 4-stage LangGraph workflow. Instead of passing an entire unstructured document to a single prompt, the system separates extraction, role analysis, algorithmic scoring, and synthesized feedback into distinct deterministic nodes. Backed by FastAPI, Gemini API, and a reactive Next.js interface, it offers candidate transparency and comprehensive competency benchmarking.",
    problemStatement: "Traditional ATS systems rely on keyword matching without semantic understanding, while single-pass LLM prompts suffer from hallucinations, inconsistent scoring, and loss of document nuance. Candidates receive vague rejections without actionable pathways for improvement.",
    solutionArchitecture: "A directed acyclic graph (DAG) compiled with LangGraph separates resume parsing and job description extraction into concurrent branches. The extracted state fans into a scoring engine that computes competency overlap and missing requirements, followed by an LLM synthesis node that formulates concrete, context-aware feedback.",
    technologies: ["Python", "FastAPI", "LangChain", "LangGraph", "Gemini API", "Next.js", "Docker", "MongoDB"],
    metrics: [
      { label: "Pipeline Architecture", value: "4-Stage DAG", detail: "LangGraph StateGraph orchestration" },
      { label: "Backend Service", value: "FastAPI REST", detail: "Async AI inference & authentication" },
      { label: "State Graph Nodes", value: "Parallel Execution", detail: "Concurrent resume & JD extraction" },
      { label: "Frontend", value: "Next.js App Router", detail: "Modular responsive dashboard" }
    ],
    github: "https://github.com/Sidd1475/CareerLens",
    liveDemo: null,
    isFlagship: true,
    featured: true,
    visibility: "public",
    engineeringTradeoff: "Opted for stateful graph orchestration over sequential chains: while LangGraph introduced higher initial structural overhead, it enabled branch parallelization (parsing resume and JD simultaneously) and deterministic schema validation between nodes, cutting latency and eliminating hallucinated skill scores.",
    limitations: "Current resume parsing is optimized for single-column text flows; complex multi-column PDFs with irregular graphic artifacts require manual OCR normalization.",
    futureRoadmap: [
      { title: "LangSmith Tracing", status: "Planned", desc: "Automated latency and token consumption telemetry per graph node." },
      { title: "Real-time SSE Streaming", status: "Planned", desc: "Server-Sent Events for progressive scoring and candidate feedback updates." },
      { title: "Automated LaTeX Generator", status: "Planned", desc: "Compile optimized resume PDFs incorporating gap remediation advice." }
    ],
    architectureStages: [
      {
        stage: "01",
        name: "resume_parser",
        description: "Ingests PDF/DOCX resumes, normalizes candidate metadata, extracts structured work history, and isolates verified technical competencies.",
        tech: "LangChain PyPDF + Pydantic"
      },
      {
        stage: "02",
        name: "job_analyze",
        description: "Executes in parallel with stage 01 to parse role requirements, must-have tools, seniority indicators, and domain prerequisites from the target JD.",
        tech: "Gemini Schema Generation"
      },
      {
        stage: "03",
        name: "calculate_score",
        description: "Fans in state from both branches to compute competency match index, categorical alignment ratios, and weighted skill deficit matrices.",
        tech: "Deterministic Scoring Node"
      },
      {
        stage: "04",
        name: "feedback",
        description: "Generates tailored, constructive recommendations highlighting high-impact gaps, phrasing enhancements, and prioritized next steps.",
        tech: "Context-Grounded LLM Synthesis"
      }
    ],
    technicalHighlights: [
      "Designed a 4-stage LangGraph orchestration pipeline for document processing, prompt engineering, structured reasoning, and response synthesis.",
      "Implemented concurrent branch execution for resume parsing and job description decomposition, reducing end-to-end processing latency.",
      "Developed an asynchronous FastAPI backend integrating Gemini API inference, token usage tracking, and persistent session storage.",
      "Enforced strict Pydantic schemas for intermediate state transfers, ensuring zero hallucinated skill schemas across graph transitions.",
      "Engineered an interactive Next.js dashboard featuring visual competency radars, skill match badges, and section-by-section optimization tips."
    ],
    systemFlow: [
      { from: "Candidate Resume", to: "resume_parser", label: "PDF Document Ingestion" },
      { from: "Target Job Spec", to: "job_analyze", label: "Requirement Extraction" },
      { from: "resume_parser", to: "calculate_score", label: "Structured Competencies" },
      { from: "job_analyze", to: "calculate_score", label: "Role Requirements Matrix" },
      { from: "calculate_score", to: "feedback", label: "Scoring & Gap Vectors" },
      { from: "feedback", to: "Next.js Dashboard", label: "Personalized Action Plan" }
    ]
  },
  {
    id: "agriinsight",
    slug: "agriinsight",
    number: "02",
    title: "AgriInsight",
    subtitle: "Crop Yield Intelligence System",
    category: "Machine Learning & Predictive Analytics",
    categories: ["Machine Learning"],
    tagline: "District-level agricultural yield forecasting and model interpretability trained on 340,000+ national crop records.",
    description: "A machine learning application for district-level crop-yield prediction, agricultural trend exploration, and understanding which input features influence model predictions.",
    fullOverview: "AgriInsight models the complex non-linear relationships between agricultural inputs—geographical state, district, crop type, seasonality, and cultivation area—to forecast crop yield per hectare. Built on a production-optimized RandomForestRegressor pipeline trained across 340,000+ records, it balances predictive accuracy (Test R² ≈ 0.80) with a compact 24.5 MB deployment footprint and transparent feature-importance explainability.",
    problemStatement: "Agricultural planners and farmers frequently struggle with volatile crop yield variations and misleading raw production figures that do not normalize for land area. Furthermore, complex 'black-box' ML models lack interpretability, preventing stakeholders from trusting and acting upon predictions.",
    solutionArchitecture: "A robust scikit-learn ColumnTransformer handles numeric scaling via StandardScaler, categorical one-hot encoding for states, seasons, and crops, and TargetEncoding for hundreds of unique districts to prevent high-dimensional memory explosion. The trained RandomForest pipeline feeds a 3-tab Streamlit interface providing prediction, historical regional trend exploration, and explainable feature importances.",
    technologies: ["Python", "Scikit-learn", "Random Forest", "Pandas", "NumPy", "Streamlit"],
    metrics: [
      { label: "Trained Records", value: "340,000+", detail: "Historical agricultural dataset" },
      { label: "Test R² Performance", value: "≈ 0.80", detail: "Constrained production model" },
      { label: "Model Artifact", value: "~24.5 MB", detail: "Compact production deployment" },
      { label: "Encoding Strategy", value: "TargetEncoder", detail: "District-level high-cardinality representation" }
    ],
    github: "https://github.com/Sidd1475/AgriInsight-Crop-Yield-Intelligence-Prediction-System",
    liveDemo: null,
    isFlagship: false,
    featured: true,
    visibility: "public",
    engineeringTradeoff: "Discarded early unconstrained models (~1 GB serialization size) in favor of depth-regularized trees and TargetEncoding. This kept model size down to ~24.5 MB with minimal loss in predictive power (R² ≈ 0.80) while preventing catastrophic out-of-memory errors on deployment servers.",
    limitations: "Predictions are conditioned on historical cultivation records; extreme sudden climate disruptions (e.g. flash floods, unprecedented heatwaves) require external meteorological feature integration.",
    futureRoadmap: [
      { title: "Weather API Integration", status: "Planned", desc: "Incorporate live precipitation and soil moisture satellite feeds." },
      { title: "SHAP Explainability", status: "In-Progress", desc: "Integrate SHAP local explanation waterfall plots for individual farmer consultations." }
    ],
    architectureStages: [
      {
        stage: "01",
        name: "Data Ingestion & Cleaning",
        description: "Filtered over 340,000 national crop records, sanitized geographic misalignments, removed statistical yield anomalies, and normalized metric units.",
        tech: "Pandas & NumPy"
      },
      {
        stage: "02",
        name: "Feature Engineering",
        description: "Constructed temporal year-end markers, seasonality groupings, and target-encoded district markers to prevent cardinality explosion.",
        tech: "Scikit-learn ColumnTransformer"
      },
      {
        stage: "03",
        name: "RandomForest Pipeline",
        description: "Trained an ensemble of decision trees with constrained depth and leaf splits to eliminate overfitting, yielding a robust Test R² ≈ 0.80.",
        tech: "RandomForestRegressor (~24.5 MB)"
      },
      {
        stage: "04",
        name: "Explainability & Dashboard",
        description: "Exposes Gini feature importance plots and plain-language interpretations within a lightweight Streamlit interface for non-technical planners.",
        tech: "Streamlit & Matplotlib"
      }
    ],
    technicalHighlights: [
      "Trained and optimized a Random Forest regression model on 340,000+ agricultural records, achieving R² ≈ 0.80 for district-level crop yield prediction.",
      "Engineered an automated preprocessing pipeline with TargetEncoder for high-cardinality district features, avoiding sparse matrix memory bloat.",
      "Maintained strict model compactness (~24.5 MB) by regularizing tree depth, discarding brittle overfitted 1GB prototypes in favor of production reliability.",
      "Implemented a 3-panel Streamlit dashboard delivering real-time yield simulations, historical volatility trends, and model feature interpretability.",
      "Provided actionable insights into which factors (area, season, district) govern yield variations across multiple states and crops."
    ],
    systemFlow: [
      { from: "Agricultural Raw Records", to: "Preprocessing Engine", label: "340K+ Observations" },
      { from: "Preprocessing Engine", to: "ColumnTransformer", label: "Target & One-Hot Encoding" },
      { from: "ColumnTransformer", to: "Random Forest Regressor", label: "Ensemble Pipeline" },
      { from: "Random Forest Regressor", to: "Streamlit UI", label: "Yield Predictions (R² ≈ 0.80)" },
      { from: "Model Feature Weights", to: "Explainability Panel", label: "Factor Importance Plots" }
    ]
  },
  {
    id: "yt-gpt",
    slug: "yt-gpt",
    number: "03",
    title: "YT GPT",
    subtitle: "RAG-Based YouTube Chatbot",
    category: "Generative AI & Retrieval-Augmented Generation",
    categories: ["RAG & Retrieval", "Agentic AI & LLMs"],
    tagline: "Conversational question-answering grounded in YouTube video transcripts with FAISS vector search and timestamped citations.",
    description: "A conversational application that uses video transcripts and semantic retrieval to answer questions grounded in YouTube content.",
    fullOverview: "YT GPT enables users to engage in context-aware conversations with long-form video content without manual scrubbing. By orchestrating an 8-stage retrieval-augmented generation workflow, the application extracts automated and manual transcripts, segments them into semantically cohesive chunks, generates dense vector representations via Sentence Transformers, and retrieves the most relevant context using FAISS to anchor Gemini LLM responses.",
    problemStatement: "Educational and technical YouTube videos frequently span 1 to 3+ hours, making information retrieval painful and time-consuming. Generic LLMs hallucinate video contents without grounded transcript ingestion, and long transcripts quickly breach prompt context limits or dilute retrieval precision.",
    solutionArchitecture: "An 8-stage RAG workflow parses YouTube URLs via the YouTube Transcript API, cleans timestamped segments, chunks text with sliding overlap, indexes embeddings in a local FAISS index, and retrieves Top-K candidates. Retrieved contexts are injected with exact timestamp markers into Gemini LLM prompts, accompanied by conversational memory and duplicate filtering.",
    technologies: ["Python", "FAISS", "Sentence Transformers", "Gemini API", "YouTube Transcript API", "Streamlit"],
    metrics: [
      { label: "Workflow Architecture", value: "8-Stage RAG", detail: "End-to-end ingestion-to-synthesis pipeline" },
      { label: "Vector Index", value: "FAISS L2/Cosine", detail: "Sub-millisecond dense semantic retrieval" },
      { label: "Embedding Engine", value: "Sentence Transformers", detail: "Dense semantic representation" },
      { label: "Grounding", value: "Timestamp Anchors", detail: "Verifiable direct video references" }
    ],
    github: "https://github.com/Sidd1475/Youtube-RAG-Chatbot",
    liveDemo: null,
    isFlagship: false,
    featured: true,
    visibility: "public",
    engineeringTradeoff: "Selected local FAISS In-Memory index over managed cloud vector databases for instant initialization and zero infrastructure cost during per-video sessions, paired with duplicate-chunk suppression to maximize token context efficiency.",
    limitations: "Videos with subtitles disabled or automatic transcription restricted by creators cannot be ingested directly without audio extraction and Whisper speech-to-text fallbacks.",
    futureRoadmap: [
      { title: "Whisper STT Integration", status: "Planned", desc: "Fallback speech-to-text pipeline for videos with missing official captions." },
      { title: "Multi-Video Corpus Indexing", status: "Planned", desc: "Support channel-level and playlist-wide semantic search indices." }
    ],
    architectureStages: [
      {
        stage: "01",
        name: "Transcript Ingestion",
        description: "Fetches official or auto-generated video captions with start timestamps and duration metadata via YouTube Transcript API.",
        tech: "YouTube Transcript API"
      },
      {
        stage: "02",
        name: "Sanitization & Preprocessing",
        description: "Cleans filler words, non-speech tokens, and format artifacts while preserving precise timeline associations.",
        tech: "Custom Regex & Text Normalizer"
      },
      {
        stage: "03",
        name: "Semantic Chunking",
        description: "Splits continuous transcript stream into semantically cohesive text passages with configurable token windows and overlap.",
        tech: "Recursive Character Splitter"
      },
      {
        stage: "04",
        name: "Vector Embeddings",
        description: "Converts text passages into 384-dimensional dense semantic vectors capturing conceptual similarity.",
        tech: "Sentence Transformers (all-MiniLM-L6-v2)"
      },
      {
        stage: "05",
        name: "FAISS Indexing & Dedup",
        description: "Builds a high-performance local vector index with duplicate chunk suppression to maximize token diversity.",
        tech: "FAISS (IndexFlatIP)"
      },
      {
        stage: "06",
        name: "Similarity Retrieval",
        description: "Executes cosine similarity search against user queries to retrieve top-k context passages with associated timestamps.",
        tech: "FAISS Semantic Retrieval"
      },
      {
        stage: "07",
        name: "Context Orchestration",
        description: "Injects retrieved passages, conversational history, and strict grounding constraints into an engineered prompt template.",
        tech: "System Prompt Orchestrator"
      },
      {
        stage: "08",
        name: "Gemini Synthesis",
        description: "Generates coherent answers with clickable timestamp references, allowing users to jump directly to source moments.",
        tech: "Google Gemini 1.5 Pro / Flash"
      }
    ],
    technicalHighlights: [
      "Built an 8-stage RAG pipeline covering transcript ingestion, preprocessing, chunking, vector embedding, indexing, retrieval, system prompting, and Gemini LLM generation.",
      "Implemented high-speed semantic search using FAISS vector database with transcript support and duplicate chunk removal.",
      "Created verifiable source grounding with direct video timestamps, preventing hallucinations and enabling instant verification.",
      "Maintained multi-turn conversational memory, enabling follow-up questions and iterative refinement within the same video context.",
      "Engineered resilient error handling for disabled transcripts, geo-restricted videos, and API rate limits."
    ],
    systemFlow: [
      { from: "YouTube URL", to: "Transcript Ingestion", label: "Captions + Timestamps" },
      { from: "Transcript Ingestion", to: "Semantic Chunking", label: "Overlapping Windows" },
      { from: "Semantic Chunking", to: "Sentence Transformers", label: "Vector Embeddings" },
      { from: "Sentence Transformers", to: "FAISS Index", label: "Vector DB Storage" },
      { from: "User Question", to: "FAISS Index", label: "Semantic Similarity Query" },
      { from: "FAISS Index", to: "Gemini LLM", label: "Top-K Retrieved Chunks" },
      { from: "Gemini LLM", to: "Streamlit Chatbot", label: "Grounded Answer + Timestamps" }
    ]
  },
  {
    id: "brain-tumor-detection",
    slug: "brain-tumor-detection",
    number: "04",
    title: "NeuroScan AI",
    subtitle: "Brain Tumor Classification using Deep Learning",
    category: "Deep Learning & Computer Vision",
    categories: ["Deep Learning & Vision", "Machine Learning"],
    tagline: "Convolutional neural network pipeline for multi-class brain MRI scan classification and diagnostic assistance.",
    description: "A deep learning computer vision system trained on brain MRI scans to classify tumor categories (Glioma, Meningioma, Pituitary, or No Tumor) with high diagnostic reliability.",
    fullOverview: "NeuroScan AI addresses clinical screening backlogs by leveraging deep convolutional networks (CNNs) and transfer learning on neurological magnetic resonance imaging (MRI) data. Preprocessed through image normalization, contrast enhancement, and data augmentation, the model classifies four distinct pathological states, providing clinicians with instant triage predictions and class probability distributions.",
    problemStatement: "Manual interpretation of brain MRI scans requires extensive radiologist expertise and is susceptible to diagnostic fatigue under high patient volumes. Rapid initial screening can accelerate urgent intervention for aggressive malignant lesions.",
    solutionArchitecture: "A deep convolutional neural network built with TensorFlow/Keras and evaluated against ResNet/VGG architectures, featuring image data augmentation (shear, rotation, horizontal flips), batch normalization, dropout regularization, and a Flask/Python web inference service.",
    technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Matplotlib", "Flask"],
    metrics: [
      { label: "Target Classes", value: "4 Diagnoses", detail: "Glioma, Meningioma, Pituitary, Normal" },
      { label: "Architecture", value: "Deep CNN", detail: "Transfer learning + custom dense heads" },
      { label: "Data Pipeline", value: "Augmented MRI", detail: "Rotation, zoom & contrast normalization" },
      { label: "Inference Engine", value: "Python Web UI", detail: "Interactive DICOM/Image upload triage" }
    ],
    github: "https://github.com/Sidd1475/",
    liveDemo: null,
    isFlagship: false,
    featured: false,
    visibility: "public",
    engineeringTradeoff: "Applied targeted data augmentation and dropout layers to mitigate class imbalance and overfitting, prioritizing high recall on aggressive tumor classes to minimize false negatives.",
    limitations: "Trained on curated 2D axial MRI slices; 3D volumetric volumetric MRI sequences (T1, T2, FLAIR) require multi-planar convolutional fusion.",
    futureRoadmap: [
      { title: "Grad-CAM Heatmaps", status: "In-Progress", desc: "Visual explanation overlays highlighting the exact anatomical region influencing model classification." },
      { title: "Multi-Modal MRI Fusion", status: "Planned", desc: "Simultaneous ingestion of T1ce, T2, and FLAIR modalities." }
    ],
    architectureStages: [
      { stage: "01", name: "Image Preprocessing", description: "Bilateral filtering, skull stripping, resizing to 224x224, and pixel intensity normalization.", tech: "OpenCV" },
      { stage: "02", name: "Data Augmentation", description: "Synthetic augmentation to counter dataset skew across rare tumor stages.", tech: "Keras ImageDataGenerator" },
      { stage: "03", name: "Feature Extraction", description: "Deep convolutional feature maps capturing edge textures, tissue densities, and mass boundaries.", tech: "Convolutional Layers + ReLU" },
      { stage: "04", name: "Multi-Class Prediction", description: "Softmax probability distribution across Glioma, Meningioma, Pituitary, and Healthy states.", tech: "Dense Softmax Head" }
    ],
    technicalHighlights: [
      "Built and tuned a multi-class deep convolutional network for automated brain MRI scan categorization.",
      "Engineered comprehensive computer vision preprocessing pipelines using OpenCV to remove scanning noise and normalize contrast.",
      "Implemented dropout and regularization techniques to ensure model generalizability on varied scanner resolutions.",
      "Created a functional web interface for real-time image upload, classification, and confidence breakdown."
    ],
    systemFlow: [
      { from: "Raw MRI Scan", to: "Image Preprocessing", label: "Artifact Cleaning" },
      { from: "Image Preprocessing", to: "Convolutional Layers", label: "Spatial Feature Extraction" },
      { from: "Convolutional Layers", to: "Dense Classifier", label: "Feature Embeddings" },
      { from: "Dense Classifier", to: "Diagnostic Output", label: "Class Probabilities" }
    ]
  },
  {
    id: "sukoon",
    slug: "sukoon",
    number: "05",
    title: "Sukoon AI",
    subtitle: "AI Mental Wellness & Emotional Support Companion",
    category: "Agentic AI & Full-Stack Applications",
    categories: ["Agentic AI & LLMs", "Full-Stack Development"],
    tagline: "Empathetic conversational assistance, longitudinal mood tracking, and anonymous peer support engineered for accessible mental wellness.",
    description: "An AI-powered mental wellness companion providing empathetic voice and chat support, sentiment-driven mood analytics, mindful productivity tools, and 'Ghost Mode' anonymous peer spaces.",
    fullOverview: "Sukoon AI is an empathetic mental health and wellness platform designed to bridge accessibility barriers in emotional support. Built with compassionate conversational AI, the system provides real-time emotional triage, mood logging with sentiment analytics, guided mindfulness exercises, and 'Ghost Mode' anonymous peer spaces. Designed with a calming, accessible Next.js interface, FastAPI backend services, and multimodal LLM agents, Sukoon empowers users to process emotional distress, build healthy daily habits, and access immediate crisis support resources.",
    problemStatement: "Traditional mental healthcare faces steep societal stigma, high consultation costs, and critical specialist shortages, leaving individuals without immediate sounding boards during moments of distress. Conventional wellness applications frequently lack conversational empathy, cultural resonance, and safe, anonymous peer interaction channels.",
    solutionArchitecture: "A modular, privacy-first full-stack architecture combining a responsive Next.js frontend with low-latency FastAPI inference services. Dialogues are guided by emotionally conditioned LLM prompts adhering to supportive cognitive behavioral therapy (CBT) reflection principles, accompanied by deterministic safety screening, encrypted mood logging in MongoDB, and 24/7 crisis helpline escalation.",
    technologies: ["Next.js", "React", "Python", "FastAPI", "Tailwind CSS", "MongoDB", "Gemini API", "Speech Recognition", "Vercel"],
    metrics: [
      { label: "Interaction Modes", value: "Voice & Chat", detail: "Empathetic real-time conversational assistance" },
      { label: "Privacy Protocol", value: "Ghost Mode", detail: "Anonymous moderated peer support spaces" },
      { label: "Wellness Engine", value: "Mood Tracking", detail: "Longitudinal sentiment & habit analytics" },
      { label: "Deployment", value: "Vercel Cloud", detail: "Production live web infrastructure" }
    ],
    github: "https://github.com/Kinshuk19/SukoonAI---Mental-Wellness-and-Productivity-Booster",
    liveDemo: "https://sukoon-ai.vercel.app/",
    isFlagship: false,
    featured: true,
    visibility: "public",
    engineeringTradeoff: "Enforced strict client-side anonymization and zero-telemetry private sessions ('Ghost Mode') to maximize user trust and psychological safety, paired with deterministic regex-based guardrails that instantly surface verified crisis hotlines when self-harm indicators are detected.",
    limitations: "Engineered strictly as an assistive mindfulness companion and supportive sounding board; explicitly not a diagnostic clinical tool or replacement for licensed psychotherapy and emergency psychiatric care.",
    futureRoadmap: [
      { title: "Multilingual Dialect Voice", status: "In-Progress", desc: "Expanding Indian English and regional language voice synthesis for greater accessibility." },
      { title: "Wearable Biofeedback Sync", status: "Planned", desc: "Correlating heart-rate variability (HRV) metrics with reported mood check-ins." },
      { title: "Clinical Provider Portal", status: "Planned", desc: "Secure opt-in data summaries for licensed therapist consultations." }
    ],
    architectureStages: [
      {
        stage: "01",
        name: "Multimodal Ingestion",
        description: "Captures natural user input through streaming voice recognition or text, tokenizing speech patterns and linguistic cadence.",
        tech: "Web Speech API & NLP Tokenizer"
      },
      {
        stage: "02",
        name: "Safety & Crisis Screening",
        description: "Evaluates incoming sentiment against deterministic risk heuristics, instantly routing high-severity distress to emergency resources.",
        tech: "Deterministic Guardrails & Crisis Filter"
      },
      {
        stage: "03",
        name: "Empathetic Synthesis",
        description: "Formulates supportive, non-judgmental conversational reflections anchored in evidence-based cognitive mindfulness frameworks.",
        tech: "Gemini API & Conditioned Prompts"
      },
      {
        stage: "04",
        name: "Longitudinal Wellness Insights",
        description: "Aggregates mood trajectories, gratitude journals, and meditation streaks into encrypted personal wellness trend visualizations.",
        tech: "MongoDB & Next.js Analytics"
      }
    ],
    technicalHighlights: [
      "Engineered an empathetic conversational AI companion delivering real-time voice and text support with culturally resonant context.",
      "Implemented 'Ghost Mode' anonymous peer community spaces with client-side identity stripping and automated safety moderation.",
      "Built multi-tiered crisis detection filters that immediately surface national helpline numbers upon identifying acute distress markers.",
      "Designed an interactive wellness dashboard featuring daily mood logging, streak tracking, guided breathing, and mindful task management.",
      "Deployed high-availability web architecture on Vercel with responsive, accessible light and dark calming themes."
    ],
    systemFlow: [
      { from: "User Voice / Chat", to: "Safety Screener", label: "Real-Time Input" },
      { from: "Safety Screener", to: "Empathetic LLM Node", label: "Safe Emotional Context" },
      { from: "Safety Screener", to: "Crisis Overlay", label: "Emergency Distress Flag" },
      { from: "Empathetic LLM Node", to: "Conversational UI", label: "Compassionate Reflection" },
      { from: "Conversational UI", to: "Mood & Streak DB", label: "Encrypted Wellness Metrics" }
    ]
  }
];

// Helper functions for data-driven consumption
export function getFeaturedProjects() {
  return projects.filter((p) => p.featured && p.visibility === "public");
}

export function getAllPublicProjects() {
  return projects.filter((p) => p.visibility === "public");
}

export function getProjectBySlug(slug) {
  return projects.find(
    (p) => p.slug === slug || p.id === slug || (slug === "sukoon-ai" && p.id === "sukoon")
  );
}

export function getAdjacentProjects(currentSlug) {
  const publicList = getAllPublicProjects();
  const currentIndex = publicList.findIndex(
    (p) => p.slug === currentSlug || p.id === currentSlug || (currentSlug === "sukoon-ai" && p.id === "sukoon")
  );
  if (currentIndex === -1) return { prev: null, next: null };

  const prev = currentIndex > 0 ? publicList[currentIndex - 1] : publicList[publicList.length - 1];
  const next = currentIndex < publicList.length - 1 ? publicList[currentIndex + 1] : publicList[0];
  return { prev, next };
}

export function getAllCategories() {
  const categories = new Set();
  projects.forEach((p) => {
    if (p.visibility === "public" && p.categories) {
      p.categories.forEach((cat) => categories.add(cat));
    }
  });
  return Array.from(categories);
}
