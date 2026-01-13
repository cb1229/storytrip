import React from 'react';
import { AlertTriangle, Info, AlertCircle, Clock, MapPin, Utensils } from 'lucide-react';
import { TravelAlert } from '../../types';

interface TravelAlertsProps {
  alerts: TravelAlert[];
}

export const TravelAlerts: React.FC<TravelAlertsProps> = ({ alerts }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'flight-delay':
        return <Clock className="w-5 h-5" />;
      case 'weather':
        return <AlertCircle className="w-5 h-5" />;
      case 'traffic':
        return <MapPin className="w-5 h-5" />;
      case 'recommendation':
        return <Utensils className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getAlertColors = (severity: string) => {
    switch (severity) {
      case 'urgent':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-500/30',
          text: 'text-red-400',
          icon: 'text-red-400',
        };
      case 'warning':
        return {
          bg: 'bg-amber-500/20',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          icon: 'text-amber-400',
        };
      default:
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/30',
          text: 'text-blue-400',
          icon: 'text-blue-400',
        };
    }
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-white font-semibold flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        Travel Updates
      </h3>
      {alerts.map((alert) => {
        const colors = getAlertColors(alert.severity);
        return (
          <div
            key={alert.id}
            className={`${colors.bg} ${colors.border} border rounded-xl p-4`}
          >
            <div className="flex items-start gap-3">
              <div className={colors.icon}>{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <h4 className={`${colors.text} font-semibold mb-1`}>{alert.title}</h4>
                <p className="text-slate-300 text-sm mb-2">{alert.message}</p>
                {alert.actionLabel && (
                  <button className={`${colors.text} text-sm font-medium hover:underline`}>
                    {alert.actionLabel} →
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
