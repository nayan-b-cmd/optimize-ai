// frontend/app/auth/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");

    const res = await fetch("/api/forward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: "workspaces",
        name: name || "My Workspace",
      }),
    });

    const text = await res.text();
    console.log("Response from /api/forward:", text);

    if (res.ok) {
      router.push("/onboarding");
    } else {
      alert("Failed to create workspace: " + res.status);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-6">Sign up</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Workspace name
          </label>
          <input
            name="name"
            type="text"
            placeholder="My Workspace"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create account
        </button>
      </form>
    </div>
  );
}
