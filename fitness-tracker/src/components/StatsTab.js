import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { MOCK_WEEKLY_STATS } from '../data/professionConfig';

const card = {
  background: 'rgba(26,26,36,0.85)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(124,58,237,0.18)',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '12px',
};

const METRICS = [
  { key: 'steps', label: 'Steps', unit: '' },
  { key: 'activeMin', label: 'Active Min', unit: 'min' },
  { key: 'calories', label: 'Calories', unit: 'kcal' },
  { key: 'water', label: 'Water', unit: 'glasses' },
];

const CustomTooltip = ({ active, payload, label, unit, color }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#1A1A24',
        border: `1px solid ${color}40`,
        borderRadius: '8px',
        padding: '8px 12px',
        fontSize: '12px',
      }}>
        <div style={{ color: '#9CA3AF', marginBottom: '2px' }}>{label}</div>
        <div style={{ color, fontWeight: '700' }}>{payload[0].value.toLocaleString()} {unit}</div>
      </div>
    );
  }
  return null;
};

export default function StatsTab({ user }) {
  const { color, accentColor } = user;
  const [activeMetric, setActiveMetric] = useState('steps');
  const [chartType, setChartType] = useState('line');

  const metric = METRICS.find(m => m.key === activeMetric);
  const weekAvg = Math.round(
    MOCK_WEEKLY_STATS.reduce((sum, d) => sum + d[activeMetric], 0) / MOCK_WEEKLY_STATS.length
  );
  const weekTotal = MOCK_WEEKLY_STATS.reduce((sum, d) => sum + d[activeMetric], 0);
  const weekMax = Math.max(...MOCK_WEEKLY_STATS.map(d => d[activeMetric]));

  return (
    <div>
      {/* Metric selector */}
      <div className="stagger-1" style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {METRICS.map(m => (
          <button
            key={m.key}
            onClick={() => setActiveMetric(m.key)}
            style={{
              padding: '7px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              background: activeMetric === m.key ? `linear-gradient(135deg, ${color}, ${accentColor})` : 'rgba(255,255,255,0.05)',
              color: activeMetric === m.key ? '#fff' : '#6B7280',
              border: activeMetric === m.key ? 'none' : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.25s',
              cursor: 'pointer',
              boxShadow: activeMetric === m.key ? `0 2px 12px ${color}40` : 'none',
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Summary stats */}
      <div className="stagger-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
        {[
          { label: 'Daily Avg', value: weekAvg.toLocaleString(), unit: metric.unit },
          { label: 'Week Total', value: weekTotal.toLocaleString(), unit: metric.unit },
          { label: 'Best Day', value: weekMax.toLocaleString(), unit: metric.unit },
        ].map((s, i) => (
          <div key={s.label} style={{ ...card, margin: 0, textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: i === 0 ? color : i === 1 ? accentColor : '#F59E0B' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '9px', color: '#6B7280', marginTop: '2px' }}>{s.label}</div>
            {s.unit && <div style={{ fontSize: '9px', color: '#4B5563' }}>{s.unit}</div>}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="stagger-3" style={{ ...card }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em' }}>
            WEEKLY {metric.label.toUpperCase()}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['line', 'bar'].map(t => (
              <button
                key={t}
                onClick={() => setChartType(t)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: chartType === t ? `${color}25` : 'transparent',
                  color: chartType === t ? color : '#4B5563',
                  border: `1px solid ${chartType === t ? color + '50' : 'rgba(255,255,255,0.06)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {t === 'line' ? '📈' : '📊'}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          {chartType === 'line' ? (
            <LineChart data={MOCK_WEEKLY_STATS} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#4B5563' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip unit={metric.unit} color={color} />} />
              <Line
                type="monotone"
                dataKey={activeMetric}
                stroke={color}
                strokeWidth={2.5}
                dot={{ fill: color, r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: accentColor }}
                animationDuration={800}
              />
            </LineChart>
          ) : (
            <BarChart data={MOCK_WEEKLY_STATS} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#4B5563' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip unit={metric.unit} color={color} />} />
              <Bar
                dataKey={activeMetric}
                fill={color}
                radius={[4, 4, 0, 0]}
                animationDuration={800}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Day breakdown */}
      <div className="stagger-4" style={{ ...card }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em', marginBottom: '12px' }}>
          DAY BREAKDOWN
        </div>
        {MOCK_WEEKLY_STATS.map((d, i) => {
          const val = d[activeMetric];
          const pct = (val / weekMax) * 100;
          return (
            <div key={d.day} style={{ marginBottom: i < 6 ? '10px' : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{d.day}</span>
                <span style={{ fontSize: '11px', color: '#6B7280' }}>{val.toLocaleString()} {metric.unit}</span>
              </div>
              <div style={{ height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  borderRadius: '3px',
                  background: `linear-gradient(90deg, ${color}, ${accentColor})`,
                  width: `${pct}%`,
                  transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
