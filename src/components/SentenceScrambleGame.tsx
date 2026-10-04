import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, RotateCcw, ArrowRight, Sparkles, Undo2, AlertCircle } from 'lucide-react';
import { sound } from '../utils/sound';
import { SCRAMBLE_CHALLENGES, ScrambleChallenge } from '../data/learningContent';
import { MascotGuide } from './MascotGuide';
import { IMAGES } from '../assets/images';
import { ConfettiEffect } from './ConfettiEffect';

interface SentenceScrambleGameProps {
  onAddScore: (points: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
}

export const SentenceScrambleGame: React.FC<SentenceScrambleGameProps> = ({
  onAddScore,
  onIncrementStreak,
  onResetStreak,
}) => {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const challenge: ScrambleChallenge = SCRAMBLE_CHALLENGES[challengeIndex];

  // Available bank of words (shuffled) and selected words
  const [availableWords, setAvailableWords] = useState<{ id: string; word: string }[]>([]);
  const [constructedWords, setConstructedWords] = useState<{ id: string; word: string }[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Images for scramble challenges
  const scrambleImages = [
    IMAGES.flashcards,
    IMAGES.cozyDesk,
    IMAGES.digitalDetox,
    IMAGES.pomodoroHabits,
  ];

  // Initialize and shuffle words on challenge change
  useEffect(() => {
    const tokens = challenge.words.map((w, idx) => ({ id: `${challenge.id}-${idx}-${w}`, word: w }));
    const shuffled = [...tokens].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setConstructedWords([]);
    setIsChecked(false);
    setIsCorrect(false);
    setShowConfetti(false);
  }, [challengeIndex, challenge]);

  const handleAddWord = (token: { id: string; word: string }) => {
    if (isChecked) return;
    sound.playClick();
    setAvailableWords((prev) => prev.filter((item) => item.id !== token.id));
    setConstructedWords((prev) => [...prev, token]);
  };

  const handleRemoveWord = (token: { id: string; word: string }) => {
    if (isChecked) return;
    sound.playClick();
    setConstructedWords((prev) => prev.filter((item) => item.id !== token.id));
    setAvailableWords((prev) => [...prev, token]);
  };

  const handleReset = () => {
    sound.playClick();
    const tokens = challenge.words.map((w, idx) => ({ id: `${challenge.id}-${idx}-${w}`, word: w }));
    setAvailableWords([...tokens].sort(() => Math.random() - 0.5));
    setConstructedWords([]);
    setIsChecked(false);
    setIsCorrect(false);
    setShowConfetti(false);
  };

  const handleCheck = () => {
    const userSentence = constructedWords.map((t) => t.word).join(' ');
    const targetSentence = challenge.correctOrder.join(' ');
    const correct = userSentence === targetSentence;

    setIsChecked(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      onIncrementStreak();
      onAddScore(30);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      sound.playIncorrect();
      onResetStreak();
    }
  };

  const handleNextChallenge = () => {
    sound.playClick();
    setChallengeIndex((prev) => (prev + 1) % SCRAMBLE_CHALLENGES.length);
  };

  const targetSentenceString = challenge.correctOrder.join(' ');

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 relative">
      <ConfettiEffect active={showConfetti} />

      <MascotGuide
        title="Sentence Scramble Challenge"
        message="Tap the words below in the correct order to construct a valid First Conditional study habit sentence. Pay close attention to commas and verb forms!"
        mood={isCorrect ? 'cheering' : 'thinking'}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Header with Visual Mini-Thumbnail */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-xs shrink-0 bg-slate-100">
              <img
                src={scrambleImages[challengeIndex % scrambleImages.length]}
                alt="Puzzle habit theme"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md">
                Puzzle {challengeIndex + 1} of {SCRAMBLE_CHALLENGES.length}
              </span>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Topic: Study Habit Builder</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Words</span>
          </button>
        </div>

        {/* Construction Zone */}
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
            Your Sentence in Construction:
          </label>
          <div className="min-h-[100px] p-4 rounded-xl border-2 border-dashed border-amber-300/80 bg-amber-50/40 flex flex-wrap items-center gap-2 transition-all">
            {constructedWords.length === 0 ? (
              <span className="text-sm text-slate-400 italic">
                Tap words from the word bank below to place them here...
              </span>
            ) : (
              constructedWords.map((token) => (
                <button
                  key={token.id}
                  disabled={isChecked}
                  onClick={() => handleRemoveWord(token)}
                  className="px-3.5 py-2 rounded-xl bg-amber-100 text-amber-950 font-semibold text-sm sm:text-base border border-amber-300 hover:bg-rose-100 hover:border-rose-300 hover:text-rose-950 transition-all shadow-xs cursor-pointer active:scale-95 animate-in zoom-in-95 duration-150"
                  title="Click to remove word"
                >
                  {token.word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Word Bank */}
        <div>
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-2">
            Available Word Tokens:
          </label>
          <div className="flex flex-wrap gap-2.5 min-h-[50px]">
            {availableWords.map((token) => (
              <button
                key={token.id}
                disabled={isChecked}
                onClick={() => handleAddWord(token)}
                className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-amber-500 hover:bg-amber-50/70 text-slate-800 font-semibold text-sm sm:text-base shadow-xs transition-all cursor-pointer hover:-translate-y-0.5 active:scale-95"
              >
                {token.word}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              if (constructedWords.length > 0) {
                handleRemoveWord(constructedWords[constructedWords.length - 1]);
              }
            }}
            disabled={constructedWords.length === 0 || isChecked}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Undo2 className="w-4 h-4" />
            <span>Undo Last Word</span>
          </button>

          <button
            onClick={handleCheck}
            disabled={constructedWords.length === 0 || isChecked}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm transition-all shadow-sm cursor-pointer hover:scale-102 active:scale-98"
          >
            Check Sentence
          </button>
        </div>

        {/* Instant Feedback on Check */}
        {isChecked && (
          <div
            className={`p-5 rounded-xl border space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 animate-bounce" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                )}
                <span className="font-bold text-sm sm:text-base">
                  {isCorrect ? 'Sentence Perfect! (+30 XP)' : 'Not quite in the right order!'}
                </span>
              </div>

              <button
                onClick={() => sound.speak(targetSentenceString)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs hover:scale-102 transition-all cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Listen 🔊</span>
              </button>
            </div>

            <div className="p-3.5 bg-white/95 rounded-xl border border-slate-200 text-xs sm:text-sm space-y-2">
              <div>
                <span className="text-slate-500 font-bold block text-[11px] uppercase tracking-wider">
                  Target Sentence:
                </span>
                <span className="font-semibold text-slate-900 text-sm sm:text-base">
                  &ldquo;{targetSentenceString}&rdquo;
                </span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed">{challenge.explanation}</p>
            </div>

            <div className="flex items-start gap-2.5 text-xs bg-amber-100/70 p-3 rounded-xl text-amber-950 border border-amber-200">
              <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Study Tip: </strong>
                <span>{challenge.habitTip}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextChallenge}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm cursor-pointer shadow-xs hover:scale-102 transition-all"
              >
                <span>Next Puzzle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
