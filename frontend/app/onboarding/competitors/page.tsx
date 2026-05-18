"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CompetitorsPage() {
  const router = useRouter();
  const params = useParams();
  const brandId = params?.brandId as string | undefined;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function addCompetitor(name: string) {
    const res = await fetch("/api/forward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: `brands/${brandId}/competitors`,
        name,
        url: "",
      }),
    });

    const text = await res.text();
    console.log(`Add competitor response for "${name}":`, text);

    if (!res.ok) {
      throw new Error(`Failed to add competitor "${name}" (${res.status})`);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!brandId) {
      setLoading(false);
      setError("Missing brand ID in the URL.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const competitors = [
      String(formData.get("competitor1") || "").trim(),
      String(formData.get("competitor2") || "").trim(),
      String(formData.get("competitor3") || "").trim(),
    ].filter(Boolean);

    if (competitors.length === 0) {
      setLoading(false);
      setError("Add at least one competitor.");
      return;
    }

    try {
      for (const competitor of competitors) {
        await addCompetitor(competitor);
      }

      const runRes = await fetch("/api/forward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: `runs/${brandId}`,
          brand_id: Number(brandId),
        }),
      });

      const runText = await runRes.text();
      console.log("Run response:", runText);

      if (!runRes.ok) {
        throw new Error(`Visibility run failed (${runRes.status})`);
      }

      router.push(`/dashboard/${brandId}`);
    } catch (err) {
      console.error(err);
      setError("Could not finish setup. Check the terminal/network tab.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-3">Competitors</h1>
        <p className="text-gray-600 mb-8">
          Add up to 3 competitors so we can benchmark your visibility.
        </p>

        {!brandId && (
          <div className="mb-6 text-yellow-800 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            Missing brand ID in the URL.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="competitor1"
            type="text"
            placeholder="Competitor 1"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            name="competitor2"
            type="text"
            placeholder="Competitor 2"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            name="competitor3"
            type="text"
            placeholder="Competitor 3"
            className="w-full px-4 py-2 border rounded-lg"
          />

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !brandId}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Starting first check..." : "Run first visibility check"}
          </button>
        </form>
      </div>
    </div>
  );
}
