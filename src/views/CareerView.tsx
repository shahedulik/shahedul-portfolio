import SectionTitle from '../components/SectionTitle';
import { formatTenure, getExperience, tenureMonths } from '../engine/metrics';

export default function CareerView() {
  // Preserves experience order, copy, tenure math, and the card/list/tag structure.
  return (
    <div className="space-y-6">
      <SectionTitle
        index="02"
        title="Enterprise Career Matrix"
        subtitle="Six mandates across US, AU, UK and BD markets — sales engineering, procurement, and operational leadership."
      />
      {getExperience().map((exp) => {
        const months = tenureMonths(exp.period);
        return (
          <div key={exp.id} data-testid={`experience-${exp.id}`} className="card p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
              <div>
                <h3 className="t-display text-lg font-bold">{exp.role}</h3>
                <div className="t-label mt-1">{exp.company} — {exp.location}</div>
              </div>
              <div className="flex gap-2">
                {months !== null && (
                  <span className="t-figure t-chip w-fit">
                    {formatTenure(months)}
                  </span>
                )}
                <span className="t-chip w-fit">
                  {exp.period}
                </span>
              </div>
            </div>
            <ul className="t-body list-disc list-inside space-y-1.5 text-sm mb-4">
              {exp.bullets.map((b) => (
                <li key={b} className="leading-relaxed">{b}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-3 t-rule">
              {exp.tags.map((t) => (
                <span key={t} className="t-tool">{t}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
