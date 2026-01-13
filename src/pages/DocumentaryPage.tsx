import React, { useState, useRef } from 'react';
import { Play, Pause, Star, Download, Share2, Film, Video, Camera } from 'lucide-react';
import { Header } from '../components/common/Header';

export const DocumentaryPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsFullscreen(false);
      } else {
        videoRef.current.play();
        setIsFullscreen(true);
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
    <div className="flex flex-col h-full bg-nfl-lightGray">
      {!isFullscreen && (
        <Header title="Your Documentary" showBack rightIcon={<Share2 className="w-6 h-6 text-white" />} />
      )}

      <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'flex-1 overflow-auto'}`}>
        {/* Video Player */}
        <div className={`${isFullscreen ? 'h-full' : 'aspect-video'} bg-black relative`}>
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
          {!isFullscreen && (
            <div className="absolute top-4 left-4 right-4">
              <h2 className="text-white text-2xl font-bold mb-1 drop-shadow-lg">THE INVASION OF DALLAS</h2>
              <p className="text-slate-300 drop-shadow-lg">An Eagles Fan Story</p>
            </div>
          )}
        </div>

        {!isFullscreen && (
          <div className="p-4">
          {/* Film Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-5 h-5 text-nfl-red fill-nfl-red" />
              ))}
              <Star className="w-5 h-5 text-nfl-red" />
            </div>
            <span className="text-nfl-darkGray text-sm font-semibold">Rate your film</span>
          </div>

          {/* Download Options */}
          <h3 className="text-nfl-navy font-black text-lg mb-3 tracking-tight">DOWNLOAD OPTIONS</h3>
          <div className="space-y-3 mb-6">
            {[
              {
                title: 'Full Documentary',
                duration: formatTime(duration || 0),
                format: 'HD 1080p',
                icon: Film,
                color: 'text-nfl-red',
              },
              {
                title: 'Social Highlight',
                duration: '1:22',
                format: 'Vertical 9:16',
                icon: Video,
                color: 'text-nfl-navy',
              },
              {
                title: 'Photo Gallery',
                duration: '47 photos',
                format: 'High-res',
                icon: Camera,
                color: 'text-nfl-red',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-card-hover transition-all shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-nfl-navy flex items-center justify-center">
                      <Icon className={`w-6 h-6 text-white`} />
                    </div>
                    <div>
                      <p className="text-nfl-navy font-bold">{item.title}</p>
                      <p className="text-nfl-darkGray text-sm font-medium">
                        {item.duration} • {item.format}
                      </p>
                    </div>
                  </div>
                  <Download className="w-5 h-5 text-nfl-red" />
                </div>
              );
            })}
          </div>

          {/* Share Options */}
          <h3 className="text-nfl-navy font-black text-lg mb-3 tracking-tight">SHARE TO</h3>
          <div className="flex gap-3 mb-6">
            {['Instagram', 'TikTok', 'YouTube', 'Facebook'].map((platform, i) => (
              <div key={i} className="flex-1 bg-white rounded-lg p-3 text-center cursor-pointer hover:shadow-card-hover transition-all shadow-card">
                <div className="w-10 h-10 rounded-full bg-nfl-navy mx-auto mb-2 flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <p className="text-nfl-darkGray text-xs font-semibold">{platform}</p>
              </div>
            ))}
          </div>

          {/* Physical Products */}
          <h3 className="text-nfl-navy font-black text-lg mb-3 tracking-tight">PHYSICAL KEEPSAKES</h3>
          <div className="space-y-3">
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
                className="bg-white rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-card-hover transition-all shadow-card"
              >
                <div>
                  <p className="text-nfl-navy font-bold">{item.title}</p>
                  <p className="text-nfl-darkGray text-sm font-medium">{item.desc}</p>
                </div>
                <span className="text-nfl-red font-bold text-lg">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
