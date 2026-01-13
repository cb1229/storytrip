import React, { useState } from 'react';
import { Home, MapPin, Video, Camera, Mic, Play, ChevronRight, ChevronLeft, Calendar, Users, DollarSign, Plane, Hotel, Check, Clock, Share2, Download, Star, Menu, Bell, User, Plus, Film, Heart, Trophy, Swords, BookOpen, Sparkles, Navigation, Coffee, Beer, Car, Music, Sun, Moon, AlertCircle } from 'lucide-react';

export default function StoryTripMockup() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedStory, setSelectedStory] = useState(null);
  const [tripDay, setTripDay] = useState(1);
  const [captureMode, setCaptureMode] = useState('video');
  const [showNotification, setShowNotification] = useState(false);

  const narratives = [
    { id: 'rivalry', icon: Swords, title: 'Rivalry Conquest', tagline: '"We came. We saw. We conquered."', color: 'from-red-500 to-orange-500', desc: 'Invade enemy territory and claim victory' },
    { id: 'family', icon: Heart, title: 'Family Legacy', tagline: '"Three generations, one team, forever."', color: 'from-purple-500 to-pink-500', desc: 'Connect generations through shared passion' },
    { id: 'underdog', icon: Trophy, title: 'Underdog Redemption', tagline: '"Against all odds..."', color: 'from-green-500 to-teal-500', desc: 'Triumph when no one believed' },
    { id: 'origin', icon: BookOpen, title: 'The Origin Story', tagline: '"This is where it all began..."', color: 'from-blue-500 to-indigo-500', desc: 'Discover your team\'s roots' },
    { id: 'bucket', icon: Star, title: 'Bucket List Quest', tagline: '"30 stadiums. One lifetime."', color: 'from-yellow-500 to-amber-500', desc: 'Epic achievement unlocked' },
    { id: 'custom', icon: Sparkles, title: 'Custom Story', tagline: '"Your narrative, your way"', color: 'from-gray-500 to-slate-500', desc: 'Create your own adventure' },
  ];

  const itinerary = {
    1: {
      title: 'ACT I: The Gathering',
      events: [
        { time: '6:00 PM', title: 'The War Room', location: 'PHL Airport Bar', icon: Beer, story: 'Meet fellow fans, record your pre-battle speech', type: 'story' },
        { time: '8:30 PM', title: 'Entering Enemy Territory', location: 'Flight to DFW', icon: Plane, story: 'First steps on rival soil', type: 'travel' },
        { time: '11:00 PM', title: 'Base Camp', location: 'Hotel Check-in', icon: Hotel, story: 'Rest before the battle', type: 'lodging' },
      ]
    },
    2: {
      title: 'ACT II: The Conquest',
      events: [
        { time: '9:00 AM', title: 'Scouting the Land', location: 'Local Diner', icon: Coffee, story: 'Observe enemy territory over breakfast', type: 'food' },
        { time: '11:00 AM', title: 'Finding Allies', location: 'Eagles Bar Meetup', icon: Users, story: 'The army assembles', type: 'story' },
        { time: '3:00 PM', title: 'The March', location: 'Caravan to Stadium', icon: Car, story: 'Rolling deep through enemy streets', type: 'story' },
        { time: '4:30 PM', title: 'Planting the Flag', location: 'Tailgate Lot 4', icon: MapPin, story: 'Claim your territory', type: 'story' },
        { time: '7:20 PM', title: 'THE BATTLE', location: 'AT&T Stadium', icon: Trophy, story: 'The reason we came', type: 'climax' },
        { time: '10:30 PM', title: 'Victory Formation', location: 'Post-game District', icon: Music, story: 'Celebrate the conquest', type: 'story' },
      ]
    },
    3: {
      title: 'ACT III: The Return',
      events: [
        { time: '10:00 AM', title: 'Spoils of War', location: 'Victory Brunch', icon: Coffee, story: 'Process the triumph', type: 'food' },
        { time: '2:00 PM', title: 'Homeward Bound', location: 'Flight to PHL', icon: Plane, story: 'Leave conquered territory', type: 'travel' },
        { time: '5:00 PM', title: 'Heroes Return', location: 'Home', icon: Home, story: 'Changed forever', type: 'story' },
      ]
    }
  };

  const pastTrips = [
    { id: 1, title: 'The Invasion of Dallas', date: 'Nov 2024', team: 'vs Cowboys', result: 'W 28-23', thumbnail: '🏈', status: 'ready' },
    { id: 2, title: 'Frozen Tundra Quest', date: 'Jan 2024', team: 'vs Packers', result: 'L 21-24', thumbnail: '❄️', status: 'ready' },
  ];

  // Home Screen
  const HomeScreen = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <Menu className="w-6 h-6 text-slate-400" />
        <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">StoryTrip</span>
        <Bell className="w-6 h-6 text-slate-400" />
      </div>

      <div className="flex-1 overflow-auto p-4">
        {/* Welcome */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Mike</h1>
          <p className="text-slate-400">Ready for your next story?</p>
        </div>

        {/* Past Stories */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Your Stories</h2>
            <span className="text-amber-400 text-sm">View all</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pastTrips.map(trip => (
              <div 
                key={trip.id}
                onClick={() => setCurrentScreen('documentary')}
                className="flex-shrink-0 w-36 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 cursor-pointer hover:border-amber-500 transition-all"
              >
                <div className="h-20 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-4xl">
                  {trip.thumbnail}
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium truncate">{trip.title}</p>
                  <p className="text-slate-400 text-xs">{trip.date}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Film className="w-3 h-3 text-green-400" />
                    <span className="text-green-400 text-xs">Ready</span>
                  </div>
                </div>
              </div>
            ))}
            <div 
              onClick={() => setCurrentScreen('select-story')}
              className="flex-shrink-0 w-36 bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-all"
            >
              <Plus className="w-8 h-8 text-slate-500 mb-2" />
              <span className="text-slate-500 text-sm">New Story</span>
            </div>
          </div>
        </div>

        {/* Start New Trip */}
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 border border-amber-500/30 mb-6">
          <h2 className="text-lg font-semibold text-white mb-2">Start a New Story</h2>
          <p className="text-slate-300 text-sm mb-4">Where's your next away game?</p>
          <div 
            onClick={() => setCurrentScreen('select-story')}
            className="bg-slate-800 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:bg-slate-700 transition-all"
          >
            <MapPin className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400">Search teams, cities...</span>
          </div>
        </div>

        {/* Upcoming Games */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Upcoming Matchups</h2>
          <div className="space-y-2">
            {[
              { opponent: '@ Giants', date: 'Dec 22', location: 'New York' },
              { opponent: '@ Commanders', date: 'Jan 5', location: 'Washington' },
            ].map((game, i) => (
              <div 
                key={i}
                onClick={() => setCurrentScreen('select-story')}
                className="bg-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    🏈
                  </div>
                  <div>
                    <p className="text-white font-medium">{game.opponent}</p>
                    <p className="text-slate-400 text-sm">{game.date} • {game.location}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-around p-4 border-t border-slate-700 bg-slate-900">
        <div className="flex flex-col items-center text-amber-400">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </div>
        <div className="flex flex-col items-center text-slate-500">
          <MapPin className="w-6 h-6" />
          <span className="text-xs mt-1">Explore</span>
        </div>
        <div 
          onClick={() => setCurrentScreen('live')}
          className="flex flex-col items-center text-slate-500 cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center -mt-4">
            <Video className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex flex-col items-center text-slate-500">
          <Film className="w-6 h-6" />
          <span className="text-xs mt-1">Stories</span>
        </div>
        <div className="flex flex-col items-center text-slate-500">
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </div>
      </div>
    </div>
  );

  // Story Selection Screen
  const StorySelectScreen = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-slate-700">
        <ChevronLeft 
          className="w-6 h-6 text-slate-400 cursor-pointer" 
          onClick={() => setCurrentScreen('home')}
        />
        <div className="flex-1 text-center">
          <p className="text-white font-semibold">Eagles @ Cowboys</p>
          <p className="text-slate-400 text-sm">November 10, 2024</p>
        </div>
        <div className="w-6" />
      </div>

      <div className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-bold text-white mb-2">What's Your Story?</h1>
        <p className="text-slate-400 mb-6">Choose the narrative that fits your journey</p>

        <div className="space-y-3">
          {narratives.map(narrative => {
            const Icon = narrative.icon;
            return (
              <div
                key={narrative.id}
                onClick={() => {
                  setSelectedStory(narrative.id);
                  setCurrentScreen('trip-details');
                }}
                className={`bg-gradient-to-r ${narrative.color} p-0.5 rounded-2xl cursor-pointer transform hover:scale-[1.02] transition-all`}
              >
                <div className="bg-slate-900 rounded-2xl p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${narrative.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{narrative.title}</h3>
                      <p className="text-slate-300 text-sm italic mb-1">{narrative.tagline}</p>
                      <p className="text-slate-400 text-sm">{narrative.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Trip Details / Itinerary Screen
  const TripDetailsScreen = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center mb-4">
          <ChevronLeft 
            className="w-6 h-6 text-slate-400 cursor-pointer" 
            onClick={() => setCurrentScreen('select-story')}
          />
          <div className="flex-1 text-center">
            <p className="text-amber-400 text-sm font-medium">RIVALRY CONQUEST</p>
            <p className="text-white font-bold">The Invasion of Dallas</p>
          </div>
          <div className="w-6" />
        </div>
        
        {/* Day Selector */}
        <div className="flex gap-2">
          {[1, 2, 3].map(day => (
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
          <h2 className="text-xl font-bold text-white">{itinerary[tripDay].title}</h2>
          <p className="text-slate-400 text-sm">
            {tripDay === 1 ? 'Friday, Nov 8' : tripDay === 2 ? 'Saturday, Nov 9' : 'Sunday, Nov 10'}
          </p>
        </div>

        <div className="space-y-4">
          {itinerary[tripDay].events.map((event, i) => {
            const Icon = event.icon;
            const isClimax = event.type === 'climax';
            return (
              <div key={i} className="flex gap-4">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isClimax 
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500' 
                      : event.type === 'story' 
                        ? 'bg-purple-500/20 border border-purple-500' 
                        : 'bg-slate-700'
                  }`}>
                    <Icon className={`w-5 h-5 ${isClimax ? 'text-white' : event.type === 'story' ? 'text-purple-400' : 'text-slate-400'}`} />
                  </div>
                  {i < itinerary[tripDay].events.length - 1 && (
                    <div className="w-0.5 h-16 bg-slate-700 my-1" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 pb-4 ${isClimax ? '' : ''}`}>
                  <div className={`rounded-xl p-4 ${
                    isClimax 
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30' 
                      : 'bg-slate-800'
                  }`}>
                    <div className="flex items-start justify-between mb-1">
                      <p className={`font-semibold ${isClimax ? 'text-amber-400 text-lg' : 'text-white'}`}>
                        {event.title}
                      </p>
                      <span className="text-slate-400 text-sm">{event.time}</span>
                    </div>
                    <p className="text-slate-400 text-sm mb-2">{event.location}</p>
                    
                    {event.type === 'story' || isClimax ? (
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700">
                        <Film className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 text-sm">{event.story}</span>
                      </div>
                    ) : null}
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
          onClick={() => setCurrentScreen('live')}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-lg"
        >
          Book This Story
        </button>
      </div>
    </div>
  );

  // Live Capture Screen
  const LiveScreen = () => (
    <div className="flex flex-col h-full bg-black">
      {/* Status Bar */}
      <div className="bg-red-500/20 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 text-sm font-medium">LIVE: Eagles @ Cowboys</span>
        </div>
        <span className="text-slate-400 text-sm">Chapter 8: The Battle</span>
      </div>

      {/* Camera View Placeholder */}
      <div className="flex-1 bg-gradient-to-b from-slate-800 to-slate-900 flex items-center justify-center relative">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center mb-4 mx-auto">
            <Camera className="w-12 h-12 text-white/40" />
          </div>
          <p className="text-white/60">Camera Preview</p>
        </div>

        {/* Story Moment Notification */}
        {showNotification && (
          <div className="absolute top-4 left-4 right-4 bg-purple-500/90 rounded-2xl p-4 backdrop-blur animate-pulse">
            <div className="flex items-start gap-3">
              <Film className="w-6 h-6 text-white flex-shrink-0" />
              <div>
                <p className="text-white font-semibold">STORY MOMENT</p>
                <p className="text-purple-100 text-sm mt-1">"The Battle Begins"</p>
                <p className="text-purple-200 text-sm mt-2">Kickoff is happening! Capture the energy of the crowd as the game starts.</p>
              </div>
            </div>
          </div>
        )}

        {/* Recording Indicator */}
        <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-full flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-sm font-medium">REC 0:34</span>
        </div>
      </div>

      {/* Audio Journal Prompt */}
      <div className="bg-slate-900 p-4">
        <div className="bg-slate-800 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Mic className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-medium">AUDIO JOURNAL</span>
          </div>
          <p className="text-white mb-3">Halftime. Eagles lead 14-10.</p>
          <p className="text-slate-400 text-sm italic">"How are you feeling right now?"</p>
          <button className="w-full mt-3 py-3 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 font-medium flex items-center justify-center gap-2">
            <Mic className="w-5 h-5" />
            Hold to Record
          </button>
        </div>

        {/* Capture Stats */}
        <div className="flex items-center justify-around text-center mb-4">
          <div>
            <p className="text-white font-bold">12</p>
            <p className="text-slate-400 text-xs">Videos</p>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div>
            <p className="text-white font-bold">3</p>
            <p className="text-slate-400 text-xs">Journals</p>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div>
            <p className="text-white font-bold">47</p>
            <p className="text-slate-400 text-xs">Photos</p>
          </div>
          <div className="w-px h-8 bg-slate-700" />
          <div>
            <p className="text-green-400 font-bold">85%</p>
            <p className="text-slate-400 text-xs">Complete</p>
          </div>
        </div>

        {/* Capture Controls */}
        <div className="flex items-center justify-center gap-6">
          <button 
            onClick={() => setCaptureMode('photo')}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${captureMode === 'photo' ? 'bg-white text-black' : 'bg-slate-800 text-white'}`}
          >
            <Camera className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setShowNotification(!showNotification)}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full border-4 border-white" />
          </button>
          <button 
            onClick={() => setCaptureMode('audio')}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${captureMode === 'audio' ? 'bg-white text-black' : 'bg-slate-800 text-white'}`}
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center justify-around p-3 border-t border-slate-800 bg-black">
        <button 
          onClick={() => setCurrentScreen('home')}
          className="text-slate-500 text-sm"
        >
          Exit
        </button>
        <button className="text-white text-sm font-medium">Shot List</button>
        <button 
          onClick={() => setCurrentScreen('documentary')}
          className="text-amber-400 text-sm font-medium"
        >
          Preview
        </button>
      </div>
    </div>
  );

  // Documentary Ready Screen
  const DocumentaryScreen = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-slate-700">
        <ChevronLeft 
          className="w-6 h-6 text-slate-400 cursor-pointer" 
          onClick={() => setCurrentScreen('home')}
        />
        <div className="flex-1 text-center">
          <p className="text-white font-semibold">Your Documentary</p>
        </div>
        <Share2 className="w-6 h-6 text-slate-400" />
      </div>

      <div className="flex-1 overflow-auto">
        {/* Video Player */}
        <div className="aspect-video bg-black relative">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-800 to-black">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 mx-auto cursor-pointer hover:bg-white/20 transition-all">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <h2 className="text-white text-2xl font-bold mb-1">THE INVASION OF DALLAS</h2>
              <p className="text-slate-400">An Eagles Fan Story • 18:34</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-amber-500 rounded-full" />
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Film Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-slate-400 text-sm">Rate your film</span>
          </div>

          {/* Download Options */}
          <h3 className="text-white font-semibold mb-3">Download Options</h3>
          <div className="space-y-2 mb-6">
            {[
              { title: 'Full Documentary', duration: '18:34', format: 'HD 1080p', included: true },
              { title: 'Social Highlight', duration: '1:22', format: 'Vertical 9:16', included: true },
              { title: 'Photo Gallery', duration: '47 photos', format: 'High-res', included: true },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                    {i === 0 ? <Film className="w-5 h-5 text-amber-400" /> : 
                     i === 1 ? <Video className="w-5 h-5 text-purple-400" /> :
                     <Camera className="w-5 h-5 text-blue-400" />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-slate-400 text-sm">{item.duration} • {item.format}</p>
                  </div>
                </div>
                <Download className="w-5 h-5 text-amber-400" />
              </div>
            ))}
          </div>

          {/* Share Options */}
          <h3 className="text-white font-semibold mb-3">Share To</h3>
          <div className="flex gap-3 mb-6">
            {['Instagram', 'TikTok', 'YouTube', 'Facebook'].map((platform, i) => (
              <div key={i} className="flex-1 bg-slate-800 rounded-xl p-3 text-center">
                <div className="w-10 h-10 rounded-full bg-slate-700 mx-auto mb-2 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-slate-400" />
                </div>
                <p className="text-slate-400 text-xs">{platform}</p>
              </div>
            ))}
          </div>

          {/* Physical Products */}
          <h3 className="text-white font-semibold mb-3">Physical Keepsakes</h3>
          <div className="space-y-2">
            {[
              { title: 'USB Drive', desc: 'Custom case with trip artwork', price: '$19.99' },
              { title: 'Premium Box Set', desc: 'Disc + photos + memorabilia', price: '$79.99' },
              { title: 'Movie Poster', desc: '18x24" custom design', price: '$24.99' },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
                <span className="text-amber-400 font-semibold">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'select-story':
        return <StorySelectScreen />;
      case 'trip-details':
        return <TripDetailsScreen />;
      case 'live':
        return <LiveScreen />;
      case 'documentary':
        return <DocumentaryScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-4">
      <h1 className="text-white text-2xl font-bold mb-2">StoryTrip UX Mockup</h1>
      <p className="text-slate-400 mb-6 text-center">Interactive prototype • Click through to explore</p>
      
      {/* Phone Frame */}
      <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800">
        <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-900">
          {/* Notch */}
          <div className="h-7 bg-black flex items-center justify-center">
            <div className="w-32 h-5 bg-black rounded-full" />
          </div>
          
          {/* Screen Content */}
          <div className="h-[calc(100%-28px)]">
            {renderScreen()}
          </div>
        </div>
      </div>

      {/* Navigation Hint */}
      <div className="mt-6 flex gap-2 flex-wrap justify-center">
        {['home', 'select-story', 'trip-details', 'live', 'documentary'].map(screen => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              currentScreen === screen 
                ? 'bg-amber-500 text-white' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {screen.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
