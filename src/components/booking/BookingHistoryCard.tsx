import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Calendar, Users, MapPin, Plane, Hotel, DollarSign } from 'lucide-react';
import { BookingHistory } from '../../types';

interface BookingHistoryCardProps {
  booking: BookingHistory;
}

export const BookingHistoryCard: React.FC<BookingHistoryCardProps> = ({ booking }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
      {/* Collapsed View */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 cursor-pointer hover:bg-slate-700/50 transition-all"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">{booking.tripTitle}</h3>
            <p className="text-slate-400 text-sm">{booking.narrativeType}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{booking.gameInfo.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{booking.gameInfo.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{booking.travelers}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs">Confirmation #</p>
            <p className="text-white font-mono text-sm">{booking.confirmationNumber}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-slate-400 text-xs">Total</p>
              <p className="text-green-400 font-bold text-lg">${booking.total}</p>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-slate-700 p-4 space-y-4 animate-fade-in">
          {/* Game Info */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              Game Details
            </h4>
            <div className="bg-slate-900 rounded-xl p-3 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Matchup</span>
                <span className="text-white">
                  {booking.gameInfo.awayTeam} @ {booking.gameInfo.homeTeam}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Venue</span>
                <span className="text-white">{booking.gameInfo.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date</span>
                <span className="text-white">{booking.gameInfo.date}</span>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          {booking.bookingDetails.flights && (
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Plane className="w-4 h-4 text-blue-400" />
                Flight Details
              </h4>
              <div className="space-y-2">
                <div className="bg-slate-900 rounded-xl p-3 text-sm">
                  <p className="text-slate-400 mb-1">Departure</p>
                  <div className="flex justify-between text-white">
                    <span>{booking.bookingDetails.flights.departure.departure.airport}</span>
                    <span>→</span>
                    <span>{booking.bookingDetails.flights.departure.arrival.airport}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    {booking.bookingDetails.flights.departure.airline} •{' '}
                    {booking.bookingDetails.flights.departure.departure.time}
                  </p>
                </div>
                <div className="bg-slate-900 rounded-xl p-3 text-sm">
                  <p className="text-slate-400 mb-1">Return</p>
                  <div className="flex justify-between text-white">
                    <span>{booking.bookingDetails.flights.return.departure.airport}</span>
                    <span>→</span>
                    <span>{booking.bookingDetails.flights.return.arrival.airport}</span>
                  </div>
                  <p className="text-slate-500 text-xs mt-1">
                    {booking.bookingDetails.flights.return.airline} •{' '}
                    {booking.bookingDetails.flights.return.departure.time}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hotel Details */}
          {booking.bookingDetails.hotel && (
            <div>
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <Hotel className="w-4 h-4 text-purple-400" />
                Hotel Details
              </h4>
              <div className="bg-slate-900 rounded-xl p-3 space-y-1 text-sm">
                <p className="text-white font-medium">{booking.bookingDetails.hotel.name}</p>
                <p className="text-slate-400 text-xs">{booking.bookingDetails.hotel.address}</p>
                <div className="flex justify-between pt-2 border-t border-slate-700 mt-2">
                  <span className="text-slate-400">Check-in</span>
                  <span className="text-white">{booking.bookingDetails.hotel.checkIn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Check-out</span>
                  <span className="text-white">{booking.bookingDetails.hotel.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Room Type</span>
                  <span className="text-white capitalize">{booking.bookingDetails.hotel.roomType}</span>
                </div>
              </div>
            </div>
          )}

          {/* Price Breakdown */}
          <div>
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              Price Breakdown
            </h4>
            <div className="bg-slate-900 rounded-xl p-3 space-y-2 text-sm">
              {booking.bookingDetails.flights && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Flights ({booking.travelers}x)</span>
                  <span className="text-white">
                    ${booking.bookingDetails.flights.departure.price * booking.travelers}
                  </span>
                </div>
              )}
              {booking.bookingDetails.hotel && (
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Hotel ({booking.bookingDetails.nightsCount} nights)
                  </span>
                  <span className="text-white">${booking.bookingDetails.hotel.price}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Experience Package</span>
                <span className="text-white">$77</span>
              </div>
              <div className="border-t border-slate-700 pt-2 flex justify-between font-bold">
                <span className="text-white">Total</span>
                <span className="text-green-400">${booking.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
