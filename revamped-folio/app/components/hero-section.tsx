"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Card, CardContent } from "@/components/ui/card";
import { SparklesCore } from "@/components/ui/sparkles";

export default function HeroSection() {
  const words = `Hi, I’m Gaurav`;
  const headline = `Full-Stack Developer | AI Enthusiast`;

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Sparkles Background Effect */}
      <div className="absolute inset-0 w-full h-full">
        <SparklesCore
          id="hero-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <motion.div
          className="flex-1 text-center md:text-left mb-8 md:mb-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-4 text-gray-200">{words}</h1>
          <motion.div
            className="text-lg sm:text-xl text-gray-300 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TextGenerateEffect words={headline} className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4" />
          </motion.div>
          <motion.p
            className="text-md sm:text-lg text-gray-400 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Turning complex ideas into smooth, scalable experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6"
          >
            <Button
              className="relative bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300"
            >
              <span className="relative z-10">Get in Touch</span>
            </Button>
            <button type="button"
            className="ml-4 relative bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300">
                <span className="relative z-10">Download CV</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden rounded-2xl border-none shadow-2xl">
            <CardContent className="p-0">
              <div className="relative w-32 h-48 sm:w-40 sm:h-60">
                <img
                  src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                  alt="Gaurav's profile"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}