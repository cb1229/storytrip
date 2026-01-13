import React from 'react';
import { Play, Star, Download, Share2, Film, Video, Camera } from 'lucide-react';
import { Header } from '../components/common/Header';

export const DocumentaryPage: React.FC = () => {

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800">
      <Header title="Your Documentary" showBack rightIcon={<Share2 className="w-6 h-6 text-slate-400" />} />

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
                duration: '18:34',
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
                  className="bg-slate-800 rounded-xl p-4 flex items-center justify-between"
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
              {
                title: 'Premium Box Set',
                desc: 'Disc + photos + memorabilia',
                price: '$79.99',
              },
              { title: 'Movie Poster', desc: '18x24" custom design', price: '$24.99' },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-800 rounded-xl p-4 flex items-center justify-between"
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
