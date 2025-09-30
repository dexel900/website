"use client";

import { cn } from "@/lib/cn";
import styles from "./Card.module.css";
import type { PropsWithChildren, HTMLAttributes } from "react";

type Variant = "base" | "split" | "vertical" | "bg" | "mini";

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: "article" | "section" | "div";
  variant?: Variant;
}

export default function Card({
  as: Tag = "article",
  variant = "base",
  className,
  children,
  ...rest
}: PropsWithChildren<CardProps>) {
  return (
    <Tag className={cn(styles.card, styles[`v_${variant}`], className)} {...rest}>
      {children}
    </Tag>
  );
}

export function CardSection({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardSection, className)} {...rest} />;
}

export function CardImage({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardImage, className)} {...rest} />;
}
