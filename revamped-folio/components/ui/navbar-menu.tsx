"use client";
import React from "react";
import { motion } from "motion/react";



const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
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
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white hover:text-white/80 transition-colors duration-300 text-sm sm:text-base font-medium"
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
                layoutId="active" // layoutId ensures smooth animation
                className="bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
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
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-white/10 bg-black/20 backdrop-blur-md shadow-2xl flex justify-center space-x-2 sm:space-x-4 px-4 sm:px-8 py-4 sm:py-6"
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
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl group-hover:scale-105 transition-transform duration-200"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold mb-1 text-white group-hover:text-blue-300 transition-colors duration-200">
            {title}
          </h4>
          <p className="text-white/70 text-sm max-w-[10rem] mb-2">
            {description}
          </p>
        </div>
        {techIcons && techIcons.length > 0 && (
          <div className="flex space-x-1 mt-auto">
            {techIcons.map((icon, index) => (
              <div key={index} className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                {icon}
              </div>
            ))}
          </div>
        )}
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-white/70 hover:text-white transition-colors duration-200"
    >
      {children}
    </a>
  );
};
