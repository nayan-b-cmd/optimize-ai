"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DashboardData = {
  score: number;
  trend: { run_at: string; score: number }[];
  mentions_by_prompt: Record<string, number>;
  checklist: {
    type: string;
    impact: string;
    description: string;
    status: string;
  }[];
};

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const brandId = params?.brandId as string | undefined;

  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      if (!brandId) {
        setError("Missing brand ID in dashboard URL.");
        return;
      }

      try {
        const res = await fetch(`/api/forward?path=dashboard/${brandId}`);
        const text = await res.text();
        console.log("Dashboard raw response:", text);

        if (!res.ok) {
          throw new Error(`Dashboard request failed (${res.status})`);
        }

        const parsed = JSON.parse(text);
        setData(parsed);
      } catch (err) {
        console.error("Dashboard load failed:", err);
        setError("Could not load dashboard.");
      }
    }

    loadDashboard();
  }, [brandId]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full bg-white border rounded-lg p-6 shadow">
          <h1 className="text-xl font-bold mb-2">Dashboard error</h1>
          <p className="text-red-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => router.push("/onboarding")}
          >
            Go back to onboarding
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-6">Brand ID: {brandId}</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Score</h2>
          <div className="text-4xl font-bold">{data.score}</div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Trend</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(data.trend, null, 2)}
          </pre>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Mentions by prompt</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(data.mentions_by_prompt, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Checklist</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(data.checklist, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

