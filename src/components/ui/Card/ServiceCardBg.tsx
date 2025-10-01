"use client";

import styles from "./Card.module.css";

type BgProps = {
  title: string;
  text: string;
  bg: string;
  className?: string;
};

export default function ServiceCardBg({ title, text, bg, className = "" }: BgProps) {
  return (
    <div
      className={`${styles.cardDark} ${className}`}
      style={{ backgroundImage: `url('${bg}')`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <h3 className={styles.cardDarkTitle}>{title}</h3>
      <p className={styles.cardDarkCopy}>{text}</p>
    </div>
  );
}
