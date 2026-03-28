import { useState } from 'react';
import ProgressRing from './ProgressRing';

const card = {
  background: 'rgba(26,26,36,0.85)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(124,58,237,0.18)',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '12px',
};

export default function TodayTab({ user, today }) {
  const { goals, color, accentColor, tips, insight } = user;
  const [tipIdx] = useState(Math.floor(Math.random() * tips.length));

  const rings = [
    { key: 'steps', label: 'Steps', emoji: '👟', value: today.steps, max: goals.steps, color },
    { key: 'activeMinutes', label: 'Active', emoji: '⚡', value: today.activeMinutes, max: goals.activeMinutes, color: accentColor },
    { key: 'water', label: 'Water', emoji: '💧', value: today.water, max: 8, color: '#06B6D4' },
    { key: 'calories', label: 'Calories', emoji: '🔥', value: today.calories, max: 2500, color: '#F59E0B' },
  ];

  const stats = [
    { label: 'Steps', value: today.steps.toLocaleString(), goal: goals.steps.toLocaleString(), unit: '', icon: '👟' },
    { label: 'Active Min', value: today.activeMinutes, goal: goals.activeMinutes, unit: 'min', icon: '⚡' },
    { label: 'Water', value: today.water, goal: 8, unit: 'glasses', icon: '💧' },
    { label: 'Sleep', value: today.sleep, goal: goals.sleep, unit: 'hrs', icon: '🌙' },
  ];

  return (
    <div>
      {/* Date */}
      <div className="stagger-1" style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '13px', color: '#6B7280' }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Progress rings */}
      <div className="stagger-2" style={{ ...card }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', marginBottom: '16px', letterSpacing: '0.05em' }}>
          TODAY'S PROGRESS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {rings.map(r => (
            <ProgressRing
              key={r.key}
              value={r.value}
              max={r.max}
              size={74}
              strokeWidth={6}
              color={r.color}
              label={r.label}
              sublabel={`${r.value}/${r.max}`}
              emoji={r.emoji}
            />
          ))}
        </div>
      </div>

      {/* Insight card */}
      <div className="stagger-3" style={{
        ...card,
        background: `linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.08))`,
        border: `1px solid rgba(124,58,237,0.25)`,
      }}>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#A78BFA', marginBottom: '6px', letterSpacing: '0.06em' }}>
          💼 PROFESSION INSIGHT
        </div>
        <div style={{ fontSize: '13px', color: '#E5E7EB', lineHeight: '1.55' }}>{insight}</div>
      </div>

      {/* Stats grid */}
      <div className="stagger-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ ...card, margin: 0 }}>
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>{s.icon}</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>
              {s.value}
              <span style={{ fontSize: '11px', color: '#6B7280', marginLeft: '3px' }}>{s.unit}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#4B5563', marginTop: '2px' }}>
              Goal: {s.goal}{s.unit ? ` ${s.unit}` : ''}
            </div>
            {/* Fill bar */}
            <div style={{
              marginTop: '8px',
              height: '3px',
              borderRadius: '2px',
              background: 'rgba(255,255,255,0.06)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                borderRadius: '2px',
                background: `linear-gradient(90deg, ${color}, ${accentColor})`,
                width: `${Math.min((Number(s.value) / Number(s.goal.toString().replace(/,/g, ''))) * 100, 100)}%`,
                transition: 'width 1.2s cubic-bezier(0.4,0,0.2,1)',
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Tip card */}
      <div className="stagger-5" style={{ ...card, border: `1px solid rgba(6,182,212,0.2)` }}>
        <div style={{ fontSize: '11px', color: '#06B6D4', fontWeight: '600', marginBottom: '6px', letterSpacing: '0.06em' }}>
          ✨ TIP OF THE DAY
        </div>
        <div style={{ fontSize: '13px', color: '#9CA3AF', lineHeight: '1.55' }}>{tips[tipIdx]}</div>
      </div>
    </div>
  );
}
