"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ReviewCard from "@/components/ui/ReviewCard";
import HexPyramidBg from "@/components/visuals/HexPyramidBg";

type ReviewItem = {
  id: string;
  avatar: string;
  name: string;
  role: string;
  company?: string;
  text: string;
};

const INTERVAL_MS = 6000;

export default function ReviewsSection() {
  const items: ReviewItem[] = useMemo(
    () => [
      {
        id: "1",
        avatar: "/avatars/bad_breaking_chemisrty_heisenberg_icon.png",
        name: "Justin Morschheuser",
        role: "Juwelier & Augenoptik Trümpener",
        text:
          "Ich war von der Kreativität und Effizienz von ://web/bin/ich begeistert. Sie denken immer einen Schritt weiter und liefern Ergebnisse, die nicht nur schön aussehen, sondern auch funktionieren. Klare Empfehlung für alle Lokale, die eine starke Online-Präsenz wollen.",
      },
      {
        id: "2",
        avatar: "/avatars/batman_comics_hero_icon.png",
        name: "L. Wayne",
        role: "Inhaber",
        company: "Wayne Enterprises",
        text:
          "Unser Webauftritt ist messbar schneller & klarer. Starker Mix aus Ästhetik, UX und Conversion – genau, was wir brauchten.",
      },
      {
        id: "3",
        avatar: "/avatars/joker_squad_suicide_woman_icon.png",
        name: "D. Prince",
        role: "CMO",
        company: "Themyscira Crafts",
        text:
          "Team hat uns durch den gesamten Funnel geführt. Von Markenstory bis Leadform – alles sitzt.",
      },
      {
        id: "4",
        avatar: "/avatars/einstein_professor_scientist_icon.png",
        name: "A. Stein",
        role: "Research Lead",
        company: "Relativity Lab",
        text:
          "Saubere Komponentenarchitektur. Änderungen sind in Minuten live – genau so skaliert man moderne Sites.",
      },
      {
        id: "5",
        avatar: "/avatars/bear_russian_icon.png",
        name: "Dr. B. Bear",
        role: "Chefarzt",
        company: "General Hospital",
        text:
          "Barrierearm, schnell, wartbar. Und die kleinen Microinteractions? Lieben die Patient:innen.",
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);
  const paused = useRef(false);

  // Auto-Advance (pausiert bei Interaktion)
  useEffect(() => {
    const tick = () => !paused.current && setActive((i) => (i + 1) % items.length);
    timer.current = window.setInterval(tick, INTERVAL_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [items.length]);

  const pause = () => (paused.current = true);
  const resume = () => (paused.current = false);

  const go = (dir: -1 | 1) => {
    pause();
    setActive((i) => (i + dir + items.length) % items.length);
  };

  // Touch-Swipe (Mobile)
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    pause();
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    resume();
    touchStartX.current = null;
  };

  return (
    <section id="reviews" className="relative w-full overflow-x-clip">
      {/* BG Objekt */}
      <HexPyramidBg />

      <div
        className="wb-container relative z-10 py-14 sm:py-20 lg:py-28"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={resume}
      >
        {/* Overline */}
        <p className="text-center text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] opacity-70">
          Kundenstimmen sagen mehr als 1000 Websites
        </p>

        {/* Heading */}
        <h2 className="mt-3 sm:mt-4 text-center text-3xl sm:text-5xl lg:text-6xl font-light leading-tight">
          Die <span className="font-extrabold">Kritik liebt</span> uns
        </h2>

        {/* Avatare: 2 Zeilen auf Mobile (3 + 2), eine Zeile ab sm */}
<div className="mt-8 sm:mt-12">
  <div
    className="
      flex flex-wrap justify-center
      gap-4 sm:gap-6 md:gap-8
      px-2 sm:px-0
    "
  >
    {items.map((it, idx) => {
      const isActive = idx === active;
      return (
        <button
          key={it.id}
          onClick={() => setActive(idx)}
          aria-label={`Review von ${it.name} anzeigen`}
          aria-pressed={isActive}
          className={[
            // Mobile: 3 pro Reihe -> 3/2 Aufteilung bei 5 Items
            "basis-1/3 sm:basis-auto",
            "flex justify-center",
            "relative rounded-full transition-transform focus:outline-none",
            isActive ? "scale-100" : "scale-95 hover:scale-100",
          ].join(" ")}
          style={{ lineHeight: 0 }}
        >
          <span
            className={[
              "inline-block rounded-full transition-colors",
              isActive
                ? "border-2 border-[var(--color-brand-secondary)]"
                : "border-2 border-transparent hover:border-white/80",
              // responsive Größen
              "w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] md:w-[84px] md:h-[84px]",
            ].join(" ")}
          >
            <span className="block w-full h-full rounded-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.avatar}
                alt={it.name}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </span>
          </span>
        </button>
      );
    })}
  </div>
</div>


        {/* Review + Arrows (Arrows erst ab sm) */}
        <div className="relative mt-8 sm:mt-12">
          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            className="hidden sm:grid absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 place-items-center rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 hover:bg-white/20 transition"
            aria-label="Vorherige Rezension"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(1)}
            className="hidden sm:grid absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 place-items-center rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 hover:bg-white/20 transition"
            aria-label="Nächste Rezension"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider (fade) */}
          <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {items.map((it, idx) => (
              <div
                key={it.id}
                className={[
                  "transition-opacity duration-500 ease-out absolute inset-0",
                  idx === active ? "opacity-100" : "opacity-0 pointer-events-none",
                ].join(" ")}
              >
                <ReviewCard
                  review={{
                    id: it.id,
                    name: it.name,
                    role: it.role,
                    company: it.company,
                    text: it.text,
                  }}
                />
              </div>
            ))}
            {/* Höhe reservieren um Layout-Shift zu vermeiden */}
            <div className="opacity-0">
              <ReviewCard review={items[0]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
