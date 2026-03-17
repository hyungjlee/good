import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createServerClient } from "@/lib/supabase/server";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(ip, { limit: 30, windowMs: 60_000 })) {
      return NextResponse.json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }, { status: 429 });
    }

    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("guestbook")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Guestbook fetch error:", error);
      return NextResponse.json({ error: "불러오기에 실패했습니다" }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(ip, { limit: 5, windowMs: 60_000 })) {
      return NextResponse.json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }, { status: 429 });
    }

    const body = await request.json();
    const { name, password, message } = body;

    if (!name?.trim() || !password?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "모든 항목을 입력해주세요" }, { status: 400 });
    }

    if (name.trim().length > 20) {
      return NextResponse.json({ error: "이름은 20자 이내로 입력해주세요" }, { status: 400 });
    }

    if (password.length > 50) {
      return NextResponse.json({ error: "비밀번호는 50자 이내로 입력해주세요" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json({ error: "메시지는 500자 이내로 작성해주세요" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const supabase = createServerClient();
    const { error } = await supabase.from("guestbook").insert({
      name: name.trim(),
      password: hashedPassword,
      message: message.trim(),
    });

    if (error) {
      console.error("Guestbook insert error:", error);
      return NextResponse.json({ error: "등록에 실패했습니다" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(ip, { limit: 10, windowMs: 60_000 })) {
      return NextResponse.json({ error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }, { status: 429 });
    }

    const body = await request.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json({ error: "잘못된 요청입니다" }, { status: 400 });
    }

    const supabase = createServerClient();

    const { data: entry, error: fetchError } = await supabase
      .from("guestbook")
      .select("id, password")
      .eq("id", id)
      .single();

    if (fetchError || !entry) {
      return NextResponse.json({ error: "메시지를 찾을 수 없습니다" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, entry.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다" }, { status: 403 });
    }

    const { error: deleteError } = await supabase
      .from("guestbook")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Guestbook delete error:", deleteError);
      return NextResponse.json({ error: "삭제에 실패했습니다" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}
