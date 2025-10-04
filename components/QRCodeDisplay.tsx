
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Profile } from '../types';
import { generateVCard } from '../services/vCardService';
import { downloadQR } from '../utils/fileUtils';
import { UserIcon, BriefcaseIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, ArrowDownTrayIcon, CodeBracketIcon } from './icons';

interface QRCodeDisplayProps {
  profile: Profile;
  onBack: () => void;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ profile, onBack }) => {
  const vCardData = generateVCard(profile);
  const qrId = `qr-code-${profile.id}`;

  return (
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900/50 p-6 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 text-center">
        <h2 className="text-2xl font-bold mb-2">{profile.fullName}</h2>
        <p className="text-indigo-500 dark:text-indigo-400 mb-4">{profile.jobTitle} at {profile.company}</p>
        
        <div id={qrId} className="p-4 bg-white rounded-lg inline-block">
            <QRCodeSVG value={vCardData} size={256} includeMargin={true} />
        </div>

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Scan this code to save contact details.</p>
      </div>

      <div className="w-full max-w-sm space-y-2">
        <button onClick={() => downloadQR(qrId, 'png', profile.fullName)} className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-slate-800">
          <ArrowDownTrayIcon className="w-5 h-5 mr-2"/> Download PNG
        </button>
        <button onClick={() => downloadQR(qrId, 'svg', profile.fullName)} className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800">
          <CodeBracketIcon className="w-5 h-5 mr-2"/> Download SVG
        </button>
      </div>

      <div className="w-full max-w-sm bg-white dark:bg-slate-900/50 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 space-y-3 text-sm">
        <h3 className="font-bold text-center border-b pb-2 dark:border-slate-700">Contact Details</h3>
        {profile.phone && <p className="flex items-center"><PhoneIcon className="w-4 h-4 mr-2 text-slate-400"/> {profile.phone}</p>}
        {profile.email && <p className="flex items-center"><EnvelopeIcon className="w-4 h-4 mr-2 text-slate-400"/> {profile.email}</p>}
        {profile.website && <p className="flex items-center"><GlobeAltIcon className="w-4 h-4 mr-2 text-slate-400"/> {profile.website}</p>}
        {profile.address && <p className="flex items-center"><MapPinIcon className="w-4 h-4 mr-2 text-slate-400"/> {profile.address}</p>}
      </div>

      <button onClick={onBack} className="text-indigo-600 dark:text-indigo-400 hover:underline">
        &larr; Back to Edit
      </button>
    </div>
  );
};

export default QRCodeDisplay;
