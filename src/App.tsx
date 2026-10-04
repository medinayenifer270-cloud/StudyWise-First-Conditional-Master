/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { StudyGuide } from './components/StudyGuide';
import { QuestGame } from './components/QuestGame';
import { SentenceScrambleGame } from './components/SentenceScrambleGame';
import { CauseEffectGame } from './components/CauseEffectGame';
import { SpeedSprintGame } from './components/SpeedSprintGame';
import { HowToUseModal } from './components/HowToUseModal';
import { StatsModal } from './components/StatsModal';
import { sound } from './utils/sound';
import { BookOpen, Gamepad2, Puzzle, Link2, Zap, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'quest' | 'scramble' | 'matcher' | 'speed'>('guide');
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('studywise_score');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(() => {
    const saved = localStorage.getItem('studywise_best_streak');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isHowToUseOpen, setIsHowToUseOpen] = useState<boolean>(false);
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('studywise_score', score.toString());
  }, [score]);

  useEffect(() => {
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem('studywise_best_streak', streak.toString());
    }
  }, [streak, bestStreak]);

  const handleAddScore = (points: number) => {
    setScore((prev) => prev + points);
  };

  const handleIncrementStreak = () => {
    setStreak((prev) => prev + 1);
  };

  const handleResetStreak = () => {
    setStreak(0);
  };

  const handleResetProgress = () => {
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    localStorage.removeItem('studywise_score');
    localStorage.removeItem('studywise_best_streak');
    setIsStatsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-amber-200">
      {/* Top Bar following 3-Zone contract */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        score={score}
        streak={streak}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenHowToUse={() => setIsHowToUseOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Navigation Indicator / Tabs for quick desktop switching */}
        <div className="hidden lg:flex items-center justify-between mb-8 p-2 rounded-2xl bg-white border border-amber-200/90 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-xs tracking-wider uppercase shadow-xs select-none">
              <span>🎯 Practice</span>
            </span>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('guide');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-slate-900 text-amber-300 shadow-sm scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-950 border border-slate-200/80 hover:border-amber-300'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'guide' ? 'text-amber-400' : 'text-amber-600'}`} />
              <span className="tracking-wide">Study Guide & Rules</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('quest');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quest'
                  ? 'bg-slate-900 text-amber-300 shadow-sm scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-950 border border-slate-200/80 hover:border-amber-300'
              }`}
            >
              <Gamepad2 className={`w-4 h-4 ${activeTab === 'quest' ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <span className="tracking-wide">Habit Quest Game</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('scramble');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'scramble'
                  ? 'bg-slate-900 text-amber-300 shadow-sm scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-950 border border-slate-200/80 hover:border-amber-300'
              }`}
            >
              <Puzzle className={`w-4 h-4 ${activeTab === 'scramble' ? 'text-indigo-400' : 'text-indigo-600'}`} />
              <span className="tracking-wide">Sentence Scramble</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('matcher');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'matcher'
                  ? 'bg-slate-900 text-amber-300 shadow-sm scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-950 border border-slate-200/80 hover:border-amber-300'
              }`}
            >
              <Link2 className={`w-4 h-4 ${activeTab === 'matcher' ? 'text-orange-400' : 'text-orange-600'}`} />
              <span className="tracking-wide">Cause & Effect Match</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('speed');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'speed'
                  ? 'bg-slate-900 text-amber-300 shadow-sm scale-102'
                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 hover:text-amber-950 border border-slate-200/80 hover:border-amber-300'
              }`}
            >
              <Zap className={`w-4 h-4 ${activeTab === 'speed' ? 'text-yellow-400 animate-pulse' : 'text-amber-600'}`} />
              <span className="tracking-wide">Speed Sprint (45s)</span>
            </button>
          </div>

          <button
            onClick={() => setIsHowToUseOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-950 bg-amber-100/90 hover:bg-amber-200 rounded-xl transition-all shadow-2xs hover:scale-103 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-700" />
            <span className="tracking-wide">App Instructions</span>
          </button>
        </div>

        {/* Tab Views */}
        {activeTab === 'guide' && <StudyGuide onStartGame={(tab) => setActiveTab(tab)} />}
        {activeTab === 'quest' && (
          <QuestGame
            onAddScore={handleAddScore}
            onIncrementStreak={handleIncrementStreak}
            onResetStreak={handleResetStreak}
            streak={streak}
          />
        )}
        {activeTab === 'scramble' && (
          <SentenceScrambleGame
            onAddScore={handleAddScore}
            onIncrementStreak={handleIncrementStreak}
            onResetStreak={handleResetStreak}
          />
        )}
        {activeTab === 'matcher' && (
          <CauseEffectGame
            onAddScore={handleAddScore}
            onIncrementStreak={handleIncrementStreak}
            onResetStreak={handleResetStreak}
          />
        )}
        {activeTab === 'speed' && (
          <SpeedSprintGame
            onAddScore={handleAddScore}
            onIncrementStreak={handleIncrementStreak}
            onResetStreak={handleResetStreak}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-800">StudyWise</span>
            <span className="mx-2">·</span>
            <span>First Conditional for English Level A2</span>
            <span className="mx-2">·</span>
            <span>Focus Topic: Effective Study Habits</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsHowToUseOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Instructions
            </button>
            <button
              onClick={() => setIsStatsOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              My Achievements
            </button>
            <button
              onClick={() => {
                sound.speak("If you study a little every day, you will achieve fluency.");
              }}
              className="hover:text-amber-800 font-medium transition-colors cursor-pointer"
            >
              Listen to Habit Motto 🔊
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HowToUseModal
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        score={score}
        streak={streak}
        bestStreak={bestStreak}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
