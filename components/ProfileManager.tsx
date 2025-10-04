
import React from 'react';
import { Profile } from '../types';
import { PlusIcon, TrashIcon, XMarkIcon } from './icons';

interface ProfileManagerProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  activeProfileId: string | null;
  onAddProfile: () => void;
  onDeleteProfile: (id: string) => void;
  onSelectProfile: (id: string) => void;
}

const ProfileManager: React.FC<ProfileManagerProps> = ({
  isOpen,
  onClose,
  profiles,
  activeProfileId,
  onAddProfile,
  onDeleteProfile,
  onSelectProfile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-sm animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">Manage Profiles</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 max-h-80 overflow-y-auto">
          <ul className="space-y-2">
            {profiles.map((profile) => (
              <li
                key={profile.id}
                className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
                  profile.id === activeProfileId
                    ? 'bg-indigo-100 dark:bg-indigo-900/50'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span onClick={() => onSelectProfile(profile.id)} className="flex-grow font-medium">
                  {profile.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if(window.confirm(`Are you sure you want to delete profile "${profile.name}"?`)) {
                        onDeleteProfile(profile.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full"
                  aria-label={`Delete ${profile.name}`}
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 border-t dark:border-slate-700">
          <button
            onClick={onAddProfile}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
