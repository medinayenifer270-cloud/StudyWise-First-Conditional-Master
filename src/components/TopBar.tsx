import React from 'react';
import { Volume2, VolumeX, Flame, Award, HelpCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface TopBarProps {
  activeTab: 'guide' | 'quest' | 'scramble' | 'matcher' | 'speed';
  setActiveTab: (tab: 'guide' | 'quest' | 'scramble' | 'matcher' | 'speed') => void;
  score: number;
  streak: number;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  onOpenHowToUse: () => void;
  onOpenStats: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  score,
  streak,
  soundEnabled,
  setSoundEnabled,
  onOpenHowToUse,
  onOpenStats,
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playClick();
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('guide');
          }}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-display text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-1 transition-all duration-300 group-hover:scale-105">
            <span className="text-slate-900 drop-shadow-xs font-black">Study</span>
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent font-black drop-shadow-xs">
              Wise
            </span>
            <span className="inline-block text-amber-500 text-base animate-bounce" aria-hidden="true">✦</span>
          </span>
          <span className="sr-only">Go to StudyWise home</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-semibold text-slate-600">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('guide');
            }}
            className={`transition-all py-1.5 px-1 cursor-pointer whitespace-nowrap tracking-wide ${
              activeTab === 'guide'
                ? 'text-amber-800 font-bold border-b-2 border-amber-600 scale-105'
                : 'hover:text-slate-900 hover:scale-102 font-medium'
            }`}
          >
            Study Guide
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('quest');
            }}
            className={`transition-all py-1.5 px-1 cursor-pointer whitespace-nowrap tracking-wide ${
              activeTab === 'quest'
                ? 'text-amber-800 font-bold border-b-2 border-amber-600 scale-105'
                : 'hover:text-slate-900 hover:scale-102 font-medium'
            }`}
          >
            Habit Quest
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('scramble');
            }}
            className={`transition-all py-1.5 px-1 cursor-pointer whitespace-nowrap tracking-wide ${
              activeTab === 'scramble'
                ? 'text-amber-800 font-bold border-b-2 border-amber-600 scale-105'
                : 'hover:text-slate-900 hover:scale-102 font-medium'
            }`}
          >
            Sentence Scramble
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('matcher');
            }}
            className={`transition-all py-1.5 px-1 cursor-pointer whitespace-nowrap tracking-wide ${
              activeTab === 'matcher'
                ? 'text-amber-800 font-bold border-b-2 border-amber-600 scale-105'
                : 'hover:text-slate-900 hover:scale-102 font-medium'
            }`}
          >
            Cause & Effect
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('speed');
            }}
            className={`transition-all py-1.5 px-1 cursor-pointer whitespace-nowrap tracking-wide ${
              activeTab === 'speed'
                ? 'text-amber-800 font-bold border-b-2 border-amber-600 scale-105'
                : 'hover:text-slate-900 hover:scale-102 font-medium'
            }`}
          >
            Speed Sprint
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <button
              onClick={onOpenStats}
              title="View achievements and progress"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span className="font-mono-numbers font-semibold">{score}</span>
              <span className="hidden sm:inline text-slate-500">XP</span>
            </button>

            {streak > 0 && (
              <div
                title="Current streak"
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-orange-50 text-orange-700"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="font-mono-numbers font-bold">{streak}</span>
              </div>
            )}
          </div>

          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenHowToUse();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">How to Use</span>
            <span className="sm:hidden">Help</span>
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className="flex md:hidden items-center justify-between border-t border-slate-200 px-3 py-2 bg-slate-50 overflow-x-auto text-xs font-medium text-slate-600 gap-2">
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'guide' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-200'
          }`}
        >
          Guide
        </button>
        <button
          onClick={() => setActiveTab('quest')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'quest' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-200'
          }`}
        >
          Quest
        </button>
        <button
          onClick={() => setActiveTab('scramble')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'scramble' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-200'
          }`}
        >
          Scramble
        </button>
        <button
          onClick={() => setActiveTab('matcher')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'matcher' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-200'
          }`}
        >
          Match
        </button>
        <button
          onClick={() => setActiveTab('speed')}
          className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
            activeTab === 'speed' ? 'bg-amber-100 text-amber-900 font-semibold' : 'hover:bg-slate-200'
          }`}
        >
          Speed
        </button>
      </div>
    </header>
  );
};
