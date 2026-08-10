"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/animations";
import { FloatingHearts } from "@/components/floating-hearts";
import { SectionDivider } from "@/components/section-divider";
import { FoldCard, FoldSection } from "@/components/fold-card";
import { ImageModal } from "@/components/image-modal";
import { WordHeart } from "@/components/word-heart";
import Image from "next/image";



/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR TIMELINE HERE                    ║
  ║  Each object = one card on the page.            ║
  ║  Change title, time, date, description freely.  ║
  ╚══════════════════════════════════════════════════╝
*/

interface TimelineItem {
  emoji: string | null;
  title: string | null;
  description: string | null;
  image: string | null;
  time?: string | null;
  date?: string | null;
}

const TIMELINE: TimelineItem[] = [
  {
    emoji: "🥭",
    title: "Mi manguito",
    description:
      "No se en que momento te comence a decir asi, pero te convertiste en una persona tan dulce y especial como lo es un manguito para mi jajaja",
    image: "/dex-rita.jpg",
  },
  {
    emoji: "💘",
    title: "Hermosa",
    description:
      "Desde que te vi, supe que eras una mujer muy hermosa, nunca lo dude, esos ojos tan lindos y esa sonrisa tan especial me cautivaron desde el principio.",
    image: "/romantic.png",
  },
  {
    emoji: "💖",
    title: "Tierna",
    description:
      "Siempre me has demostrado ser una persona muy tierna, y eso es algo que me encanta de ti, esa ternura que tienes me hace sentir muy especial y querido",
    image: "/gato.png",
  },
  {
    emoji: "💕",
    title: "Una mujer fuerte y valiente",
    description:
      "Me da mucho orgullo todo lo que has logrado hasta ahora, y se que solo es un comienzo de todo lo que vas a lograr, aún con todas las dificultades, mi manguito es siempre fuerte y muy valiente",
    image: "/love.webp",
  },
  {
    emoji: "🦋",
    title: "Inteligente",
    description:
      "Una niña muy inteligente, tanto que ha logrado ser la mejor en la escuela y en todo lo que se propone",
    image: "/intel.jpg",
  },
  {
    emoji: "🤗",
    title: "Una persona",
    description:
      "No somos perfectos amor, y te veo como una persona, no como un robot, sentimos y siempre sentiremos, eso es lo que nos hace humanos, y eso es lo que me gusta de ti, que eres una persona con sentimientos y emociones, y no un robot sin sentimientos, chingao, como amo tu forma de ser",
    image: "/enamrodao.jpg",
  },
  {
    emoji: "💋",
    title: "Sexy jujuju",
    description:
      "Aunque no lo creas, eres muy setsi, wof wof, esa cintura y esas piernas me vuelven loco, y no puedo dejar de pensar en ti, y en lo que me gustaria hacer contigo, jejeje",
    image: "/sexy.jpeg",
  },
];

/*
  ╔══════════════════════════════════════════════════╗
  ║  ✏️  EDIT YOUR "YOU & ME" WORDS HERE            ║
  ║  These float around the centre piece.           ║
  ╚══════════════════════════════════════════════════╝
*/
const FLOATING_WORDS = [
  "Hermosa",
  "Tierna",
  "Sexy",
  "Valiente",
  "Fuerte",
  "Inteligente",
  "Amorosa",
];

