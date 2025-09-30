"use client";

type BgProps = {
  title: string;
  text: string;
  bg: string;       // Pfad oder URL
  className?: string;
};

export default function ServiceCardBg({ title, text, bg, className = "" }: BgProps) {
  return (
    <div
      className={`card-dark card-dark--bg ${className}`}
      style={{ backgroundImage: `url('${bg}')` }}
    >
      <div>
        <h3 className="card-dark-title mb-1">{title}</h3>
        <p className="card-dark-copy max-w-[60ch]">{text}</p>
      </div>
    </div>
  );
}
