import Link from "next/link";
import { Button, Card } from "@/components/optimize-ui";

const features = [
  {
    title: "AI-Visibility Score",
    description:
      "A single 0–100 score computed from how often, how prominently, and across how many query types AI systems recommend your brand.",
  },
  {
    title: "Competitor benchmarking",
    description:
      "Track up to 3 competitors side-by-side. See exactly where they’re outranking you in AI answers and why.",
  },
  {
    title: "Ranked action playbook",
    description:
      "A prioritized checklist of content gaps, schema, and authority signals sorted by estimated score impact.",
  },
  {
    title: "Automated re-runs",
    description:
      "Scores re-run every 7–14 days automatically. You get an email showing the delta so you can see progress.",
  },
  {
    title: "Revenue correlation",
    description:
      "Connect GA4 or Shopify to see whether score improvements translate to more organic traffic and conversions.",
  },
  {
    title: "Agency workspace",
    description:
      "Manage all client brands in one dashboard. Export PDF reports per client.",
  },
];

const steps = [
  {
    num: "1",
    title: "Add your brand",
    text: "Enter your brand name, URL, and category. Optional location for local businesses.",
  },
  {
    num: "2",
    title: "Add competitors",
    text: "Add up to 3 competitor URLs. Your score is only meaningful in context.",
  },
  {
    num: "3",
    title: "Run visibility test",
    text: "We query ChatGPT, Gemini, and Perplexity with prompts in your category.",
  },
  {
    num: "4",
    title: "Act on results",
    text: "Get your score, competitor benchmarks, and a ranked fix list sorted by impact.",
  },
];

const quotes = [
  {
    quote:
      "I had no idea Gemini was recommending my competitor for every search in my category. Now I know exactly what to fix and in what order.",
    author: "Sarah K.",
    role: "Founder, boutique e-commerce store",
  },
  {
    quote:
      "The GA4 correlation chart is what sold my client on the retainer. It’s the first time I’ve had actual proof that AI visibility work moves the needle.",
    author: "Marcus L.",
    role: "SEO agency, 18 clients",
  },
  {
    quote:
      "I went from a 34 to a 61 in six weeks just by working through the checklist. Each item told me exactly what to do—no guessing.",
    author: "Tom R.",
    role: "Solo marketer, SaaS startup",
  },
];

