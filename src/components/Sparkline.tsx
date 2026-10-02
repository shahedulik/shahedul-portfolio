export default function Sparkline({ points, stroke = '#4CC9F0' }: { points: number[]; stroke?: string }) {
  const w = 220;
  const h = 56;
  const pad = 4;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const step = (w - pad * 2) / (points.length - 1);
  const coords = points.map((p, i) => [pad + i * step, h - pad - ((p - min) / span) * (h - pad * 2)] as const);
  const d = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${d} L${(w - pad).toFixed(1)},${h - pad} L${pad},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-14" role="img" aria-label="trend sparkline">
      <path d={area} fill={stroke} opacity={0.12} />
      <path d={d} fill="none" stroke={stroke} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}