import { motion } from 'framer-motion';

export default function BarMeter({ label, pct }: { label: string; pct: number }) {
  const capped = Math.min(pct, 150);
  return (
    <div className="space-y-1">
      <div className="flex justify-between font-mono text-[11px] text-mut">
        <span>{label}</span>
        <span className="text-pos">{pct}%</span>
      </div>
      <div className="h-2 bg-ink-700 rounded-sm overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-data to-pos"
          initial={{ width: 0 }}
          animate={{ width: `${(capped / 150) * 100}%` }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}