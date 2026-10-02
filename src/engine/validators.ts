import {
  ATTAINMENT, AWARDS, CERTIFICATIONS, COMPETENCIES, EDUCATION,
  EXPERIENCE, KPIS, MEMBERSHIPS, PIPELINE_INDEX, PROFILE, VENTURES,
} from '../data/portfolioData';

export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ValidationResult {
  ok: boolean;
  issues: ValidationIssue[];
}

const isNonEmpty = (v: string): boolean => v.trim().length > 0;

/** Fail-safe boot check: never crashes prod, reports every defect in dev. */
export function validatePortfolio(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const push = (field: string, message: string): void => {
    issues.push({ field, message });
  };

  if (!isNonEmpty(PROFILE.name)) push('PROFILE.name', 'missing name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PROFILE.email)) push('PROFILE.email', 'invalid email format');
  if (PROFILE.phoneRaw.replace(/\D/g, '').length < 10) push('PROFILE.phoneRaw', 'phone number too short');

  if (KPIS.length < 4) push('KPIS', 'expected at least 4 KPIs');
  KPIS.forEach((k, i) => {
    if (!isNonEmpty(k.label)) push(`KPIS[${i}].label`, 'empty label');
    if (!(k.value > 0)) push(`KPIS[${i}].value`, 'value must be positive');
  });

  EXPERIENCE.forEach((e, i) => {
    if (!isNonEmpty(e.role)) push(`EXPERIENCE[${i}].role`, 'empty role');
    if (!isNonEmpty(e.company)) push(`EXPERIENCE[${i}].company`, 'empty company');
    if (!/\d{4}/.test(e.period)) push(`EXPERIENCE[${i}].period`, 'period missing a year');
    if (e.bullets.length < 2) push(`EXPERIENCE[${i}].bullets`, 'need at least 2 bullets');
  });

  if (VENTURES.length < 3) push('VENTURES', 'expected at least 3 ventures');
  if (CERTIFICATIONS.length < 3) push('CERTIFICATIONS', 'expected at least 3 certifications');
  if (EDUCATION.length === 0) push('EDUCATION', 'education empty');
  if (COMPETENCIES.length === 0) push('COMPETENCIES', 'competencies empty');
  if (AWARDS.length === 0) push('AWARDS', 'awards empty');
  if (MEMBERSHIPS.length === 0) push('MEMBERSHIPS', 'memberships empty');
  if (PIPELINE_INDEX.length < 2) push('PIPELINE_INDEX', 'pipeline series too short');
  if (ATTAINMENT.length < 2) push('ATTAINMENT', 'attainment series too short');

  return { ok: issues.length === 0, issues };
}