
import { Profile } from '../types';

export const generateVCard = (profile: Profile): string => {
  const { fullName, jobTitle, company, phone, email, website, address, photo } = profile;
  
  let vCard = 'BEGIN:VCARD\n';
  vCard += 'VERSION:3.0\n';
  if (fullName) vCard += `FN:${fullName}\n`;
  if (company) vCard += `ORG:${company}\n`;
  if (jobTitle) vCard += `TITLE:${jobTitle}\n`;
  if (phone) vCard += `TEL;TYPE=WORK,VOICE:${phone}\n`;
  if (email) vCard += `EMAIL:${email}\n`;
  if (website) vCard += `URL:${website}\n`;
  if (address) vCard += `ADR;TYPE=WORK:;;${address.replace(/\n/g, '\\n')}\n`;
  
  if (photo && photo.startsWith('data:image/')) {
    const photoData = photo.split(',')[1];
    const photoType = photo.match(/^data:image\/(png|jpeg|gif);base64,/)?.[1].toUpperCase() || 'JPEG';
    vCard += `PHOTO;TYPE=${photoType};ENCODING=b:${photoData}\n`;
  }

  vCard += 'END:VCARD';
  
  return vCard;
};
