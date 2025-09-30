"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card/Card";
import s from "./ButtonDesigner.module.css";

export default function ButtonDesigner() {
  const [text, setText] = useState("Zur neuen Website");
  const [font, setFont] = useState('"Outfit",sans-serif');
  const [radius, setRadius] = useState(50);
  const [bg, setBg] = useState("#ff9800");

  const label = useMemo(() => {
    const clean = text.trim().replace(/\s+/g, "/").replace(/\/+/g, "/");
    return clean.startsWith("://") ? clean : `://${clean || "Zur/neuen/Website"}`;
  }, [text]);

  return (
    <Card variant="base" className={`${s.wrap} ButtonDesignerCard`} aria-label="Button-Designer">
      <div className={s.header}>://BUTTON/DESIGNER/</div>

      <div className={s.panel}>
        <div className={s.grid}>
          <div>
            <label htmlFor="bd-text">Buttontext</label>
            <input
              id="bd-text"
              type="text"
              maxLength={17}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={s.inputText}
            />
          </div>
          <div>
            <label htmlFor="bd-font">Schriftart</label>
            <select
              id="bd-font"
              value={font}
              onChange={(e) => setFont(e.target.value)}
              className={s.select}
            >
              <option value={'"Outfit",sans-serif'}>Outfit</option>
              <option value={'"Arial",sans-serif'}>Arial</option>
            </select>
          </div>
          <div>
            <label htmlFor="bd-range">Border-Radius: <span>{radius}px</span></label>
            <input
              id="bd-range"
              type="range"
              min={0}
              max={100}
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value, 10))}
              className={s.range}
            />
          </div>
          <div>
            <label htmlFor="bd-color">Hintergrundfarbe</label>
            <input
              id="bd-color"
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className={s.color}
            />
          </div>
        </div>
      </div>

      <a
        href="#contact"
        className={s.previewBtn}
        style={
          {
            ["--btn-br" as any]: `${radius}px`,
            ["--btn-bg" as any]: bg,
            ["--btn-ff" as any]: font,
          } as React.CSSProperties
        }
      >
        <span className={s.previewLabel}>{label}</span>
        <span className={s.previewIcon} aria-hidden="true" />
      </a>
    </Card>
  );
}
