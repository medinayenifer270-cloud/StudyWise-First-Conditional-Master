import React, { useState } from 'react';
import { X, Volume2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { IMAGES } from '../assets/images';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'guide' | 'quest' | 'scramble' | 'matcher' | 'speed') => void;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const [owlImgError, setOwlImgError] = useState(false);

  if (!isOpen) return null;

  const steps = [
    {
      step: '01',
      title: 'Review the Formula in the Study Guide',
      text: "Start at the 'Study Guide' tab to learn the master rule: If + Present Simple, will/won't + base verb. Test the interactive sentence builder to see how commas change when clauses reverse.",
      actionTab: 'guide' as const,
      actionLabel: 'Open Study Guide',
    },
    {
      step: '02',
      title: 'Play the Multi-Level Habit Quest',
      text: "Progress through 3 levels (Foundations, Focus, and Exam Prep). Every single answer gives you immediate, detailed feedback explaining the grammar rule and offering a practical study tip.",
      actionTab: 'quest' as const,
      actionLabel: 'Start Habit Quest',
    },
    {
      step: '03',
      title: 'Practice Sentence Scramble & Matcher',
      text: "Build sentences piece-by-piece in Sentence Scramble or match study habits to their future outcomes in Cause & Effect. Listen to pronunciation with the audio speaker buttons.",
      actionTab: 'scramble' as const,
      actionLabel: 'Try Scramble Game',
    },
    {
      step: '04',
      title: 'Earn XP, Streaks & Star Ratings',
      text: 'Rack up experience points, build daily streaks, and unlock 3-star ratings on all levels. Practice daily for the best learning retention!',
      actionTab: 'speed' as const,
      actionLabel: 'Test Speed Sprint',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-300 bg-amber-100 shrink-0">
              {!owlImgError ? (
                <img
                  src={IMAGES.mascot}
                  alt="Barnaby the owl"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={() => setOwlImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg">🦉</div>
              )}
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-slate-900">
                How to Use StudyWise
              </h2>
              <p className="text-xs text-slate-500">
                Barnaby&apos;s step-by-step instructions for ESL learners
              </p>
            </div>
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

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Barnaby intro bubble */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-slate-800 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-950 mb-1">
                &ldquo;Welcome, English learner! I&apos;m Barnaby.&rdquo;
              </p>
              <p>
                In this app, all lessons, games, and feedback are written in English specifically for
                A2 level students. Follow these steps to maximize your learning and build top-tier
                study habits!
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      Step {item.step}
                    </span>
                    <h3 className="font-semibold text-slate-900 text-sm">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-lg">{item.text}</p>
                </div>

                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateToTab(item.actionTab);
                    onClose();
                  }}
                  className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer self-start sm:self-center"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm cursor-pointer shadow-xs"
          >
            Got it, Let&apos;s Study!
          </button>
        </div>
      </div>
    </div>
  );
};
