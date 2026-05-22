"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingLandingPage() {
  const router = useRouter();
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  function goNext() {
    const slug = brandName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const params = new URLSearchParams({
      brandName,
      website,
      category,
      location,
    });

    router.push(`/onboarding/${slug || "acme-coffee-roasters"}?${params.toString()}`);
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

            <div style={{ display: "grid", gap: 12, marginTop: 28, maxWidth: 520 }}>
              <input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="Brand name"
                style={{ width: "100%", height: 42, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", padding: "0 12px", fontSize: 14 }}
              />
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website URL"
                style={{ width: "100%", height: 42, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", padding: "0 12px", fontSize: 14 }}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", height: 42, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", padding: "0 12px", fontSize: 14, background: "#fff" }}
              >
                <option value="">Select category</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="E-commerce">E-commerce</option>
                <option value="SaaS / Software">SaaS / Software</option>
                <option value="Local services">Local services</option>
                <option value="Professional services">Professional services</option>
                <option value="Other">Other</option>
              </select>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location optional"
                style={{ width: "100%", height: 42, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", padding: "0 12px", fontSize: 14 }}
              />
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button
                onClick={goNext}
                style={{ background: "#e8531a", color: "#fff", border: "none", borderRadius: 10, padding: "12px 18px", fontWeight: 600, cursor: "pointer" }}
              >
                Start measuring
              </button>
              <a
                href="#how-it-works"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  padding: "12px 18px",
                  border: "1px solid rgba(0,0,0,0.12)",
                  color: "#0f0f0f",
                  textDecoration: "none",
                }}
              >
                How it works
              </a>
            </div>
          </div>

          <div />
        </div>
      </section>
    </main>
  );
}

