import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MapPin, Video, Film, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center justify-around p-4 border-t border-slate-700 bg-slate-900">
      <button
        onClick={() => navigate('/')}
        className={`flex flex-col items-center ${isActive('/') ? 'text-amber-400' : 'text-slate-500'}`}
      >
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1">Home</span>
      </button>
      <button className="flex flex-col items-center text-slate-500">
        <MapPin className="w-6 h-6" />
        <span className="text-xs mt-1">Explore</span>
      </button>
      <button
        onClick={() => navigate('/live/demo')}
        className="flex flex-col items-center text-slate-500"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center -mt-4">
          <Video className="w-6 h-6 text-white" />
        </div>
      </button>
      <button className="flex flex-col items-center text-slate-500">
        <Film className="w-6 h-6" />
        <span className="text-xs mt-1">Stories</span>
      </button>
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center ${isActive('/profile') ? 'text-amber-400' : 'text-slate-500'}`}
      >
        <User className="w-6 h-6" />
        <span className="text-xs mt-1">Profile</span>
      </button>
    </div>
  );
};
