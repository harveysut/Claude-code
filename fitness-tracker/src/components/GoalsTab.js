import { useState } from 'react';
import { MOCK_HEATMAP } from '../data/professionConfig';

const card = {
  background: 'rgba(26,26,36,0.85)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(124,58,237,0.18)',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '12px',
};

const HEATMAP_COLORS = [
  'rgba(255,255,255,0.04)',
  'rgba(124,58,237,0.2)',
  'rgba(124,58,237,0.45)',
  'rgba(124,58,237,0.7)',
  'rgba(124,58,237,1)',
];

function HeatmapGrid() {
  const dates = Object.keys(MOCK_HEATMAP).sort();
  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '3px', overflowX: 'auto', paddingBottom: '4px' }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map(date => (
              <div
                key={date}
                title={date}
                style={{
                  width: '11px',
                  height: '11px',
                  borderRadius: '2px',
                  background: HEATMAP_COLORS[MOCK_HEATMAP[date] || 0],
                  transition: 'background 0.2s',
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontSize: '10px', color: '#4B5563' }}>
        <span>Less</span>
        {HEATMAP_COLORS.map((c, i) => (
          <div key={i} style={{ width: '9px', height: '9px', borderRadius: '2px', background: c }} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function FillBar({ value, max, color, accentColor }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', marginTop: '10px' }}>
      <div style={{
        height: '100%',
        borderRadius: '3px',
        background: `linear-gradient(90deg, ${color}, ${accentColor})`,
        width: `${pct}%`,
        transition: 'width 1.3s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: `0 0 8px ${color}80`,
      }} />
    </div>
  );
}

export default function GoalsTab({ user, onUpdateGoals }) {
  const { goals, color, accentColor } = user;
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...goals });

  const mockProgress = {
    steps: 6240,
    activeMinutes: 22,
    workouts: 2,
    sleep: 7.2,
  };

  const GOAL_DEFS = [
    { key: 'steps', label: 'Daily Steps', icon: '👟', unit: 'steps', progress: mockProgress.steps },
    { key: 'activeMinutes', label: 'Active Minutes', icon: '⚡', unit: 'min/day', progress: mockProgress.activeMinutes },
    { key: 'workouts', label: 'Workouts/Week', icon: '💪', unit: 'sessions', progress: mockProgress.workouts },
    { key: 'sleep', label: 'Sleep', icon: '🌙', unit: 'hrs/night', progress: mockProgress.sleep },
  ];

  const streakDays = 7;
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handleSave = () => {
    onUpdateGoals(draft);
    setEditing(false);
  };

  return (
    <div>
      {/* Streak */}
      <div className="stagger-1" style={{ ...card }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em' }}>WEEKLY STREAK</div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#F59E0B' }}>🔥 {streakDays} days</div>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {weekDays.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '8px',
                background: i < streakDays ? `linear-gradient(135deg, ${color}, ${accentColor})` : 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px',
                boxShadow: i < streakDays ? `0 0 10px ${color}50` : 'none',
                transition: 'all 0.3s',
              }}>
                {i < streakDays ? '✓' : ''}
              </div>
              <div style={{ fontSize: '9px', color: '#4B5563' }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Goal cards */}
      <div className="stagger-2" style={{ ...card }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em' }}>MY GOALS</div>
          <button
            onClick={() => editing ? handleSave() : setEditing(true)}
            style={{
              background: editing ? `linear-gradient(135deg, ${color}, ${accentColor})` : 'rgba(124,58,237,0.15)',
              color: '#fff',
              border: editing ? 'none' : `1px solid rgba(124,58,237,0.3)`,
              borderRadius: '8px',
              padding: '5px 12px',
              fontSize: '12px',
              fontWeight: '600',
            }}
          >
            {editing ? 'Save ✓' : 'Edit'}
          </button>
        </div>

        {GOAL_DEFS.map((g, i) => (
          <div key={g.key} style={{
            marginBottom: i < GOAL_DEFS.length - 1 ? '16px' : 0,
            opacity: 0,
            animation: `fadeInUp 0.4s ease ${i * 0.08}s forwards`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '16px' }}>{g.icon}</span>
                <span style={{ fontSize: '13px', color: '#E5E7EB' }}>{g.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                {editing ? (
                  <input
                    type="number"
                    value={draft[g.key]}
                    onChange={e => setDraft(d => ({ ...d, [g.key]: Number(e.target.value) }))}
                    style={{
                      background: 'rgba(124,58,237,0.1)',
                      border: '1px solid rgba(124,58,237,0.3)',
                      borderRadius: '6px',
                      padding: '3px 7px',
                      color: color,
                      fontSize: '14px',
                      fontWeight: '700',
                      width: '70px',
                      textAlign: 'right',
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '15px', fontWeight: '700', color }}>{goals[g.key]}</span>
                )}
                <span style={{ fontSize: '10px', color: '#6B7280' }}>{g.unit}</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '10px', color: '#4B5563' }}>Today: {g.progress}</span>
              <span style={{ fontSize: '10px', color: '#4B5563' }}>
                {Math.round((g.progress / goals[g.key]) * 100)}%
              </span>
            </div>
            <FillBar value={g.progress} max={goals[g.key]} color={color} accentColor={accentColor} />
          </div>
        ))}
      </div>

      {/* Heatmap */}
      <div className="stagger-3" style={{ ...card }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em', marginBottom: '12px' }}>
          ACTIVITY HISTORY (12 WEEKS)
        </div>
        <HeatmapGrid />
      </div>
    </div>
  );
}
