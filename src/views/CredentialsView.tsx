import SectionTitle from '../components/SectionTitle';
import { CERTIFICATIONS, EDUCATION, MEMBERSHIPS } from '../data/portfolioData';

export default function CredentialsView() {
  // Preserves education, certification, and membership copy and the three-band layout.
  return (
    <div className="space-y-8">
      <SectionTitle index="03" title="Credentials & Affiliations" subtitle="Formal education, verified certifications, and professional memberships." />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {EDUCATION.map((e) => (
          <div key={e.degree} className="card p-6">
            <h3 className="t-display text-lg font-bold">{e.degree}</h3>
            <div className="t-label mt-1">{e.institution}</div>
            <div className="t-meta mt-1">{e.period}</div>
            <ul className="t-body mt-3 space-y-1 text-sm">
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
            <div className="t-display font-bold mb-1">{c.title}</div>
            <div className="t-meta text-sm">{c.issuer}</div>
            <div className="t-figure t-label mt-2">{c.year}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="t-display text-lg font-bold mb-3">Memberships</h2>
        <div className="flex flex-wrap gap-2">
          {MEMBERSHIPS.map((m) => (
            <span key={m} className="t-label t-chip">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
