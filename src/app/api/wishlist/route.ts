import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getSupabaseClient } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_FILE = path.join(process.cwd(), "data", "wishlist.json");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("wishlist").insert({ email });

    // Unique violation just means they're already on the list — treat as success.
    if (error && error.code !== "23505") {
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  }

  // Once the Django backend is live, set WISHLIST_API_URL and signups will be
  // forwarded there instead of the local file below.
  const djangoUrl = process.env.WISHLIST_API_URL;
  if (djangoUrl) {
    const res = await fetch(djangoUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  }

  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });

  let entries: string[] = [];
  try {
    entries = JSON.parse(await fs.readFile(DATA_FILE, "utf-8"));
  } catch {
    entries = [];
  }

  if (!entries.includes(email)) {
    entries.push(email);
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2));
  }

  return NextResponse.json({ success: true });
}
