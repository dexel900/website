"use client";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "@/components/ui/Card/Card.module.css";


/* ========= CTA im Primary-Stil (genau euer Button) ========= */
type ContactBtnProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};
function ContactBtn({
  children,
  onClick,
  href,
  disabled,
  className = "",
  ariaLabel,
}: ContactBtnProps) {
  const commonClass =
    `contact-btn ${disabled ? "opacity-50 pointer-events-none" : ""} ${className || ""}`;

  if (href) {
    return (
      <a href={href} className={commonClass} aria-label={ariaLabel}>
        <span className="cta-label">{children}</span>
        <span className="cta-circle" aria-hidden="true" />
        <span className="cta-arrow" aria-hidden="true">»</span>
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={commonClass}
      aria-label={ariaLabel}
    >
      <span className="cta-label">{children}</span>
      <span className="cta-circle" aria-hidden="true" />
      <span className="cta-arrow" aria-hidden="true">»</span>
    </button>
  );
}

/* ========= Types ========= */
type LeadPayload = {
  needs: string[];
  email: string;
  name: string;
  consent: boolean;
  newsletter: boolean;
  hp?: string;
  utm?: Record<string, string>;
  referrer?: string;
  timeToComplete?: number;
  submittedAt?: string;
};

type Props = {
  onSubmit?: (payload: LeadPayload) => Promise<{ ok: boolean; lead_id?: string }>;
};

/* ========= Options ========= */
const primaryOptions = [
  "Moderne Website",
  "Google Rankings",
  "Suchmaschinenwerbung (SEA)",
  "E-Mail Marketing",
  "E-Commerce",
];

const moreOptions = [
  "Content Marketing (SEO)",
  "Webvisitenkarte",
  "UI/UX-Design",
  "App-Entwicklung",
  "Google MyBusiness",
  "Eigene Domain",
];

/* ========= Component ========= */
export default function WbiLeadForm({ onSubmit }: Props) {
  const startTs = useMemo(() => Date.now(), []);
  const [step, setStep] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [needs, setNeeds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [hp, setHp] = useState("");
  const [appendMsg, setAppendMsg] = useState("");
  const [_leadId, setLeadId] = useState<string | null>(null);
  // einmalig beim Mount
useEffect(() => {
  setLeadId(prev => prev ?? `lead-${Date.now()}`);
}, []);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // --- Autoscroll-Fix: initialen Lauf & Step 0 überspringen
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return; // skip first render
    }
    if (step === 0) return; // nicht nach oben scrollen, wenn auf Step 0
    if (!wrapRef.current) return;

    const top =
      wrapRef.current.getBoundingClientRect().top +
      (window.scrollY || window.pageYOffset);
    window.scrollTo({ top: Math.max(top - 80, 0), behavior: "smooth" });
  }, [step]);

  // --- UTM
  const utm = useMemo(() => {
    const o: Record<string, string> = {};
    const usp =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();
    for (const [k, v] of usp.entries()) o[k] = v;
    return o;
  }, []);

  // --- Helpers
  const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const canNext1 = needs.length > 0;
  const canNext2 = name.trim().length > 1;
  const canSubmit = emailValid(email) && consent && !hp;

  function go(i: number) {
    const target = Math.max(0, Math.min(3, i));
    setStep(target);
    setMaxReached((m) => Math.max(m, target));
  }

  async function submit() {
    if (!canSubmit) return;
    const payload: LeadPayload = {
      needs,
      email: email.trim(),
      name: name.trim(),
      consent,
      newsletter,
      hp: hp || "",
      utm,
      referrer: typeof document !== "undefined" ? document.referrer || "" : "",
      timeToComplete: Math.round((Date.now() - startTs) / 1000),
      submittedAt: new Date().toISOString(),
    };

    let res: { ok: boolean; lead_id?: string } = { ok: true };
    if (onSubmit) res = await onSubmit(payload);
    setLeadId(res.lead_id || null);
    go(3);
  }

  const pct = (Math.min(step, 3) / 3) * 100;

  return (
    <div ref={wrapRef} className={`${styles.cardDark} p-7 md:p-9 max-w-[980px] mx-auto`}>
      {/* Stepper */}
      <div className="flex items-center gap-2 mb-3">
        <div className="ml-auto flex gap-2" role="tablist" aria-label="Schritte">
          {Array.from({ length: 4 }).map((_, i) => {
            const disabled = i > Math.min(maxReached + 1, 3);
            const current = i === Math.min(step, 3);
            return (
              <button
                key={i}
                onClick={() => !disabled && go(i)}
                aria-current={current ? "step" : undefined}
                aria-disabled={disabled}
                className={[
                  "grid place-items-center min-w-8 h-8 rounded-full border font-black text-sm transition-all",
                  current
                    ? "bg-[#ff9800] border-[#ff9800] text-black -translate-y-[1px]"
                    : "border-[#2a2a2a] text-[#a2a2a2]",
                  disabled ? "opacity-40 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div
        className="h-1 rounded-full bg-[#161616] overflow-hidden mb-4"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={Math.min(step, 3)}
      >
        <i
          className="block h-full bg-gradient-to-r from-[#ff9800] to-[#ffb85c]"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* STEP 1 */}
      {step === 0 && (
        <section>
          <p className="text-white/95 font-light">
            Guten {new Date().getHours() < 12 ? "Morgen" : new Date().getHours() < 18 ? "Tag" : "Abend"}!
          </p>
          <h3 className="text-white font-light text-[clamp(20px,4.2vw,30px)] mt-2">
            Womit können wir helfen?
          </h3>
          <p className="text-white/70 text-[clamp(14px,3.2vw,16px)] mb-3">
            Mehrfachauswahl möglich.
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {primaryOptions.map((t) => {
              const active = needs.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    setNeeds((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))
                  }
                  aria-pressed={active}
                  className={[
                    "px-4 py-2 rounded-full font-extrabold border-2 transition-transform",
                    active
                      ? "bg-[#ff9800] text-black border-[#ff9800]"
                      : "text-white border-[#ff9800]",
                    "hover:-translate-y-[2px]",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
            <details className="ml-1">
              <summary className="px-4 py-2 rounded-full font-extrabold border-2 border-dashed border-[#ff9800] cursor-pointer list-none">
                Mehr anzeigen
              </summary>
              <div className="mt-2 flex flex-wrap gap-2">
                {moreOptions.map((t) => {
                  const active = needs.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() =>
                        setNeeds((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))
                      }
                      aria-pressed={active}
                      className={[
                        "px-4 py-2 rounded-full font-extrabold border-2 transition-transform",
                        active
                          ? "bg-[#ffb85c] text-black border-[#ffb85c]"
                          : "text-white border-[#ffb85c]",
                        "hover:-translate-y-[2px]",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </details>
          </div>

          <div className="flex justify-end mt-6">
            <ContactBtn onClick={() => go(1)} disabled={!canNext1} ariaLabel="Nächster Schritt">
              ://Nächster/Schritt/
            </ContactBtn>
          </div>
        </section>
      )}

      {/* STEP 2 */}
      {step === 1 && (
        <section>
          <h3 className="text-white font-light text-[clamp(20px,4.2vw,30px)]">
            Wie dürfen wir Sie ansprechen?
          </h3>
          <div className="grid gap-3 mt-2">
            <input
              type="text"
              placeholder="Tragen Sie hier Ihren Namen ein..."
              className="w-full bg-[#0e0e0e] border border-[#1c1c1c] text-white rounded-[14px] px-3 py-3 text-base outline-none focus:ring-2 focus:ring-[#ff8a00]/30 focus:border-[#333]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div className="flex justify-end gap-2 mt-8">
            {/* Back als simpler Outline-Button (kannst du gern auf ContactBtn umbauen, wenn es auch Primary-Style sein soll) */}
            <button
              type="button"
              onClick={() => go(0)}
              className="inline-grid grid-flow-col gap-2 place-items-center h-[46px] px-5 rounded-full font-black border-2 border-[#ff9800] text-[#ff9800] bg-transparent"
            >
              Zurück
            </button>

            <ContactBtn onClick={() => go(2)} disabled={!canNext2} ariaLabel="Nächster Schritt">
              ://Nächster/Schritt/
            </ContactBtn>
          </div>
        </section>
      )}

      {/* STEP 3 */}
      {step === 2 && (
        <section>
          <h3 className="text-white font-light text-[clamp(20px,4.2vw,30px)]">
            Ihre E-Mail Adresse, bitte.
          </h3>
          <p className="text-white/70 text-[clamp(14px,3.2vw,16px)] mb-2">
            Wir senden Ihnen Terminvorschläge für ein erstes Gespräch zu.
          </p>
          <div className="grid gap-3">
            <div>
              <input
                type="email"
                inputMode="email"
                placeholder="Tragen Sie hier Ihre E-Mail ein..."
                className="w-full bg-[#0e0e0e] border border-[#1c1c1c] text-white rounded-[14px] px-3 py-3 text-base outline-none focus:ring-2 focus:ring-[#ff8a00]/30 focus:border-[#333]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              {email.length > 0 && !emailValid(email) && (
                <div className="text-[#ff9b9b] font-bold mt-1 text-sm">
                  Bitte geben Sie eine gültige E-Mail ein.
                </div>
              )}
            </div>
          </div>

          <label className="flex gap-2 mt-3 text-white/90">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <small className="text-white/60">
              Ich willige in die Verarbeitung meiner Angaben gemäß Datenschutzhinweis ein.
            </small>
          </label>
          <label className="flex gap-2 mt-2 text-white/90">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
            />
            <small className="text-white/60">
              Ich möchte den ://web/bin/ich-Newsletter erhalten.
            </small>
          </label>

          <div className="sr-only">
            <label htmlFor="lf-hp">Feld bitte frei lassen</label>
            <input
              id="lf-hp"
              type="text"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex justify-end gap-2 mt-8">
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-grid grid-flow-col gap-2 place-items-center h-[46px] px-5 rounded-full font-black border-2 border-[#ff9800] text-[#ff9800] bg-transparent"
            >
              Zurück
            </button>

            <ContactBtn onClick={submit} disabled={!canSubmit} ariaLabel="Absenden">
              ://ABSENDEN/
            </ContactBtn>
          </div>
        </section>
      )}

      {/* STEP 4 */}
      {step === 3 && (
        <section aria-live="polite">
          <h3 className="text-white font-light text-[clamp(20px,4.2vw,30px)]">
            Danke! Wir melden uns zeitnah.
          </h3>
          <p className="text-center text-white/90 leading-relaxed mt-2">
            Ihre Anfrage ist bei uns eingegangen.{" "}
            <strong>Innerhalb der nächsten 24 Stunden</strong> melden wir uns
            mit einem Terminvorschlag für ein kostenloses Beratungsgespräch.
          </p>

          <div className="grid gap-2 mt-4">
            <label className="font-extrabold">Haben Sie noch etwas auf dem Herzen?</label>
            <textarea
              rows={3}
              value={appendMsg}
              onChange={(e) => setAppendMsg(e.target.value)}
              placeholder="Wir schicken's gleich hinterher..."
              className="w-full bg-[#0e0e0e] border border-[#1c1c1c] text-white rounded-[14px] px-3 py-3 text-base outline-none focus:ring-2 focus:ring-[#ff8a00]/30 focus:border-[#333]"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => {
                // Optional: Nachtrag ans Backend senden (leadId verfügbar)
                setAppendMsg("");
              }}
              disabled={appendMsg.trim().length < 3}
              className="inline-grid grid-flow-col gap-2 place-items-center h-[46px] px-5 rounded-full font-black border-2 border-[#ff9800] bg-[#ff9800] text-black disabled:opacity-50"
              aria-label="Nachtrag absenden"
            >
              Absenden
            </button>

            {/* Link-CTA im exakt gleichen Style */}
            <ContactBtn href="/" ariaLabel="Zur Startseite">
              ://ZUR/STARTSEITE/
            </ContactBtn>
          </div>
        </section>
      )}
    </div>
  );
}
