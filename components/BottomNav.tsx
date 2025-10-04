
import React from 'react';
import { PencilSquareIcon, QrCodeIcon, UserGroupIcon } from './icons';

type View = 'CREATE' | 'SCAN';

interface BottomNavProps {
  activeView: View;
  setView: (view: View) => void;
  openProfileManager: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView, openProfileManager }) => {
    
  const NavItem = ({ label, icon, isActive, onClick }: { label: string, icon: React.ReactNode, isActive: boolean, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
        isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="flex-shrink-0 bg-white dark:bg-slate-900 shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)] flex justify-around">
      <NavItem
        label="Create"
        icon={<PencilSquareIcon className="w-6 h-6 mb-1" />}
        isActive={activeView === 'CREATE'}
        onClick={() => setView('CREATE')}
      />
      <NavItem
        label="Scan"
        icon={<QrCodeIcon className="w-6 h-6 mb-1" />}
        isActive={activeView === 'SCAN'}
        onClick={() => setView('SCAN')}
      />
      <NavItem
        label="Profiles"
        icon={<UserGroupIcon className="w-6 h-6 mb-1" />}
        isActive={false} // This button just opens a modal
        onClick={openProfileManager}
      />
    </nav>
  );
};

export default BottomNav;
