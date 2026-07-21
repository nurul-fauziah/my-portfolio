"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { sectionReveal } from "../lib/animations";

type ContactProps = {
  heading?: string;
  description?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  location?: string;
};

export function Contact({
  heading = "Let's build something with substance and style.",
  description = "Whether it's a personal portfolio, a product site, or a polished digital presence for your brand, I'm open to creating work that feels thoughtful and lasting.",
  email = "your@email.com",
  linkedin = "linkedin.com/in/yourname",
  github = "github.com/yourname",
  location = "Indonesia · Remote Friendly",
}: ContactProps) {
  const contacts = [
    {
      icon: <Mail className="mb-3 h-5 w-5 text-[#81A6C6]" />,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: <FaLinkedin className="mb-3 h-5 w-5 text-[#81A6C6]" />,
      label: "LinkedIn",
      value: linkedin,
      href: linkedin.startsWith("http") ? linkedin : `https://${linkedin}`,
    },
    {
      icon: <FaGithub className="mb-3 h-5 w-5 text-[#81A6C6]" />,
      label: "GitHub",
      value: github,
      href: github.startsWith("http") ? github : `https://${github}`,
    },
    {
      icon: <MapPin className="mb-3 h-5 w-5 text-[#81A6C6]" />,
      label: "Base",
      value: location,
      href: "",
    },
  ];

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
              {heading}
            </h2>
            <p className="mt-4 max-w-2xl text-[#6E6257]">{description}</p>
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
                    contact.href.startsWith("http") ? "noreferrer" : undefined
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
