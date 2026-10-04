import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, BookOpen, Sparkles, Lightbulb } from 'lucide-react';
import { sound } from '../utils/sound';
import { GRAMMAR_GUIDE } from '../data/learningContent';
import { IMAGES } from '../assets/images';
import { MascotGuide } from './MascotGuide';

interface StudyGuideProps {
  onStartGame: (gameTab: 'quest' | 'scramble' | 'matcher' | 'speed') => void;
}

export const StudyGuide: React.FC<StudyGuideProps> = ({ onStartGame }) => {
  const [patternTab, setPatternTab] = useState<'ifFirst' | 'resultFirst'>('ifFirst');
  const [selectedCondition, setSelectedCondition] = useState(0);
  const [selectedResult, setSelectedResult] = useState(0);

  const interactiveConditions = [
    { text: "you study with 25-minute Pomodoro intervals", subject: "you", verb: "study" },
    { text: "Sarah reviews her flashcards every morning", subject: "Sarah", verb: "reviews" },
    { text: "we keep our study desks tidy and organized", subject: "we", verb: "keep" },
    { text: "you leave your phone in another room", subject: "you", verb: "leave" },
    { text: "he doesn't procrastinate on his homework", subject: "he", verb: "doesn't procrastinate" }
  ];

  const interactiveResults = [
    { text: "you will finish your assignments with less stress", verb: "will finish" },
    { text: "she will remember tricky vocabulary effortlessly", verb: "will remember" },
    { text: "we will find our textbooks in seconds", verb: "will find" },
    { text: "you won't lose concentration during homework", verb: "won't lose" },
    { text: "he will feel prepared and confident for the exam", verb: "will feel" }
  ];

  const currentCond = interactiveConditions[selectedCondition].text;
  const currentRes = interactiveResults[selectedResult].text;

  const dynamicSentence = patternTab === 'ifFirst'
    ? `If ${currentCond}, ${currentRes}.`
    : `${currentRes.charAt(0).toUpperCase() + currentRes.slice(1)} if ${currentCond}.`;

  const handleListen = (text: string) => {
    sound.speak(text);
  };

  const habitCards = [
    {
      title: "Active Recall & Flashcards",
      category: "Memory Retention",
      image: IMAGES.flashcards,
      sentence: "If you practice with flashcards every day, your vocabulary will grow rapidly.",
      conditionVerb: "practice (Present Simple)",
      resultVerb: "will grow (Future Result)",
    },
    {
      title: "The Pomodoro Technique",
      category: "Time Management",
      image: IMAGES.pomodoroHabits,
      sentence: "If you work for 25 minutes and rest for 5 minutes, your mind will stay fresh.",
      conditionVerb: "work / rest (Present Simple)",
      resultVerb: "will stay (Future Result)",
    },
    {
      title: "Distraction-Free Study Space",
      category: "Deep Focus",
      image: IMAGES.digitalDetox,
      sentence: "You will finish your reading in half the time if you mute your smartphone notifications.",
      conditionVerb: "mute (Present Simple)",
      resultVerb: "will finish (Future Result)",
    },
    {
      title: "Collaborative Study Groups",
      category: "Peer Learning",
      image: IMAGES.groupStudy,
      sentence: "If students discuss difficult questions together, they will understand complex grammar.",
      conditionVerb: "discuss (Present Simple)",
      resultVerb: "will understand (Future Result)",
    },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto py-2">
      {/* Mascot Introduction Banner */}
      <MascotGuide
        title="Welcome to First Conditional Mastery!"
        message="Hello! I'm Barnaby, your study owl coach. In this guide, you will learn how to connect real study habits with their future results using the First Conditional. Study the formula, test the interactive sentence builder, and then jump into the games to earn XP!"
        mood="guiding"
        actionLabel="Jump to Habit Quest Game"
        onActionClick={() => onStartGame('quest')}
      />

      {/* Hero Overview Card */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span>Grammar Level A2</span>
                <span aria-hidden="true">·</span>
                <span>Topic: Study Habits</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
                First Conditional: Habits for Future Academic Success
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                We use the <strong>First Conditional</strong> to talk about realistic habits in the present and their likely results in the future. If you build good habits today, you will succeed tomorrow!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wide mb-1">
                The Master Formula
              </div>
              <div className="font-mono-numbers text-sm sm:text-base font-semibold text-slate-900">
                <span className="text-emerald-700">If + Present Simple</span>,{' '}
                <span className="text-indigo-700">will / won&apos;t + Base Verb</span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Example: If you sleep 8 hours, you will feel energized.
              </p>
            </div>
          </div>

          <div className="md:col-span-5 relative min-h-[220px] bg-slate-900 overflow-hidden group">
            <img
              src={IMAGES.cozyDesk}
              alt="Organized study desk with notebook and lamp"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs text-white/95 font-medium">
                Organized space = clear mind
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Clause Explorer */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              Interactive Formula Explorer
            </h2>
            <p className="text-sm text-slate-500">
              Observe how the clauses and commas change depending on sentence order.
            </p>
          </div>

          {/* Interactive Pattern Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                setPatternTab('ifFirst');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                patternTab === 'ifFirst'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              If at the Start (with comma)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setPatternTab('resultFirst');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                patternTab === 'resultFirst'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              If in the Middle (no comma)
            </button>
          </div>
        </div>

        {/* Live Sentence Display Box with animated pulse */}
        <div className="p-5 sm:p-6 rounded-xl bg-slate-900 text-white mb-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
            <span>LIVE FIRST CONDITIONAL RESULT</span>
            <button
              onClick={() => handleListen(dynamicSentence)}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer hover:scale-102"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen to Pronunciation 🔊</span>
            </button>
          </div>

          <div className="text-lg sm:text-xl font-medium tracking-wide leading-relaxed">
            {patternTab === 'ifFirst' ? (
              <span>
                <span className="text-emerald-300 font-semibold underline decoration-emerald-500/50">
                  If {currentCond}
                </span>
                <span className="text-amber-300 font-bold mx-1">,</span>{' '}
                <span className="text-indigo-300 font-semibold underline decoration-indigo-500/50">
                  {currentRes}
                </span>
                .
              </span>
            ) : (
              <span>
                <span className="text-indigo-300 font-semibold underline decoration-indigo-500/50">
                  {currentRes.charAt(0).toUpperCase() + currentRes.slice(1)}
                </span>{' '}
                <span className="text-amber-300 font-bold mx-1">if</span>{' '}
                <span className="text-emerald-300 font-semibold underline decoration-emerald-500/50">
                  {currentCond}
                </span>
                .
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
              <span>Green: Condition Clause (Present Simple)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 inline-block"></span>
              <span>Purple: Result Clause (will / won&apos;t + base verb)</span>
            </span>
            <span className="text-amber-300 font-mono">
              {patternTab === 'ifFirst' ? 'Rule: Comma is required after condition' : 'Rule: NO comma when "if" connects the clauses'}
            </span>
          </div>
        </div>

        {/* Habit Mix & Match Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              1. Choose a Study Habit (Condition Clause)
            </label>
            <div className="space-y-1.5">
              {interactiveConditions.map((cond, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedCondition(idx);
                  }}
                  className={`w-full text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border transition-all cursor-pointer ${
                    selectedCondition === idx
                      ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 font-semibold shadow-xs scale-101'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono text-emerald-700 mr-1.5">if</span>
                  <span>{cond.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              2. Choose a Future Outcome (Result Clause)
            </label>
            <div className="space-y-1.5">
              {interactiveResults.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedResult(idx);
                  }}
                  className={`w-full text-left text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border transition-all cursor-pointer ${
                    selectedResult === idx
                      ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold shadow-xs scale-101'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono text-indigo-700 mr-1.5">result:</span>
                  <span>{res.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 Golden Rules for A2 Learners */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              4 Golden Rules for A2 English Learners
            </h2>
            <p className="text-sm text-slate-500">
              Keep these in mind while playing the quest and building sentences!
            </p>
          </div>
          <Lightbulb className="w-5 h-5 text-amber-500 hidden sm:block animate-bounce" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GRAMMAR_GUIDE.goldenRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    Rule 0{idx + 1}
                  </span>
                  <h3 className="font-semibold text-slate-900 text-sm">{rule.rule}</h3>
                </div>

                <div className="space-y-1.5 my-3 text-xs">
                  <div className="flex items-start gap-2 p-2 rounded bg-rose-50 text-rose-900 border border-rose-100">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{rule.wrong}</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded bg-emerald-50 text-emerald-900 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{rule.right}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100 leading-relaxed">
                {rule.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Real Study Habits Visual Gallery (ENRICHED WITH 4 IMAGES) */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-slate-900">
          First Conditional in Real Study Habits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {habitCards.map((habit, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all group"
            >
              <div className="h-44 bg-slate-900 overflow-hidden relative">
                <img
                  src={habit.image}
                  alt={habit.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-300 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                  {habit.category}
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 text-base">
                    {habit.title}
                  </h3>
                  <button
                    onClick={() => sound.speak(habit.sentence)}
                    title="Listen to this sentence"
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 italic bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
                  &ldquo;{habit.sentence}&rdquo;
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1">
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-emerald-800 block">Condition:</span>
                    <span>{habit.conditionVerb}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-100">
                    <span className="font-bold text-indigo-800 block">Result:</span>
                    <span>{habit.resultVerb}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action: Start Playing */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">Ready to practice?</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold mt-1">
            Put your First Conditional knowledge to the test!
          </h3>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Play the Habit Quest for instant grammar feedback, solve sentence scramble puzzles, and race against the clock.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => {
              sound.playClick();
              onStartGame('quest');
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-md cursor-pointer hover:scale-105 active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>Play Habit Quest</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
