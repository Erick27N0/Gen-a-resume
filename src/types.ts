export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
  avatarUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  city: string;
  year: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  languages: Language[];
}

export interface CVTheme {
  id: string;
  name: string;
  primaryColor: string;     /* Accent main color (e.g. for borders, job title, section titles) */
  primaryBg: string;        /* Light background for pills or icons */
  textAccent: string;       /* Color of headings */
}

export type CVFont = 'sans' | 'serif';
