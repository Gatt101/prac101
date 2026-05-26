"use client"
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch {
      setStatus("An error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-black py-10 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-purple-200">
            <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
            Let&apos;s collaborate
          </div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Contact
          </h2>
          <p className="mx-auto max-w-2xl px-2 text-sm leading-6 text-white/62 sm:text-base">
            Send a quick note for product builds, AI ideas, internships, freelance work, or collaboration.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20 backdrop-blur sm:p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300/80">Quick Links</p>
            <div className="mt-5 space-y-3">
              <a href="mailto:gauravpatilk11@gmail.com" className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white/76 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
                <Mail className="h-4 w-4 text-blue-300" aria-hidden="true" />
                gauravpatilk11@gmail.com
              </a>
              <div className="flex min-h-11 items-center gap-3 rounded-xl border border-white/10 bg-black/25 px-3 text-sm text-white/76">
                <MapPin className="h-4 w-4 text-purple-300" aria-hidden="true" />
                India, remote-friendly
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              {[
                { href: "https://x.com/Gaurav72256287", label: "X", icon: FaXTwitter },
                { href: "https://www.linkedin.com/in/gaurav-patil-2724a8264", label: "LinkedIn", icon: FaLinkedin },
                { href: "https://github.com/gatt101", label: "GitHub", icon: FaGithub },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/65 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.12] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.aside>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 shadow-xl shadow-black/20 backdrop-blur sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-white/90 text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="min-h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/40 focus:border-blue-300/60 focus:bg-black/45 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Your name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-white/90 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="min-h-11 w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/40 focus:border-blue-300/60 focus:bg-black/45 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-white/90 text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-base text-white transition-all duration-200 placeholder:text-white/40 focus:border-blue-300/60 focus:bg-black/45 focus:outline-none focus:ring-2 focus:ring-blue-400/20"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white px-6 py-3.5 font-semibold text-black shadow-lg shadow-white/10 transition-all duration-200 hover:bg-white/90 hover:shadow-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={status === "Sending..."}
                suppressHydrationWarning
              >
                {status !== "Sending..." && <Send className="h-4 w-4" aria-hidden="true" />}
                {status || "Send Message"}
              </button>
            </form>
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
