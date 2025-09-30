import React from 'react';

type View = 'dashboard' | 'history' | 'map' | 'ai';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

// FIX: Changed icon type from React.ReactElement to JSX.Element. This resolves an issue where React.cloneElement couldn't add a 'className' prop because the element's props were being inferred as 'unknown'.
const NavItem: React.FC<{
  view: View;
  label: string;
  icon: JSX.Element;
  currentView: View;
  onClick: () => void;
}> = ({ view, label, icon, currentView, onClick }) => {
  const isActive = currentView === view;
  return (
    <li>
      <button
        onClick={onClick}
        className={`flex w-full items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-sky-600 text-white shadow-md'
            : 'text-gray-400 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {React.cloneElement(icon, { className: 'w-6 h-6 mr-3' })}
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  // FIX: Added 'as const' to correctly infer the literal type of 'view' (e.g., 'dashboard') instead of the general 'string' type. This aligns with the 'setCurrentView' function's expected 'View' parameter type.
  const navItems = [
    { view: 'dashboard', label: 'Bảng điều khiển', icon: <DashboardIcon /> },
    { view: 'history', label: 'Lịch sử Dữ liệu', icon: <HistoryIcon /> },
    { view: 'map', label: 'Bản đồ Trạm', icon: <MapIcon /> },
    { view: 'ai', label: 'Trợ lý AI', icon: <AiIcon /> },
  ] as const;

  return (
    <aside className="w-64 bg-slate-800 p-4 flex flex-col shadow-lg">
      <div className="flex items-center mb-8">
        <WaterDropIcon className="w-10 h-10 text-sky-400" />
        <h1 className="ml-2 text-xl font-bold text-white">Aqua-IoT</h1>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <NavItem
              key={item.view}
              view={item.view}
              label={item.label}
              icon={item.icon}
              currentView={currentView}
              onClick={() => setCurrentView(item.view)}
            />
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-2 bg-slate-700 rounded-lg text-center">
        <p className="text-sm text-gray-400">© 2024 Aqua-IoT Inc.</p>
      </div>
    </aside>
  );
};

// SVG Icons
const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
);
const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);
const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const AiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.636-6.364l.707.707M19.414 4.586L18 6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.5V19.5" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21.5L9.5 20" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21.5L14.5 20" /></svg>
);
const WaterDropIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.32 0L12 2.69zM12 17.67a6 6 0 0 0 4.24-1.76A6 6 0 0 0 12 4.34a6 6 0 0 0-4.24 9.57A6 6 0 0 0 12 17.67z" /></svg>
);


export default Sidebar;