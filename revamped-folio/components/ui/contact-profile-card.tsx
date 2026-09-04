"use client";

import { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export type ContactField = Readonly<{
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
  icon?: React.ReactNode;
}>;

export type ContactProfileCardProps = Readonly<
  {
    name?: string;
    title?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    websiteHref?: string;
    catalogRef?: string;
    variant?: "dark" | "placard";
    customFields?: ContactField[];
    showSocials?: boolean;
  } & ComponentPropsWithoutRef<"article">
>;

function ContactFieldRow({
  label,
  value,
  href,
  copyable,
  variant = "dark",
}: ContactField & { variant?: "dark" | "placard" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDark = variant === "dark";

  const valueClassName = cn(
    "text-right text-xs sm:text-sm transition-colors",
    isDark
      ? "text-neutral-300 group-hover:text-white"
      : "text-neutral-800 group-hover:text-neutral-950",
  );

  return (
    <div className="group grid grid-cols-[5.5rem_1fr] items-baseline gap-3 py-1.5 border-b border-white/[0.04] last:border-b-0">
      <span
        className={cn(
          "font-mono text-[9px] sm:text-[10px] tracking-[0.18em] uppercase select-none",
          isDark ? "text-neutral-400" : "text-neutral-400",
        )}
      >
        {label}
      </span>
      <div className="flex items-center justify-end gap-1.5">
        {href && href !== "#" ? (
          <Link
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={cn(
              valueClassName,
              "hover:underline inline-flex items-center gap-1",
            )}
          >
            <span className="truncate max-w-[180px] sm:max-w-[240px]">
              {value}
            </span>
            {href.startsWith("http") && (
              <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
            )}
          </Link>
        ) : (
          <span className={cn(valueClassName, "truncate max-w-[220px]")}>
            {value}
          </span>
        )}
        {copyable && (
          <button
            type="button"
            onClick={handleCopy}
            title={`Copy ${label}`}
            className={cn(
              "cursor-pointer rounded p-1 transition-colors",
              isDark
                ? "text-neutral-500 hover:text-white hover:bg-white/10"
                : "text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100",
            )}
            aria-label={`Copy ${label}`}
          >
            {copied ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

// Contact profile — Museum placard directory entry from Opensource UI (https://opensourceui.in/components/contact-profile)
export const ContactProfileCard = forwardRef<HTMLElement, ContactProfileCardProps>(
  (
    {
      className,
      name = "Gaurav Patil",
      title = "Agentic AI Engineer",
      email = "gauravpatilk11@gmail.com",
      phone,
      location = "India · Remote-friendly",
      website = "github.com/gatt101",
      websiteHref = "https://github.com/gatt101",
      catalogRef = "DIR · CONTACT",
      variant = "dark",
      customFields,
      showSocials = true,
      ...props
    },
    ref,
  ) => {
    const isDark = variant === "dark";

    const fields: ContactField[] = customFields || [
      ...(email
        ? [
            {
              label: "Email",
              value: email,
              href: `mailto:${email}`,
              copyable: true,
            },
          ]
        : []),
      ...(location
        ? [
            {
              label: "Location",
              value: location,
            },
          ]
        : []),
      ...(website
        ? [
            {
              label: "Portfolio",
              value: website,
              href: websiteHref || `https://${website}`,
            },
          ]
        : []),
      ...(phone
        ? [
            {
              label: "Phone",
              value: phone,
              href: `tel:${phone.replace(/\s/g, "")}`,
            },
          ]
        : []),
      {
        label: "Status",
        value: "Available for roles & builds",
      },
    ];

    return (
      <article
        ref={ref}
        data-slot="contact-profile-card"
        className={cn(
          "w-full max-w-md rounded-2xl p-6 font-sans transition-all duration-300",
          isDark
            ? "border border-white/10 bg-neutral-950/80 text-white shadow-2xl shadow-black/40 backdrop-blur-xl hover:border-white/20"
            : "border border-neutral-200 bg-[#faf8f5] text-neutral-900 shadow-lg shadow-black/5",
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between border-b pb-3.5 mb-4 border-white/10">
          <p
            className={cn(
              "font-mono text-[9px] tracking-[0.22em] uppercase",
              isDark ? "text-neutral-400" : "text-neutral-400",
            )}
          >
            {catalogRef}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[9px] tracking-wider text-emerald-400 uppercase">
              Online
            </span>
          </div>
        </div>

        <h3
          className={cn(
            "font-serif text-2xl font-medium tracking-tight sm:text-3xl",
            isDark ? "text-white" : "text-neutral-900",
          )}
        >
          {name}
        </h3>
        <p
          className={cn(
            "mt-1 text-xs sm:text-sm font-light",
            isDark ? "text-neutral-400" : "text-neutral-500",
          )}
        >
          {title}
        </p>

        <div
          className={cn(
            "mt-5 space-y-0.5 border-t pt-3.5",
            isDark ? "border-white/10" : "border-neutral-200",
          )}
        >
          {fields.map((field) => (
            <ContactFieldRow
              key={field.label}
              {...field}
              variant={variant}
            />
          ))}
        </div>

        {showSocials && (
          <div
            className={cn(
              "mt-6 pt-4 border-t flex items-center justify-between",
              isDark ? "border-white/10" : "border-neutral-200",
            )}
          >
            <span
              className={cn(
                "font-mono text-[9px] tracking-[0.18em] uppercase",
                isDark ? "text-neutral-400" : "text-neutral-400",
              )}
            >
              Connect
            </span>
            <div className="flex items-center gap-2.5">
              {[
                {
                  href: "https://github.com/gatt101",
                  label: "GitHub",
                  icon: FaGithub,
                },
                {
                  href: "https://www.linkedin.com/in/gaurav-patil-2724a8264",
                  label: "LinkedIn",
                  icon: FaLinkedin,
                },
                {
                  href: "https://x.com/Gaurav72256287",
                  label: "X",
                  icon: FaXTwitter,
                },
              ].map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200",
                    isDark
                      ? "border-white/10 bg-white/[0.04] text-neutral-400 hover:border-white/25 hover:bg-white/[0.1] hover:text-white"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 shadow-xs",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    );
  },
);

ContactProfileCard.displayName = "ContactProfileCard";
