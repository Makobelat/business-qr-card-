
export interface Profile {
  id: string;
  name: string; // Internal name for the profile, e.g., "Work" or "Personal"
  fullName: string;
  jobTitle: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  tagline: string;
  photo?: string; // base64 encoded image string
}
