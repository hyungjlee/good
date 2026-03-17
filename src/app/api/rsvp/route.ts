import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const VALID_MEAL_PREFS = ["korean", "western", "none"];

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(ip, { limit: 5, windowMs: 60_000 })) {
      return NextResponse.json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }, { status: 429 });
    }

    const body = await request.json();
    const { name, phone, side, attending, partySize, mealPref, message } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "이름을 입력해주세요" }, { status: 400 });
    }

    if (name.trim().length > 30) {
      return NextResponse.json({ error: "이름은 30자 이내로 입력해주세요" }, { status: 400 });
    }

    if (phone && phone.length > 20) {
      return NextResponse.json({ error: "연락처는 20자 이내로 입력해주세요" }, { status: 400 });
    }

    if (message && message.length > 500) {
      return NextResponse.json({ error: "메시지는 500자 이내로 작성해주세요" }, { status: 400 });
    }

    if (!["groom", "bride"].includes(side)) {
      return NextResponse.json({ error: "잘못된 구분입니다" }, { status: 400 });
    }

    const safeMealPref = VALID_MEAL_PREFS.includes(mealPref) ? mealPref : "none";

    const supabase = createServerClient();
    const trimmedName = name.trim();
    const trimmedPhone = phone?.trim() || null;

    const rsvpData = {
      name: trimmedName,
      phone: trimmedPhone,
      side,
      attending: Boolean(attending),
      party_size: Math.min(Math.max(Number(partySize) || 1, 1), 10),
      meal_pref: safeMealPref,
      message: message?.trim() || null,
    };

    // Check for existing RSVP to prevent duplicates (update if exists)
    let query = supabase.from("rsvp").select("id").eq("name", trimmedName);
    if (trimmedPhone) {
      query = query.eq("phone", trimmedPhone);
    } else {
      query = query.is("phone", null);
    }
    const { data: existing } = await query.maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("rsvp")
        .update(rsvpData)
        .eq("id", existing.id);

      if (error) {
        console.error("RSVP update error:", error);
        return NextResponse.json({ error: "저장에 실패했습니다" }, { status: 500 });
      }

      return NextResponse.json({ success: true, updated: true });
    }

    const { error } = await supabase.from("rsvp").insert(rsvpData);

    if (error) {
      console.error("RSVP insert error:", error);
      return NextResponse.json({ error: "저장에 실패했습니다" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
