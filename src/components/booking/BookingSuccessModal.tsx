import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles } from 'lucide-react';

interface BookingSuccessModalProps {
  bookingDetails: {
    total: number;
    travelers: number;
    gameDate: string;
  };
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({ bookingDetails }) => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([]);

  useEffect(() => {
    // Generate confetti
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['bg-amber-400', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-green-500'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 animate-fade-in">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className={`absolute w-2 h-2 ${piece.color} animate-confetti`}
            style={{
              left: `${piece.left}%`,
              top: '-10px',
              animationDelay: `${piece.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Modal Content */}
      <div className="bg-slate-900 rounded-2xl p-8 max-w-sm w-full relative z-10 animate-scale-in">
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h2>
          <p className="text-slate-400 mb-6">Your story begins now</p>

          {/* Trip Details */}
          <div className="w-full bg-slate-800 rounded-xl p-4 mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Confirmation #:</span>
              <span className="text-white font-mono">ST-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Travelers:</span>
              <span className="text-white">{bookingDetails.travelers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Game Date:</span>
              <span className="text-white">{bookingDetails.gameDate}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-slate-700">
              <span className="text-slate-400">Total Paid:</span>
              <span className="text-green-400 font-bold">${bookingDetails.total}</span>
            </div>
          </div>

          {/* Story Package Info */}
          <div className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-semibold">Story Package Included</span>
            </div>
            <p className="text-sm text-slate-300">
              Get ready for AI-guided capture prompts during your trip. Your documentary will be delivered 72 hours after return!
            </p>
          </div>

          {/* Actions */}
          <div className="w-full space-y-3">
            <button
              onClick={() => navigate('/live/confirmed')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold"
            >
              Prepare for Your Trip
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 rounded-xl bg-slate-800 text-white font-medium"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
