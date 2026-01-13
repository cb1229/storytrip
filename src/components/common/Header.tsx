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
    <div className="flex items-center justify-between px-4 py-3 bg-nfl-navy border-b border-nfl-navyLight shadow-md">
      {showBack && (
        <ChevronLeft
          className="w-6 h-6 text-white cursor-pointer hover:text-nfl-red transition-colors"
          onClick={() => navigate(-1)}
        />
      )}
      {showMenu && <Menu className="w-6 h-6 text-white" />}
      {!showBack && !showMenu && <div className="w-6" />}

      {title && (
        <div className="flex-1 text-center">
          <p className="text-white font-bold text-lg tracking-tight">{title}</p>
          {subtitle && <p className="text-nfl-silver text-xs mt-0.5">{subtitle}</p>}
        </div>
      )}
      {!title && (
        <span className="flex-1 text-center text-xl font-black tracking-tight text-white">
          STORYTRIP
        </span>
      )}

      {rightIcon && onRightIconClick && (
        <div onClick={onRightIconClick} className="cursor-pointer text-white hover:text-nfl-red transition-colors">
          {rightIcon}
        </div>
      )}
      {showNotifications && <Bell className="w-6 h-6 text-white hover:text-nfl-red transition-colors cursor-pointer" />}
      {!rightIcon && !showNotifications && <div className="w-6" />}
    </div>
  );
};
