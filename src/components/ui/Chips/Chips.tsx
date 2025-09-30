import styles from "./Chips.module.css";

export default function Chips({ items }: { items: string[] }) {
  return (
    <div className={styles.chips}>
      {items.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}
