import { NextRequest, NextResponse } from "next/server";

type Competitor = { name: string; website: string; score: number };

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pickCompetitors(brandName: string, category: string, location: string): Competitor[] {
  const seed = `${brandName}|${category}|${location}`.toLowerCase();

  const pool = [
    "Rival Roasters",
    "Bean Co.",
    "Morning Press",
    "Brew Lab",
    "Java House",
    "North Star Coffee",
    "Daily Grind",
    "Urban Roast",
  ];

  const rotated = [...pool].sort((a, b) => {
    const aa = (a + seed).split("").reduce((s, c) => s + c.charCodeAt(0), 0);
    const bb = (b + seed).split("").reduce((s, c) => s + c.charCodeAt(0), 0);
    return aa - bb;
  });

  return rotated.slice(0, 3).map((name, index) => ({
    name,
    website: `https://${slugify(name)}.com`,
    score: 82 - index * 14,
  }));
}

function computeScore(brandName: string, website: string, category: string, location: string, competitors: Competitor[]) {
  const seed = `${brandName}|${website}|${category}|${location}|${competitors.map((c) => c.name).join("|")}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;

  const score = 45 + (hash % 41);
  const delta = 3 + (hash % 8);
  const mentionRate = 40 + (hash % 45);
  const avgPosition = Number((1.4 + (hash % 24) / 10).toFixed(1));
  const queryCoverage = 22 + (hash % 58);

  return { score, delta, mentionRate, avgPosition, queryCoverage };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const brandName = String(body.brandName || "").trim();
    const website = String(body.website || "").trim();
    const category = String(body.category || "").trim();
    const location = String(body.location || "").trim();
    const competitorUrls = Array.isArray(body.competitorUrls) ? body.competitorUrls : [];

    if (!brandName || !website) {
      return NextResponse.json({ error: "Brand name and website are required." }, { status: 400 });
    }

    const liveCompetitors = pickCompetitors(brandName, category, location);

    const manualCompetitors = competitorUrls
      .map((url: string, i: number) => ({
        name: url.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || `Competitor ${i + 1}`,
        website: url,
        score: 60 - i * 8,
      }))
      .filter((c: Competitor) => c.website)
      .slice(0, 3);

    const competitors = manualCompetitors.length ? manualCompetitors : liveCompetitors;
    const metrics = computeScore(brandName, website, category, location, competitors);

    const checklistItems = [
      {
        impact: "High" as const,
        title: "Add structured data schema markup to homepage and products.",
        detail: "Competitors have it; you do not yet.",
        lift: "Estimated +8 pts",
      },
      {
        impact: "High" as const,
        title: "Publish a clearer About page with your city and founding story.",
        detail: "This improves trust and local authority signals.",
        lift: "Estimated +5 pts",
      },
      {
        impact: "Med" as const,
        title: "Get listed in 3 missing directories.",
        detail: "Yelp, Google Business, and one industry listing.",
        lift: "Estimated +3 pts",
      },
    ];

    const evidenceRows = [
      {
        prompt: `Best ${category || "business"} brand for customers in ${location || "my area"}?`,
        results: [
          { llm: "ChatGPT", rank: `#1 ${competitors[0]?.name || brandName}` },
          { llm: "Gemini", rank: `#2 ${brandName}` },
          { llm: "Perplexity", rank: "Not mentioned" },
        ],
      },
      {
        prompt: `Which brand is most trusted in the ${category || "category"}?`,
        results: [
          { llm: "ChatGPT", rank: `#1 ${competitors[1]?.name || brandName}` },
          { llm: "Gemini", rank: `#2 ${brandName}` },
          { llm: "Perplexity", rank: `#3 ${competitors[0]?.name || brandName}` },
        ],
      },
      {
        prompt: `Who offers the strongest ${category || "category"} experience and trust signals?`,
        results: [
          { llm: "ChatGPT", rank: `#1 ${brandName}` },
          { llm: "Gemini", rank: `#2 ${competitors[2]?.name || competitors[0]?.name || brandName}` },
          { llm: "Perplexity", rank: `#1 ${competitors[0]?.name || brandName}` },
        ],
      },
    ];

    return NextResponse.json({
      brandName,
      website,
      category,
      location,
      score: metrics.score,
      delta: metrics.delta,
      mentionRate: metrics.mentionRate,
      avgPosition: metrics.avgPosition,
      queryCoverage: metrics.queryCoverage,
      competitors,
      checklistItems,
      evidenceRows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to run visibility test." }, { status: 500 });
  }
}
