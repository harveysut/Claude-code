import { useState } from 'react';
import './App.css';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-wrapper">
      {!user ? (
        <Onboarding onComplete={setUser} />
      ) : (
        <Dashboard user={user} onUpdateUser={setUser} />
      )}
    </div>
  );
}

export default App;
