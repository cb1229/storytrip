import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Check } from 'lucide-react';
import { BookingFormData } from '../../types';

const bookingSchema = z.object({
  travelers: z.number().min(1).max(10),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  specialRequests: z.string().optional(),
  departureAirport: z.string().min(3, 'Please enter an airport code'),
  preferredDepartureTime: z.enum(['morning', 'afternoon', 'evening']),
  hotelPreference: z.enum(['budget', 'mid-range', 'luxury']),
  roomType: z.enum(['single', 'double', 'suite']),
  paymentMethod: z.enum(['card', 'paypal']),
});

interface BookingModalProps {
  onClose: () => void;
  narrativeId: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ onClose, narrativeId }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      travelers: 1,
      preferredDepartureTime: 'morning',
      hotelPreference: 'mid-range',
      roomType: 'double',
      paymentMethod: 'card',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Booking data:', data);
    setIsSubmitting(false);
    navigate('/live/demo');
  };

  const travelers = watch('travelers');

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-white font-bold text-lg">Complete Your Booking</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 p-4 bg-slate-800/50">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${
                s <= step ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-auto p-4 space-y-4">
          {step === 1 && (
            <>
              <h3 className="text-white font-semibold text-lg mb-4">Traveler Information</h3>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Number of Travelers
                </label>
                <input
                  type="number"
                  {...register('travelers', { valueAsNumber: true })}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
                {errors.travelers && (
                  <p className="text-red-400 text-sm mt-1">{errors.travelers.message}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  {...register('specialRequests')}
                  rows={3}
                  placeholder="Any special accommodations or preferences..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-white font-semibold text-lg mb-4">Travel Preferences</h3>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Departure Airport
                </label>
                <input
                  type="text"
                  {...register('departureAirport')}
                  placeholder="e.g., PHL"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 uppercase"
                />
                {errors.departureAirport && (
                  <p className="text-red-400 text-sm mt-1">{errors.departureAirport.message}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Preferred Departure Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['morning', 'afternoon', 'evening'].map((time) => (
                    <label
                      key={time}
                      className="relative flex items-center justify-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        {...register('preferredDepartureTime')}
                        value={time}
                        className="sr-only peer"
                      />
                      <div className="w-full py-3 px-4 bg-slate-800 border border-slate-700 rounded-xl text-center text-slate-300 peer-checked:bg-amber-500 peer-checked:border-amber-500 peer-checked:text-white transition-all">
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Hotel Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['budget', 'mid-range', 'luxury'].map((pref) => (
                    <label
                      key={pref}
                      className="relative flex items-center justify-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        {...register('hotelPreference')}
                        value={pref}
                        className="sr-only peer"
                      />
                      <div className="w-full py-3 px-4 bg-slate-800 border border-slate-700 rounded-xl text-center text-slate-300 text-sm peer-checked:bg-amber-500 peer-checked:border-amber-500 peer-checked:text-white transition-all">
                        {pref === 'mid-range' ? 'Mid-Range' : pref.charAt(0).toUpperCase() + pref.slice(1)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Room Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['single', 'double', 'suite'].map((type) => (
                    <label
                      key={type}
                      className="relative flex items-center justify-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        {...register('roomType')}
                        value={type}
                        className="sr-only peer"
                      />
                      <div className="w-full py-3 px-4 bg-slate-800 border border-slate-700 rounded-xl text-center text-slate-300 peer-checked:bg-amber-500 peer-checked:border-amber-500 peer-checked:text-white transition-all">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="text-white font-semibold text-lg mb-4">Review & Payment</h3>

              <div className="bg-slate-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Travelers</span>
                  <span className="text-white font-medium">{travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Flight</span>
                  <span className="text-white font-medium">$450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hotel (2 nights)</span>
                  <span className="text-white font-medium">$320</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience Package</span>
                  <span className="text-white font-medium">$77</span>
                </div>
                <div className="border-t border-slate-700 pt-3 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-amber-400 font-bold text-xl">
                    ${847 * travelers}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['card', 'paypal'].map((method) => (
                    <label
                      key={method}
                      className="relative flex items-center justify-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        {...register('paymentMethod')}
                        value={method}
                        className="sr-only peer"
                      />
                      <div className="w-full py-3 px-4 bg-slate-800 border border-slate-700 rounded-xl text-center text-slate-300 peer-checked:bg-amber-500 peer-checked:border-amber-500 peer-checked:text-white transition-all">
                        {method === 'card' ? 'Credit Card' : 'PayPal'}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Story Package Included</p>
                    <p className="text-purple-200 text-sm mt-1">
                      AI-guided capture prompts, automatic documentary editing, and your finished
                      film delivered within 72 hours.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </form>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900 flex gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 rounded-xl bg-slate-700 text-white font-medium hover:bg-slate-600 transition-all"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
