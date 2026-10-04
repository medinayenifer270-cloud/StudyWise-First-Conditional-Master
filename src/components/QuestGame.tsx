import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Star, Sparkles, BookOpen, Flame } from 'lucide-react';
import { sound } from '../utils/sound';
import { Question, QUEST_LEVELS, QUEST_QUESTIONS, MASCOT_DIALOGUES } from '../data/learningContent';
import { IMAGES } from '../assets/images';
import { ConfettiEffect } from './ConfettiEffect';

interface QuestGameProps {
  onAddScore: (points: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  streak: number;
}

export const QuestGame: React.FC<QuestGameProps> = ({
  onAddScore,
  onIncrementStreak,
  onResetStreak,
  streak,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [levelFinished, setLevelFinished] = useState(false);
  const [levelStats, setLevelStats] = useState({ correct: 0, total: 0, pointsEarned: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [earnedPointsPopup, setEarnedPointsPopup] = useState<number | null>(null);

  // Filter questions for the chosen level
  const currentQuestions = QUEST_QUESTIONS.filter((q) => q.level === selectedLevel);
  const currentQuestion: Question | undefined = currentQuestions[currentIndex];

  const getImageSrc = (key?: string) => {
    switch (key) {
      case 'cozyDesk':
        return IMAGES.cozyDesk;
      case 'pomodoroHabits':
        return IMAGES.pomodoroHabits;
      case 'successExam':
        return IMAGES.successExam;
      case 'flashcards':
        return IMAGES.flashcards;
      case 'groupStudy':
        return IMAGES.groupStudy;
      case 'digitalDetox':
        return IMAGES.digitalDetox;
      default:
        return IMAGES.cozyDesk;
    }
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered || !currentQuestion) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const chosenOption = currentQuestion.options.find((opt) => opt.id === optionId);
    const isCorrect = chosenOption?.isCorrect ?? false;

    if (isCorrect) {
      sound.playCorrect();
      onIncrementStreak();
      const points = 25 + Math.min(streak * 5, 25);
      onAddScore(points);
      setEarnedPointsPopup(points);
      setTimeout(() => setEarnedPointsPopup(null), 1800);

      // Trigger confetti if high streak or question correct
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2200);

      setLevelStats((prev) => ({
        ...prev,
        correct: prev.correct + 1,
        total: prev.total + 1,
        pointsEarned: prev.pointsEarned + points,
      }));
    } else {
      sound.playIncorrect();
      onResetStreak();
      setLevelStats((prev) => ({
        ...prev,
        total: prev.total + 1,
      }));
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < currentQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setLevelFinished(true);
      setShowConfetti(true);
      sound.playStreak();
    }
  };

  const handleRestartLevel = () => {
    sound.playClick();
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setLevelFinished(false);
    setLevelStats({ correct: 0, total: 0, pointsEarned: 0 });
    setShowConfetti(false);
  };

  const handleChangeLevel = (lvl: 1 | 2 | 3) => {
    sound.playClick();
    setSelectedLevel(lvl);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setLevelFinished(false);
    setLevelStats({ correct: 0, total: 0, pointsEarned: 0 });
    setShowConfetti(false);
  };

  const currentLevelInfo = QUEST_LEVELS.find((l) => l.level === selectedLevel);

  if (!currentQuestion) {
    return <div>No questions found for this level.</div>;
  }

  const selectedOption = currentQuestion.options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 relative">
      <ConfettiEffect active={showConfetti} />

      {/* Floating XP Gain Badge Animation */}
      {earnedPointsPopup && (
        <div className="fixed top-20 right-8 z-50 pointer-events-none animate-bounce bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5 text-sm">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>+{earnedPointsPopup} XP!</span>
        </div>
      )}

      {/* Level Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-slate-100/90 rounded-xl">
        <div className="flex items-center gap-1">
          {QUEST_LEVELS.map((lvl) => (
            <button
              key={lvl.level}
              onClick={() => handleChangeLevel(lvl.level)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedLevel === lvl.level
                  ? 'bg-white text-slate-900 shadow-xs scale-102 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Level {lvl.level}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-600 font-medium px-2 flex items-center gap-2">
          <span>{currentLevelInfo?.title}</span>
          {streak >= 2 && (
            <span className="flex items-center gap-1 text-orange-600 font-bold bg-orange-100/80 px-2 py-0.5 rounded-md animate-pulse">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>{streak}x combo</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Quest Container */}
      {!levelFinished ? (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all">
          {/* Progress Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/70">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
                Q{currentIndex + 1}/{currentQuestions.length}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-600 font-medium">
                Habit Focus: {currentQuestion.habitTopic}
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-28 sm:w-44 h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500 ease-out shadow-xs"
                style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Visual Habit Scenario Banner (NEW IMAGE EMBED) */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 h-44 sm:h-52 bg-slate-900 shadow-inner group">
              <img
                src={getImageSrc(currentQuestion.imageKey)}
                alt={currentQuestion.habitTopic}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent flex flex-col justify-end p-4 sm:p-5">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                  Study Habit Scenario
                </span>
                <div className="text-white text-base sm:text-lg font-semibold leading-snug">
                  {currentQuestion.habitTopic}
                </div>
              </div>
            </div>

            {/* Sentence Prompt */}
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Complete the First Conditional Sentence:
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 leading-snug">
                {currentQuestion.sentencePrompt}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOptionId === option.id;
                let optionStyle =
                  'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800 hover:shadow-xs hover:-translate-y-0.5';

                if (isAnswered) {
                  if (option.isCorrect) {
                    optionStyle = 'border-emerald-500 bg-emerald-50/90 text-emerald-950 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-200';
                  } else {
                    optionStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={option.id}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 rounded-xl border text-left text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 active:scale-98 ${optionStyle}`}
                  >
                    <span>{option.text}</span>
                    {isAnswered && option.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-bounce" />
                    )}
                    {isAnswered && isSelected && !option.isCorrect && (
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 animate-shake" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* MANDATORY SMART FEEDBACK ON EVERY ANSWER */}
            {isAnswered && (
              <div
                className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 shadow-sm animate-in fade-in slide-in-from-bottom-2 ${
                  isCorrect
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50/95 border-amber-300 text-amber-950'
                }`}
              >
                {/* Header row with Barnaby's face and status */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="relative shrink-0 w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-300 bg-white shadow-xs">
                    <img
                      src={isCorrect ? IMAGES.mascotVictory : IMAGES.mascot}
                      alt="Barnaby coach"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform"
                    />
                    <div className="absolute bottom-0 right-0 p-0.5 bg-amber-500 rounded-tl text-white">
                      <Sparkles className="w-2.5 h-2.5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-2xs ${
                            isCorrect
                              ? 'bg-emerald-200 text-emerald-950'
                              : 'bg-amber-200 text-amber-950'
                          }`}
                        >
                          {isCorrect ? 'Correct! +XP Earned' : 'Good Try! Review the Rule'}
                        </span>
                      </div>

                      <button
                        onClick={() => sound.speak(currentQuestion.fullCorrectSentence)}
                        title="Listen to full sentence"
                        className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 hover:border-slate-300 transition-all cursor-pointer shadow-2xs hover:scale-102"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>Listen 🔊</span>
                      </button>
                    </div>

                    <p className="text-sm font-semibold mt-1.5 text-slate-900">
                      {isCorrect
                        ? MASCOT_DIALOGUES.correctCheer[
                            Math.floor(Math.random() * MASCOT_DIALOGUES.correctCheer.length)
                          ]
                        : MASCOT_DIALOGUES.incorrectEncourage[
                            Math.floor(Math.random() * MASCOT_DIALOGUES.incorrectEncourage.length)
                          ]}
                    </p>
                  </div>
                </div>

                {/* Specific Grammar Explanation */}
                <div className="p-4 rounded-xl bg-white/95 border border-slate-200 space-y-3 mb-4 text-slate-800 text-xs sm:text-sm shadow-2xs">
                  {!isCorrect && selectedOption?.mistakeReason && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 text-xs font-medium">
                      <span className="font-bold">Why that choice was incorrect: </span>
                      <span>{selectedOption.mistakeReason}</span>
                    </div>
                  )}

                  {/* Correct Sentence Display */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Full Correct First Conditional Sentence:
                    </div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                      &ldquo;{currentQuestion.fullCorrectSentence}&rdquo;
                    </div>
                  </div>

                  {/* Clause Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-950 border border-emerald-200">
                      <span className="font-bold block text-emerald-800">Condition Clause:</span>
                      <span>{currentQuestion.conditionClause}</span>
                      <span className="text-[10px] text-emerald-700 block mt-0.5 font-mono">
                        (Present Simple)
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-950 border border-indigo-200">
                      <span className="font-bold block text-indigo-800">Result Clause:</span>
                      <span>{currentQuestion.resultClause}</span>
                      <span className="text-[10px] text-indigo-700 block mt-0.5 font-mono">
                        (will / won&apos;t + base verb)
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-700 leading-relaxed text-xs">
                    <strong>Rule Breakdown: </strong>
                    {currentQuestion.explanationCorrect}
                  </p>
                </div>

                {/* Real Study Habit Tip */}
                <div className="flex items-start gap-2.5 text-xs text-amber-950 bg-amber-100/70 p-3 rounded-xl border border-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Study Habit Tip: </span>
                    <span>{currentQuestion.studyTip}</span>
                  </div>
                </div>

                {/* Next Button */}
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <span>
                      {currentIndex + 1 < currentQuestions.length ? 'Next Question' : 'View Level Results'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* LEVEL COMPLETION SCREEN WITH ANIMATION & VICTORY MASCOT */
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-amber-50 animate-bounce">
            <img
              src={IMAGES.mascotVictory}
              alt="Barnaby celebrating victory with trophy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {[1, 2, 3].map((starIdx) => {
                const accuracy = (levelStats.correct / levelStats.total) * 100;
                const earned =
                  (starIdx === 1 && accuracy >= 40) ||
                  (starIdx === 2 && accuracy >= 70) ||
                  (starIdx === 3 && accuracy === 100);
                return (
                  <Star
                    key={starIdx}
                    className={`w-8 h-8 transition-transform duration-300 hover:scale-125 ${
                      earned ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-200'
                    }`}
                  />
                );
              })}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Level {selectedLevel} Mastered!
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              You earned the &ldquo;{currentLevelInfo?.badge}&rdquo; badge!
            </p>
          </div>

          <div className="max-w-md mx-auto grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center shadow-xs">
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Score</div>
              <div className="font-mono-numbers text-xl font-bold text-slate-900 mt-0.5">
                +{levelStats.pointsEarned} XP
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Correct</div>
              <div className="font-mono-numbers text-xl font-bold text-emerald-700 mt-0.5">
                {levelStats.correct}/{levelStats.total}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Accuracy</div>
              <div className="font-mono-numbers text-xl font-bold text-amber-700 mt-0.5">
                {Math.round((levelStats.correct / levelStats.total) * 100)}%
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartLevel}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer hover:scale-102"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Practice Level Again</span>
            </button>

            {selectedLevel < 3 && (
              <button
                onClick={() => handleChangeLevel((selectedLevel + 1) as 1 | 2 | 3)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>Go to Level {selectedLevel + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
