// frontend/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Optimize.ai
      </h1>
      <p className="text-lg text-center mb-8 text-gray-600">
        Get your AI‑Visibility Score for your brand in minutes.
      </p>
      <div className="flex gap-4">
        <a
          href="/auth"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Sign up / Login
        </a>
        <a
          href="/dashboard/1"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          View Dashboard (demo)
        </a>
      </div>
    </div>
  );
}
