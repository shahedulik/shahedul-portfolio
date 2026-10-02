export default function SectionTitle({ index, title, subtitle }: { index: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-data">{index}</span>
        <h1 data-testid="view-title" className="font-serif text-2xl sm:text-3xl font-bold text-white">{title}</h1>
      </div>
      {subtitle ? <p className="mt-2 text-sm text-mut max-w-3xl leading-relaxed">{subtitle}</p> : null}
      <div className="mt-3 h-px bg-gradient-to-r from-data/60 via-line/60 to-transparent" />
    </div>
  );
}