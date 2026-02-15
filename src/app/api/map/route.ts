import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const w = searchParams.get("w") || "400";
  const h = searchParams.get("h") || "250";
  const level = searchParams.get("level") || "16";

  if (!lat || !lng) {
    return NextResponse.json({ error: "lat, lng required" }, { status: 400 });
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
}
