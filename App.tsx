
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import HistoryView from './components/HistoryView';
import MapView from './components/MapView';
import AiAssistantView from './components/AiAssistantView';
import { SENSOR_LOCATIONS, HISTORICAL_DATA, ALERTS } from './constants';

type View = 'dashboard' | 'history' | 'map' | 'ai';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView sensors={SENSOR_LOCATIONS} alerts={ALERTS} historicalData={HISTORICAL_DATA} />;
      case 'history':
        return <HistoryView sensors={SENSOR_LOCATIONS} historicalData={HISTORICAL_DATA} />;
      case 'map':
        return <MapView sensors={SENSOR_LOCATIONS} />;
      case 'ai':
        return <AiAssistantView />;
      default:
        return <DashboardView sensors={SENSOR_LOCATIONS} alerts={ALERTS} historicalData={HISTORICAL_DATA} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
