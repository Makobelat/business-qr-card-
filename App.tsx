
import React, { useState, useEffect, useMemo } from 'react';
import { Profile } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import ProfileForm from './components/ProfileForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import QRScanner from './components/QRScanner';
import ProfileManager from './components/ProfileManager';
import BottomNav from './components/BottomNav';

type View = 'CREATE' | 'SCAN';

const generateId = () => `profile_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`;

const defaultProfile: Profile = {
  id: generateId(),
  name: 'My Business Card',
  fullName: '',
  jobTitle: '',
  company: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  tagline: '',
  photo: undefined,
};

const App: React.FC = () => {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');
  const [profiles, setProfiles] = useLocalStorage<Profile[]>('profiles', [defaultProfile]);
  const [activeProfileId, setActiveProfileId] = useLocalStorage<string | null>('activeProfileId', defaultProfile.id);
  const [view, setView] = useState<View>('CREATE');
  const [showQr, setShowQr] = useState(false);
  const [isProfileManagerOpen, setProfileManagerOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const activeProfile = useMemo(() => {
    return profiles.find(p => p.id === activeProfileId) || profiles[0] || defaultProfile;
  }, [profiles, activeProfileId]);

  const handleSaveProfile = (updatedProfile: Profile) => {
    const profileExists = profiles.some(p => p.id === updatedProfile.id);
    if (profileExists) {
      setProfiles(profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p));
    } else {
      setProfiles([...profiles, updatedProfile]);
    }
    setActiveProfileId(updatedProfile.id);
    setShowQr(true);
  };
  
  const handleAddProfile = () => {
    const newProfile = { ...defaultProfile, id: generateId(), name: `Profile ${profiles.length + 1}` };
    setProfiles([...profiles, newProfile]);
    setActiveProfileId(newProfile.id);
    setShowQr(false);
    setView('CREATE');
    setProfileManagerOpen(false);
  };
  
  const handleDeleteProfile = (id: string) => {
    if (profiles.length === 1) {
        alert("Cannot delete the last profile.");
        return;
    }
    const newProfiles = profiles.filter(p => p.id !== id);
    setProfiles(newProfiles);
    if (activeProfileId === id) {
        setActiveProfileId(newProfiles[0]?.id || null);
    }
  };

  const handleSelectProfile = (id: string) => {
      setActiveProfileId(id);
      setShowQr(false);
      setView('CREATE');
      setProfileManagerOpen(false);
  }


  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
        <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-800 shadow-2xl min-h-screen flex flex-col">
            <Header theme={theme} toggleTheme={toggleTheme} />
            <main className="flex-grow p-4 sm:p-6 overflow-y-auto">
                {view === 'CREATE' && (
                    showQr && activeProfile ?
                    <QRCodeDisplay profile={activeProfile} onBack={() => setShowQr(false)} /> :
                    <ProfileForm key={activeProfile?.id} profile={activeProfile} onSave={handleSaveProfile} />
                )}
                {view === 'SCAN' && <QRScanner />}
            </main>
            <BottomNav activeView={view} setView={setView} openProfileManager={() => setProfileManagerOpen(true)} />
            <ProfileManager 
                isOpen={isProfileManagerOpen}
                onClose={() => setProfileManagerOpen(false)}
                profiles={profiles}
                activeProfileId={activeProfileId}
                onAddProfile={handleAddProfile}
                onDeleteProfile={handleDeleteProfile}
                onSelectProfile={handleSelectProfile}
            />
        </div>
    </div>
  );
};

export default App;
