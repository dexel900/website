"use client";
import Image from "next/image";
import styles from "./Card.module.css";

type Props = {
  title: string;
  text: string;
  img: string;
  side?: "right" | "left";
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
        styles.cardDark,
        styles.slice,
        side === "right" ? styles.sliceRight : styles.sliceLeft,
        className,
      ].join(" ")}
    >
      <div className="sliceText">
        <h3 className={styles.cardDarkTitle}>{title}</h3>
        <p className={styles.cardDarkCopy}>{text}</p>
      </div>

      <div className="sliceImg">
        <Image
          src={img}
          alt={title}
          width={520}
          height={360}
          className={side === "right" ? "rounded-tl-xl" : "rounded-tr-xl"}
        />
      </div>
    </div>
  );
}
