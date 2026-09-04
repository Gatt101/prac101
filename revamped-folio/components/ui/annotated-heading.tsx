"use client";

import React from "react";
import { cn } from "@/lib/utils";

type UnderlineVariant = "cyan-brush" | "emerald-wave" | "purple-wavy" | "rose-strike" | "yellow-marker";

interface AnnotatedWordProps {
  children: React.ReactNode;
  variant?: UnderlineVariant;
  badge?: string;
  badgeColor?: "green" | "cyan" | "purple" | "rose" | "amber";
  className?: string;
}

export function AnnotatedWord({
  children,
  variant = "cyan-brush",
  badge,
  badgeColor = "green",
  className,
}: AnnotatedWordProps) {
  const badgeColorClasses = {
    green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
    purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
    rose: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative inline-block whitespace-nowrap font-normal text-white">
        {children}
        {variant === "cyan-brush" && (
          <svg
            className="pointer-events-none absolute bottom-[-0.28em] left-[-2%] h-[0.45em] w-[104%] text-cyan-300"
            viewBox="0 0 140 10"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M3,6 C40,3 100,3 137,5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              filter="url(#hd-rough-soft)"
            />
          </svg>
        )}

        {variant === "emerald-wave" && (
          <svg
            className="pointer-events-none absolute bottom-[-0.45em] left-[-1%] h-[0.65em] w-[102%] text-emerald-400"
            viewBox="0 0 140 16"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M3,5 C40,2 100,2 137,4"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              filter="url(#hd-rough-soft)"
            />
            <path
              d="M5,12 C42,9 98,10 135,11"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
              filter="url(#hd-rough-soft)"
            />
          </svg>
        )}

        {variant === "purple-wavy" && (
          <svg
            className="pointer-events-none absolute bottom-[-0.35em] left-[-2%] h-[0.55em] w-[104%] text-purple-400"
            viewBox="0 0 140 14"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M2,6 Q5.5,3 9,6 T17,6 T25,6 T33,6 T41,6 T49,6 T57,6 T65,6 T73,6 T81,6 T89,6 T97,6 T105,6 T113,6 T121,6 T129,6 T137,6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              fill="none"
              filter="url(#hd-rough-soft)"
            />
          </svg>
        )}

        {variant === "rose-strike" && (
          <svg
            className="pointer-events-none absolute bottom-[-0.38em] left-[-1%] h-[0.6em] w-[104%] text-rose-400"
            viewBox="0 0 150 18"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M3,7 C45,3 105,4 140,8"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              filter="url(#hd-rough-soft)"
            />
          </svg>
        )}

        {variant === "yellow-marker" && (
          <svg
            className="pointer-events-none absolute inset-x-[-4%] bottom-[-0.08em] h-[1.15em] w-[108%] text-yellow-300/15 -z-10"
            viewBox="0 0 170 26"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M4,17 C2,11 5,7 12,6 C45,2 95,2 138,4 C152,5 164,7 166,13 C167,18 163,21 155,22 C112,24 60,24 16,22 C8,21.5 4,20 4,17 Z"
              fill="currentColor"
              filter="url(#hd-rough-soft)"
            />
          </svg>
        )}
      </span>

      {badge && (
        <span
          className={cn(
            "absolute -top-4 -right-2 rotate-6 rounded-full border px-1.5 pt-0.5 pb-0.5 font-sans text-[10px] leading-none font-medium tracking-tight uppercase shadow-xs select-none",
            badgeColorClasses[badgeColor],
          )}
        >
          {badge}
        </span>
      )}
    </span>
  );
}

interface SectionHeadingProps {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  titlePrefix?: string;
  highlightedWord?: string;
  titleSuffix?: string;
  description?: string;
  underlineVariant?: UnderlineVariant;
  highlightBadge?: string;
  highlightBadgeColor?: "green" | "cyan" | "purple" | "rose" | "amber";
  className?: string;
}

export function SectionHeading({
  badgeText,
  badgeIcon,
  titlePrefix,
  highlightedWord,
  titleSuffix,
  description,
  underlineVariant = "cyan-brush",
  highlightBadge,
  highlightBadgeColor = "green",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-8 max-w-2xl text-center sm:mb-10", className)}>
      {badgeText && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-white/80 shadow-xs backdrop-blur-sm">
          {badgeIcon}
          {badgeText}
        </div>
      )}

      <h2 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-[2.75rem] leading-[1.15]">
        {titlePrefix && `${titlePrefix} `}
        {highlightedWord && (
          <AnnotatedWord
            variant={underlineVariant}
            badge={highlightBadge}
            badgeColor={highlightBadgeColor}
          >
            {highlightedWord}
          </AnnotatedWord>
        )}
        {titleSuffix && ` ${titleSuffix}`}
      </h2>

      {description && (
        <p className="mt-3 text-sm leading-6 text-white/60 sm:text-base max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

