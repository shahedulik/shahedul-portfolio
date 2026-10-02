import {
  ATTAINMENT, COMPETENCIES, EXPERIENCE, KPIS, PIPELINE_INDEX, VENTURES,
} from '../data/portfolioData';
import type { CompetencyItem, ExperienceItem, Kpi, VentureItem } from '../types/portfolio';

/* ------------------------------------------------------------------ */
/* Memoization core: pure functions, deterministic output, computed    */
/* exactly once per session. Zero re-computation on re-render.         */
/* ------------------------------------------------------------------ */
const cache = new Map<string, unknown>();
function memo<T>(key: string, compute: () => T): T {
  if (!cache.has(key)) cache.set(key, compute());
  return cache.get(key) as T;
}

/* ------------------------------------------------------------------ */
/* Period parsing & tenure math (pure, no side effects)                */
/* ------------------------------------------------------------------ */
const MONTH_INDEX: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

export interface PeriodSpan {
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
}

export function parsePeriod(period: string): PeriodSpan | null {
  const match = period.match(/([A-Za-z]+)\s+(\d{4})\s*[–-]\s*(.+)/);
  if (!match) return null;
  const startMonth = MONTH_INDEX[match[1].toLowerCase()];
  if (typeof startMonth !== 'number') return null;
  const startYear = Number(match[2]);
  const tail = match[3];
  if (/present/i.test(tail)) {
    return { startYear, startMonth, endYear: null, endMonth: null };
  }
  const endMatch = tail.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!endMatch) return null;
  const endMonth = MONTH_INDEX[endMatch[1].toLowerCase()];
  if (typeof endMonth !== 'number') return null;
  return { startYear, startMonth, endYear: Number(endMatch[2]), endMonth };
}

export function tenureMonths(period: string): number | null {
  const span = parsePeriod(period);
  if (!span) return null;
  const start = span.startYear * 12 + span.startMonth;
  const end =
    span.endYear === null || span.endMonth === null
      ? new Date().getFullYear() * 12 + new Date().getMonth()
      : span.endYear * 12 + span.endMonth;
  return Math.max(1, end - start);
}

export function formatTenure(months: number): string {
  return months < 12 ? `${months} mos` : `${(months / 12).toFixed(1)} yrs`;
}

/* ------------------------------------------------------------------ */
/* Career portfolio stats                                              */
/* ------------------------------------------------------------------ */
export interface CareerStats {
  mandates: number;
  markets: string[];
  achievements: number;
  ventures: number;
}

export function marketsCovered(): string[] {
  return memo('markets', () => {
    const set = new Set<string>();
    for (const e of EXPERIENCE) {
      if (/USA|New York|Tri-State/i.test(e.location)) set.add('US');
      if (/Australia/i.test(e.location)) set.add('AU');
      if (/United Kingdom|UK/i.test(e.location)) set.add('UK');
      if (/Bangladesh|Dhaka/i.test(e.location)) set.add('BD');
    }
    return [...set];
  });
}

export function careerStats(): CareerStats {
  return memo('careerStats', () => ({
    mandates: EXPERIENCE.length,
    markets: marketsCovered(),
    achievements: EXPERIENCE.reduce((n, e) => n + e.bullets.length, 0),
    ventures: VENTURES.length,
  }));
}

/* ------------------------------------------------------------------ */
/* Venture diligence engine: signal extraction from unstructured text  */
/* ------------------------------------------------------------------ */
export type VentureStage = 'Funded' | 'MVP' | 'Operating' | 'Concept';

export interface DiligenceReport {
  venture: VentureItem;
  stage: VentureStage;
  score: number;
  capitalSignals: string[];
  moatSignals: string[];
  executionSignals: string[];
}

const CAPITAL_RE = /fund|grant|iDEA|BCC|invest/i;
const MOAT_RE = /automation|sensing|LLM|AI agent|infrastructure|ecosystem/i;
const EXEC_RE = /MVP|GTM|launch|delivery|on track/i;

export function diligenceReport(v: VentureItem): DiligenceReport {
  const corpus = [v.mission, ...v.highlights];
  const capitalSignals = corpus.filter((s) => CAPITAL_RE.test(s));
  const moatSignals = corpus.filter((s) => MOAT_RE.test(s));
  const executionSignals = corpus.filter((s) => EXEC_RE.test(s));

  const stage: VentureStage =
    capitalSignals.length > 0 ? 'Funded'
      : executionSignals.length > 0 ? 'MVP'
        : moatSignals.length > 0 ? 'Operating'
          : 'Concept';

  const score = Math.min(
    100,
    25 + capitalSignals.length * 15 + moatSignals.length * 10 + executionSignals.length * 10,
  );

  return { venture: v, stage, score, capitalSignals, moatSignals, executionSignals };
}

export function diligenceReports(): DiligenceReport[] {
  return memo('diligence', () => VENTURES.map(diligenceReport));
}

/* ------------------------------------------------------------------ */
/* Public selectors: the ONLY surface views are allowed to consume     */
/* ------------------------------------------------------------------ */
export const getKpis = (): Kpi[] => memo('kpis', () => KPIS);
export const getPipelineSeries = (): number[] => memo('pipeline', () => PIPELINE_INDEX);
export const getAttainmentSeries = (): { label: string; pct: number }[] => memo('attainment', () => ATTAINMENT);
export const getCompetencies = (): CompetencyItem[] => memo('competencies', () => COMPETENCIES);
export const getExperience = (): ExperienceItem[] => memo('experience', () => EXPERIENCE);