export default function Home() {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <main className="relative overflow-x-hidden">
      <FloatingHearts />

      {/* ═══════════ HERO ═══════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6"
      >
        {/* Gradient orbs — smaller on mobile */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-48 w-48 rounded-full bg-orchid/20 blur-[80px] sm:h-96 sm:w-96 sm:blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-plum/15 blur-[60px] sm:h-80 sm:w-80 sm:blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-powder/10 blur-[50px] sm:h-64 sm:w-64 sm:blur-[80px]" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10"
        >
          <Reveal variant="fadeDown" duration={0.8}>
            <motion.p
              className="text-xs font-medium tracking-[0.3em] uppercase text-plum sm:text-sm"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Feliz aniversario mi manguito
            </motion.p>
          </Reveal>

          <Reveal variant="scaleUp" delay={0.2} duration={1}>
            <h1 className="mt-4 font-display text-5xl leading-tight tracking-tight sm:mt-6 sm:text-8xl md:text-9xl">
              <motion.span
                className="bg-gradient-to-r from-plum via-saffron to-powder bg-[length:300%_100%] bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                Doc Dasha Leney...
              </motion.span>
            </h1>
          </Reveal>

          <Reveal variant="blur" delay={0.5}>
            <p className="mx-auto mt-4 max-w-sm font-signature text-xl text-plum/70 sm:mt-6 sm:max-w-lg sm:text-2xl md:text-3xl">
              Para esa niña que es tan especial
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.7}>
            <p className="mx-auto mt-4 max-w-xs text-xs leading-relaxed text-white/50 sm:mt-6 sm:max-w-md sm:text-sm">
              Todo empezo con una app bien rarita jeje, pero pudo conectarme contigo y aprender contigo...
            </p>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.9}>
            <motion.a
              href="#love-heart"
              className="animate-pulse-glow group mt-8 inline-flex items-center gap-2 rounded-full border border-orchid/30 bg-orchid/10 px-6 py-2.5 text-xs font-medium text-plum backdrop-blur-sm transition-all duration-300 hover:border-orchid/60 hover:bg-orchid/20 sm:mt-10 sm:px-8 sm:py-3 sm:text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ve abajo bobita, hay mas...
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.a>
          </Reveal>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0e0b16] to-transparent sm:h-32" />
      </section>

      {/* ═══════════ HEART WORD CLOUD ═══════════ */}
      <section id="love-heart" className="relative px-4 py-16 sm:px-6 sm:py-24">
        <Reveal variant="fadeUp">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-6 text-xs font-medium tracking-[0.28em] uppercase text-plum sm:text-sm">
              Un poquito mas de amor
            </p>
            <WordHeart
              centerText="Love you."
              words={FLOATING_WORDS}
              hue={336}
              accent="#ff2d75"
              className="max-w-full"
              centerClassName="drop-shadow-[0_0_24px_rgba(255,45,117,0.35)]"
            />
          </div>
        </Reveal>
      </section>

      {/* ═══════════ TIMELINE — folding cards ═══════════ */}
      <section id="our-story" className="relative px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal variant="fadeUp">
            <h2 className="text-center font-heading text-3xl tracking-wide text-plum sm:text-4xl md:text-5xl">
              <motion.span
                whileInView={{ backgroundSize: ["0% 2px", "100% 2px"] }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  backgroundImage: "linear-gradient(to right, #FFAAEA, #98C1D9)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom center",
                  backgroundSize: "0% 2px",
                  paddingBottom: 4,
                }}
              >
                ¿Quién es manguito para mi?
              </motion.span>
            </h2>
            <p className="mt-3 text-center text-xs text-white/40 sm:mt-4 sm:text-sm">
              Esto expresa lo que pienso y siento por ti...
            </p>
          </Reveal>

          {/* Timeline with fold-in cards */}
          <div className="relative mt-8 sm:mt-20">
            {/* Vertical line — desktop only */}
            <motion.div
              className="absolute left-1/2 top-0 hidden h-full w-px sm:block"
              style={{ background: "linear-gradient(to bottom, rgba(99,29,118,0.6), rgba(255,170,234,0.3), transparent)", transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {TIMELINE.map((item, i) => (
              <FoldCard key={i} index={i} className="relative mb-5 last:mb-0 sm:mb-16">
                <div
                  className={`flex items-start sm:gap-16 ${
                    i % 2 === 0
                      ? "sm:flex-row"
                      : "sm:flex-row-reverse sm:text-right"
                  }`}
                >
                  {/* Dot on timeline — desktop only */}
                  <div className="absolute left-1/2 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:flex">
                    <motion.span
                      className="absolute h-4 w-4 rounded-full border-2 border-orchid bg-[#0e0b16]"
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                    <motion.span
                      className="absolute h-2 w-2 rounded-full bg-plum"
                      whileInView={{ scale: [0, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                    />
                  </div>

                  {/* Content card */}
                  <div
                    className={`w-full overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] transition-all duration-300 hover:border-orchid/20 hover:bg-white/[0.06] sm:w-[calc(50%-2rem)] ${
                      i % 2 === 0 ? "" : "sm:ml-auto"
                    }`}
                  >
                    {/* Text content */}
                    <div className="p-4 sm:p-6">
                      <div
                        className={`flex items-center gap-2 sm:gap-3 ${
                          i % 2 !== 0 ? "sm:flex-row-reverse" : ""
                        }`}
                      >
                        <motion.span
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-orchid/20 text-base sm:h-8 sm:w-8"
                          whileInView={{ rotate: [0, 10, -10, 0] }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.15 }}
                        >
                          {item.emoji}
                        </motion.span>
                        <div className="flex items-center gap-2">
                          <time className="text-[10px] font-medium tracking-wider text-saffron/70 uppercase sm:text-xs">
                            {item.time}
                          </time>
                          <span className="text-[9px] text-white/20 sm:text-[10px]">•</span>
                          <span className="text-[9px] text-white/25 sm:text-[10px]">
                            {item.date}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-2 font-display text-lg text-white sm:mt-3 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/50 sm:mt-2 sm:text-sm">
                        {item.description}
                      </p>
                    </div>

                    {/* Chat screenshot — tap to open modal */}
                    {item.image && (
                      <button
                        type="button"
                        onClick={() => setModalImage({ src: item.image!, alt: item.title ?? "Timeline image" })}
                        className="block w-full border-t border-white/5 active:opacity-80"
                      >
                        <div className="relative aspect-square w-full overflow-hidden sm:aspect-[4/3]">
                          <Image
                            src={item.image}
                            alt={item.title ?? "Timeline image"}
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover object-center"
                          />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </FoldCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════ LETTER — folds open ═══════════ */}
      <FoldSection className="px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:rounded-3xl sm:p-10 md:p-14"
            whileInView={{
              boxShadow: [
                "0 0 0px rgba(99,29,118,0)",
                "0 0 60px rgba(99,29,118,0.15)",
              ],
            }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            {/* Animated border shimmer */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-transparent sm:rounded-3xl"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,170,234,0.1), transparent) border-box",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Corner decorations */}
            <motion.div
              className="absolute right-4 top-4 text-2xl text-orchid/10 sm:right-6 sm:top-6 sm:text-4xl"
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 text-xl text-plum/10 sm:bottom-6 sm:left-6 sm:text-3xl"
              animate={{ rotate: [360, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
            <motion.div
              className="absolute left-4 top-4 text-lg text-saffron/5 sm:left-6 sm:top-6 sm:text-2xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              ✶
            </motion.div>

            <Reveal variant="fadeUp">
              <p className="font-signature text-2xl text-plum sm:text-3xl md:text-4xl">
                Querida Dasha Leney,
              </p>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.2}>
              <div className="mt-4 space-y-3 text-xs leading-relaxed text-white/60 sm:mt-6 sm:space-y-4 sm:text-sm">
                <p>
                  Desde que te conoci has sido una persona maravillosa en mi vida, me has llenado de alegria, amor y felicidad en lo que hemos hablado, y siempre me has demostrado lo mejor de ti.
                </p>
                <p>
                  Aunque también los malos, pero que seriamos si no fueramos humanos? Eso amor, es lo que somos, nunca te de pena de demostrar lo que sientes, nunca guardarse nada y siempre confiar en tus seres queridos, te amo tal y como eres.
                </p>
                <p>
                  Has logrado mucho tu solita, y eso me hace sentur muy orgullosa de mi manguito, tan fuerte y tan valiente que eres, eso es lo que te define Len, eres una persona que se preoucpa por los demás y a pesar de todo, sigues luchando, y estoy origulloso de ti, nunca olvides todo lo que has logrado desde el principio, tu puedes con todo y mucho más, si? (jujuju responde con si en tu mente)
                </p>
                <p>
                  Por ulitmo, te queria decir Te amo, amo la persona en la que eres y amo la persona en la que te queires convertir, amo la perseverancia con la que luchas por tus sueños y amo tu forma de ser, y aunque no lo creas y aún no lo veas, eres hermosa, siempre lo has sido, algún dia te darás cuenta de todo lo que has logrado y dirás, "woooow, diblios tio, soy una bomba", y eso amor, eso es lo que eres, te amo hermosa.
                </p>
                <p>
                  Ush, otra cosa, nunca olvides a los que te rodean, siempre habra altas y bajas (nata? mentira JAJAJ), pero siempre recuerda a las personas que siempre están para ti, tu mami, tu hermana y tu hermano, no olvidemos a tu mejor amiga, y seguramente más familia y amigos que aún no ves que tienes y puedes contar con ellos, todos ellos te dan amor, y siempre lo harán, ellos son tu pilar más fuerte en tu vida, nunca lo olvides hermosa niña, nunca estás sola, nunca lo estarás. Y aunque yo ya no esté, nunca olvides todo lo que te enseñe, nunca estás sola y recuerdaaaaa mi amor, un dia a la vez...
                </p>
                <p>
                  AHora si, BAJAAJAJAJ, pinche mujer tan hermosa dios mio, pechiocha princesa futura doctora con lindos ojos, nariz y boquita preciosa, nunca olvides todo lo que te define, y te hace ser tú amor, nunca lo olvides. 
                </p>
                <p>
                  Y si no es en este tiempo, espero algún día pueda recontrarme contigo...
                </p>
                <p className="text-white/80">
                  Para mi manguito, con todo mi amor.
                </p>
              </div>
            </Reveal>
            <Reveal variant="fadeUp" delay={0.4}>
              <p className="mt-6 font-signature text-xl text-saffron/60 sm:mt-8 sm:text-2xl">
                Te amo, siempre lo he hecho... ♥
              </p>
            </Reveal>
          </motion.div>
        </div>
      </FoldSection>

    </main>
  );
}
