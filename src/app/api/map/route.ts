import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(ip, { limit: 30, windowMs: 60_000 })) {
      return NextResponse.json({ error: "요청이 너무 많습니다" }, { status: 429 });
    }

    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get("lat") ?? "");
    const lng = parseFloat(searchParams.get("lng") ?? "");
    const w = Math.min(Math.max(parseInt(searchParams.get("w") ?? "400", 10) || 400, 100), 800);
    const h = Math.min(Math.max(parseInt(searchParams.get("h") ?? "250", 10) || 250, 100), 600);
    const level = Math.min(Math.max(parseInt(searchParams.get("level") ?? "16", 10) || 16, 1), 20);

    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 });
    }

    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;
    const clientSecret = process.env.NAVER_MAP_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: "Map API not configured" }, { status: 500 });
    }

    const url = `https://maps.apigw.ntruss.com/map-static/v2/raster?w=${w}&h=${h}&center=${lng},${lat}&level=${level}&markers=type:d|size:mid|pos:${lng}%20${lat}&scale=2`;

    const res = await fetch(url, {
      headers: {
        "x-ncp-apigw-api-key-id": clientId,
        "x-ncp-apigw-api-key": clientSecret,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Map API error" }, { status: res.status });
    }

    const imageBuffer = await res.arrayBuffer();

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Map API proxy error:", error);
    return NextResponse.json({ error: "지도 API 오류가 발생했습니다" }, { status: 500 });
  }
}
