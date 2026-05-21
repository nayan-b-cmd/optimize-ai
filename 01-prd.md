# PRD: optimize.ai
## AI Visibility & Revenue Intelligence for SMBs

**Version:** 1.0
**Status:** Ready for engineering review
**Last updated:** May 2026

---

## 1. Executive Summary

optimize.ai is a SaaS that helps SMBs measure and grow how often AI assistants recommend them — and connect that visibility directly to traffic and revenue outcomes.

The product computes an **AI-Visibility Score** (0–100) per brand, benchmarks it against up to 3 competitors, and outputs a ranked optimization playbook. Re-runs every 7–14 days show progress over time. GA4/Shopify integrations close the loop from score improvement to business outcome.

**Target market:** SMB owners, solo founders, and SEO/growth agencies.
**Pricing:** Free score snapshot (lead gen) → $49–$99/mo paid subscription → agency tier.
**MVP timeline:** 8 weeks to soft launch.

---

## 2. Problem Statement

- More buyers now ask AI "Where should I buy X?" before clicking anything. The first-recommended brand wins the click.
- SMBs have no way to know if AI systems recommend them — or why competitors are recommended instead.
- Existing tools either cost $499+/mo (Profound) and target enterprise, or cost $39–99/mo but only track mentions without telling users what to do.
- Content-first tools (BrandLens) put the burden of action on content production — too slow and skill-intensive for most SMBs.
- Without measurement tied to revenue, SMBs can't justify the investment or know if their actions are working.

**Core user pain:** "I don't know if AI recommends my business. I don't know what to fix first. And I don't know if fixing it is actually driving sales."

---

## 3. Goals and Success Metrics (Months 1–3)

| Goal | Metric | Baseline | Target |
|---|---|---|---|
| Prove value fast | Activation rate (brand connected + score computed) | 0% | ≥ 60% of signups |
| Drive retention | 30-day return rate | 0% | ≥ 40% of activated users |
| Convert free → paid | Conversion rate within 14 days | 0% | ≥ 15% |
| Agency traction | Agency accounts with ≥ 3 brands | 0 | ≥ 20 by month 3 |
| Revenue correlation hook | % activated users who connect GA4 | 0% | ≥ 30% of paid users |
| Reliability | Score-run success rate | — | ≥ 98% |
| Performance | Dashboard load time p95 | — | < 2 s |

---

## 4. Target Users

| Persona | Description | JTBD |
|---|---|---|
| **SMB Owner** | Shopify store, local service, bootstrapped SaaS. Non-technical. | Know if AI recommends me vs. my competitor. Fix it without hiring. |
| **Solo Marketer** | Wears SEO + content hat. Comfortable with dashboards. | Get a prioritized fix list I can execute or delegate. |
| **SEO/Growth Agency** | Manages 5–50 client brands. Needs upsell product. | Show clients AI visibility data + score-to-traffic proof. Bill for it. |

---

## 5. Solution Overview

Four pillars, one loop: **Measure → Prioritize → Act → Prove.**

1. **AI-Visibility Score & Dashboard** — runs prompt suites against LLM APIs, extracts mentions, computes 0–100 score per brand, shows trends and competitor benchmarks.
2. **LLM-Optimization Playbook** — generates a ranked checklist (content, schema, authority) based on each brand's gap analysis.
3. **Automated Quick-Wins** — flags missing reviews, absent schema, thin pages. Surfaces one-line fix suggestions.
4. **Monitoring & Revenue Correlation** — scheduled re-runs, before/after trends, GA4/Shopify integration to correlate score improvement with traffic and conversions.

---

## 6. User Journeys

### Journey 1 — SMB Owner: First Score in 10 Minutes
1. Signs up (email or Google OAuth).
2. Enters brand name, website URL, category, location (optional).
3. Adds up to 3 competitor URLs.
4. System runs prompt suite → computes AI-Visibility Score.
5. Dashboard shows score, position frequency, and competitor comparison.
6. CTA: "See your action plan" → ranked playbook.

### Journey 2 — Marketer: Working the Playbook
1. Views checklist sorted by estimated impact (high → low).
2. Marks items done; score refreshes on next scheduled run.
3. Receives email after re-run: "Your score moved from 34 → 41."
4. Connects GA4 to correlate AI visibility improvement with organic session changes.

### Journey 3 — Agency: Multi-Brand Management
1. Creates agency account; invites team members.
2. Adds client brands as separate workspaces.
3. Downloads PDF report per client for monthly review.
4. Receives consolidated digest email across all client brands.

---

## 7. Functional Requirements

### P0 — MVP (must ship at launch)

