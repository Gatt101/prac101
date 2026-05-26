"use client";

import React, { useState, useEffect, useId } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Fixed width for the animated word slot. Prevents surrounding layout shift. */
  fixedWidth?: number | string;
  /** Responsive fixed width classes for the animated word slot. */
  fixedWidthClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  fixedWidth,
  fixedWidthClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLDivElement>(null);

  const updateWidthForWord = React.useCallback(() => {
    if (fixedWidth || fixedWidthClassName || !textRef.current) {
      return;
    }

    if (textRef.current) {
      // Add some padding to the text width (30px on each side)
      const textWidth = textRef.current.scrollWidth + 2;
      setWidth(textWidth);
    }
  }, [fixedWidth, fixedWidthClassName]);

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex, updateWidthForWord]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.span
      layout
      layoutId={`words-here-${id}`}
      animate={fixedWidth || fixedWidthClassName ? undefined : { width }}
      style={fixedWidth ? { width: fixedWidth } : undefined}
      transition={{ duration: animationDuration / 2000 }}
      className={cn(
        "relative inline-block rounded-lg pt-1 pb-2 text-center text-2xl font-bold dark:text-white sm:text-4xl md:text-7xl",
        fixedWidthClassName,
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.span>
  );
}
