"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, Volume2, VolumeX, Music2 } from "lucide-react";

// Place this file at: src/components/music-player.tsx

interface Track {
  title: string;
  src: string;
}

interface MusicPlayerProps {
  /** API route that returns { tracks: Track[] }. Defaults to the auto-scan endpoint. */
  tracksEndpoint?: string;
  /** Pass a hardcoded list instead of auto-scanning /public/music. */
  tracks?: Track[];
  /** Randomize playback order. */
  shuffle?: boolean;
  /** When the last song ends, go back to track 1 instead of stopping. */
  loopPlaylist?: boolean;
  /** Try to start playing as soon as the playlist loads. */
  autoPlay?: boolean;
  className?: string;
}

export function MusicPlayer({
  tracksEndpoint = "/api/songs",
  tracks: tracksProp,
  shuffle = false,
  loopPlaylist = true,
  autoPlay = true,
  className = "",
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<Track[]>(tracksProp ?? []);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [needsUnlock, setNeedsUnlock] = useState(false);
  const [ready, setReady] = useState(!!tracksProp);

  // Auto-scan the /music folder via the API route unless tracks were passed in directly.
  useEffect(() => {
    if (tracksProp) return;
    fetch(tracksEndpoint)
      .then((res) => res.json())
      .then((data: { tracks: Track[] }) => {
        let list = data.tracks ?? [];
        if (shuffle) list = [...list].sort(() => Math.random() - 0.5);
        setTracks(list);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [tracksEndpoint, tracksProp, shuffle]);

  const currentTrack = tracks[index];

  // Browsers block autoplay-with-sound until the user interacts with the page.
  // Strategy: try unmuted first, fall back to muted autoplay, then unlock sound
  // on the visitor's first click/keypress anywhere on the page.
  const tryAutoplay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
      setNeedsUnlock(false);
    } catch {
      audio.muted = true;
      setIsMuted(true);
      try {
        await audio.play();
        setIsPlaying(true);
        setNeedsUnlock(true);
      } catch {
        setIsPlaying(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!ready || !currentTrack || !autoPlay) return;
    tryAutoplay();
  }, [ready, currentTrack?.src, autoPlay, tryAutoplay]);

  useEffect(() => {
    if (!needsUnlock) return;
    const unlock = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.muted = false;
        setIsMuted(false);
        audio.play().catch(() => {});
      }
      setNeedsUnlock(false);
    };
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [needsUnlock]);

  const goToNext = useCallback(() => {
    setIndex((prev) => {
      const next = prev + 1;
      if (next >= tracks.length) return loopPlaylist ? 0 : prev;
      return next;
    });
  }, [tracks.length, loopPlaylist]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  if (!ready || tracks.length === 0) return null;

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio ref={audioRef} src={currentTrack?.src} onEnded={goToNext} preload="auto" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-md sm:bottom-6 sm:gap-3 ${className}`}
      >
        <motion.span
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 6, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orchid/20 text-plum"
        >
          <Music2 size={14} />
        </motion.span>

        <div className="max-w-[110px] overflow-hidden sm:max-w-[200px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTrack?.src}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="truncate text-xs font-medium text-white/80 sm:text-sm"
            >
              {currentTrack?.title}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orchid/30 text-white transition hover:bg-orchid/50"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Siguiente canción"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
        >
          <SkipForward size={14} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Activar sonido" : "Silenciar"}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-white/20"
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {needsUnlock && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => {
              const audio = audioRef.current;
              if (audio) {
                audio.muted = false;
                setIsMuted(false);
                audio.play().catch(() => {});
              }
              setNeedsUnlock(false);
            }}
            className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-orchid/80 px-4 py-2 text-xs font-medium text-white shadow-lg sm:bottom-24"
          >
            Toca para activar la música 🎵
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
