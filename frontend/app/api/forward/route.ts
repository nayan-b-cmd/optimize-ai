// frontend/app/api/forward/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    console.log("Raw request body:", text);

    let body;
    try {
      body = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error("Failed to parse JSON body:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    const { path, ...rest } = body;
    if (!path) {
      return NextResponse.json(
        { error: "Missing 'path' in request body." },
        { status: 400 }
      );
    }

    const target = `http://localhost:8000/${path}`;
    console.log("Forwarding to:", target);

    const res = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rest),
    });

    const dataText = await res.text();
    console.log("Backend response text:", dataText);

    let data;
    try {
      data = JSON.parse(dataText);
    } catch (parseError) {
      if (res.status === 204 || dataText.trim() === "") {
        data = { message: "OK (no body)" };
      } else {
        console.error("Failed to parse backend JSON:", parseError);
        return NextResponse.json(
          { error: "Backend returned invalid JSON." },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Forward proxy error:", error);
    return NextResponse.json(
      { error: "Internal proxy error", details: String(error) },
      { status: 500 }
    );
  }
}