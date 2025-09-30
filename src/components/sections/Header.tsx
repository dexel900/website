"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function Header() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let last = 0;
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y <= 0) { el.classList.remove("hide"); el.classList.add("show"); last = 0; return; }
      if (y > last && y > 10) { el.classList.remove("show"); el.classList.add("hide"); }
      else if (y < last) { el.classList.remove("hide"); el.classList.add("show"); }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={ref} className="wb-header show" role="banner" aria-label="Site header">
      <div className="wb-wrap">
        <a href="/" className="wb-logo" aria-label="Zur Startseite">
          <Image src="/logo.webp" alt="webbinich" width={120} height={24} priority />
        </a>
        <nav className="wb-actions" aria-label="Primary actions">
          <PrimaryButton href="#contact" />
        </nav>
      </div>
    </header>
  );
}
