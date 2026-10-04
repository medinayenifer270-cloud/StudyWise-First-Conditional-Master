import React from 'react';
import { X, Award, Flame, Star, Trophy, RotateCcw, CheckCircle } from 'lucide-react';
import { sound } from '../utils/sound';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  streak: number;
  bestStreak: number;
  onResetProgress: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  score,
  streak,
  bestStreak,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  const badges = [
    {
      name: 'First Step',
      description: 'Answered your first conditional question',
      unlocked: score >= 25,
      icon: '🌱',
    },
    {
      name: 'Habit Builder',
      description: 'Earned 100+ Experience Points',
      unlocked: score >= 100,
      icon: '📖',
    },
    {
      name: 'Streak Master',
      description: 'Achieved a streak of 3 correct answers',
      unlocked: bestStreak >= 3,
      icon: '🔥',
    },
    {
      name: 'Grammar Scholar',
      description: 'Earned 250+ Experience Points',
      unlocked: score >= 250,
      icon: '🎓',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-600" />
            <h2 className="font-display font-bold text-lg text-slate-900">
              Your Learning Stats
            </h2>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <span className="text-[11px] text-amber-900 uppercase font-semibold block">Total XP</span>
              <span className="font-mono-numbers text-xl font-bold text-slate-900">{score}</span>
            </div>
            <div className="p-3 rounded-xl bg-orange-50/70 border border-orange-200/80">
              <span className="text-[11px] text-orange-900 uppercase font-semibold block">Active Streak</span>
              <span className="font-mono-numbers text-xl font-bold text-orange-700">{streak} 🔥</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
              <span className="text-[11px] text-slate-600 uppercase font-semibold block">Best Streak</span>
              <span className="font-mono-numbers text-xl font-bold text-slate-800">{bestStreak}</span>
            </div>
          </div>

          {/* Badges Section */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Earned Badges
            </div>
            <div className="space-y-2">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                    b.unlocked
                      ? 'bg-amber-50/50 border-amber-200 text-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{b.icon}</span>
                    <div>
                      <span className="font-bold block text-slate-900">{b.name}</span>
                      <span className="text-[11px] text-slate-500">{b.description}</span>
                    </div>
                  </div>
                  {b.unlocked ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">Locked</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reset progress */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                if (window.confirm('Do you want to reset your score and streak to practice again from zero?')) {
                  onResetProgress();
                }
              }}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Score & Progress</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
