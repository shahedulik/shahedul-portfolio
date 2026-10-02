export interface Kpi {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend: string;
  context: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface VentureItem {
  name: string;
  role: string;
  mission: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  notes: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
}

export interface CompetencyItem {
  title: string;
  detail: string;
}

export interface ArchLayer {
  name: string;
  purpose: string;
  technologies: string[];
}

export interface StackRow {
  layer: string;
  choice: string;
  why: string;
}