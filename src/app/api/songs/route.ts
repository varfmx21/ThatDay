import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import path from "path";

const AUDIO_EXTENSIONS = [".mp3", ".wav", ".ogg", ".m4a", ".flac"];

export async function GET() {
  const musicDir = path.join(process.cwd(), "public", "music");

  let files: string[] = [];
  try {
    files = readdirSync(musicDir).filter((file) =>
      AUDIO_EXTENSIONS.includes(path.extname(file).toLowerCase())
    );
  } catch {
    return NextResponse.json({ tracks: [] });
  }

  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const tracks = files.map((file) => {
    const rawName = path.parse(file).name;
    const cleanTitle = rawName
      .replace(/^\d+[\s._-]*/, "")
      .replace(/[_-]+/g, " ")
      .trim();

    const title = cleanTitle
      ? cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)
      : rawName;

    return {
      title,
      src: `/music/${encodeURIComponent(file)}`,
    };
  });

  return NextResponse.json({ tracks });
}