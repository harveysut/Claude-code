import { useState } from 'react';
import { WORKOUT_TYPES } from '../data/professionConfig';

const card = {
  background: 'rgba(26,26,36,0.85)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(124,58,237,0.18)',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '12px',
};

const INTENSITIES = ['Low', 'Moderate', 'High'];

const INTENSITY_COLORS = {
  Low: '#10B981',
  Moderate: '#F59E0B',
  High: '#EF4444',
};

function WorkoutCard({ workout, color, accentColor, index }) {
  const date = new Date(workout.date);
  const dateStr = date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

  return (
    <div style={{
      ...card,
      margin: 0,
      opacity: 0,
      animation: `fadeInUp 0.4s ease ${index * 0.06}s forwards`,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      <div style={{
        width: '44px', height: '44px',
        borderRadius: '12px',
        background: `linear-gradient(135deg, ${color}30, ${accentColor}20)`,
        border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '20px',
        flexShrink: 0,
      }}>
        {getWorkoutEmoji(workout.type)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>{workout.type}</div>
        <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>
          {dateStr} · {workout.duration} min
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{
          fontSize: '11px',
          fontWeight: '600',
          color: INTENSITY_COLORS[workout.intensity],
          background: `${INTENSITY_COLORS[workout.intensity]}15`,
          padding: '3px 8px',
          borderRadius: '6px',
          marginBottom: '4px',
        }}>
          {workout.intensity}
        </div>
        <div style={{ fontSize: '11px', color: '#6B7280' }}>🔥 {workout.calories} kcal</div>
      </div>
    </div>
  );
}

export default function WorkoutsTab({ workouts, onAdd, user }) {
  const { color, accentColor } = user;
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: 'Running',
    duration: 30,
    intensity: 'Moderate',
    calories: 300,
  });

  const handleAdd = () => {
    onAdd({
      ...form,
      date: new Date().toISOString().split('T')[0],
      duration: Number(form.duration),
      calories: Number(form.calories),
    });
    setShowForm(false);
    setForm({ type: 'Running', duration: 30, intensity: 'Moderate', calories: 300 });
  };

  const totalThisWeek = workouts.filter(w => {
    const d = new Date(w.date);
    const now = new Date();
    const diff = (now - d) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <div>
      {/* Summary */}
      <div className="stagger-1" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
        <div style={{ ...card, margin: 0, textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '800', color }}>{totalThisWeek}</div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>This week</div>
        </div>
        <div style={{ ...card, margin: 0, textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: '800', color: accentColor }}>
            {workouts.reduce((acc, w) => acc + w.calories, 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: '#6B7280' }}>Total kcal</div>
        </div>
      </div>

      {/* Log button */}
      <div className="stagger-2" style={{ marginBottom: '12px' }}>
        <button
          onClick={() => setShowForm(v => !v)}
          style={{
            width: '100%',
            background: showForm ? 'rgba(255,255,255,0.05)' : `linear-gradient(135deg, ${color}, ${accentColor})`,
            color: '#fff',
            padding: '14px',
            borderRadius: '14px',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'all 0.3s',
            boxShadow: showForm ? 'none' : `0 4px 20px ${color}40`,
          }}
        >
          {showForm ? '✕ Cancel' : '+ Log Workout'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{
          ...card,
          animation: 'fadeInUp 0.3s ease',
          border: `1px solid ${color}30`,
        }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', marginBottom: '14px', letterSpacing: '0.05em' }}>
            LOG SESSION
          </div>

          <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Workout Type</label>
          <select
            value={form.type}
            onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            style={{
              width: '100%',
              background: '#1A1A24',
              border: '1px solid rgba(124,58,237,0.2)',
              borderRadius: '8px',
              padding: '9px 12px',
              color: '#fff',
              fontSize: '14px',
              marginBottom: '12px',
            }}
          >
            {WORKOUT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Duration (min)</label>
              <input
                type="number"
                value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>Calories</label>
              <input
                type="number"
                value={form.calories}
                onChange={e => setForm(f => ({ ...f, calories: e.target.value }))}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(124,58,237,0.2)',
                  borderRadius: '8px',
                  padding: '9px 12px',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>

          <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '8px' }}>Intensity</label>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {INTENSITIES.map(level => (
              <button
                key={level}
                onClick={() => setForm(f => ({ ...f, intensity: level }))}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  background: form.intensity === level ? `${INTENSITY_COLORS[level]}25` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${form.intensity === level ? INTENSITY_COLORS[level] : 'rgba(255,255,255,0.08)'}`,
                  color: form.intensity === level ? INTENSITY_COLORS[level] : '#6B7280',
                  transition: 'all 0.2s',
                }}
              >
                {level}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${color}, ${accentColor})`,
              color: '#fff',
              padding: '12px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: `0 4px 15px ${color}40`,
            }}
          >
            Save Workout ✓
          </button>
        </div>
      )}

      {/* Workout list */}
      <div className="stagger-3">
        <div style={{ fontSize: '12px', fontWeight: '600', color: '#9CA3AF', letterSpacing: '0.05em', marginBottom: '10px' }}>
          RECENT SESSIONS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {workouts.map((w, i) => (
            <WorkoutCard key={w.id} workout={w} color={color} accentColor={accentColor} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function getWorkoutEmoji(type) {
  const map = {
    Running: '🏃', Cycling: '🚴', Swimming: '🏊', 'Weight Training': '🏋️',
    HIIT: '⚡', Yoga: '🧘', Pilates: '🤸', Walking: '🚶',
    'Rock Climbing': '🧗', Boxing: '🥊', Football: '⚽', Basketball: '🏀',
    Tennis: '🎾', Dance: '💃', Rowing: '🚣', Other: '💪',
  };
  return map[type] || '💪';
}
