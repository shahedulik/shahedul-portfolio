import { useCountUp } from '../hooks/useCountUp';
import type { Kpi } from '../types/portfolio';

export default function KpiCard({ kpi }: { kpi: Kpi }) {
  const n = useCountUp(kpi.value);
  return (
    <div
      data-testid="kpi-card"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
      className="card p-5 flex flex-col gap-2 hover:border-data/50 transition-colors"
    >
      <div className="text-[11px] uppercase tracking-widest text-mut">{kpi.label}</div>
      <div className="text-3xl font-bold text-white">
        {kpi.prefix ?? ''}{n}{kpi.suffix ?? ''}
      </div>
      <div className="text-[11px] text-pos">{kpi.trend}</div>
      <div className="text-sm text-mut border-t border-line/60 pt-2">{kpi.context}</div>
    </div>
  );
}