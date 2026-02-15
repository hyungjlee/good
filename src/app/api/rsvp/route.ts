import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, side, attending, partySize, mealPref, message } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "이름을 입력해주세요" }, { status: 400 });
    }

    if (!["groom", "bride"].includes(side)) {
      return NextResponse.json({ error: "잘못된 구분입니다" }, { status: 400 });
    }

    const supabase = createServerClient();
    const { error } = await supabase.from("rsvp").insert({
      name: name.trim(),
      phone: phone?.trim() || null,
      side,
      attending: Boolean(attending),
      party_size: Math.min(Math.max(Number(partySize) || 1, 1), 10),
      meal_pref: mealPref || "none",
      message: message?.trim() || null,
    });

    if (error) {
      console.error("RSVP insert error:", error);
      return NextResponse.json({ error: "저장에 실패했습니다" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
