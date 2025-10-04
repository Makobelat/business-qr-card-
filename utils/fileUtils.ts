
export const downloadQR = (qrId: string, format: 'png' | 'svg', fileName: string) => {
  const svgElement = document.getElementById(qrId) as HTMLElement | null;
  if (!svgElement) {
      console.error('QR code element not found');
      return;
  }
  
  // The qrcode.react library might render a canvas or an svg. We need to find the right element.
  const svg = svgElement.querySelector('svg');
  if (!svg) {
      console.error('SVG element within QR code not found');
      return;
  }

  const svgString = new XMLSerializer().serializeToString(svg);
  const safeFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'business-card-qr';

  if (format === 'svg') {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${safeFileName}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } else if (format === 'png') {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width * 2; // for better resolution
      canvas.height = img.height * 2;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `${safeFileName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }
};
