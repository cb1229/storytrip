import React, { useState } from 'react';
import { X, Share2, Mail, Copy, Check, UserPlus, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface ShareModalProps {
  onClose: () => void;
  title: string;
  description: string;
  type: 'trip' | 'documentary' | 'itinerary';
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose, title, description, type }) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const shareUrl = `https://storytrip.app/share/${type}/demo`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    // Simulate sending invite
    toast.success(`Invitation sent to ${email}!`);
    setEmail('');
    setShowInvite(false);
  };

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        toast.info('Opening Facebook...');
      },
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500',
      action: () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, '_blank');
        toast.info('Opening Twitter...');
      },
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-600',
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`, '_blank');
        toast.info('Opening WhatsApp...');
      },
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-slate-900 rounded-2xl w-full max-w-md border border-slate-700 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-white font-bold text-lg">Share Trip</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Preview */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="text-white font-semibold mb-1">{title}</h3>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>

          {/* Social Share */}
          <div>
            <p className="text-slate-400 text-sm mb-3">Share on social media</p>
            <div className="grid grid-cols-3 gap-3">
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.name}
                    onClick={option.action}
                    className={`${option.color} rounded-xl p-4 flex flex-col items-center gap-2 hover:opacity-90 transition-all`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                    <span className="text-white text-xs">{option.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Copy Link */}
          <div>
            <p className="text-slate-400 text-sm mb-2">Share link</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-400 text-sm truncate">
                {shareUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className="bg-amber-500 hover:bg-amber-600 rounded-xl px-4 py-3 flex items-center gap-2 transition-all"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Copy className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Invite Friends */}
          <div>
            {!showInvite ? (
              <button
                onClick={() => setShowInvite(true)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-slate-700 transition-all"
              >
                <UserPlus className="w-5 h-5 text-amber-400" />
                <span className="text-white font-medium">Invite Friends to Join Trip</span>
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-slate-400 text-sm">Invite via email</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="friend@example.com"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={handleSendInvite}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl px-6 py-3 flex items-center gap-2 hover:opacity-90 transition-all"
                  >
                    <Mail className="w-5 h-5 text-white" />
                    <span className="text-white font-medium">Send</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
