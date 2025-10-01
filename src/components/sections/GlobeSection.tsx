"use client";
import { useEffect, useRef, useState } from "react";

/* ==== Typen für global geladene Scripts (THREE & VANTA) ==== */
type ThreeNS = unknown;

type VantaInstance = {
  destroy?: () => void;
  // VANTA-Instanzen haben oft auch setOptions – wenn vorhanden, könntest du so updaten,
  // wir re-initialisieren aber wie im Original.
  setOptions?: (opts: Partial<Parameters<VantaGlobeFn>[0]>) => void;
};

type VantaGlobeFn = (opts: {
  el: HTMLElement;
  THREE: ThreeNS;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  scaleMobile?: number;
  backgroundColor?: number;
  color?: number;
  color2?: number;
  size?: number;
}) => VantaInstance;

declare global {
  interface Window {
    THREE?: ThreeNS;
    VANTA?: { GLOBE?: VantaGlobeFn };
  }
}

export default function GlobeSection() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const vantaRef = useRef<VantaInstance | null>(null);

  const [color1, setColor1] = useState("#ff9800");
  const [color2, setColor2] = useState("#ff9800");
  const [size, setSize] = useState(50);

  useEffect(() => {
    if (!elRef.current) return;

    let cancelled = false;

    const waitForVanta = () =>
      new Promise<void>((resolve, reject) => {
        const started = Date.now();
        const tick = () => {
          const ok =
            typeof window !== "undefined" &&
            typeof window.THREE !== "undefined" &&
            !!window.VANTA &&
            !!window.VANTA.GLOBE;
          if (ok) return resolve();
          if (Date.now() - started > 8000)
            return reject(new Error("VANTA not loaded"));
          requestAnimationFrame(tick);
        };
        tick();
      });

    waitForVanta()
      .then(() => {
        const Globe = window.VANTA!.GLOBE!;
        const THREE = window.THREE!;

        // alte Instanz abbauen (falls vorhanden)
        vantaRef.current?.destroy?.();
        vantaRef.current = null;

        if (!cancelled && elRef.current) {
          vantaRef.current = Globe({
            el: elRef.current,
            THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1,
            scaleMobile: 1,
            backgroundColor: 0xffffff,
            color: parseInt(color1.replace("#", "0x")),
            color2: parseInt(color2.replace("#", "0x")),
            size: size / 50, // wie im Original
          });
        }
      })
      .catch((_e) => {
        // optional: Logging, aber kein any
        // console.warn("[VANTA] Init failed:", e);
      });

    return () => {
      cancelled = true;
      vantaRef.current?.destroy?.();
      vantaRef.current = null;
    };
    // Dependencies wie im Original: auf Änderungen re-init
  }, [color1, color2, size]);

  return (
    <section className="theme-light relative w-full h-[100vh] overflow-hidden">
      {/* Hintergrund */}
      <div ref={elRef} className="absolute inset-0" />

      {/* Inhalt */}
      <div className="relative z-10 wb-container py-20 md:py-28">
        <h3 className="leading-tight">
          <span className="block text-sm font-semibold tracking-wider">
            ://modernes/webdesign/
          </span>
          <span className="block text-xs text-black/70">
            [moˈdɛrnəs ˈvɛpdiˌzaɪ̯n]
          </span>
          <span className="mt-3 block font-light text-[clamp(1.4rem,4vw,2.5rem)] max-w-3xl">
            Animierte Flyer. Ständig in der Hosentasche. Videogame-like.
            Verkauft – selbst, während man schläft.
          </span>
        </h3>

        {/* Customizer */}
        <div className="mt-8 max-w-[280px] space-y-6 text-xs text-neutral-800">
          <div className="flex gap-4">
            <label className="flex-1 space-y-1">
              <span className="block">://primary-color/</span>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-full h-8 rounded-md border border-neutral-300"
              />
            </label>
            <label className="flex-1 space-y-1">
              <span className="block">://secondary-color/</span>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-full h-8 rounded-md border border-neutral-300"
              />
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>://size/</span>
              <span>{size}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full accent-[#ff9800]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
