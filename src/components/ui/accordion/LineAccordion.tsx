"use client";
import { useEffect, useRef, useState } from "react";

type Item = { id: string; label: string; content: string };
type Props = {
  items: Item[];
  active?: number;
  onChange?: (index: number) => void;
  className?: string;
};

export default function LineAccordion({
  items,
  active = 0,
  onChange,
  className = "",
}: Props) {
  const [open, setOpen] = useState(active);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    setOpen(active);
  }, [active]);

  useEffect(() => {
    panelsRef.current.forEach((p, i) => {
      if (!p) return;
      if (i === open) {
        const inner = p.querySelector<HTMLDivElement>(".inner");
        const h = inner ? inner.offsetHeight : 0;
        p.style.maxHeight = `${h + 22}px`;
      } else {
        p.style.maxHeight = "0px";
      }
    });
  }, [open, items]);

  const toggle = (i: number) => {
    const next = i === open ? -1 : i;
    setOpen(next);
    onChange?.(next);
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((it, idx) => {
        const expanded = idx === open;

        return (
          <div
            key={it.id}
            className={`border-b transition-colors ${
              expanded
                ? "border-[hsl(var(--color-brand-secondary))]/45"
                : "border-white/15"
            }`}
          >
            <button
              id={`acc-btn-${it.id}`}
              className="w-full grid grid-cols-[1fr_auto] items-center gap-4 py-4 md:py-5 text-left"
              aria-expanded={expanded}
              aria-controls={`acc-panel-${it.id}`}
              onClick={() => toggle(idx)}
            >
              <span
                className={`uppercase tracking-[2.2px] font-semibold text-[12px] transition-colors ${
                  expanded
                    ? "text-[hsl(var(--color-brand-secondary))]"
                    : "text-white/70"
                }`}
              >
                {it.label}
              </span>

              {/* Icon */}
              <span
                className={`relative w-10 h-10 rounded-full grid place-items-center transition-all duration-300 ${
                  expanded
                    ? "bg-[hsl(var(--color-brand-secondary))] shadow-[0_10px_24px_rgba(0,0,0,.25)]"
                    : "bg-neutral-200"
                }`}
                aria-hidden="true"
              >
                {/* Horizontal Strich */}
                <span
                  className={`absolute w-[18px] h-[2px] transition-colors duration-300 ${
                    expanded ? "bg-black" : "bg-black"
                  }`}
                />
                {/* Vertikal (für Plus) */}
                <span
                  className={`absolute w-[18px] h-[2px] transition-all duration-300 ${
                    expanded
                      ? "opacity-0"
                      : "opacity-100 rotate-90 bg-black"
                  }`}
                />
              </span>
            </button>

            <div
              id={`acc-panel-${it.id}`}
              role="region"
              aria-labelledby={`acc-btn-${it.id}`}
              ref={(el) => {
                if (el) panelsRef.current[idx] = el;
              }}
              className="overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out"
            >
              <div className="inner pb-6">
                <p className="text-white/80 text-[clamp(15px,2vw,18px)] leading-relaxed">
                  {it.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
