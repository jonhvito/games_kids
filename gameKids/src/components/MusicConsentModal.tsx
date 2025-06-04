import React from 'react';

interface MusicConsentModalProps {
  onAccept: () => void;
}

const MusicConsentModal: React.FC<MusicConsentModalProps> = ({ onAccept }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
      <h2 className="text-xl font-bold mb-3 text-blue-700">Música de Fundo</h2>
      <p className="mb-4 text-gray-700">
        Este site possui música de fundo para tornar a experiência mais divertida.<br />
        Você pode ativar ou desativar o som a qualquer momento pelo botão no canto inferior direito.
      </p>
      <button
        onClick={onAccept}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
      >
        Ok, entendi!
      </button>
    </div>
  </div>
);

export default MusicConsentModal;