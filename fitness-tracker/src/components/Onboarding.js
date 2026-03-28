import { useState } from 'react';
import { PROFESSIONS, PROFESSION_CONFIG } from '../data/professionConfig';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0F0F13 0%, #1A0A2E 50%, #0F0F13 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '380px',
    background: 'rgba(26,26,36,0.9)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(124,58,237,0.25)',
    borderRadius: '24px',
    padding: '32px 28px',
  },
  logo: {
    fontSize: '40px',
    textAlign: 'center',
    marginBottom: '8px',
  },
  title: {
    fontSize: '26px',
    fontWeight: '700',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #7C3AED, #06B6D4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '13px',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: '28px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '6px',
    display: 'block',
  },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(124,58,237,0.2)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#fff',
    fontSize: '15px',
    marginBottom: '18px',
    transition: 'border-color 0.2s',
  },
  select: {
    width: '100%',
    background: '#1A1A24',
    border: '1px solid rgba(124,58,237,0.2)',
    borderRadius: '10px',
    padding: '10px 14px',
    color: '#fff',
    fontSize: '15px',
    marginBottom: '18px',
    cursor: 'pointer',
  },
  goalGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
    marginBottom: '24px',
  },
  goalItem: {
    background: 'rgba(124,58,237,0.08)',
    border: '1px solid rgba(124,58,237,0.2)',
    borderRadius: '12px',
    padding: '12px',
  },
  goalLabel: {
    fontSize: '11px',
    color: '#9CA3AF',
    marginBottom: '4px',
  },
  goalValue: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#7C3AED',
  },
  goalUnit: {
    fontSize: '11px',
    color: '#6B7280',
    marginLeft: '3px',
  },
  goalInput: {
    width: '100%',
    background: 'transparent',
    border: 'none',
    color: '#7C3AED',
    fontSize: '18px',
    fontWeight: '700',
    padding: '0',
  },
  btn: {
    width: '100%',
    background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
    color: '#fff',
    padding: '14px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'transform 0.2s, opacity 0.2s',
    letterSpacing: '0.02em',
  },
  professionBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(124,58,237,0.1)',
    border: '1px solid rgba(124,58,237,0.3)',
    borderRadius: '8px',
    padding: '8px 12px',
    marginBottom: '18px',
    fontSize: '13px',
    color: '#C4B5FD',
  },
  stepDots: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '3px',
    transition: 'all 0.3s',
  },
};

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState(5);
  const [goals, setGoals] = useState(null);

  const handleProfessionChange = (val) => {
    setProfession(val);
    if (val && PROFESSION_CONFIG[val]) {
      setGoals({ ...PROFESSION_CONFIG[val].goals });
    }
  };

  const handleNext = () => {
    if (step === 1 && name.trim() && profession) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    const config = PROFESSION_CONFIG[profession];
    onComplete({
      name: name.trim(),
      profession,
      hoursPerWeek: Number(hoursPerWeek),
      goals,
      color: config.color,
      accentColor: config.accentColor,
      tips: config.tips,
      insight: config.insight,
    });
  };

  const profConfig = profession ? PROFESSION_CONFIG[profession] : null;

  return (
    <div style={styles.container}>
      <div style={{ ...styles.card, animation: 'fadeInUp 0.6s ease' }}>
        <div style={styles.logo}>⚡</div>
        <div style={styles.title}>FitPulse</div>
        <div style={styles.subtitle}>Your adaptive fitness companion</div>

        {/* Step dots */}
        <div style={styles.stepDots}>
          {[1, 2].map(s => (
            <div key={s} style={{
              ...styles.dot,
              width: step === s ? '18px' : '6px',
              background: step >= s ? '#7C3AED' : 'rgba(255,255,255,0.15)',
            }} />
          ))}
        </div>

        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <label style={styles.label}>Your name</label>
            <input
              style={styles.input}
              placeholder="Enter your name..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNext()}
            />

            <label style={styles.label}>Your profession</label>
            <select
              style={styles.select}
              value={profession}
              onChange={e => handleProfessionChange(e.target.value)}
            >
              <option value="">Select your profession...</option>
              {PROFESSIONS.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>

            <label style={styles.label}>Weekly availability (hours)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <input
                type="range"
                min="1"
                max="20"
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(e.target.value)}
                style={{ flex: 1, accentColor: '#7C3AED' }}
              />
              <span style={{ color: '#7C3AED', fontWeight: '700', fontSize: '18px', minWidth: '30px' }}>
                {hoursPerWeek}h
              </span>
            </div>

            <button
              style={{
                ...styles.btn,
                opacity: name.trim() && profession ? 1 : 0.4,
              }}
              onClick={handleNext}
              disabled={!name.trim() || !profession}
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && profConfig && goals && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <div style={styles.professionBadge}>
              <span style={{ fontSize: '18px' }}>{profConfig.emoji}</span>
              <div>
                <div style={{ fontWeight: '600' }}>{profConfig.label}</div>
                <div style={{ fontSize: '11px', color: '#6B7280' }}>Personalised goals below</div>
              </div>
            </div>

            <label style={styles.label}>Your weekly goals (tap to edit)</label>
            <div style={styles.goalGrid}>
              {[
                { key: 'steps', label: 'Daily Steps', unit: 'steps' },
                { key: 'activeMinutes', label: 'Active Minutes', unit: 'min/day' },
                { key: 'workouts', label: 'Workouts', unit: 'per week' },
                { key: 'sleep', label: 'Sleep Goal', unit: 'hrs/night' },
              ].map(({ key, label, unit }) => (
                <div key={key} style={styles.goalItem}>
                  <div style={styles.goalLabel}>{label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                    <input
                      type="number"
                      style={styles.goalInput}
                      value={goals[key]}
                      onChange={e => setGoals(g => ({ ...g, [key]: Number(e.target.value) }))}
                    />
                    <span style={styles.goalUnit}>{unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '20px',
              fontSize: '12px',
              color: '#67E8F9',
              lineHeight: '1.5',
            }}>
              💡 {profConfig.insight}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                style={{ ...styles.btn, background: 'rgba(255,255,255,0.05)', width: 'auto', padding: '14px 20px' }}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button style={styles.btn} onClick={handleConfirm}>
                Start Tracking 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
