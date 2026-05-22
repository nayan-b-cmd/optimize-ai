"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "../../components/optimize-ui";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/onboarding");
    }, 900);

    return () => clearTimeout(t);
  }, [router]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f6f5f2",
        padding: 24,
        fontFamily: "var(--font-sans)",
      }}
    >
      <Card style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: 1, color: "#0f0f0f", marginBottom: 8 }}>
          optimize<span style={{ color: "#e8531a" }}>.</span>ai
        </div>
        <div style={{ color: "#6b6b6b", fontSize: 14, lineHeight: 1.6, marginBottom: 22 }}>
          Creating your workspace and preparing onboarding.
        </div>
        <Button variant="primary" style={{ width: "100%" }}>
          Creating workspace...
        </Button>
      </Card>
    </main>
  );
}

