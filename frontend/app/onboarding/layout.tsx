export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <main style={{ minHeight: "100vh", background: "#f6f5f2", padding: "40px 20px", fontFamily: "var(--font-sans)" }}>
      {children}
    </main>
  );
}
