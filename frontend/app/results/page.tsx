"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type VisibilityResult = {
  brandName?: string;
  website?: string;
  category?: string;
  location?: string;
  score: number;
  delta: number;
  mentionRate: number;
  avgPosition: number;
  queryCoverage: number;
  competitors: { name: string; website: string; score: number }[];
  checklistItems: {
    impact: "High" | "Med" | "Low";
    title: string;
    detail: string;
    lift: string;
  }[];
  evidenceRows: {
    prompt: string;
    results: { llm: string; rank: string }[];
  }[];
};

const fallbackResult: VisibilityResult = {
  brandName: "Your brand",
  website: "",
  category: "",
  location: "",
  score: 68,
  delta: 7,
  mentionRate: 52,
  avgPosition: 2.4,
  queryCoverage: 48,
  competitors: [
    { name: "Rival Roasters", website: "https://rivalroasters.com", score: 82 },
    { name: "Bean Co.", website: "https://beanco.com", score: 54 },
    { name: "Morning Press", website: "https://morningpress.com", score: 41 },
  ],
  checklistItems: [
    {
      impact: "High",
      title: "Add structured data schema markup to your homepage and products.",
      detail: "Competitors have it; you don’t yet.",
      lift: "Estimated +8 pts",
    },
    {
      impact: "High",
      title: "Publish a clearer About page with your city and founding story.",
      detail: "This strengthens local authority signals.",
      lift: "Estimated +5 pts",
    },
    {
      impact: "Med",
      title: "Get listed in 3 missing directories.",
      detail: "Yelp, Google Business, and one industry listing.",
      lift: "Estimated +3 pts",
    },
  ],
  evidenceRows: [
    {
      prompt: "Best brand for customers in my area?",
      results: [
        { llm: "ChatGPT", rank: "Rival Roasters #1" },
        { llm: "Gemini", rank: "You #2" },
        { llm: "Perplexity", rank: "Not mentioned" },
      ],
    },
    {
      prompt: "Which brand is most trusted in the category?",
      results: [
        { llm: "ChatGPT", rank: "Rival Roasters #1" },
        { llm: "Gemini", rank: "You #2" },
        { llm: "Perplexity", rank: "You #3" },
      ],
    },
    {
      prompt: "Who offers the strongest experience and trust signals?",
      results: [
        { llm: "ChatGPT", rank: "You #1" },
        { llm: "Gemini", rank: "Bean Co. #2" },
        { llm: "Perplexity", rank: "Rival Roasters #1" },
      ],
    },
  ],
};

export default function ResultsPage() {
  const [result, setResult] = useState<VisibilityResult | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("visibilityResult");
      if (raw) {
        setResult(JSON.parse(raw));
        return;
      }
    } catch {}
    setResult(fallbackResult);
  }, []);

  const data = useMemo(() => result || fallbackResult, [result]);

  return (
    <main style={{ minHeight: "100vh", background: "#f6f5f2", fontFamily: "var(--font-sans)" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
          <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#0f0f0f", textDecoration: "none" }}>
            optimize<span style={{ color: "#e8531a" }}>.</span>ai
          </Link>
          <Link
            href="/onboarding"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              padding: "12px 18px",
              border: "1px solid rgba(0,0,0,0.12)",
              color: "#0f0f0f",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Run another test
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 28, alignItems: "start" }}>
          <div>
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: 999,
                background: "#fdf0eb",
                color: "#b83c0e",
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              Visibility snapshot
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 1, margin: 0, color: "#0f0f0f" }}>
              Your brand score is {data.score}.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#3a3a3a", maxWidth: 640, marginTop: 18 }}>
              You’re visible, but competitors still outrank you in several high-intent prompts. Fix the action items below to close the gap.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 28 }}>
              <div style={{ background: "#fff", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 16, padding: 18 }}>
                <div style={{ fontSize: 12, color: "#6b6b6b", marginBottom: 8 }}>Score</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "#0f0f0f" }}>{data.score}/100</div>
              </div>
              <div style={{ background: "#fff", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 16, padding: 18 }}>
                <div style={{ fontSize: 12, color: "#6b6b6b", marginBottom: 8 }}>Delta</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "#1d7a4f" }}>+{data.delta}</div>
              </div>
              <div style={{ background: "#fff", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 16, padding: 18 }}>
                <div style={{ fontSize: 12, color: "#6b6b6b", marginBottom: 8 }}>Coverage</div>
                <div style={{ fontSize: 30, fontWeight: 700, color: "#0f0f0f" }}>{data.queryCoverage}</div>
              </div>
            </div>

            <div style={{ marginTop: 28, background: "#fff", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 20, padding: 22 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.4px", textTransform: "uppercase", color: "#6b6b6b", marginBottom: 12 }}>
                Competitor benchmark
              </div>

              {data.competitors.map((c) => (
                <div key={c.name} style={{ display: "grid", gridTemplateColumns: "150px 1fr 48px", gap: 12, alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 14, color: "#0f0f0f" }}>{c.name}</div>
                  <div style={{ height: 10, borderRadius: 999, background: "#eee", overflow: "hidden" }}>
                    <div style={{ width: `${c.score}%`, height: "100%", background: c.name === data.competitors[0]?.name ? "#e8531a" : "#c8c4bb" }} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0f0f", textAlign: "right" }}>{c.score}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ background: "#fff", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 20, padding: 22 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.4px", textTransform: "uppercase", color: "#6b6b6b", marginBottom: 14 }}>
                Ranked action plan
              </div>

              {data.checklistItems.map((item, index) => (
                <div key={item.title} style={{ display: "flex", gap: 12, marginBottom: index === data.checklistItems.length - 1 ? 0 : 14 }}>
                  <div
                    style={{
                      minWidth: 44,
                      height: 24,
                      borderRadius: 999,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      background: item.impact === "High" ? "#fdf0eb" : "#eeece8",
                      color: item.impact === "High" ? "#b83c0e" : "#6b6b6b",
                    }}
                  >
                    {item.impact}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0f0f", lineHeight: 1.45 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#6b6b6b", marginTop: 4 }}>{item.detail}</div>
                    <div style={{ fontSize: 12, color: "#1d7a4f", marginTop: 4 }}>{item.lift}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#fff", border: "0.5px solid var(--color-border-tertiary)", borderRadius: 20, padding: 22 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.4px", textTransform: "uppercase", color: "#6b6b6b", marginBottom: 14 }}>
                Prompt evidence
              </div>

              {data.evidenceRows.map((item) => (
                <div key={item.prompt} style={{ marginBottom: 18 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0f0f", marginBottom: 10 }}>{item.prompt}</div>
                  <div style={{ display: "grid", gap: 8 }}>
                    {item.results.map((r) => (
                      <div key={r.llm} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13, color: "#3a3a3a" }}>
                        <span>{r.llm}</span>
                        <span>{r.rank}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

