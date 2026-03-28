export const PROFESSIONS = [
  { value: 'office', label: 'Office / Sales' },
  { value: 'manual', label: 'Manual Labour' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'creative', label: 'Creative' },
  { value: 'student', label: 'Student' },
  { value: 'athlete', label: 'Athlete' },
  { value: 'other', label: 'Other' },
];

export const PROFESSION_CONFIG = {
  office: {
    emoji: '💼',
    label: 'Office / Sales',
    goals: { steps: 8000, activeMinutes: 30, workouts: 3, sleep: 7.5 },
    insight: "You've been at your desk for a while — stand up, roll your shoulders, and take a 5-minute walk.",
    tips: [
      "Set a timer every 50 minutes to stand and stretch.",
      "Try the 20-20-20 rule: every 20 min, look 20 ft away for 20 sec.",
      "A standing desk can reduce back pain by up to 32%.",
      "3 sets of desk push-ups burns ~15 calories and resets your posture.",
    ],
    color: '#7C3AED',
    accentColor: '#06B6D4',
  },
  manual: {
    emoji: '🔧',
    label: 'Manual Labour',
    goals: { steps: 12000, activeMinutes: 60, workouts: 2, sleep: 8 },
    insight: "Your body works hard. Prioritise recovery tonight — foam roll and sleep 8 hours.",
    tips: [
      "Active recovery beats rest days — light walking helps flush lactic acid.",
      "Hydrate 500ml extra for every hour of heavy physical work.",
      "Epsom salt baths reduce muscle soreness significantly.",
      "Core strength protects your back during heavy lifts.",
    ],
    color: '#EA580C',
    accentColor: '#FACC15',
  },
  healthcare: {
    emoji: '🩺',
    label: 'Healthcare',
    goals: { steps: 10000, activeMinutes: 45, workouts: 3, sleep: 7 },
    insight: "Long shifts take a toll. Don't skip your own health — you give so much to others.",
    tips: [
      "Compression socks reduce leg fatigue during long shifts by 30%.",
      "Mindfulness for 10 minutes after a tough shift reduces cortisol.",
      "Pre-shift stretching reduces injury risk significantly.",
      "Your mental health matters — schedule decompression time.",
    ],
    color: '#0891B2',
    accentColor: '#10B981',
  },
  creative: {
    emoji: '🎨',
    label: 'Creative',
    goals: { steps: 7000, activeMinutes: 30, workouts: 3, sleep: 8 },
    insight: "Movement fuels creativity — a short walk can boost creative thinking by 81%.",
    tips: [
      "Walking meetings spark more creative ideas than sitting ones.",
      "Natural light exposure boosts mood and creative output.",
      "Exercise increases BDNF — literally growing your creative brain.",
      "Even 10-minute dance breaks improve focus and energy.",
    ],
    color: '#DB2777',
    accentColor: '#F59E0B',
  },
  student: {
    emoji: '📚',
    label: 'Student',
    goals: { steps: 8000, activeMinutes: 30, workouts: 3, sleep: 8 },
    insight: "Study breaks with movement improve retention by up to 20%. Take that walk!",
    tips: [
      "Exercise before studying improves memory consolidation.",
      "Sleep is when your brain cements what you learned — don't skip it.",
      "Cycling to class counts as cardio and saves money.",
      "Campus stairs > elevator. Every step counts.",
    ],
    color: '#7C3AED',
    accentColor: '#06B6D4',
  },
  athlete: {
    emoji: '🏆',
    label: 'Athlete',
    goals: { steps: 15000, activeMinutes: 90, workouts: 5, sleep: 9 },
    insight: "Recovery is training. Today's rest is tomorrow's performance.",
    tips: [
      "HRV monitoring can predict overtraining before it happens.",
      "Carb timing around workouts optimises glycogen replenishment.",
      "Cold water immersion post-training reduces DOMS by 20%.",
      "Zone 2 training 2-3x/week builds aerobic base without taxing CNS.",
    ],
    color: '#059669',
    accentColor: '#7C3AED',
  },
  other: {
    emoji: '✨',
    label: 'Active Individual',
    goals: { steps: 8000, activeMinutes: 30, workouts: 3, sleep: 7.5 },
    insight: "Consistency beats perfection. Show up today — even 10 minutes counts.",
    tips: [
      "Any movement is better than none. Start where you are.",
      "Habit stacking — attach new habits to existing ones.",
      "Track your progress: what gets measured gets improved.",
      "Rest is productive. Recovery is part of the plan.",
    ],
    color: '#7C3AED',
    accentColor: '#06B6D4',
  },
};

export const WORKOUT_TYPES = [
  'Running', 'Cycling', 'Swimming', 'Weight Training', 'HIIT',
  'Yoga', 'Pilates', 'Walking', 'Rock Climbing', 'Boxing',
  'Football', 'Basketball', 'Tennis', 'Dance', 'Rowing', 'Other'
];

export const MOCK_WORKOUTS = [
  { id: 1, type: 'Running', duration: 32, intensity: 'Moderate', date: '2026-03-27', calories: 310 },
  { id: 2, type: 'Weight Training', duration: 48, intensity: 'High', date: '2026-03-26', calories: 420 },
  { id: 3, type: 'Yoga', duration: 55, intensity: 'Low', date: '2026-03-24', calories: 180 },
  { id: 4, type: 'HIIT', duration: 25, intensity: 'High', date: '2026-03-22', calories: 380 },
  { id: 5, type: 'Cycling', duration: 60, intensity: 'Moderate', date: '2026-03-20', calories: 520 },
];

export const MOCK_WEEKLY_STATS = [
  { day: 'Mon', steps: 7200, activeMin: 28, calories: 1850, water: 6 },
  { day: 'Tue', steps: 9400, activeMin: 45, calories: 2100, water: 8 },
  { day: 'Wed', steps: 5800, activeMin: 20, calories: 1700, water: 5 },
  { day: 'Thu', steps: 11200, activeMin: 62, calories: 2300, water: 9 },
  { day: 'Fri', steps: 8700, activeMin: 38, calories: 2050, water: 7 },
  { day: 'Sat', steps: 13500, activeMin: 75, calories: 2400, water: 8 },
  { day: 'Sun', steps: 6100, activeMin: 22, calories: 1900, water: 6 },
];

export const MOCK_HEATMAP = (() => {
  const data = {};
  const now = new Date('2026-03-28');
  for (let i = 84; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const rand = Math.random();
    data[key] = rand < 0.25 ? 0 : rand < 0.45 ? 1 : rand < 0.65 ? 2 : rand < 0.82 ? 3 : 4;
  }
  return data;
})();
