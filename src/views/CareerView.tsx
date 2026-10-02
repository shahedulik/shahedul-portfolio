import SectionTitle from '../components/SectionTitle';
import { formatTenure, getExperience, tenureMonths } from '../engine/metrics';

export default function CareerView() {
  return (
    <div className="space-y-6">
      <SectionTitle
        index="03"
        title="Enterprise Career Matrix"
        subtitle="Six mandates across US, AU, UK and BD markets — sales engineering, procurement, and operational leadership."
      />
      {getExperience().map((exp) => {
        const months = tenureMonths(exp.period);
        return (
          <div key={exp.id} data-testid={`experience-${exp.id}`} className="card p-6 hover:border-data/40 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">{exp.role}</h3>
                <div className="font-mono text-xs text-data mt-1">{exp.company} — {exp.location}</div>
              </div>
              <div className="flex gap-2">
                {months !== null && (
                  <span className="font-mono text-xs text-gold border border-gold/40 bg-gold/10 px-3 py-1 rounded-sm w-fit">
                    {formatTenure(months)}
                  </span>
                )}
                <span className="font-mono text-xs text-mut border border-line/70 bg-ink-700/60 px-3 py-1 rounded-sm w-fit">
                  {exp.period}
                </span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300 mb-4">
              {exp.bullets.map((b) => (
                <li key={b} className="leading-relaxed">{b}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-3 border-t border-line/50">
              {exp.tags.map((t) => (
                <span key={t} className="font-mono text-[11px] text-gold border border-line/70 bg-ink-700/60 px-2 py-0.5 rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}