export default function HomePage() {
  return (
    <main>
      <nav className="site-nav">
        <Link href="/" className="wordmark">
          optimize<span>.ai</span>
        </Link>

        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it works</a></li>
          <li><a href="#trust">Trust</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li>
            <Link href="/auth" className="nav-cta">
              Get free score
            </Link>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-label">AI Visibility Intelligence</div>

          <h1>
            Know when AI <em>recommends</em> your
            <br />
            brand — or doesn’t.
          </h1>

          <p className="hero-sub">
            optimize.ai measures how often ChatGPT, Gemini, and Perplexity recommend your
            business. Benchmark against competitors. Get a prioritized fix list. See it
            move your revenue.
          </p>

          <div className="hero-actions">
            <Link href="/auth" className="btn-primary">
              Get your free score snapshot
            </Link>
            <a href="#how" className="btn-secondary">
              See how it works
            </a>
          </div>

          <div className="hero-meta">
            <span>No credit card</span>
            <span>Score in 2 minutes</span>
            <span>Free tier forever</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-pill">7 pts this week</div>

          <div className="score-card">
            <div className="score-card-header">
              <div>
                <div className="score-brand">AI Visibility Score</div>
                <div className="score-name">Acme Coffee Roasters</div>
              </div>
              <div className="score-badge">Improving</div>
            </div>

            <div className="score-number-row">
              <div className="score-big">68</div>
              <div className="score-denom">/100</div>
              <div className="score-delta">+7 pts</div>
            </div>

            <div className="score-label">Across 48 AI queries this week</div>

            <div className="comp-bars">
              <div className="comp-row">
                <div className="comp-label" style={{ fontWeight: 500, color: "var(--ink)" }}>
                  You
                </div>
                <div className="comp-bar-wrap">
                  <div className="comp-bar bar-you" style={{ width: "68%" }} />
                </div>
                <div className="comp-score">68</div>
              </div>

              <div className="comp-row">
                <div className="comp-label">Rival Roasters</div>
                <div className="comp-bar-wrap">
                  <div className="comp-bar bar-comp" style={{ width: "82%" }} />
                </div>
                <div className="comp-score">82</div>
              </div>

              <div className="comp-row">
                <div className="comp-label">Bean Co.</div>
                <div className="comp-bar-wrap">
                  <div className="comp-bar bar-comp" style={{ width: "54%" }} />
                </div>
                <div className="comp-score">54</div>
              </div>

              <div className="comp-row">
                <div className="comp-label">Morning Press</div>
                <div className="comp-bar-wrap">
                  <div className="comp-bar bar-comp" style={{ width: "41%" }} />
                </div>
                <div className="comp-score">41</div>
              </div>
            </div>

            <div className="score-divider" />

            <div className="quick-win">
              <div className="qw-icon">
                <svg viewBox="0 0 10 10" aria-hidden="true">
                  <polyline points="2,5 4,7 8,3" />
                </svg>
              </div>
              <div className="qw-text">
                <strong>Top action: Add schema markup</strong>
                Estimated 8 pts. Competitors have it. You don’t yet.
              </div>
            </div>
          </div>

          <div className="floating-pill floating-pill-2">
            <span className="pill-dot" />
            Live last run 6 hrs ago
          </div>
        </div>
      </section>

      <div className="logos-bar">
        <div className="logos-inner">
          <span className="logos-label">Trusted by teams using</span>
          <div className="logo-items">
            <span className="logo-item">Shopify</span>
            <span className="logo-item">GA4</span>
            <span className="logo-item">ChatGPT</span>
            <span className="logo-item">Gemini</span>
            <span className="logo-item">Perplexity</span>
            <span className="logo-item">Google AI Overviews</span>
          </div>
        </div>
      </div>

      <section className="features-bg" id="features">
        <div className="section-inner">
          <div className="section-label">What you get</div>
          <h2 className="section-title">Not a tracker. A revenue loop.</h2>
          <p className="section-sub">
            Most tools stop at “you were mentioned.” We close the loop from AI visibility to
            actual business outcomes.
          </p>

          <div className="features-grid">
            {features.map((feature) => (
              <div className="feat-card" key={feature.title}>
                <div className="feat-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20">
                    <circle cx="10" cy="10" r="7" />
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how">
        <div className="section-inner">
          <div className="section-label">The process</div>
          <h2 className="section-title">
            Score in 2 minutes.
            <br />
            Clarity from day one.
          </h2>
          <p className="section-sub">
            No setup complexity. No agency required. Just paste your URL and go.
          </p>

          <div className="steps-grid">
            {steps.map((step) => (
              <div className="step" key={step.num}>
                <div className="step-num">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trust-bg" id="trust">
        <div className="section-inner">
          <div className="section-label">Why it matters</div>
          <h2 className="section-title" style={{ color: "white" }}>
            Proof, not hype.
          </h2>
          <p className="section-sub" style={{ color: "rgba(255,255,255,0.7)" }}>
            AI search is changing discovery. The homepage should reassure visitors that the
            score is transparent, useful, and tied to business outcomes.
          </p>

          <div className="stats-grid">
            <div className="stat">
              <div className="stat-num">
                3.4<span>%</span>
              </div>
              <div className="stat-desc">Growth in AI referral traffic in 11 months</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                30<span>%</span>
              </div>
              <div className="stat-desc">Google searches now show AI Overviews first</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                62<span>%</span>
              </div>
              <div className="stat-desc">Agencies currently lack AI visibility tooling</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                40<span>%</span>
              </div>
              <div className="stat-desc">Drop in traditional organic clicks since AI Overviews</div>
            </div>
          </div>

          <div className="trust-divider" />

          <div className="trust-quotes">
            {quotes.map((q) => (
              <div className="quote-card" key={q.author}>
                <div className="quote-stars" aria-hidden="true">
                  <div className="star" />
                  <div className="star" />
                  <div className="star" />
                  <div className="star" />
                  <div className="star" />
                </div>
                <p className="quote-text">“{q.quote}”</p>
                <div className="quote-author">
                  <strong>{q.author}</strong>
                  {q.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="section-inner">
          <div className="section-label">The dashboard</div>
          <h2 className="section-title">Everything in one place.</h2>
          <p className="section-sub">
            Score trends, competitor benchmarks, and your ranked action list — no learning
            curve.
          </p>

          <div className="preview-wrap">
            <div className="preview-bar">
              <div className="dot dot-r" />
              <div className="dot dot-y" />
              <div className="dot dot-g" />
              <div className="preview-url">app.optimize.ai/dashboard</div>
            </div>

            <div className="dashboard-grid">
              <div className="dash-sidebar">
                <div className="dash-sidebar-brand">
                  <div className="dsb-label">Current brand</div>
                  <div className="dsb-name">Acme Coffee Roasters</div>
                </div>

                <div className="dash-nav-item active">
                  <div className="dash-nav-dot" />
                  Overview
                </div>
                <div className="dash-nav-item">
                  <div className="dash-nav-dot" />
                  Competitors
                </div>
                <div className="dash-nav-item">
                  <div className="dash-nav-dot" />
                  Action plan
                </div>
                <div className="dash-nav-item">
                  <div className="dash-nav-dot" />
                  Revenue
                </div>
                <div className="dash-nav-item">
                  <div className="dash-nav-dot" />
                  Reports
                </div>
              </div>

              <div className="dash-main">
                <div className="dash-score-mini">
                  <div className="dash-score-num">68</div>
                  <div className="dash-score-denom">/100</div>
                  <div className="dash-score-delta-sm">+7 pts</div>
                </div>

                <div className="dash-score-lbl">Last run 6 hours ago · Next in 8 days</div>

                <svg className="mini-trend" viewBox="0 0 240 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e8531a" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#e8531a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,42 L30,40 L60,36 L90,34 L120,30 L150,26 L180,20 L210,16 L240,12" stroke="#e8e8e8" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M0,48 L30,46 L60,44 L90,42 L120,38 L150,34 L180,28 L210,22 L240,18 L240,56 L0,56 Z" fill="url(#tg)" />
                  <path d="M0,48 L30,46 L60,44 L90,42 L120,38 L150,34 L180,28 L210,22 L240,18" stroke="#e8531a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="240" cy="18" r="3.5" fill="#e8531a" />
                </svg>

                <div className="dash-comp-mini">
                  <div className="dcm-row">
                    <div className="dcm-name" style={{ fontWeight: 500, color: "var(--ink)" }}>
                      You
                    </div>
                    <div className="dcm-bar-wrap">
                      <div className="dcm-bar dcm-bar-you" style={{ width: "68%" }} />
                    </div>
                    <div className="dcm-val">68</div>
                  </div>
                  <div className="dcm-row">
                    <div className="dcm-name">Rival Roasters</div>
                    <div className="dcm-bar-wrap">
                      <div className="dcm-bar" style={{ width: "82%", background: "#c8c4bb" }} />
                    </div>
                    <div className="dcm-val">82</div>
                  </div>
                  <div className="dcm-row">
                    <div className="dcm-name">Bean Co.</div>
                    <div className="dcm-bar-wrap">
                      <div className="dcm-bar" style={{ width: "54%", background: "#c8c4bb" }} />
                    </div>
                    <div className="dcm-val">54</div>
                  </div>
                </div>
              </div>

              <div className="dash-right">
                <div className="dash-checklist-title">Action plan sorted by impact</div>
                <div className="checklist-items">
                  <div className="chk-item">
                    <div className="chk-impact chk-high">High</div>
                    <div className="chk-text">
                      Add structured data schema markup to product and homepage. Competitors
                      have it; you don’t.
                    </div>
                  </div>
                  <div className="chk-item">
                    <div className="chk-impact chk-high">High</div>
                    <div className="chk-text">
                      Get listed in 3 missing directories: Yelp, Google Business, industry
                      listings.
                    </div>
                  </div>
                  <div className="chk-item">
                    <div className="chk-impact chk-med">Med</div>
                    <div className="chk-text">
                      Add a clear About page that mentions your city and founding story.
                    </div>
                  </div>
                  <div className="chk-item">
                    <div className="chk-impact chk-med">Med</div>
                    <div className="chk-text">
                      Respond to 12 unanswered Google reviews to strengthen authority signals.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="pricing">
        <div className="section-label">Get started free</div>
        <h2 className="section-title serif">
          Find out if AI is sending your customers to a competitor.
        </h2>
        <p className="section-sub">
          No credit card. No setup. Enter your URL, get a score in 2 minutes, and see exactly
          where you stand.
        </p>

        <div className="cta-cluster">
          <Link href="/auth" className="btn-primary" style={{ fontSize: 15, padding: "15px 32px" }}>
            Get your free score snapshot
          </Link>
          <a href="#features" className="btn-secondary" style={{ fontSize: 15, padding: "15px 24px" }}>
            See plans & pricing
          </a>
        </div>

        <div className="cta-note">
          Free tier includes 1 brand · Full score · Top 3 action items
        </div>
      </section>

      <footer>
        <Link href="/" className="wordmark">
          optimize<span>.ai</span>
        </Link>

        <div className="footer-links">
          <a href="#pricing">Pricing</a>
          <a href="#features">Docs</a>
          <a href="#trust">Blog</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>

        <div style={{ fontSize: 13, color: "var(--ink-4)" }}>
          © 2026 optimize.ai
        </div>
      </footer>
    </main>
  );
}
