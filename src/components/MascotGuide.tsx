import React, { useState } from 'react';
import { Volume2, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { IMAGES } from '../assets/images';

interface MascotGuideProps {
  title?: string;
  message: string;
  mood?: 'guiding' | 'cheering' | 'thinking' | 'encouraging';
  compact?: boolean;
  onActionClick?: () => void;
  actionLabel?: string;
}

export const MascotGuide: React.FC<MascotGuideProps> = ({
  title = 'Barnaby, Your Study Owl',
  message,
  mood = 'guiding',
  compact = false,
  onActionClick,
  actionLabel,
}) => {
  const [imgError, setImgError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    sound.speak(message);
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3500);
  };

  const getMoodBadge = () => {
    switch (mood) {
      case 'cheering':
        return 'Celebrating Your Progress!';
      case 'thinking':
        return 'Grammar Tip in Action';
      case 'encouraging':
        return 'Study Coach Feedback';
      default:
        return 'Study Coach Guidance';
    }
  };

  const mascotImage = mood === 'cheering' ? IMAGES.mascotVictory : IMAGES.mascot;

  if (compact) {
    return (
      <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/90 text-amber-950 shadow-xs transition-all hover:shadow-sm">
        {/* Animated Avatar */}
        <div className="relative shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 border-amber-300 shadow-xs bg-amber-100 group">
          {!imgError ? (
            <img
              src={mascotImage}
              alt="Barnaby the study owl coach"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-display font-bold text-amber-800 text-sm">
              🦉
            </div>
          )}
          {isSpeaking && (
            <span className="absolute inset-0 rounded-full border-2 border-amber-500 animate-ping opacity-75" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold text-amber-900 tracking-wide uppercase">
              {title}
            </span>
            <button
              onClick={handleSpeak}
              title="Listen to Barnaby"
              className="text-amber-800 hover:text-amber-950 transition-colors p-1 rounded hover:bg-amber-200/60 cursor-pointer"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse text-amber-600' : ''}`} />
            </button>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/40 border border-amber-200/90 p-4 sm:p-5 shadow-xs hover:shadow-sm transition-all">
      {/* Decorative background glow circle */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-amber-200/30 blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative z-10">
        {/* Animated Mascot Avatar */}
        <div className="relative shrink-0 group">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-amber-100 transition-all duration-300 hover:rotate-2 hover:scale-105">
            {!imgError ? (
              <img
                src={mascotImage}
                alt="Barnaby the study owl coach"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-amber-100 text-amber-800">
                <span className="text-2xl animate-bounce">🦉</span>
                <span className="text-[10px] font-bold">Barnaby</span>
              </div>
            )}
          </div>

          {/* Floating Sparkle Badge with animation */}
          <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white p-1 rounded-full shadow-sm animate-pulse">
            <Sparkles className="w-3 h-3" />
          </div>

          {/* Audio speech ripples when speaking */}
          {isSpeaking && (
            <span className="absolute -inset-1 rounded-2xl border-2 border-amber-400 animate-ping opacity-60 pointer-events-none" />
          )}
        </div>

        {/* Mascot Speech Bubble */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-semibold text-slate-900 text-base">{title}</h3>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-amber-800 font-medium">{getMoodBadge()}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleSpeak}
                className="flex items-center gap-1 text-xs text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
                title="Read aloud"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'text-amber-600 animate-bounce' : ''}`} />
                <span className="font-medium">{isSpeaking ? 'Speaking...' : 'Listen'}</span>
              </button>
            </div>
          </div>

          <p className="text-sm text-slate-800 leading-relaxed font-normal">{message}</p>

          {onActionClick && actionLabel && (
            <div className="mt-3">
              <button
                onClick={onActionClick}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs hover:translate-x-0.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{actionLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
