export type Product = {
  slug: string;
  name: string;
  shortName: string;
  tag: string;
  accent: string;
  border: string;
  buttonClass: string;
  glowColor: string;
  headline: string;
  subheadline: string;
  description: string;
  stats: string[];
  bullets: string[];
  pricing: "free" | "paid" | "freemium";
  status: "live" | "beta" | "coming-soon";
  features: { name: string; desc: string }[];
  story: { title: string; body: string }[];
};

export const products: Product[] = [
  {
    slug: "tradeschool-ai",
    name: "TradeSchool AI",
    shortName: "TradeSchool",
    tag: "Flagship",
    accent: "text-orange-400",
    border: "border-orange-500/30",
    buttonClass: "bg-orange-500 hover:bg-orange-400 text-white",
    glowColor: "rgba(249,115,22,0.18)",
    headline: "The flight simulator for day traders.",
    subheadline:
      "Structured lessons, historical replay, deterministic grading, and AI coaching in one serious training system.",
    description:
      "TradeSchool AI turns trading education into a real operating environment with curriculum, simulation, mini-games, and guided feedback.",
    stats: ["20 modules", "AI mentor Rex", "Historical replay", "Mini-games + labs"],
    bullets: [
      "Structured curriculum with lessons, quizzes, labs, and mini-games",
      "Historical market replay with deterministic grading",
      "AI mentor Rex layered on top of real training systems",
    ],
    pricing: "paid",
    status: "live",
    features: [
      { name: "Structured Curriculum", desc: "Progress through a clear learning system instead of random videos and disconnected advice." },
      { name: "Historical Replay", desc: "Practice on real market sessions instead of fake paper environments that do not build conviction." },
      { name: "Deterministic Grading", desc: "Each trade is evaluated through clear execution logic, not vague post-hoc commentary." },
      { name: "AI Mentor Rex", desc: "Get direct coaching layered on top of your real performance and repeated weaknesses." },
    ],
    story: [
      { title: "Who it is for", body: "Aspiring day traders, active traders, and skill-builders who want guided practice before risking capital." },
      { title: "Why it stands out", body: "Curriculum, simulation, grading, and AI coaching in one connected system instead of split across separate tools." },
      { title: "Core promise", body: "Grade the decision, not the outcome. Build skill before size." },
    ],
  },
  {
    slug: "weatherdashboard",
    name: "WeatherDashboard",
    shortName: "WeatherDashboard",
    tag: "Trading Tool",
    accent: "text-cyan-400",
    border: "border-cyan-500/30",
    buttonClass: "bg-cyan-500 hover:bg-cyan-400 text-[#071019]",
    glowColor: "rgba(34,211,238,0.15)",
    headline: "Trade the weather with a real dashboard.",
    subheadline:
      "A focused trading interface for Kalshi weather contracts with live pricing, AI analysis, and settlement visibility.",
    description:
      "WeatherDashboard gives traders a purpose-built screen for scanning, analyzing, and managing weather markets across cities.",
    stats: ["29 cities", "Live contracts", "AI analysis", "Settlement tracking"],
    bullets: [
      "Market-style UI for weather traders",
      "Live pricing, settlement clarity, and AI-assisted analysis",
      "A focused operating screen instead of tab chaos",
    ],
    pricing: "paid",
    status: "live",
    features: [
      { name: "Market Browser", desc: "Scan city contracts with clean filtering, ranking, and visual clarity." },
      { name: "AI Analysis", desc: "Ask questions about contract context and setup in natural language." },
      { name: "Settlement Tracking", desc: "Track outcome logic and station-linked results with less manual work." },
      { name: "Portfolio Visibility", desc: "Keep positions, results, and edge tracking inside one dashboard." },
    ],
    story: [
      { title: "Who it is for", body: "Kalshi weather traders and prediction market users who need a purpose-built operating screen." },
      { title: "Why it stands out", body: "Removes the manual mess of tracking cities, contracts, settlement sources, and positions across too many tabs." },
      { title: "Core promise", body: "Less tab chaos. More signal clarity." },
    ],
  },
  {
    slug: "claudeomatic",
    name: "ClaudeOmatic",
    shortName: "ClaudeOmatic",
    tag: "AI Automation",
    accent: "text-violet-400",
    border: "border-violet-500/30",
    buttonClass: "bg-violet-500 hover:bg-violet-400 text-white",
    glowColor: "rgba(139,92,246,0.15)",
    headline: "Your personal AI software factory.",
    subheadline:
      "Describe a task once. Review the plan. Let the system orchestrate software execution with visibility and control.",
    description:
      "ClaudeOmatic manages AI-assisted software work with approval flows, execution sessions, watchdogs, audits, and persistent logs.",
    stats: ["Approval flow", "24/7 system", "Live dashboard", "Bug tracking"],
    bullets: [
      "Approval workflow before execution",
      "Autonomous sessions with visibility and control",
      "Watchdogs, audits, and persistent project memory",
    ],
    pricing: "freemium",
    status: "live",
    features: [
      { name: "Approval Workflow", desc: "Review AI-generated execution plans before anything runs." },
      { name: "Execution Sessions", desc: "Spawn autonomous software work with queue handling and persistent task flow." },
      { name: "Watchdogs + Audits", desc: "Monitor services, log failures, and maintain visibility across projects." },
      { name: "Persistent Memory", desc: "Keep bugs, guards, logs, and context connected across future work." },
    ],
    story: [
      { title: "Who it is for", body: "Solo developers, technical founders, and operators who want leverage with approval control." },
      { title: "Why it stands out", body: "Turns AI coding from a manual assistant into a managed execution system." },
      { title: "Core promise", body: "Stay in review mode while the system handles the workflow." },
    ],
  },
  {
    slug: "btcpredictor",
    name: "BTCPredictor",
    shortName: "BTCPredictor",
    tag: "Signals API",
    accent: "text-amber-400",
    border: "border-amber-500/30",
    buttonClass: "bg-amber-500 hover:bg-amber-400 text-[#070B10]",
    glowColor: "rgba(251,191,36,0.13)",
    headline: "Real-time BTC direction prediction.",
    subheadline: "Weighted technical signal scoring that tells you what the tape is saying before it says it loudly.",
    description: "Real-time BTC direction prediction with weighted technical signal scoring.",
    stats: ["Live signals", "Multi-indicator", "REST API", "Webhook support"],
    bullets: [
      "Composite signal scoring across multiple technical indicators",
      "REST API for integration into your own systems",
      "Real-time direction confidence scoring",
    ],
    pricing: "freemium",
    status: "live",
    features: [
      { name: "Signal Scoring", desc: "Weighted composite of RSI, MACD, volume, and momentum into one confidence score." },
      { name: "REST API", desc: "Clean JSON endpoints you can call from any system, bot, or dashboard." },
      { name: "Webhook Alerts", desc: "Push direction changes to your own endpoints the moment they trigger." },
      { name: "Historical Accuracy", desc: "Track the signal's directional hit rate across different market regimes." },
    ],
    story: [
      { title: "Who it is for", body: "Crypto traders, quant hobbyists, and developers building BTC-related tools or bots." },
      { title: "Why it stands out", body: "One clean composite score instead of staring at 8 separate indicators trying to agree." },
      { title: "Core promise", body: "One number. One direction. No noise." },
    ],
  },
  {
    slug: "kashitrader",
    name: "KashiTrader",
    shortName: "KashiTrader",
    tag: "Automation",
    accent: "text-green-400",
    border: "border-green-500/30",
    buttonClass: "bg-green-500 hover:bg-green-400 text-[#070B10]",
    glowColor: "rgba(34,197,94,0.13)",
    headline: "Automated Kalshi contract trading.",
    subheadline: "Live execution logic for BTC prediction contracts on Kalshi — automated, logged, and auditable.",
    description: "Automated Kalshi BTC prediction contract trading with live execution logic.",
    stats: ["Live execution", "BTC contracts", "Audit log", "Position manager"],
    bullets: [
      "Automated entry and exit on Kalshi prediction markets",
      "Full audit trail of every executed trade",
      "Position sizing and risk management baked in",
    ],
    pricing: "paid",
    status: "live",
    features: [
      { name: "Auto Execution", desc: "Rules-based entry and exit on Kalshi BTC prediction markets without manual clicks." },
      { name: "Audit Log", desc: "Every trade recorded with timestamp, contract, price, and outcome." },
      { name: "Position Manager", desc: "Track open contracts, exposure, and settlement status in one view." },
      { name: "Risk Controls", desc: "Max position, daily limits, and kill switch baked into the execution layer." },
    ],
    story: [
      { title: "Who it is for", body: "Kalshi traders who want systematic execution instead of watching the screen." },
      { title: "Why it stands out", body: "Built specifically for Kalshi's prediction market structure, not adapted from a generic bot framework." },
      { title: "Core promise", body: "Rules in. Trades out. Full record kept." },
    ],
  },
  {
    slug: "contentforge",
    name: "ContentForge",
    shortName: "ContentForge",
    tag: "Content AI",
    accent: "text-pink-400",
    border: "border-pink-500/30",
    buttonClass: "bg-pink-500 hover:bg-pink-400 text-white",
    glowColor: "rgba(236,72,153,0.13)",
    headline: "Multi-modal AI content generation.",
    subheadline: "Structured quality control over AI content output — not just generation, but production-grade delivery.",
    description: "Multi-modal AI content generation with structured quality control.",
    stats: ["Multi-modal", "Quality gates", "Batch jobs", "API access"],
    bullets: [
      "Multi-modal content generation with structured quality scoring",
      "Batch job system for high-volume production workflows",
      "Quality gates that flag and reject low-scoring output automatically",
    ],
    pricing: "freemium",
    status: "live",
    features: [
      { name: "Multi-modal Gen", desc: "Generate text, structured data, and formatted documents from a single prompt pipeline." },
      { name: "Quality Gates", desc: "Automated scoring that rejects output below your defined quality threshold." },
      { name: "Batch Jobs", desc: "Queue and process large content runs without babysitting each generation." },
      { name: "API Access", desc: "Call ContentForge from any external system, scheduler, or workflow." },
    ],
    story: [
      { title: "Who it is for", body: "Content teams, developers, and operators who need reliable AI output at scale." },
      { title: "Why it stands out", body: "Quality control is built into the pipeline, not bolted on after the fact." },
      { title: "Core promise", body: "Generate at scale. Ship only what passes." },
    ],
  },
];

export const productMap = Object.fromEntries(products.map((p) => [p.slug, p]));

export const featuredProducts = products.slice(0, 3);
export const libraryProducts = products.slice(3);
