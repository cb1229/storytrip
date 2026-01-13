import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Beer,
  Plane,
  Hotel,
  Coffee,
  Users,
  Car,
  MapPin,
  Trophy,
  Music,
  Home,
  Film,
} from 'lucide-react';
import { Header } from '../components/common/Header';
import { sampleItinerary } from '../data/itineraries';
import { BookingModal } from '../components/booking/BookingModal';

const iconMap = {
  Beer,
  Plane,
  Hotel,
  Coffee,
  Users,
  Car,
  MapPin,
  Trophy,
  Music,
  Home,
};

export const TripDetailsPage: React.FC = () => {
  const { narrativeId } = useParams<{ narrativeId: string }>();
  const [tripDay, setTripDay] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="p-4 border-b border-slate-700">
        <Header showBack />
        <div className="text-center mb-4">
          <p className="text-amber-400 text-sm font-medium">RIVALRY CONQUEST</p>
          <p className="text-white font-bold">The Invasion of Dallas</p>
        </div>

        {/* Day Selector */}
        <div className="flex gap-2">
          {[1, 2, 3].map((day) => (
            <button
              key={day}
              onClick={() => setTripDay(day)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                tripDay === day
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              Day {day}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">{sampleItinerary[tripDay].title}</h2>
          <p className="text-slate-400 text-sm">
            {tripDay === 1 ? 'Friday, Nov 8' : tripDay === 2 ? 'Saturday, Nov 9' : 'Sunday, Nov 10'}
          </p>
        </div>

        <div className="space-y-4">
          {sampleItinerary[tripDay].events.map((event, i) => {
            const Icon = iconMap[event.iconName as keyof typeof iconMap];
            const isClimax = event.type === 'climax';
            return (
              <div key={i} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isClimax
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                        : event.type === 'story'
                        ? 'bg-purple-500/20 border border-purple-500'
                        : 'bg-slate-700'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isClimax
                          ? 'text-white'
                          : event.type === 'story'
                          ? 'text-purple-400'
                          : 'text-slate-400'
                      }`}
                    />
                  </div>
                  {i < sampleItinerary[tripDay].events.length - 1 && (
                    <div className="w-0.5 h-16 bg-slate-700 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div
                    className={`rounded-xl p-4 ${
                      isClimax
                        ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30'
                        : 'bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p
                        className={`font-semibold ${
                          isClimax ? 'text-amber-400 text-lg' : 'text-white'
                        }`}
                      >
                        {event.title}
                      </p>
                      <span className="text-slate-400 text-sm">{event.time}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{event.location}</p>

                    {(event.type === 'story' || isClimax) && (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700">
                        <Film className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 text-sm">{event.story}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 border-t border-slate-700 bg-slate-900">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-slate-400 text-sm">Estimated Total</p>
            <p className="text-white text-xl font-bold">$847</p>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">3 days • 2 nights</p>
            <p className="text-green-400 text-sm">$124 saved vs booking separately</p>
          </div>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg"
        >
          Book This Story
        </button>
      </div>

      {showBookingModal && (
        <BookingModal onClose={() => setShowBookingModal(false)} narrativeId={narrativeId || ''} />
      )}
    </div>
  );
};
