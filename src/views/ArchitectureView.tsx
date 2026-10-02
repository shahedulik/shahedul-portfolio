import SectionTitle from '../components/SectionTitle';
import { ARCH_LAYERS, PIPELINE_STEPS, STACK_MATRIX } from '../data/portfolioData';

export default function ArchitectureView() {
  return (
    <div className="space-y-8">
      <SectionTitle
        index="02"
        title="Solution Architecture Practice"
        subtitle="Reference architectures I design for enterprises: event-driven ingestion, governed lakehouse, applied ML/LLM intelligence, and SLO-monitored decisioning surfaces."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ARCH_LAYERS.map((layer, i) => (
          <div key={layer.name} className="card p-5">
            <div className="font-mono text-[11px] text-data mb-1">LAYER {i + 1}</div>
            <div className="font-serif text-lg font-bold text-white mb-2">{layer.name}</div>
            <p className="text-sm text-mut mb-3">{layer.purpose}</p>
            <div className="flex flex-wrap gap-2">
              {layer.technologies.map((t) => (
                <span key={t} className="font-mono text-[11px] text-gold border border-line/70 bg-ink-700/60 px-2 py-0.5 rounded-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <div className="font-mono text-[11px] uppercase tracking-widest text-mut mb-4">
          Case study — automated public-sector RFP pipeline
        </div>
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {PIPELINE_STEPS.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span className="border border-data/40 bg-data/10 text-data px-3 py-2 rounded-sm">{s}</span>
              {i < PIPELINE_STEPS.length - 1 ? <span className="text-mut">→</span> : null}
            </span>
          ))}
        </div>
      </div>

      <div className="card p-5 overflow-x-auto">
        <div className="font-mono text-[11px] uppercase tracking-widest text-mut mb-4">Platform stack matrix</div>
        <table className="w-full text-sm min-w-[640px]">
          <thead>
            <tr className="text-left font-mono text-[11px] text-mut border-b border-line/70">
              <th className="py-2 pr-4">LAYER</th>
              <th className="py-2 pr-4">CHOICE</th>
              <th className="py-2">JUSTIFICATION (HA / LATENCY)</th>
            </tr>
          </thead>
          <tbody>
            {STACK_MATRIX.map((row) => (
              <tr key={row.layer} className="border-b border-line/40 align-top">
                <td className="py-2 pr-4 font-mono text-xs text-data">{row.layer}</td>
                <td className="py-2 pr-4 text-white">{row.choice}</td>
                <td className="py-2 text-mut">{row.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}