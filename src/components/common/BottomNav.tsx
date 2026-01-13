import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, MapPin, Video, Film, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex items-center justify-around px-4 py-3 border-t border-nfl-mediumGray bg-white shadow-card">
      <button
        onClick={() => navigate('/')}
        className={`flex flex-col items-center ${isActive('/') ? 'text-nfl-red' : 'text-nfl-darkGray'}`}
      >
        <Home className="w-6 h-6" />
        <span className="text-xs mt-1 font-semibold">Home</span>
      </button>
      <button className="flex flex-col items-center text-nfl-darkGray">
        <MapPin className="w-6 h-6" />
        <span className="text-xs mt-1 font-semibold">Explore</span>
      </button>
      <button
        onClick={() => navigate('/live/demo')}
        className="flex flex-col items-center text-nfl-darkGray"
      >
        <div className="w-14 h-14 rounded-full bg-nfl-red flex items-center justify-center -mt-6 shadow-lg">
          <Video className="w-7 h-7 text-white" />
        </div>
      </button>
      <button className="flex flex-col items-center text-nfl-darkGray">
        <Film className="w-6 h-6" />
        <span className="text-xs mt-1 font-semibold">Stories</span>
      </button>
      <button
        onClick={() => navigate('/profile')}
        className={`flex flex-col items-center ${isActive('/profile') ? 'text-nfl-red' : 'text-nfl-darkGray'}`}
      >
        <User className="w-6 h-6" />
        <span className="text-xs mt-1 font-semibold">Profile</span>
      </button>
    </div>
  );
};
