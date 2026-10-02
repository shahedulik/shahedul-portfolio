import BarMeter from '../components/BarMeter';
import SectionTitle from '../components/SectionTitle';
import { AWARDS } from '../data/portfolioData';
import { diligenceReports } from '../engine/metrics';

export default function VenturesView() {
  return (
    <div className="space-y-8">
      <SectionTitle
        index="04"
        title="Ventures & Research Ecosystem"
        subtitle="Founder-seat ventures where data science meets industrial automation, enterprise AI, and EdTech — scored live by the on-board diligence engine."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {diligenceReports().map((r) => (
          <div key={r.venture.name} className="card p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1 gap-2">
                <span className="font-mono text-[11px] text-data">{r.venture.role}</span>
                <span className="font-mono text-[11px] text-gold border border-gold/40 bg-gold/10 px-2 py-0.5 rounded-sm">
                  STAGE: {r.stage}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2">{r.venture.name}</h3>
              <p className="text-sm text-mut mb-4">{r.venture.mission}</p>
            </div>
            <div className="border-t border-line/50 pt-3 space-y-3">
              <BarMeter label="Diligence score" pct={r.score} />
              <ul className="space-y-1 text-sm text-slate-300">
                {r.venture.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="text-pos mt-0.5">▪</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-serif text-xl font-bold text-white mb-4">Awards & Recognition</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-slate-300">
          {AWARDS.map((a) => (
            <li key={a} className="flex items-start gap-2">
              <span className="text-gold mt-0.5">◆</span> {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
