import { useEffect, useState } from 'react';

export default function ProgressRing({ value, max, size = 80, strokeWidth = 7, color = '#7C3AED', label, sublabel, emoji }) {
  const [animated, setAnimated] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference - animated * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimated(pct);
    }, 100);
    return () => clearTimeout(timeout);
  }, [pct]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          {emoji && <div style={{ fontSize: '14px', marginBottom: '1px' }}>{emoji}</div>}
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', lineHeight: 1 }}>
            {Math.round(pct * 100)}%
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#fff' }}>{label}</div>
        <div style={{ fontSize: '10px', color: '#6B7280' }}>{sublabel}</div>
      </div>
    </div>
  );
}
