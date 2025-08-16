import React, { useState } from 'react';
import { Download } from 'lucide-react';

interface QRCodeGeneratorProps {
  gameUrl: string;
  gameName: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ gameUrl, gameName }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // The full URL including the current domain and the game path
  const fullUrl = `${window.location.origin}${gameUrl}`;
  
  // Create the QR code URL using the QR code API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`;
  
  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode-${gameName.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading QR code:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-3xl shadow-card border-4 border-accent flex flex-col items-center max-w-xs mx-auto">
      <h3 className="text-xl font-baloo text-primary font-extrabold mb-2 text-center drop-shadow">
        Acesse este jogo no celular
      </h3>
      <img 
        src={qrCodeUrl} 
        alt={`QR Code para ${gameName}`} 
        className="mx-auto mb-4 rounded-2xl border-2 border-accent shadow-lg bg-accent/10"
        width="150"
        height="150"
      />
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className="btn-kids flex items-center gap-2 mt-2 bg-primary hover:bg-pink disabled:opacity-50"
      >
        {isLoading ? 'Baixando...' : 'Baixar QR Code'}
        {!isLoading && <Download size={18} className="ml-2" />}
      </button>
    </div>
  );
};

export default QRCodeGenerator;