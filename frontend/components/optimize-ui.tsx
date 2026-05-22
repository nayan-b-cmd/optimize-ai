import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "ghost"
      ? "bg-transparent text-[#0f0f0f] hover:bg-black/5 border border-black/10"
      : "bg-[#e8531a] text-white hover:opacity-90";

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
}

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-[24px] bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] border border-black/5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Stepper({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {[1, 2, 3].map((n) => (
        <React.Fragment key={n}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              fontSize: 12,
              fontWeight: 700,
              background: n <= step ? "#e8531a" : "#eeece8",
              color: n <= step ? "#fff" : "#6b6b6b",
            }}
          >
            {n}
          </div>
          {n < 3 ? (
            <div
              style={{
                width: 28,
                height: 2,
                background: n < step ? "#e8531a" : "#eeece8",
              }}
            />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

export function Donut({ score }: { score: number }) {
  const radius = 54;
  const stroke = 14;
  const normalized = Math.max(0, Math.min(100, score));
  const dash = (normalized / 100) * 2 * Math.PI * radius;
  const gap = 2 * Math.PI * radius - dash;

  return (
    <svg width="170" height="170" viewBox="0 0 170 170">
      <circle cx="85" cy="85" r={radius} fill="none" stroke="#eeece8" strokeWidth={stroke} />
      <circle
        cx="85"
        cy="85"
        r={radius}
        fill="none"
        stroke="#e8531a"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${gap}`}
        transform="rotate(-90 85 85)"
      />
    </svg>
  );
}

export function RankBadge({ rank }: { rank: string | number }) {
  const label = typeof rank === "number" ? `#${rank}` : rank;
  const active = typeof rank === "number" && rank <= 2;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 52,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        background: active ? "#eaf5ef" : "#eeece8",
        color: active ? "#1d7a4f" : "#6b6b6b",
      }}
    >
      {label}
    </span>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "#6b6b6b",
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className = "", ...props }: InputProps) {
  return (
    <input
      className={className}
      style={{
        width: "100%",
        height: 40,
        borderRadius: 10,
        border: "1px solid rgba(0,0,0,0.08)",
        padding: "0 12px",
        fontSize: 14,
        outline: "none",
      }}
      {...props}
    />
  );
}

type SelectInputProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({ className = "", children, ...props }: SelectInputProps) {
  return (
    <select
      className={className}
      style={{
        width: "100%",
        height: 40,
        borderRadius: 10,
        border: "1px solid rgba(0,0,0,0.08)",
        padding: "0 12px",
        fontSize: 14,
        background: "#fff",
        outline: "none",
      }}
      {...props}
    >
      {children}
    </select>
  );
}
