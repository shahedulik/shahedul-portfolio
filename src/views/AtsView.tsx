import { Printer } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { AWARDS, CERTIFICATIONS, COMPETENCIES, EDUCATION, EXPERIENCE, PROFILE, VENTURES } from '../data/portfolioData';

export default function AtsView() {
  return (
    <div className="space-y-4">
      <SectionTitle index="06" title="ATS Resume & Export" />

      <div className="no-print card p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-lg font-bold text-white">Clean ATS Resume Engine</h2>
          <p className="font-mono text-xs text-mut mt-1">
            Single-column, parser-safe layout · Times New Roman · prints to PDF via browser dialog
          </p>
        </div>
        <button
          data-testid="print-button"
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-data text-ink-900 font-mono text-xs font-semibold px-4 py-2 rounded-sm hover:bg-white transition-colors"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>

      <div id="ats-sheet" className="print-sheet bg-white text-black max-w-4xl mx-auto p-8 sm:p-10 font-serif text-sm leading-normal rounded-md">
        <div className="text-center border-b-2 border-black pb-3 mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wide">{PROFILE.name}</h1>
          <p className="text-xs font-semibold mt-1">{PROFILE.title}</p>
          <p className="text-xs mt-0.5">{PROFILE.email} | {PROFILE.phone} | {PROFILE.location}</p>
        </div>

        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">Summary</h2>
        <p className="mb-4">{PROFILE.summary}</p>

        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">Key Competencies</h2>
        <p className="mb-4">{COMPETENCIES.map((c) => c.title).join(' · ')}</p>

        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">Professional Experience</h2>
        {EXPERIENCE.map((exp) => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between font-bold text-xs">
              <span>{exp.role} — {exp.company}</span>
              <span>{exp.period}</span>
            </div>
            <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
              {exp.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">Ventures</h2>
        <ul className="list-disc list-inside text-xs mb-4 space-y-0.5">
          {VENTURES.map((v) => (
            <li key={v.name}><strong>{v.name}</strong> ({v.role}) — {v.mission}</li>
          ))}
        </ul>

        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2">Education</h2>
        {EDUCATION.map((e) => (
          <p key={e.degree} className="text-xs mb-1"><strong>{e.degree}</strong> — {e.institution}</p>
        ))}

        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2 mt-4">Certifications</h2>
        <ul className="list-disc list-inside text-xs space-y-0.5">
          {CERTIFICATIONS.map((c) => (
            <li key={c.title}>{c.title} — {c.issuer} ({c.year})</li>
          ))}
        </ul>

        <h2 className="text-xs font-bold uppercase border-b border-black pb-1 mb-2 mt-4">Awards</h2>
        <ul className="list-disc list-inside text-xs space-y-0.5">
          {AWARDS.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}