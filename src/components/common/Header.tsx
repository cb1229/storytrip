import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, Bell } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBack = false,
  showMenu = false,
  showNotifications = false,
  rightIcon,
  onRightIconClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-700">
      {showBack && (
        <ChevronLeft
          className="w-6 h-6 text-slate-400 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      )}
      {showMenu && <Menu className="w-6 h-6 text-slate-400" />}
      {!showBack && !showMenu && <div className="w-6" />}

      {title && (
        <div className="flex-1 text-center">
          <p className="text-white font-semibold">{title}</p>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>
      )}
      {!title && (
        <span className="flex-1 text-center text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
          StoryTrip
        </span>
      )}

      {rightIcon && onRightIconClick && (
        <div onClick={onRightIconClick} className="cursor-pointer">
          {rightIcon}
        </div>
      )}
      {showNotifications && <Bell className="w-6 h-6 text-slate-400" />}
      {!rightIcon && !showNotifications && <div className="w-6" />}
    </div>
  );
};
