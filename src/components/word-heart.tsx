"use client";

import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * WordHeart — a heart shape built out of floating words/phrases with a
 * custom message glowing in the center. Drop it in next to FoldCard,
 * SectionDivider, FloatingHearts, etc.
 *
 * Usage:
 * <WordHeart
 *   centerText="Love you."
 *   words={["I love you", "forever", "my heart", "<3"]}
 *   hue={336}
 *   accent="#ff2d75"
 * />
 */

interface WordHeartProps {
  /** Big message that glows in the middle of the heart. */
  centerText: string;
  /** Pool of words/phrases scattered across the heart outline. */
  words?: string[];
  /** Base hue (0-360) for the word cloud color (HSL). */
  hue?: number;
  /** Hex/rgb color used for glow + shadows around the center text and words. */
  accent?: string;
  /** Width of the heart area. Height is derived to keep the heart's aspect ratio. */
  size?: number | string;
  /** Density of the word cloud — lower = denser, higher = sparser. */
  density?: number;
  /** Only build/animate once it scrolls into view (matches FoldCard/Reveal behavior). */
  revealOnView?: boolean;
  /** Extra classes for the outer wrapper. */
  className?: string;
  /** Extra classes for the center text. */
  centerClassName?: string;
}

interface HeartPoint {
  x: number;
  y: number;
  boost: number;
}

function buildHeartPoints(step: number): HeartPoint[] {
  const points: HeartPoint[] = [];
  for (let y = 1.35; y >= -1.25; y -= step) {
    for (let x = -1.45; x <= 1.45; x += step) {
      const v = Math.pow(x * x + y * y - 1, 3) - x * x * Math.pow(y, 3);
      if (v <= 0) {
        const px = 50 + x * 31;
        const py = 53 - y * 35;
        const boost = 1 - Math.min(1, Math.hypot(x, y) / 1.55);
        points.push({ x: px, y: py, boost });
      }
    }
  }
  return points;
}

export function WordHeart({
  centerText,
  words = ["I love you", "forever", "my heart", "always", "<3"],
  hue = 336,
  accent = "#ff2d75",
  size = "min(92vw, 760px)",
  density = 0.105,
  revealOnView = true,
  className = "",
  centerClassName = "",
}: WordHeartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [hasPlayed, setHasPlayed] = useState(false);
  const show = revealOnView ? inView : true;

  if (show && !hasPlayed) setHasPlayed(true);

  const points = useMemo(() => buildHeartPoints(density), [density]);

  const wordSpans = useMemo(
    () =>
      points.map((point, index) => {
        const word = words[(index + Math.floor(point.x)) % words.length];
        const delay = Math.random() * 900 + point.y * 4;
        const wordHue = hue + Math.random() * 15;
        const light = 50 + point.boost * 34 + Math.random() * 8;
        const opacity = 0.56 + point.boost * 0.42;
        const rot = (Math.random() * 10 - 5).toFixed(2);
        return { word, point, delay, wordHue, light, opacity, rot, key: index };
      }),
    [points, words, hue]
  );

  return (
    <div
      ref={ref}
      className={`relative mx-auto aspect-[1/0.9] [transform-style:preserve-3d] ${className}`}
      style={{ width: size }}
    >
      {hasPlayed &&
        wordSpans.map(({ word, point, delay, wordHue, light, opacity, rot, key }) => (
          <motion.span
            key={key}
            className="absolute whitespace-nowrap font-mono text-[7px] sm:text-[10px] md:text-xs"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              color: `hsl(${wordHue}, 100%, ${light}%)`,
              textShadow: `0 0 7px ${accent}d9, 0 0 18px ${accent}80`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.2, rotate: `${rot}deg` }}
            animate={
              show
                ? { opacity, scale: 1, rotate: `${rot}deg` }
                : { opacity: 0, scale: 0.2, rotate: `${rot}deg` }
            }
            transition={{ duration: 0.75, delay: delay / 1000, ease: [0.2, 0.9, 0.2, 1.15] }}
          >
            {word}
          </motion.span>
        ))}

      <motion.div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center text-center font-display text-3xl font-extrabold text-white sm:text-5xl md:text-6xl ${centerClassName}`}
        style={{
          textShadow: `0 0 22px rgba(255,255,255,0.5), 0 0 46px ${accent}e6`,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 1.15, ease: "easeOut" }}
      >
        {centerText}
      </motion.div>

      {show && (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.035, 1, 1.025, 1] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
      )}
    </div>
  );
}
