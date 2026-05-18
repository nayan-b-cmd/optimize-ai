"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const payload = {
      path: "brands",
      name: formData.get("brandName") || "",
      url: formData.get("websiteUrl") || "",
      category: formData.get("category") || "",
      location: formData.get("location") || "",
    };

    const res = await fetch("/api/forward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log("Brand create response:", text);
    setLoading(false);

    if (!res.ok) {
      setError(`Could not create brand (${res.status}).`);
      return;
    }

    try {
      const data = JSON.parse(text);
      if (!data?.id) {
        setError("Brand was created, but no brand ID came back.");
        return;
      }
      router.push(`/onboarding/competitors?brandId=${data.id}`);
    } catch {
      setError("Brand was created, but response was not valid JSON.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-3">Onboarding</h1>
        <p className="text-gray-600 mb-8">
          Add your brand so we can start measuring AI visibility.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Brand name</label>
            <input
              name="brandName"
              type="text"
              placeholder="Acme Dental"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Website URL</label>
            <input
              name="websiteUrl"
              type="url"
              placeholder="https://acmedental.com"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              name="category"
              type="text"
              placeholder="Dental clinic, SaaS, restaurant, etc."
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Location <span className="text-gray-400">(optional)</span>
            </label>
            <input
              name="location"
              type="text"
              placeholder="Kathmandu"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving brand..." : "Continue to competitors"}
          </button>
        </form>
      </div>
    </div>
  );
}

