
# optimize.ai

AI visibility and revenue intelligence for SMBs. Measures how often AI assistants recommend your brand, benchmarks against competitors and outputs a ranked optimization playbook tied to traffic and revenue outcomes.

## Status

In development — architecture complete, MVP in progress.

## What it does

- Computes an AI-Visibility Score (0–100) per brand.
- Benchmarks against up to 3 competitors.
- Generates a ranked optimization playbook for content, schema, and authority gaps.
- Prepares the product for future tracking of traffic and conversion outcomes.

## Current architecture

- Frontend: Next.js App Router
- Backend logic: Next.js route handlers in `app/api/*`
- Temporary state passing: query params and `sessionStorage`
- Results rendering: client-side dashboard page

## Current flow

1. User lands on `/auth`.
2. User is redirected to `/onboarding`.
3. User enters brand details.
4. User enters competitors.
5. The app sends the request to `/api/visibility/run`.
6. The API returns a score and recommendations.
7. The results page reads `sessionStorage.visibilityResult` and displays the report.

## Stack

- Next.js
- TypeScript
- Python
- PostgreSQL
- OpenAI API
- Stripe

## Local development

```bash
npm install
npm run dev
```

## Notes

- The current MVP uses a Next.js route handler for visibility scoring.
- A separate FastAPI backend existed previously and may be reintroduced later if needed.
- The next major upgrade is to replace mock scoring with real search/API-driven visibility analysis.
