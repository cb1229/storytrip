import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets } from 'lucide-react';
import { WeatherForecast } from '../../types';

interface WeatherCardProps {
  forecast: WeatherForecast;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ forecast }) => {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-12 h-12 text-amber-400" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-12 h-12 text-blue-400" />;
      case 'cloudy':
      case 'overcast':
        return <Cloud className="w-12 h-12 text-slate-400" />;
      default:
        return <Sun className="w-12 h-12 text-amber-400" />;
    }
  };

  const getWeatherAdvice = (condition: string, temp: number) => {
    if (condition.toLowerCase().includes('rain')) {
      return 'Bring an umbrella and rain jacket';
    }
    if (temp < 40) {
      return 'Bundle up! It will be cold';
    }
    if (temp > 85) {
      return 'Stay hydrated and wear sunscreen';
    }
    return 'Perfect weather for the game!';
  };

  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-500/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm">{forecast.city}</p>
          <p className="text-white text-2xl font-bold">{forecast.temp}°F</p>
          <p className="text-slate-300 text-sm">{forecast.condition}</p>
        </div>
        <div>{getWeatherIcon(forecast.condition)}</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-800/50 rounded-xl p-3 text-center">
          <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-white text-sm font-medium">{forecast.precipitation}%</p>
          <p className="text-slate-400 text-xs">Rain</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-3 text-center">
          <Wind className="w-5 h-5 text-slate-400 mx-auto mb-1" />
          <p className="text-white text-sm font-medium">{forecast.wind} mph</p>
          <p className="text-slate-400 text-xs">Wind</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-3 text-center">
          <Cloud className="w-5 h-5 text-slate-400 mx-auto mb-1" />
          <p className="text-white text-sm font-medium">{forecast.date}</p>
          <p className="text-slate-400 text-xs">Date</p>
        </div>
      </div>

      <div className="bg-amber-500/20 border border-amber-500/30 rounded-xl p-3">
        <p className="text-amber-200 text-sm text-center">
          💡 {getWeatherAdvice(forecast.condition, forecast.temp)}
        </p>
      </div>
    </div>
  );
};
