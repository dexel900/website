// components/ui/ReviewCard.tsx
"use client";
import { Quote } from "lucide-react";

type Review = {
  id: string;
  name: string;
  role: string;
  company?: string;
  text: string;
};

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="mx-auto max-w-[52rem] text-center px-3 sm:px-0">
      <div className="flex justify-center mb-4 sm:mb-6">
        <Quote className="w-6 h-6 sm:w-8 sm:h-8 opacity-80" aria-hidden />
      </div>

      <figcaption className="mb-1 sm:mb-2 font-semibold tracking-wide text-base sm:text-lg">
        {review.name}
      </figcaption>
      <p className="text-xs sm:text-sm uppercase tracking-[0.14em] sm:tracking-[0.16em] opacity-70">
        {review.role}
        {review.company ? ` • ${review.company}` : ""}
      </p>

      <blockquote className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed opacity-90">
        {review.text}
      </blockquote>
    </figure>
  );
}
