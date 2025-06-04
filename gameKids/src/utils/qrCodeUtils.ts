// Generate a URL for the QR code of a specific game
export const generateQRCodeURL = (gamePath: string): string => {
  const baseUrl = window.location.origin;
  const fullUrl = `${baseUrl}${gamePath}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`;
};

// Generate a simple filename for downloading the QR code
export const generateQRCodeFileName = (gameName: string): string => {
  return `qrcode-${gameName.toLowerCase().replace(/\s+/g, '-')}.png`;
};

// Download the QR code image
export const downloadQRCode = async (qrCodeUrl: string, fileName: string): Promise<void> => {
  try {
    const response = await fetch(qrCodeUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw error;
  }
};