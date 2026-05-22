"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function BrandCompetitorsPage() {
  const router = useRouter();
  const params = useParams<{ brandId: string }>();
  const searchParams = useSearchParams();

  const brandId = params?.brandId || "";
  const brandName = searchParams.get("brandName") || brandId.replace(/-/g, " ");
  const website = searchParams.get("website") || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";

  const [competitors, setCompetitors] = useState(["", "", ""]);

  function updateCompetitor(index: number, value: string) {
    const next = [...competitors];
    next[index] = value;
    setCompetitors(next);
  }

  function goBack() {
    const params = new URLSearchParams({
      brandName,
      website,
      category,
      location,
    });

    router.push(`/onboarding?${params.toString()}`);
  }

  async function runVisibilityTest() {
    const res = await fetch("/api/visibility/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brandName,
        website,
        category,
        location,
        competitorUrls: competitors.filter(Boolean),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Something went wrong.");
      return;
    }

    sessionStorage.setItem("visibilityResult", JSON.stringify(data));
    router.push("/results");
  }

  return (
    <main style={{ minHeight: "100vh", background: "#f6f5f2", fontFamily: "var(--font-sans)" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px 80px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "#0f0f0f" }}>
            optimize<span style={{ color: "#e8531a" }}>.</span>ai
          </div>
          <div />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 28, alignItems: "center" }}>
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
              AI visibility scoring for SMBs
            </div>

            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 70, lineHeight: 0.95, margin: 0, color: "#0f0f0f" }}>
              Know how often AI recommends your brand.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.7, color: "#3a3a3a", maxWidth: 620, marginTop: 18 }}>
              optimize.ai measures your AI visibility score from 0–100, compares you against competitors, and shows what to fix next.
            </p>
          </div>

          <div className="ob-wrap">
            <div className="ob-step-nav">
              <div className="ob-step-item">
                <div className="ob-step-circle done">1</div>
                <div className="ob-step-label active">Set up your brand</div>
              </div>
              <div className="ob-step-line" />
              <div className="ob-step-item">
                <div className="ob-step-circle active">2</div>
                <div className="ob-step-label active">Add competitors</div>
              </div>
            </div>

            <div className="ob-card">
              <div className="ob-card-header">
                <div className="ob-tag">AI Visibility Intelligence</div>
                <div className="ob-title">Add competitors</div>
                <div className="ob-sub">
                  Enter up to 3 competitors. Your score is only meaningful in context.
                </div>
              </div>

              <div className="comp-row">
                <div className="comp-num">1</div>
                <input
                  className="comp-input"
                  value={competitors[0]}
                  onChange={(e) => updateCompetitor(0, e.target.value)}
                  placeholder="https://competitor-1.com"
                />
                <span className={competitors[0] ? "comp-badge" : "comp-badge-gray"}>
                  {competitors[0] ? "Added" : "Optional"}
                </span>
              </div>

              <div className="comp-row">
                <div className="comp-num">2</div>
                <input
                  className="comp-input"
                  value={competitors[1]}
                  onChange={(e) => updateCompetitor(1, e.target.value)}
                  placeholder="https://competitor-2.com"
                />
                <span className={competitors[1] ? "comp-badge" : "comp-badge-gray"}>
                  {competitors[1] ? "Added" : "Optional"}
                </span>
              </div>

              <div className="comp-row">
                <div className="comp-num">3</div>
                <input
                  className="comp-input"
                  value={competitors[2]}
                  onChange={(e) => updateCompetitor(2, e.target.value)}
                  placeholder="https://competitor-3.com"
                />
                <span className={competitors[2] ? "comp-badge" : "comp-badge-gray"}>
                  {competitors[2] ? "Added" : "Optional"}
                </span>
              </div>

              <hr className="ob-divider" />

              <div className="ob-hint">
                We compare your brand against these websites in AI responses.
              </div>

              <div className="ob-btn-row">
                <button className="ob-btn-ghost" type="button" onClick={goBack}>
                  Back
                </button>
                <button className="ob-btn-primary" type="button" onClick={runVisibilityTest}>
                  Run visibility test
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .ob-wrap { font-family: var(--font-sans); padding: 1.5rem 0; }
        .ob-step-nav { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 2rem; }
        .ob-step-item { display: flex; align-items: center; gap: 0; }
        .ob-step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; border: 1.5px solid var(--color-border-secondary); background: var(--color-background-primary); color: var(--color-text-secondary); flex-shrink: 0; }
        .ob-step-circle.active { background: #e8531a; border-color: #e8531a; color: #fff; }
        .ob-step-circle.done { background: var(--color-background-success); border-color: var(--color-border-success); color: var(--color-text-success); }
        .ob-step-label { font-size: 12px; color: var(--color-text-secondary); margin-left: 8px; margin-right: 8px; }
        .ob-step-label.active { color: var(--color-text-primary); font-weight: 500; }
        .ob-step-line { width: 32px; height: 1px; background: var(--color-border-tertiary); }
        .ob-card { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: var(--border-radius-lg); padding: 28px 28px 24px; max-width: 520px; margin: 0 auto; }
        .ob-card-header { margin-bottom: 24px; }
        .ob-tag { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 100px; background: #fdf0eb; color: #b83c0e; margin-bottom: 10px; letter-spacing: 0.2px; }
        .ob-title { font-size: 18px; font-weight: 500; color: var(--color-text-primary); margin-bottom: 4px; }
        .ob-sub { font-size: 13px; color: var(--color-text-secondary); line-height: 1.5; }
        .ob-divider { border: none; border-top: 0.5px solid var(--color-border-tertiary); margin: 18px 0; }
        .ob-hint { font-size: 12px; color: var(--color-text-tertiary); margin-top: 4px; }
        .ob-btn-row { display: flex; gap: 10px; align-items: center; margin-top: 8px; }
        .ob-btn-primary { background: #e8531a; color: #fff; border: none; border-radius: var(--border-radius-md); font-size: 14px; font-weight: 500; padding: 10px 20px; cursor: pointer; flex: 1; }
        .ob-btn-ghost { background: transparent; color: var(--color-text-secondary); border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); font-size: 14px; padding: 10px 16px; cursor: pointer; }
        .comp-row { display: flex; gap: 8px; align-items: center; margin-bottom: 10px; }
        .comp-num { width: 22px; height: 22px; border-radius: 50%; background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--color-text-secondary); font-weight: 500; flex-shrink: 0; }
        .comp-input { flex: 1; height: 36px; border: 0.5px solid var(--color-border-secondary); border-radius: var(--border-radius-md); font-size: 13px; padding: 0 10px; background: var(--color-background-primary); color: var(--color-text-primary); }
        .comp-badge { font-size: 10px; padding: 2px 8px; border-radius: 100px; background: var(--color-background-success); color: var(--color-text-success); font-weight: 500; white-space: nowrap; }
        .comp-badge-gray { font-size: 10px; padding: 2px 8px; border-radius: 100px; background: var(--color-background-secondary); color: var(--color-text-tertiary); font-weight: 500; white-space: nowrap; }
      `}</style>
    </main>
  );
}


