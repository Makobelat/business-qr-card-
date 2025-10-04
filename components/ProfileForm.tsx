import React, { useState, ChangeEvent, useEffect } from 'react';
import { Profile } from '../types';
import { UserIcon, BriefcaseIcon, BuildingIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, ChatBubbleLeftRightIcon, PhotoIcon } from './icons';

interface ProfileFormProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
}

const InputField = ({ id, name, value, onChange, placeholder, icon, type = 'text' }: { id: string, name: string, value: string, onChange: (e: any) => void, placeholder: string, icon: React.ReactNode, type?: string }) => (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        {icon}
      </span>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
      />
    </div>
);

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<Profile>(profile);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-center">Your Digital Card</h2>
        <p className="text-center text-slate-500 dark:text-slate-400">Fill in your details to create a QR code.</p>
      </div>

      {/* Live Preview */}
      <div className="bg-white dark:bg-slate-900/50 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">
            {formData.photo ? <img src={formData.photo} alt="Profile Preview" className="w-full h-full object-cover" /> : <UserIcon className="w-8 h-8 text-slate-400" />}
          </div>
          <div>
            <h3 className="font-bold text-lg truncate">{formData.fullName || "Your Name"}</h3>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">{formData.jobTitle || "Job Title"}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{formData.company || "Company"}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Profile Name (e.g. Work)" icon={<BriefcaseIcon className="w-5 h-5" />} />
        <InputField id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" icon={<UserIcon className="w-5 h-5" />} />
        <InputField id="jobTitle" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" icon={<BriefcaseIcon className="w-5 h-5" />} />
        <InputField id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Company" icon={<BuildingIcon className="w-5 h-5" />} />
        <InputField id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" type="tel" icon={<PhoneIcon className="w-5 h-5" />} />
        <InputField id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" icon={<EnvelopeIcon className="w-5 h-5" />} />
        <InputField id="website" name="website" value={formData.website} onChange={handleChange} placeholder="Website" type="url" icon={<GlobeAltIcon className="w-5 h-5" />} />
        <InputField id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Address" icon={<MapPinIcon className="w-5 h-5" />} />
        <InputField id="tagline" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="Custom Message / Tagline" icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} />

        <div>
          <label htmlFor="photo-upload" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Profile Photo/Logo</label>
          <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <PhotoIcon className="mx-auto h-12 w-12 text-slate-400" />
              <div className="flex text-sm text-slate-600 dark:text-slate-400">
                <label htmlFor="photo-upload" className="relative cursor-pointer bg-white dark:bg-slate-700 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input id="photo-upload" name="photo-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/gif" onChange={handlePhotoChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500">PNG, JPG, GIF up to 1MB</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-800 transition-transform transform hover:scale-105">
          Save & Generate QR
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;