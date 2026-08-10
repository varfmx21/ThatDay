import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import path from "path";

// Place this file at: src/app/api/songs/route.ts

const AUDIO_EXTENSIONS = [".mp3", ".wav", ".ogg", ".m4a", ".flac"];

export async function GET() {
  const musicDir = path.join(process.cwd(), "public", "music");

  let files: string[] = [];
  try {
    files = readdirSync(musicDir).filter((file) =>
      AUDIO_EXTENSIONS.includes(path.extname(file).toLowerCase())
    );
  } catch {
    // The folder doesn't exist yet — just return an empty playlist.
    return NextResponse.json({ tracks: [] });
  }

  // Sort naturally so "1 - Song.mp3", "2 - Song.mp3", "10 - Song.mp3" stay in order.
  files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const tracks = files.map((file) => {
    const rawName = path.parse(file).name;
    const cleanTitle = rawName
      .replace(/^\d+[\s._-]*/, "") // strip leading "01 - " track numbers
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