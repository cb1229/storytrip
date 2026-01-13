import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800">
      <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-900">
        {/* Notch */}
        <div className="h-7 bg-black flex items-center justify-center">
          <div className="w-32 h-5 bg-black rounded-full" />
        </div>

        {/* Screen Content */}
        <div className="h-[calc(100%-28px)]">
          {children}
        </div>
      </div>
    </div>
  );
};
