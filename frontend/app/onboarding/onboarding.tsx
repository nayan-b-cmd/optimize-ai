// frontend/app/onboarding/page.tsx
"use client";

export default function OnboardingPage() {
  async function handleBrandSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const url = formData.get("url");
    const category = formData.get("category");

    const res = await fetch("/api/forward?path=brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, url, category }),
    });

    if (res.ok) {
      const data = await res.json();
      alert(`Brand created (id: ${data.id}). Run visibility check.`);
    } else {
      alert("Failed to create brand");
    }
  }

  async function handleRunClick() {
    const res = await fetch("/api/forward?path=runs/1", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand_id: 1 }),
    });

    if (res.ok) {
      alert("Visibility check started!");
    } else {
      alert("Failed to run visibility check");
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Onboarding: Setup your brand</h1>

      <form onSubmit={handleBrandSubmit} className="max-w-2xl mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Brand name</label>
            <input
              name="name"
              type="text"
              placeholder="MyBrand"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              name="url"
              type="url"
              placeholder="https://mybrand.com"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            name="category"
            type="text"
            placeholder="SaaS, E‑commerce, etc."
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add brand
        </button>
      </form>

      <div>
        <button
          onClick={handleRunClick}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Run visibility check (brand ID: 1)
        </button>
      </div>
    </div>
  );
}
