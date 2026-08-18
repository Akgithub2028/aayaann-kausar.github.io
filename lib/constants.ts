export const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  Java: "#b07219",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
};

export const TECH_STACK = [
  {
    category: "Quant Research & Alpha Generation",
    items: ["Cross-Sectional Factor Models", "IC-Weighted Alpha Combination", "Walk-Forward Validation", "Momentum & Reversal", "Fama-French Factors"],
  },
  {
    category: "Portfolio Construction & Risk",
    items: ["CVXPY", "Hierarchical Risk Parity", "CVaR Optimization", "Max Diversification", "Ledoit-Wolf Shrinkage", "Probabilistic & Deflated Sharpe", "Block Bootstrap"],
  },
  {
    category: "Market Microstructure & Market Making",
    items: ["LOB Reconstruction (L2/L3)", "Microprice & Order-Flow Imbalance", "Avellaneda-Stoikov MM", "Adverse Selection Modeling", "Queue-Aware Execution Sim"],
  },
  {
    category: "Low-Latency C++ Systems",
    items: ["C++20", "Lock-Free SPSC Queues", "Atomic Memory Ordering", "Cache-Line Alignment", "Branchless Arithmetic", "CMake", "GoogleTest", "pybind11"],
  },
  {
    category: "Machine Learning & Deep Learning",
    items: ["Transformer Architectures", "Self-Supervised Pretraining", "Heteroscedastic Uncertainty", "Cosine-Warmup LR Scheduling", "EMA Averaging", "PyTorch", "Scikit-Learn"],
  },
  {
    category: "Software & Data Infrastructure",
    items: ["Event-Driven Async Architecture", "Pydantic", "Polars & DuckDB", "PyArrow (Parquet/ZSTD)", "FastAPI", "Streamlit", "GitHub Actions CI/CD", "mypy", "Hypothesis"],
  },
];
