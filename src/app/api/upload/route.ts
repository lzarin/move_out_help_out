import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function safeName(original: string): string {
  const ext = path.extname(original) || ".jpg";
  const base = Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
  return base + ext;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "DONOR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
      { status: 400 }
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File too large. Max 5MB." },
      { status: 400 }
    );
  }

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
  } catch {
    return NextResponse.json({ error: "Upload directory error" }, { status: 500 });
  }

  const filename = safeName(file.name);
  const filepath = path.join(UPLOAD_DIR, filename);
  const bytes = await file.arrayBuffer();
  await writeFile(filepath, Buffer.from(bytes));

  const url = "/uploads/" + filename;
  return NextResponse.json({ url });
}
