import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
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
    const body = await request.json();
    const { name, password, message } = body;

    if (!name?.trim() || !password?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "모든 항목을 입력해주세요" }, { status: 400 });
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
    const body = await request.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json({ error: "잘못된 요청입니다" }, { status: 400 });
    }

    const supabase = createServerClient();

    // Fetch the entry with password for verification
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
