import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, RotateCcw, Sparkles, Check, ArrowRight } from 'lucide-react';
import { sound } from '../utils/sound';
import { MATCH_PAIRS, MatchPair } from '../data/learningContent';
import { MascotGuide } from './MascotGuide';
import { IMAGES } from '../assets/images';
import { ConfettiEffect } from './ConfettiEffect';

interface CauseEffectGameProps {
  onAddScore: (points: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
}

export const CauseEffectGame: React.FC<CauseEffectGameProps> = ({
  onAddScore,
  onIncrementStreak,
  onResetStreak,
}) => {
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [shuffledResults, setShuffledResults] = useState<{ id: string; result: string }[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState<{
    text: string;
    isCorrect: boolean;
    audioText?: string;
  } | null>(null);

  useEffect(() => {
    const results = MATCH_PAIRS.map((p) => ({ id: p.id, result: p.result }));
    setShuffledResults([...results].sort(() => Math.random() - 0.5));
    setMatchedPairs([]);
    setSelectedConditionId(null);
    setFeedback(null);
    setShowConfetti(false);
  }, []);

  const handleSelectCondition = (pairId: string) => {
    if (matchedPairs.includes(pairId)) return;
    sound.playClick();
    setSelectedConditionId(pairId);
    setFeedback(null);
  };

  const handleSelectResult = (resultId: string) => {
    if (matchedPairs.includes(resultId)) return;
    if (!selectedConditionId) {
      setFeedback({
        text: "Select a Study Habit Condition on the left first!",
        isCorrect: false,
      });
      return;
    }

    if (selectedConditionId === resultId) {
      sound.playCorrect();
      onIncrementStreak();
      onAddScore(25);
      const updatedMatches = [...matchedPairs, resultId];
      setMatchedPairs(updatedMatches);

      const targetPair = MATCH_PAIRS.find((p) => p.id === resultId);
      const fullSentence = `${targetPair?.condition} ${targetPair?.result}`;

      setFeedback({
        text: `Match found! "${fullSentence}"`,
        isCorrect: true,
        audioText: fullSentence,
      });
      setSelectedConditionId(null);

      if (updatedMatches.length === MATCH_PAIRS.length) {
        sound.playStreak();
        setShowConfetti(true);
      }
    } else {
      sound.playIncorrect();
      onResetStreak();
      setFeedback({
        text: "These two clauses don't create a logical study habit outcome. Try another combination!",
        isCorrect: false,
      });
    }
  };

  const handleReset = () => {
    sound.playClick();
    const results = MATCH_PAIRS.map((p) => ({ id: p.id, result: p.result }));
    setShuffledResults([...results].sort(() => Math.random() - 0.5));
    setMatchedPairs([]);
    setSelectedConditionId(null);
    setFeedback(null);
    setShowConfetti(false);
  };

  const isAllCompleted = matchedPairs.length === MATCH_PAIRS.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2 relative">
      <ConfettiEffect active={showConfetti} />

      <MascotGuide
        title="Habit Matcher: Cause & Future Result"
        message="Every good study habit produces a positive future result! Click a habit condition on the left, then click its corresponding consequence on the right."
        mood={isAllCompleted ? 'cheering' : 'guiding'}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
        {/* Visual Habit Collaboration Header */}
        <div className="relative rounded-xl overflow-hidden border border-slate-200 h-36 sm:h-44 bg-slate-900 shadow-inner group">
          <img
            src={IMAGES.groupStudy}
            alt="Students collaborating on study habits"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent flex flex-col justify-end p-4 sm:p-5">
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
              Interactive Logic Matcher
            </span>
            <div className="text-white text-base sm:text-lg font-semibold leading-snug">
              Pair Study Habits with Academic Outcomes
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md">
              Matched: {matchedPairs.length} / {MATCH_PAIRS.length}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-xs text-slate-500 font-medium">Logical Study Connections</span>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Pairs</span>
          </button>
        </div>

        {/* Matching Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column A: Habit Conditions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Habit Condition (If-Clause)</span>
            </h3>

            <div className="space-y-2.5">
              {MATCH_PAIRS.map((pair) => {
                const isMatched = matchedPairs.includes(pair.id);
                const isSelected = selectedConditionId === pair.id;

                let cardStyle =
                  'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100 text-slate-800 hover:-translate-y-0.5';
                if (isMatched) {
                  cardStyle =
                    'border-emerald-400 bg-emerald-50 text-emerald-950 font-medium shadow-2xs';
                } else if (isSelected) {
                  cardStyle = 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-xs scale-101 ring-2 ring-amber-300';
                }

                return (
                  <button
                    key={pair.id}
                    disabled={isMatched}
                    onClick={() => handleSelectCondition(pair.id)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${cardStyle}`}
                  >
                    <span>{pair.condition}</span>
                    {isMatched ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 animate-bounce" />
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">Select</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column B: Future Results */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Future Result (Will-Clause)</span>
            </h3>

            <div className="space-y-2.5">
              {shuffledResults.map((item) => {
                const isMatched = matchedPairs.includes(item.id);

                let cardStyle =
                  'border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-100 text-slate-800 hover:-translate-y-0.5';
                if (isMatched) {
                  cardStyle =
                    'border-emerald-400 bg-emerald-50 text-emerald-950 font-medium shadow-2xs';
                }

                return (
                  <button
                    key={item.id}
                    disabled={isMatched}
                    onClick={() => handleSelectResult(item.id)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${cardStyle}`}
                  >
                    <span>{item.result}</span>
                    {isMatched && <Check className="w-4 h-4 text-emerald-600 shrink-0 animate-bounce" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Real-time Feedback Banner */}
        {feedback && (
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-rose-50 border-rose-300 text-rose-950 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 animate-bounce" />
              ) : (
                <span className="text-base">⚠️</span>
              )}
              <span>{feedback.text}</span>
            </div>

            {feedback.audioText && (
              <button
                onClick={() => sound.speak(feedback.audioText || '')}
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 shrink-0 cursor-pointer hover:scale-102 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                <span>Listen 🔊</span>
              </button>
            )}
          </div>
        )}

        {/* Completion Celebration */}
        {isAllCompleted && (
          <div className="p-6 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-4 animate-in zoom-in-95 duration-300 shadow-sm">
            <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border-2 border-amber-300 shadow-sm bg-white animate-bounce">
              <img
                src={IMAGES.mascotVictory}
                alt="Barnaby celebration"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-display text-xl font-bold text-slate-900">
              All 4 Study Habits Connected! (+100 XP)
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
              You correctly linked every condition to its realistic future result. Notice how every sentence uses <strong>Present Simple</strong> after &lsquo;If&rsquo; and <strong>will / won&apos;t</strong> for the result!
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm cursor-pointer shadow-xs hover:scale-102 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Shuffle & Practice Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
