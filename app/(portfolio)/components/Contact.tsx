"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { sectionReveal } from "../lib/animations";

const contacts = [
  {
    icon: <Mail className="mb-3 h-5 w-5 text-[#81A6C6]" />,
    label: "Email",
    value: "your@email.com",
    href: "mailto:your@email.com",
  },
  {
    icon: <FaLinkedin className="mb-3 h-5 w-5 text-[#81A6C6]" />,
    label: "LinkedIn",
    value: "linkedin.com/in/yourname",
    href: "https://linkedin.com/in/yourname",
  },
  {
    icon: <FaGithub className="mb-3 h-5 w-5 text-[#81A6C6]" />,
    label: "GitHub",
    value: "github.com/yourname",
    href: "https://github.com/yourname",
  },
  {
    icon: <MapPin className="mb-3 h-5 w-5 text-[#81A6C6]" />,
    label: "Base",
    value: "Indonesia · Remote Friendly",
    href: "",
  },
];

export function Contact() {
  return (
    <section id="contact" className="border-t border-[#D2C4B4] py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#81A6C6]">
            Contact
          </p>
        </motion.div>

        <motion.div
          variants={sectionReveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h2 className="font-serif text-3xl tracking-tight text-[#3E342C] md:text-5xl">
              Let&apos;s build something with substance and style.
            </h2>
            <p className="mt-4 max-w-2xl text-[#6E6257]">
              Whether it&apos;s a personal portfolio, a product site, or a
              polished digital presence for your brand, I&apos;m open to
              creating work that feels thoughtful and lasting.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {contacts.map((contact, index) =>
              contact.href ? (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  target={
                    contact.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    contact.href.startsWith("http")
                      ? "noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[24px] border border-[#D2C4B4] bg-[#F8F1E8] p-5 transition hover:bg-[#EFE4D7]"
                >
                  {contact.icon}
                  <p className="text-sm text-[#8A7C70]">{contact.label}</p>
                  <p className="mt-1 text-lg text-[#3E342C]">
                    {contact.value}
                  </p>
                </motion.a>
              ) : (
                <motion.div
                  key={contact.label}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-[24px] border border-[#D2C4B4] bg-[#F8F1E8] p-5"
                >
                  {contact.icon}
                  <p className="text-sm text-[#8A7C70]">{contact.label}</p>
                  <p className="mt-1 text-lg text-[#3E342C]">
                    {contact.value}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
