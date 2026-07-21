"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

type FooterProps = {
  copyrightName?: string;
  email?: string;
  linkedin?: string;
  github?: string;
};

export function Footer({
  copyrightName = "Your Name",
  email,
  linkedin,
  github,
}: FooterProps) {
  const socials = [
    email ? { icon: <Mail className="h-4 w-4" />, href: `mailto:${email}`, label: "Email" } : null,
    linkedin
      ? {
          icon: <FaLinkedin className="h-4 w-4" />,
          href: linkedin.startsWith("http") ? linkedin : `https://${linkedin}`,
          label: "LinkedIn",
        }
      : null,
    github
      ? {
          icon: <FaGithub className="h-4 w-4" />,
          href: github.startsWith("http") ? github : `https://${github}`,
          label: "GitHub",
        }
      : null,
  ].filter(Boolean);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="border-t border-[var(--border)] py-8"
    >
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-[var(--text-muted)]">
          &copy; 2026 {copyrightName}. All rights reserved.
        </p>

        {socials.length > 0 && (
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a
                key={social!.label}
                href={social!.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, color: "#81A6C6" }}
                className="text-[var(--text-muted)] transition"
                aria-label={social!.label}
              >
                {social!.icon}
              </motion.a>
            ))}
          </div>
        )}

        <motion.a
          href="#"
          whileHover={{ y: -3 }}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] transition hover:text-[#81A6C6]"
        >
          <ArrowUp className="h-4 w-4" />
          Back to top
        </motion.a>
      </div>
    </motion.footer>
  );
}
