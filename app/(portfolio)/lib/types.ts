export type NavLink = {
  label: string;
  href: string;
};

export type ResumeOption = {
  label: string;
  href: string;
};

export type ThemeColors = {
  accent: string;
  accentLight: string;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  border: string;
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
  cursorRevealImage?: string;
  resumeOptions?: ResumeOption[];
  theme: {
    light: ThemeColors;
    dark: ThemeColors;
  };
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
