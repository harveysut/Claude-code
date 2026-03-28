import { useState } from 'react';
import TodayTab from './TodayTab';
import GoalsTab from './GoalsTab';
import WorkoutsTab from './WorkoutsTab';
import StatsTab from './StatsTab';
import { MOCK_WORKOUTS } from '../data/professionConfig';

const TABS = [
  { id: 'today', label: 'Today', icon: '☀️' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
  { id: 'workouts', label: 'Workouts', icon: '💪' },
  { id: 'stats', label: 'Stats', icon: '📊' },
];

export default function Dashboard({ user, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('today');
  const [tabKey, setTabKey] = useState(0);
  const [workouts, setWorkouts] = useState(MOCK_WORKOUTS);

  const today = {
    steps: 6240,
    activeMinutes: 22,
    water: 5,
    calories: 1740,
    sleep: 7.2,
  };

  const switchTab = (id) => {
    setActiveTab(id);
    setTabKey(k => k + 1);
  };

  const addWorkout = (w) => {
    setWorkouts(prev => [{ ...w, id: Date.now() }, ...prev]);
  };

  const updateGoals = (newGoals) => {
    onUpdateUser(u => ({ ...u, goals: newGoals }));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F13', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '20px 20px 12px',
        background: 'rgba(15,15,19,0.95)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid rgba(124,58,237,0.1)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#6B7280', letterSpacing: '0.05em' }}>GOOD {getTimeOfDay()}</div>
            <div style={{ fontSize: '20px', fontWeight: '700', color: '#fff' }}>
              {user.name.split(' ')[0]} 👋
            </div>
          </div>
          <div style={{
            width: '42px', height: '42px',
            borderRadius: '14px',
            background: `linear-gradient(135deg, ${user.color}, ${user.accentColor})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '700',
            color: '#fff',
            boxShadow: `0 0 20px ${user.color}40`,
          }}>
            {user.name[0].toUpperCase()}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 80px' }}>
        <div key={tabKey}>
          {activeTab === 'today' && <TodayTab user={user} today={today} />}
          {activeTab === 'goals' && <GoalsTab user={user} onUpdateGoals={updateGoals} />}
          {activeTab === 'workouts' && <WorkoutsTab workouts={workouts} onAdd={addWorkout} user={user} />}
          {activeTab === 'stats' && <StatsTab user={user} />}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '420px',
        background: 'rgba(15,15,19,0.97)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(124,58,237,0.15)',
        display: 'flex',
        padding: '8px 0 12px',
        zIndex: 10,
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
          >
            <div style={{
              fontSize: '20px',
              filter: activeTab === tab.id ? 'none' : 'grayscale(1) opacity(0.4)',
              transform: activeTab === tab.id ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}>
              {tab.icon}
            </div>
            <div style={{
              fontSize: '10px',
              fontWeight: '600',
              color: activeTab === tab.id ? user.color : '#4B5563',
              transition: 'color 0.3s',
              letterSpacing: '0.04em',
            }}>
              {tab.label}
            </div>
            {activeTab === tab.id && (
              <div style={{
                width: '4px', height: '4px',
                borderRadius: '2px',
                background: user.color,
                marginTop: '-1px',
              }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 17) return 'AFTERNOON';
  return 'EVENING';
}
