"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
  title?: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const Timeline = ({
  data,
  title,
  description,
  badge,
  className,
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(ref.current);

    window.addEventListener("resize", updateHeight);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn("w-full bg-black font-sans relative overflow-hidden", className)}
      ref={containerRef}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-blue-900/10 rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-purple-900/10 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="max-w-5xl mx-auto pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-center">
        {badge && <div className="mb-3 flex justify-center">{badge}</div>}
        {title ? (
          typeof title === "string" ? (
            <h2 className="text-2xl sm:text-4xl lg:text-5xl mb-4 font-bold text-white tracking-tight">
              {title}
            </h2>
          ) : (
            title
          )
        ) : (
          <h2 className="text-2xl sm:text-4xl lg:text-5xl mb-4 font-bold text-white tracking-tight">
            Changelog from my journey
          </h2>
        )}
        {description ? (
          typeof description === "string" ? (
            <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
          ) : (
            description
          )
        ) : null}
      </div>

      {/* Timeline entries and tracking beam */}
      <div ref={ref} className="relative max-w-5xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-28 md:gap-8 lg:gap-12"
          >
            {/* Sticky Year/Marker */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 sm:top-36 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black/95 border border-white/20 flex items-center justify-center shadow-xl backdrop-blur-md">
                <div className="h-3.5 w-3.5 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(6,182,212,0.7)]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl lg:text-4xl font-bold tracking-tight text-white/40 hover:text-white/80 transition-colors duration-200">
                {item.title}
              </h3>
            </div>

            {/* Content block */}
            <div className="relative pl-16 sm:pl-20 pr-4 sm:pr-6 md:pl-4 md:pr-0 w-full">
              <h3 className="md:hidden block text-xl sm:text-2xl mb-4 text-left font-bold text-white/85">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical beam line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-8 -translate-x-1/2 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/15 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-cyan-400 via-blue-500 to-purple-500 from-[0%] via-[50%] rounded-full shadow-[0_0_14px_rgba(59,130,246,0.9)]"
          />
        </div>
      </div>
    </div>
  );
};
