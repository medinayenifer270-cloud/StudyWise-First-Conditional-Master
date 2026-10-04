import React, { useState, useEffect } from 'react';
import { Timer, Check, X, RotateCcw, Volume2, Award, Zap, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';
import { SPEED_QUESTIONS, SpeedQuestion } from '../data/learningContent';
import { MascotGuide } from './MascotGuide';
import { IMAGES } from '../assets/images';
import { ConfettiEffect } from './ConfettiEffect';

interface SpeedSprintGameProps {
  onAddScore: (points: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
}

export const SpeedSprintGame: React.FC<SpeedSprintGameProps> = ({
  onAddScore,
  onIncrementStreak,
  onResetStreak,
}) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{
    wasUserCorrect: boolean;
    explanation: string;
    correction?: string;
  } | null>(null);

  const question: SpeedQuestion = SPEED_QUESTIONS[currentIndex % SPEED_QUESTIONS.length];

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (gameState === 'playing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('ended');
      setShowConfetti(true);
      sound.playStreak();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameState, timeLeft]);

  const handleStart = () => {
    sound.playClick();
    setTimeLeft(45);
    setCurrentIndex(0);
    setCorrectCount(0);
    setTotalAttempted(0);
    setLastFeedback(null);
    setShowConfetti(false);
    setGameState('playing');
  };

  const handleAnswer = (userChoiceIsValid: boolean) => {
    if (gameState !== 'playing') return;

    const userWasRight = userChoiceIsValid === question.isValid;
    setTotalAttempted((prev) => prev + 1);

    if (userWasRight) {
      sound.playCorrect();
      onIncrementStreak();
      onAddScore(20);
      setCorrectCount((prev) => prev + 1);
    } else {
      sound.playIncorrect();
      onResetStreak();
    }

    setLastFeedback({
      wasUserCorrect: userWasRight,
      explanation: question.explanation,
      correction: question.correction,
    });

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 relative">
      <ConfettiEffect active={showConfetti} />

      <MascotGuide
        title="45-Second Speed Sprint"
        message="Test your instinct! Fast-read each study habit sentence and decide: is it grammatically CORRECT or INCORRECT?"
        mood={gameState === 'ended' && correctCount >= 4 ? 'cheering' : 'encouraging'}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Visual Sprint Header Image */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 h-36 sm:h-44 bg-slate-900 shadow-inner group">
          <img
            src={IMAGES.pomodoroHabits}
            alt="Rapid study sprint timer"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
              Time-Attack Sprint
            </span>
            <div className="text-white text-base sm:text-lg font-semibold leading-snug">
              Rapid First Conditional Grammar Reflexes
            </div>
          </div>
        </div>

        {/* State: Idle / Start */}
        {gameState === 'idle' && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-700 shadow-xs animate-bounce">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Ready for the Speed Sprint?
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              You will have 45 seconds to judge First Conditional sentences. Watch out for illegal &lsquo;will&rsquo; after &lsquo;if&rsquo;, missing 3rd-person &lsquo;-s&rsquo;, and incorrect negative forms!
            </p>
            <div className="pt-2">
              <button
                onClick={handleStart}
                className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer inline-flex items-center gap-2 hover:scale-105 active:scale-98"
              >
                <Zap className="w-4 h-4" />
                <span>Start 45s Sprint</span>
              </button>
            </div>
          </div>
        )}

        {/* State: Playing */}
        {gameState === 'playing' && (
          <div className="space-y-6">
            {/* Top Bar with Pulsing Animated Timer */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Timer className={`w-5 h-5 ${timeLeft <= 10 ? 'text-rose-600 animate-ping' : 'text-amber-600'}`} />
                <span
                  className={`font-mono-numbers text-xl font-bold transition-colors ${
                    timeLeft <= 10 ? 'text-rose-600 animate-pulse' : 'text-slate-900'
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                <span>Score:</span>
                <span className="font-mono-numbers font-bold text-amber-800 text-sm bg-amber-100 px-2 py-0.5 rounded-md">
                  {correctCount}/{totalAttempted}
                </span>
              </div>
            </div>

            {/* Sentence Prompt */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white text-center min-h-[130px] flex flex-col items-center justify-center shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
              <span className="text-xs text-amber-400 font-mono uppercase tracking-widest mb-2">
                Analyze This Sentence
              </span>
              <p className="text-lg sm:text-xl font-medium max-w-xl leading-relaxed">
                &ldquo;{question.sentence}&rdquo;
              </p>
            </div>

            {/* Decision Buttons with animated hover */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(true)}
                className="py-4 px-6 rounded-xl border-2 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 hover:-translate-y-0.5"
              >
                <Check className="w-5 h-5 text-emerald-600" />
                <span>Correct ✅</span>
              </button>

              <button
                onClick={() => handleAnswer(false)}
                className="py-4 px-6 rounded-xl border-2 border-rose-500 bg-rose-50 hover:bg-rose-100 text-rose-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 hover:-translate-y-0.5"
              >
                <X className="w-5 h-5 text-rose-600" />
                <span>Incorrect ❌</span>
              </button>
            </div>

            {/* Instant Feedback on previous question */}
            {lastFeedback && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-2 duration-150 shadow-2xs ${
                  lastFeedback.wasUserCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {lastFeedback.wasUserCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-bounce" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold">
                      {lastFeedback.wasUserCorrect ? 'Correct call! (+20 XP) ' : 'Review rule: '}
                    </span>
                    <span>{lastFeedback.explanation}</span>
                    {lastFeedback.correction && (
                      <div className="mt-1 font-semibold text-slate-900 bg-white/80 p-2 rounded-lg border border-slate-200">
                        Correct form: &ldquo;{lastFeedback.correction}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* State: Ended */}
        {gameState === 'ended' && (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-amber-50 animate-bounce">
              <img
                src={IMAGES.mascotVictory}
                alt="Barnaby congratulating you"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Sprint Time Expired!
            </h2>

            <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-center shadow-xs">
              <div>
                <span className="text-xs text-slate-500 uppercase block">Correct</span>
                <span className="font-mono-numbers text-2xl font-bold text-emerald-700">
                  {correctCount}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase block">Total</span>
                <span className="font-mono-numbers text-2xl font-bold text-slate-800">
                  {totalAttempted}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Great practice! Rapid grammar identification trains your brain to notice verb tenses automatically.
            </p>

            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm cursor-pointer shadow-xs hover:scale-105 active:scale-98 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sprint Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
