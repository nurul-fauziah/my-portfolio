export type NavLink = {
  label: string;
  href: string;
};

export type SiteSettingsData = {
  siteName: string;
  navLinks: NavLink[];
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  profileBadge: string;
  availabilityBadge: string;
  location: string;
  focusAreas: string[];
  aboutQuote: string;
  aboutParagraphs: string[];
  contactHeading: string;
  contactDescription: string;
  email: string;
  linkedin: string;
  github: string;
  contactLocation: string;
  copyrightName: string;
  worksHeading: string;
};

export type ExperienceData = {
  period: string;
  role: string;
  company: string;
  description: string;
};

export type ProjectData = {
  title: string;
  slug: string;
  tag: string;
  description: string;
  tech: string[];
  image?: string;
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  content?: unknown;
  gallery?: Array<{ image: string; caption?: string }>;
};
