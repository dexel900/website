"use client";
import Image from "next/image";

type Props = {
  title: string;
  text: string;
  img: string;             // Pfad oder URL
  side?: "right" | "left"; // Bildposition, default: right
  className?: string;
};

export default function ServiceCardSlice({
  title,
  text,
  img,
  side = "right",
  className = "",
}: Props) {
  return (
    <div
      className={[
        "card-dark card-dark--slice",
        side === "right" ? "slice-right" : "slice-left",
        className,
      ].join(" ")}
    >
      <div className="slice-text">
        <h3 className="card-dark-title mb-2">{title}</h3>
        <p className="card-dark-copy">{text}</p>
      </div>

      <div className="slice-img">
        <Image
          src={img}
          alt=""
          width={520}
          height={360}
          className={`${side === "right" ? "rounded-tl-xl" : "rounded-tr-xl"} w-full h-auto`}
        />
      </div>
    </div>
  );
}