| ID | Requirement |
|---|---|
| F-01 | User can create an account and log in (email + Google OAuth). |
| F-02 | User can add a brand: name, URL, category, optional location. |
| F-03 | User can add up to 3 competitor brands per workspace. |
| F-04 | System runs a standardized prompt suite against ≥ 1 LLM API and extracts brand mentions + rank positions. |
| F-05 | System computes an AI-Visibility Score (0–100) per brand using weighted frequency + position + query coverage logic. |
| F-06 | Dashboard displays: current score, trend chart (line), mention frequency by prompt, competitor comparison. |
| F-07 | Dashboard exposes raw evidence: which prompt → which LLM answer → which position (for score credibility). |
| F-08 | System generates a ranked optimization checklist per brand: content gaps, schema gaps, authority signals — sorted high/med/low impact. |
| F-09 | Score re-runs automatically every 14 days. User can trigger 1 manual re-run per billing period (free tier). |
| F-10 | Email notification after each completed re-run with score delta (e.g. "+7 pts this week"). |
| F-11 | Free tier: one brand, one score snapshot, top 3 checklist items visible. Full checklist + competitors gated behind paid. |
| F-12 | Stripe billing: monthly subscription, free → paid upgrade in < 3 clicks. |

### P1 — First major update (weeks 6–10 post-launch)

| ID | Requirement |
|---|---|
| F-13 | Checklist items can be marked done; archive view for completed items. |
| F-14 | GA4 integration: connect property → overlay AI-visibility score trend with organic session + conversion trend. |
| F-15 | PDF/shareable report export per brand (agency use case). |
| F-16 | Agency workspace: multi-brand dashboard, team member invites, consolidated digest email. |
| F-17 | Score re-run frequency configurable to 7 days on paid plans. |

### P2 — Future

| ID | Requirement |
|---|---|
| F-18 | Shopify integration: correlate score with revenue. |
| F-19 | WordPress plugin for on-page schema recommendations. |
| F-20 | Google Business Profile integration for local businesses. |
| F-21 | Multi-LLM scoring: run prompts across ChatGPT, Gemini, Perplexity separately; show per-platform score. |
| F-22 | Hallucination detection: flag when AI describes brand inaccurately (wrong pricing, features). |
| F-23 | White-label reporting for agency partners. |
| F-24 | Custom prompt library: let paid users add their own prompts to the standard suite. |

---

## 8. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Dashboard load < 2 s at p95. Score-run pipeline completes within 30 min of trigger. |
| **Reliability** | Score-run success rate ≥ 98%. Uptime ≥ 99.5% for web app. |
| **Security** | TLS 1.2+ in transit, AES-256 at rest. OAuth tokens never logged. API keys stored in secret manager. |
| **Scalability** | MVP must support 2,000 concurrent workspaces × 4 brands each without degradation. |
| **Privacy** | No brand or competitor data shared across tenants. GDPR-compliant deletion on account close. |
| **Accessibility** | WCAG 2.1 AA for onboarding and core dashboard flows. |

---

## 9. Architecture and Data

### Component Map

```
[Web App — React/Next.js]
        ↕ REST API
[API Service — Node or Python]
    ├── Auth Service (JWT, Google OAuth)
    ├── Brand & Workspace Service
    ├── Prompt Runner Service
    │       └── LLM Clients: OpenAI (P0), Gemini (P1), Perplexity (P1)
    ├── Score Engine
    │       ├── Mention Extractor (parse LLM response → brand mentions + position)
    │       └── Score Calculator (weighted frequency + position + query coverage)
    ├── Checklist Generator (LLM-powered, prompt-based gap analysis)
    ├── Scheduler (BullMQ / Celery — 7/14-day cadence)
    └── Integration Service: GA4 (P1), Shopify (P2)
        ↕
[PostgreSQL — primary data store]
[Redis — job queue, caching]
[S3 — prompt logs, PDF reports]
```

### Core Data Model

| Entity | Key Fields |
|---|---|
| `User` | id, email, role, plan, created_at |
| `Workspace` | id, user_id, name, type (solo/agency) |
| `Brand` | id, workspace_id, name, url, category, location |
| `Competitor` | id, brand_id, name, url |
| `PromptTemplate` | id, category, prompt_text, query_type, weight |
| `VisibilityRun` | id, brand_id, run_at, status, score (0–100) |
| `MentionResult` | id, run_id, prompt_id, brand_mentioned, position, raw_response |
| `ChecklistItem` | id, brand_id, type, impact, description, status, created_at |
| `Integration` | id, workspace_id, type, credentials_ref, status |

### Score Logic (v1 — subject to calibration)

```
AI-Visibility Score =
  (Mention Frequency Rate × 0.50)
+ (Average Position Weight × 0.35)
+ (Query Category Coverage × 0.15)

Normalized to 0–100. Weights configurable per category vertical.
```

---

## 10. Integrations

| Integration | Priority | Purpose |
|---|---|---|
| OpenAI API (GPT-4o) | P0 | Primary LLM for prompt runs |
| Google OAuth | P0 | User authentication |
| Stripe | P0 | Subscription billing |
| SendGrid / Postmark | P0 | Transactional email (re-run notifications) |
| Gemini API | P1 | Secondary LLM for multi-model scoring |
| Perplexity API | P1 | Search-grounded LLM visibility |
| Google Analytics 4 | P1 | Correlate AI visibility score with traffic |
| Shopify | P2 | Correlate AI visibility score with revenue |

---

## 11. MVP Scope and Timeline

**MVP definition:** Paying customer can connect a brand + 3 competitors, receive an AI-Visibility Score with trend, view a ranked optimization checklist, and receive automated re-run email alerts every 14 days.

