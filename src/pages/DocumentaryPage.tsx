import React, { useState, useRef } from 'react';
import { Play, Pause, Star, Download, Share2, Film, Video, Camera } from 'lucide-react';
import { Header } from '../components/common/Header';

export const DocumentaryPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      videoRef.current.currentTime = percentage * duration;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <Header title="Your Documentary" showBack rightIcon={<Share2 className="w-6 h-6 text-slate-400" />} />

      <div className="flex-1 overflow-auto">
        {/* Video Player */}
        <div className="aspect-video bg-black relative">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          >
            <source src="/eagles-conquer-dallas.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <Play className="w-10 h-10 text-white ml-1" />
              </button>
            </div>
          )}

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={togglePlay} className="text-white">
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <span className="text-white text-sm font-medium">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div
              onClick={handleSeek}
              className="h-1 bg-slate-700 rounded-full overflow-hidden cursor-pointer"
            >
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <h2 className="text-white text-2xl font-bold mb-1 drop-shadow-lg">THE INVASION OF DALLAS</h2>
            <p className="text-slate-300 drop-shadow-lg">An Eagles Fan Story</p>
          </div>
        </div>

        <div className="p-4">
          {/* Film Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-slate-400 text-sm">Rate your film</span>
          </div>

          {/* Download Options */}
          <h3 className="text-white font-semibold mb-3">Download Options</h3>
          <div className="space-y-2 mb-6">
            {[
              {
                title: 'Full Documentary',
                duration: formatTime(duration || 0),
                format: 'HD 1080p',
                icon: Film,
                color: 'text-amber-400',
              },
              {
                title: 'Social Highlight',
                duration: '1:22',
                format: 'Vertical 9:16',
                icon: Video,
                color: 'text-purple-400',
              },
              {
                title: 'Photo Gallery',
                duration: '47 photos',
                format: 'High-res',
                icon: Camera,
                color: 'text-blue-400',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-slate-400 text-sm">
                        {item.duration} • {item.format}
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-amber-400" />
                </div>
              );
            })}
          </div>

          {/* Share Options */}
          <h3 className="text-white font-semibold mb-3">Share To</h3>
          <div className="flex gap-3 mb-6">
            {['Instagram', 'TikTok', 'YouTube', 'Facebook'].map((platform, i) => (
              <div key={i} className="flex-1 bg-slate-800 rounded-xl p-3 text-center cursor-pointer hover:bg-slate-700 transition-all">
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
              {
                title: 'Premium Box Set',
                desc: 'Disc + photos + memorabilia',
                price: '$79.99',
              },
              { title: 'Movie Poster', desc: '18x24" custom design', price: '$24.99' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-all"
              >
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
};
