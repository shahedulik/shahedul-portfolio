import { Mail, MapPin, Phone } from 'lucide-react';
import BarMeter from '../components/BarMeter';
import KpiCard from '../components/KpiCard';
import SectionTitle from '../components/SectionTitle';
import Sparkline from '../components/Sparkline';
import { PROFILE } from '../data/portfolioData';
import {
  careerStats, getAttainmentSeries, getCompetencies, getKpis, getPipelineSeries,
} from '../engine/metrics';

export default function TelemetryView() {
  const stats = careerStats();
  return (
    <div className="space-y-8">
      <SectionTitle index="01" title="Executive BI Telemetry" subtitle={PROFILE.summary} />

      <div className="flex flex-wrap gap-2 font-mono text-[11px]">
        <span className="border border-line/70 bg-ink-700/60 text-mut px-2 py-1 rounded-sm">{stats.mandates} mandates</span>
        <span className="border border-line/70 bg-ink-700/60 text-mut px-2 py-1 rounded-sm">{stats.markets.join(' · ')} markets</span>
        <span className="border border-line/70 bg-ink-700/60 text-mut px-2 py-1 rounded-sm">{stats.achievements} tracked achievements</span>
        <span className="border border-pos/40 bg-pos/10 text-pos px-2 py-1 rounded-sm">engine: validated ✓</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {getKpis().map((k) => (
          <KpiCard key={k.label} kpi={k} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="font-mono text-[11px] uppercase tracking-widest text-mut mb-2">
            Qualified pipeline index — trailing 12 months
          </div>
          <Sparkline points={getPipelineSeries()} />
          <div className="font-mono text-[11px] text-mut mt-2">
            Composite index of qualified leads, discovery sessions and submitted proposals.
          </div>
        </div>
        <div className="card p-5 space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-widest text-mut">
            Target attainment by mandate
          </div>
          {getAttainmentSeries().map((a) => (
            <BarMeter key={a.label} label={a.label} pct={a.pct} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-serif text-xl font-bold text-white mb-4">Key Competencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getCompetencies().map((c) => (
            <div key={c.title} className="card p-4">
              <div className="font-serif font-bold text-white mb-1">{c.title}</div>
              <div className="text-sm text-mut">{c.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5 flex flex-wrap gap-6 font-mono text-sm">
        <a className="flex items-center gap-2 text-data hover:text-white transition-colors" href={`mailto:${PROFILE.email}`}>
          <Mail className="w-4 h-4" /> {PROFILE.email}
        </a>
        <a className="flex items-center gap-2 text-data hover:text-white transition-colors" href={`tel:${PROFILE.phoneRaw}`}>
          <Phone className="w-4 h-4" /> {PROFILE.phone}
        </a>
        <span className="flex items-center gap-2 text-mut">
          <MapPin className="w-4 h-4" /> {PROFILE.location}
        </span>
      </div>
    </div>
  );
}