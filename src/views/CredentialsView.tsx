import SectionTitle from '../components/SectionTitle';
import { CERTIFICATIONS, EDUCATION, MEMBERSHIPS } from '../data/portfolioData';

export default function CredentialsView() {
  return (
    <div className="space-y-8">
      <SectionTitle index="05" title="Credentials & Affiliations" subtitle="Formal education, verified certifications, and professional memberships." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EDUCATION.map((e) => (
          <div key={e.degree} className="card p-6">
            <h3 className="font-serif text-lg font-bold text-white">{e.degree}</h3>
            <div className="font-mono text-xs text-data mt-1">{e.institution}</div>
            <div className="font-mono text-[11px] text-mut mt-1">{e.period}</div>
            <ul className="mt-3 space-y-1 text-sm text-slate-300">
              {e.notes.map((n) => (
                <li key={n}>· {n}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CERTIFICATIONS.map((c) => (
          <div key={c.title} className="card p-5">
            <div className="font-serif font-bold text-white mb-1">{c.title}</div>
            <div className="text-sm text-mut">{c.issuer}</div>
            <div className="font-mono text-[11px] text-pos mt-2">{c.year}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-serif text-lg font-bold text-white mb-3">Memberships</h2>
        <div className="flex flex-wrap gap-2">
          {MEMBERSHIPS.map((m) => (
            <span key={m} className="font-mono text-[11px] text-data border border-data/30 bg-data/10 px-2 py-1 rounded-sm">
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}