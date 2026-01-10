"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// Mobile Menu Item Component
export const MobileMenuItem = ({
  item,
  children,
  onClose,
}: {
  item: string;
  children?: React.ReactNode;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-2 text-white font-medium text-lg"
      >
        <span>{item}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/60"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-2 space-y-3" onClick={onClose}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile Menu Component
export const MobileMenu = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          {/* Slide-out Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <span className="text-white font-semibold text-lg">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Menu Content */}
            <div className="p-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Hamburger Button Component
export const HamburgerButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <div className="w-6 h-5 relative flex flex-col justify-between">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white rounded-full origin-left"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
          className="w-full h-0.5 bg-white rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
          className="w-full h-0.5 bg-white rounded-full origin-left"
        />
      </div>
    </button>
  );
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative hidden md:block">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:text-white/80 transition-colors duration-300 text-sm md:text-base font-medium px-2"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl flex justify-center md:space-x-4 px-4 md:px-8 py-3 md:py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
  techIcons,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  techIcons?: React.ReactNode[];
}) => {
  return (
    <a href={href} className="flex space-x-2 group">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl group-hover:scale-105 transition-transform duration-200 w-[100px] h-[50px] sm:w-[140px] sm:h-[70px] object-cover"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="text-base sm:text-xl font-bold mb-1 text-white group-hover:text-blue-300 transition-colors duration-200">
            {title}
          </h4>
          <p className="text-white/70 text-xs sm:text-sm max-w-[8rem] sm:max-w-[10rem] mb-2 line-clamp-2">
            {description}
          </p>
        </div>
        {techIcons && techIcons.length > 0 && (
          <div className="flex space-x-1 mt-auto">
            {techIcons.map((icon, index) => (
              <div key={index} className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                {icon}
              </div>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className="text-white/70 hover:text-white transition-colors duration-200 block py-1"
    >
      {children}
    </a>
  );
};
