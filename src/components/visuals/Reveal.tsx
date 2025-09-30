"use client";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number; // in Sekunden
};

export default function Reveal({ children, delay = 0 }: Props) {
  // vorerst nur Prop akzeptieren; Animationslogik bauen wir später
  return <div style={{ animationDelay: `${delay}s` }}>{children}</div>;
}
