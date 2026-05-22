export type VisibilityData = {
  brand: string;
  score: number;
  delta: number;
  mentionRate: number;
  avgPosition: number;
  queryCoverage: number;
  competitors: { name: string; score: number }[];
  checklistItems: { impact: "High" | "Med" | "Low"; text: string; estLift: string }[];
  evidenceRows: {
    prompt: string;
    results: { rank: number | "Not mentioned"; brandName: string; llm: string }[];
  }[];
};

export const mockVisibilityData: VisibilityData = {
  brand: "Acme Coffee Roasters",
  score: 68,
  delta: 7,
  mentionRate: 71,
  avgPosition: 2.4,
  queryCoverage: 58,
  competitors: [
    { name: "Rival Roasters", score: 82 },
    { name: "Bean & Co.", score: 54 },
  ],
  checklistItems: [
    {
      impact: "High",
      text: "Add a concise “best for” section on your homepage and product pages.",
      estLift: "+6–9 pts on next run",
    },
    {
      impact: "Med",
      text: "Add structured FAQ content targeting location + category queries.",
      estLift: "+3–5 pts on next run",
    },
    {
      impact: "Low",
      text: "Strengthen review snippets and brand mentions on third-party pages.",
      estLift: "+1–3 pts on next run",
    },
  ],
  evidenceRows: [
    {
      prompt: "Best coffee roasters for small offices in Kathmandu?",
      results: [
        { rank: 1, brandName: "Rival Roasters", llm: "ChatGPT" },
        { rank: 2, brandName: "Acme Coffee Roasters", llm: "Gemini" },
        { rank: "Not mentioned", brandName: "Acme Coffee Roasters", llm: "Perplexity" },
      ],
    },
    {
      prompt: "Which specialty coffee brand is best for SMB subscriptions?",
      results: [
        { rank: 1, brandName: "Acme Coffee Roasters", llm: "ChatGPT" },
        { rank: 2, brandName: "Bean & Co.", llm: "Gemini" },
        { rank: "Not mentioned", brandName: "Acme Coffee Roasters", llm: "Perplexity" },
      ],
    },
    {
      prompt: "Local coffee roaster with fast delivery and wholesale options?",
      results: [
        { rank: 1, brandName: "Rival Roasters", llm: "ChatGPT" },
        { rank: "Not mentioned", brandName: "Acme Coffee Roasters", llm: "Gemini" },
        { rank: 2, brandName: "Acme Coffee Roasters", llm: "Perplexity" },
      ],
    },
  ],
};