| Week | Milestone |
|---|---|
| 1–2 | Auth, onboarding flow, brand/competitor setup UI |
| 3–4 | Prompt runner, mention extractor, score engine |
| 5 | Dashboard: score, trend, competitor comparison, raw evidence |
| 6 | Checklist generator, email notifications |
| 7 | Stripe billing, free vs. paid gating |
| 8 | QA, load testing, soft launch to beta waitlist |

**Team assumption:** 2 engineers + 1 designer. LLM API access from day 1.

---

## 12. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| LLM API ToS changes restrict bulk query usage | Low-Medium | Critical | Diversify to 2+ LLMs; abstract prompt runner behind versioned interface |
| Score feels arbitrary; users don't trust it | High | High | Expose raw evidence (prompt → answer → position) in UI; publish scoring methodology |
| SMBs don't act on checklist (low engagement) | Medium | High | Weekly "one action" email nudge; show estimated score lift per item |
| API rate limits or cost spikes | Medium | High | Queue with backoff; cache raw responses; cap free-tier runs |
| LLM response format changes break extractor | Medium | High | Abstract extractor; integration tests against real API responses; versioned parsers |
| Monitoring-tier competitors undercut on price | High | Medium | Differentiate on revenue correlation and action layer — not tracking price |
| Semrush/Ahrefs add SMB-priced AI visibility | Medium | High | Move fast on agency channel; build proprietary prompt library as moat |

---

## 13. Assumptions

- Users will self-serve onboarding via URL input; no browser extension needed for MVP.
- One LLM API (OpenAI) is sufficient to demonstrate value in MVP; multi-LLM is P1.
- Standard prompt library (built internally) will cover ≥ 80% of relevant query types across top 5 SMB categories at launch.
- Monthly pricing of $49–$99/mo is acceptable to the SMB segment — validate via discovery calls before launch.
- SMBs will act on a prioritized checklist without in-app content creation; they will delegate execution externally.

---

## 14. Open Questions

1. **Prompt library ownership:** Who curates and maintains the standard prompt templates? How many are needed per vertical at launch?
2. **Score transparency:** Do we show raw LLM response text, or only the parsed result? Cost and privacy implications differ significantly.
3. **Multi-LLM MVP:** Run against 1 LLM or 2 at launch? Two doubles API cost but improves score credibility.
4. **Agency pricing model:** Per-seat or per-brand-workspace? This affects data model and Stripe integration.
5. **Score benchmarking:** How do we define "good" vs "bad" without industry baselines at launch? Relative competitor comparison only, or seeded benchmarks by category?
6. **Primary GTM motion:** Agency-first or SMB self-serve first? Must decide before building onboarding flow.

---

## 15. Out of Scope (v1)

- In-app content generation or publishing (BrandLens's lane — we deliberately do not compete here)
- Real-time or near-real-time AI monitoring
- Voice assistant optimization (Alexa, Siri)
- Mobile app (web-responsive only)
- Direct API access for customers
- White-label branding
- Any integration beyond GA4 and Stripe at launch
- Hallucination detection (AI describing brand inaccurately) — deferred to P2

---

## 16. Epics and User Stories

### Epic 1 — Onboarding & Brand Setup
- As an **SMB owner**, I want to connect my brand in under 5 minutes so that I get value before losing interest.
- As a **marketer**, I want to add 3 competitors so that my score is immediately meaningful vs. the brands I actually compete with.
- As an **agency manager**, I want separate client workspaces so that data and reports stay organized per client.

### Epic 2 — AI-Visibility Score Engine
- As an **SMB owner**, I want a single 0–100 score so that I instantly know where I stand.
- As a **marketer**, I want to see which prompts my brand was missing from so that I know exactly where the gaps are.
- As an **agency manager**, I want automatic re-runs so that I don't have to manually trigger checks for 30 client brands.

### Epic 3 — Competitor Benchmarking
- As a **marketer**, I want my score vs. competitors on one chart so that I can show leadership a clear competitive gap.
- As an **SMB owner**, I want a trend line over time so that I can see if my optimization actions are working.

### Epic 4 — LLM-Optimization Playbook
- As a **marketer**, I want a ranked checklist of content, schema, and authority actions so that I always know what to work on first.
- As an **SMB owner**, I want impact labels (high/medium/low) on each item so that I can pick the quick win when I only have an hour.

### Epic 5 — Revenue Correlation (P1)
- As an **SMB owner**, I want to connect GA4 so that I can see if improving my AI-Visibility Score is actually driving more website traffic.
- As an **agency manager**, I want to show clients a chart of score improvement vs. session growth so that I can prove ROI for my retainer.

### Epic 6 — Notifications & Reporting
- As an **SMB owner**, I want an email after each re-run showing my score change so that I stay informed without logging in weekly.
- As an **agency manager**, I want to export a PDF per client so that I can include it in monthly reviews without extra formatting work.

### Epic 7 — Billing & Plan Management
- As an **SMB owner**, I want to see a free score snapshot before paying so that I experience value before committing.
- As a **marketer**, I want to upgrade in under 2 minutes so that there's no friction when I'm ready.
