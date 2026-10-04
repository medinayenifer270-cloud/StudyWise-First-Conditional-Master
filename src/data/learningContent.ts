export interface Question {
  id: string;
  level: 1 | 2 | 3;
  levelTitle: string;
  habitTopic: string;
  imageKey?: 'cozyDesk' | 'pomodoroHabits' | 'successExam' | 'flashcards' | 'groupStudy' | 'digitalDetox';
  sentencePrompt: string; // e.g. "If you ______ (review) your notes every evening, you ______ (remember) more."
  fullCorrectSentence: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    mistakeReason?: string;
  }[];
  explanationCorrect: string;
  explanationGeneral: string;
  studyTip: string;
  clausePattern: 'if-first' | 'result-first';
  conditionClause: string;
  resultClause: string;
}

export interface ScrambleChallenge {
  id: string;
  words: string[]; // Shuffled word tokens
  correctOrder: string[]; // Target sequence
  habitTip: string;
  explanation: string;
}

export interface MatchPair {
  id: string;
  condition: string; // e.g. "If you turn off your phone notifications,"
  result: string; // e.g. "you will finish your reading in half the time."
  habitSummary: string;
}

export interface SpeedQuestion {
  id: string;
  sentence: string;
  isValid: boolean;
  correction?: string;
  explanation: string;
}

export const GRAMMAR_GUIDE = {
  title: "First Conditional: Rules & Patterns",
  subtitle: "Expressing realistic future study habits and their results (A2 Level)",
  definition: "We use the First Conditional to talk about a real or likely condition in the present, and its probable result in the future.",
  formulaIfFirst: {
    pattern: "If + Present Simple, will / won't + Base Verb",
    example: "If you create a study schedule, you will manage your time better.",
    condition: "If you create a study schedule (Condition in Present Simple)",
    result: "you will manage your time better (Future Result)",
    note: "Use a comma (,) when the sentence starts with 'If'."
  },
  formulaResultFirst: {
    pattern: "Will / won't + Base Verb + if + Present Simple",
    example: "You will pass the English test if you practice every day.",
    result: "You will pass the English test (Future Result)",
    condition: "if you practice every day (Condition in Present Simple)",
    note: "Do NOT use a comma when 'if' is in the middle!"
  },
  goldenRules: [
    {
      rule: "Never use 'will' right after 'If'!",
      wrong: "If you will study tonight, you will pass. ❌",
      right: "If you study tonight, you will pass. ✅",
      detail: "The clause with 'if' ALWAYS takes the Present Simple, never 'will'."
    },
    {
      rule: "Remember third-person '-s' in Present Simple",
      wrong: "If Daniel study hard, he will succeed. ❌",
      right: "If Daniel studies hard, he will succeed. ✅",
      detail: "With he, she, or it, remember: study → studies, do → does, have → has."
    },
    {
      rule: "Negatives: don't/doesn't in 'if', won't in result",
      wrong: "If you won't sleep, you are tired. ❌",
      right: "If you don't sleep 8 hours, you won't concentrate tomorrow. ✅",
      detail: "Use 'don't / doesn't + base verb' after 'if', and 'won't (will not) + base verb' in the result."
    }
  ],
  studyHabitsList: [
    {
      habit: "Active Recall & Flashcards",
      conditional: "If you use flashcards every morning, you will memorize 10 new words.",
      benefit: "Strengthens long-term memory retrieval."
    },
    {
      habit: "Pomodoro Technique (25m study / 5m break)",
      conditional: "If you take short 5-minute breaks, your brain will stay alert.",
      benefit: "Prevents mental fatigue and burnout."
    },
    {
      habit: "Distraction-Free Workspace",
      conditional: "You will complete your tasks faster if you put your phone in another room.",
      benefit: "Eliminates visual and auditory distractions."
    },
    {
      habit: "Daily Planner & Task Checklists",
      conditional: "If she writes down her daily goals, she won't feel overwhelmed.",
      benefit: "Provides clear direction and structure."
    },
    {
      habit: "Adequate Rest & Sleep",
      conditional: "You will think more clearly during the exam if you sleep 8 hours.",
      benefit: "Consolidates memory and restores cognitive sharpness."
    }
  ]
};

export const QUEST_LEVELS = [
  {
    level: 1 as const,
    title: "Level 1: Daily Study Foundations",
    description: "Master basic 'If + Present Simple' and positive results.",
    badge: "Habit Apprentice"
  },
  {
    level: 2 as const,
    title: "Level 2: Focus & Negative Forms",
    description: "Practice 'don't / doesn't' and 'won't' with smart focus habits.",
    badge: "Focus Specialist"
  },
  {
    level: 3 as const,
    title: "Level 3: Exam Prep & Inverted Clauses",
    description: "Tackle sentences with 'if' in the middle and third-person subjects.",
    badge: "Exam Master"
  }
];

export const QUEST_QUESTIONS: Question[] = [
  // LEVEL 1: Daily Study Foundations
  {
    id: "q1",
    level: 1,
    levelTitle: "Daily Study Foundations",
    habitTopic: "Reviewing Notes",
    imageKey: "cozyDesk",
    sentencePrompt: "If you _______ your notes after class, you _______ the grammar easily.",
    fullCorrectSentence: "If you review your notes after class, you will understand the grammar easily.",
    options: [
      {
        id: "opt_a",
        text: "review / will understand",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "will review / understand",
        isCorrect: false,
        mistakeReason: "You placed 'will' after 'if'. Remember: 'If' takes the present simple, not 'will'."
      },
      {
        id: "opt_c",
        text: "reviewed / will understand",
        isCorrect: false,
        mistakeReason: "'Reviewed' is past simple. In the First Conditional, the condition must be Present Simple."
      },
      {
        id: "opt_d",
        text: "review / understand",
        isCorrect: false,
        mistakeReason: "The result clause is missing 'will' for the future outcome."
      }
    ],
    explanationCorrect: "Spot on! In the If-clause ('If you review'), we use Present Simple. In the result clause ('you will understand'), we use 'will' + base verb.",
    explanationGeneral: "First Conditional Rule: If + Present Simple, will + base verb.",
    studyTip: "Reviewing class notes within 24 hours boosts retention by up to 60%!",
    clausePattern: "if-first",
    conditionClause: "If you review your notes after class,",
    resultClause: "you will understand the grammar easily."
  },
  {
    id: "q2",
    level: 1,
    levelTitle: "Daily Study Foundations",
    habitTopic: "Organized Desk",
    imageKey: "digitalDetox",
    sentencePrompt: "If Mia _______ her study desk, she _______ her textbooks in seconds.",
    fullCorrectSentence: "If Mia organizes her study desk, she will find her textbooks in seconds.",
    options: [
      {
        id: "opt_a",
        text: "organize / will find",
        isCorrect: false,
        mistakeReason: "Watch the subject: 'Mia' is 3rd-person singular (she), so 'organize' needs an -s ('organizes')."
      },
      {
        id: "opt_b",
        text: "organizes / will find",
        isCorrect: true
      },
      {
        id: "opt_c",
        text: "will organize / finds",
        isCorrect: false,
        mistakeReason: "Do not put 'will' immediately after 'If'."
      },
      {
        id: "opt_d",
        text: "organizes / finds",
        isCorrect: false,
        mistakeReason: "The result clause needs 'will' + base verb to show a future probability."
      }
    ],
    explanationCorrect: "Excellent! 'Mia' is 3rd person singular (she), so we use 'organizes' in the If-clause, and 'will find' in the result clause.",
    explanationGeneral: "Remember: He/She/It verbs take -s or -es in the Present Simple.",
    studyTip: "A tidy workspace reduces visual distraction and helps your mind focus faster.",
    clausePattern: "if-first",
    conditionClause: "If Mia organizes her study desk,",
    resultClause: "she will find her textbooks in seconds."
  },
  {
    id: "q3",
    level: 1,
    levelTitle: "Daily Study Foundations",
    habitTopic: "Flashcard Practice",
    imageKey: "flashcards",
    sentencePrompt: "If we _______ flashcards every morning, we _______ new vocabulary faster.",
    fullCorrectSentence: "If we practice with flashcards every morning, we will learn new vocabulary faster.",
    options: [
      {
        id: "opt_a",
        text: "will practice / learn",
        isCorrect: false,
        mistakeReason: "Never put 'will' in the If-clause."
      },
      {
        id: "opt_b",
        text: "practice / will learn",
        isCorrect: true
      },
      {
        id: "opt_c",
        text: "practices / will learn",
        isCorrect: false,
        mistakeReason: "The subject is 'we' (plural), so the verb is 'practice', not 'practices'."
      },
      {
        id: "opt_d",
        text: "practice / are learning",
        isCorrect: false,
        mistakeReason: "First Conditional uses 'will + base verb' for the result, not present continuous."
      }
    ],
    explanationCorrect: "Great job! 'If we practice' is Present Simple (plural subject 'we'), and 'we will learn' is the future result.",
    explanationGeneral: "Formula: If + [Subject] + [Present Simple], [Subject] + will + [Base Verb].",
    studyTip: "Spaced flashcards (reviewing after 1 day, then 3 days, then a week) create permanent memories!",
    clausePattern: "if-first",
    conditionClause: "If we practice with flashcards every morning,",
    resultClause: "we will learn new vocabulary faster."
  },
  {
    id: "q4",
    level: 1,
    levelTitle: "Daily Study Foundations",
    habitTopic: "Asking Questions",
    imageKey: "groupStudy",
    sentencePrompt: "If you _______ the teacher when you are confused, you _______ confident in class.",
    fullCorrectSentence: "If you ask the teacher when you are confused, you will feel confident in class.",
    options: [
      {
        id: "opt_a",
        text: "ask / will feel",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "will ask / feel",
        isCorrect: false,
        mistakeReason: "Never use 'will' right after 'if'."
      },
      {
        id: "opt_c",
        text: "asks / will feel",
        isCorrect: false,
        mistakeReason: "With 'you', do not add '-s' to the verb."
      },
      {
        id: "opt_d",
        text: "ask / feel",
        isCorrect: false,
        mistakeReason: "The result requires 'will feel' to express the future effect."
      }
    ],
    explanationCorrect: "Right on target! 'If you ask' (Present Simple) + 'you will feel' (will + base verb).",
    explanationGeneral: "Subject 'you' takes the base verb 'ask' in the Present Simple.",
    studyTip: "Never be afraid to ask questions; clarifying doubts early saves hours of re-studying later!",
    clausePattern: "if-first",
    conditionClause: "If you ask the teacher when you are confused,",
    resultClause: "you will feel confident in class."
  },

  // LEVEL 2: Focus & Negative Forms
  {
    id: "q5",
    level: 2,
    levelTitle: "Focus & Negative Forms",
    habitTopic: "Phone Distractions",
    imageKey: "digitalDetox",
    sentencePrompt: "If you _______ your phone notifications, you _______ distracted during homework.",
    fullCorrectSentence: "If you mute your phone notifications, you won't get distracted during homework.",
    options: [
      {
        id: "opt_a",
        text: "mute / won't get",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "will mute / don't get",
        isCorrect: false,
        mistakeReason: "'Will' is wrongly in the If-clause, and 'don't' was used instead of 'won't' in the result."
      },
      {
        id: "opt_c",
        text: "mute / not get",
        isCorrect: false,
        mistakeReason: "The negative future needs 'won't' (will not) + base verb, not just 'not'."
      },
      {
        id: "opt_d",
        text: "muted / won't get",
        isCorrect: false,
        mistakeReason: "'Muted' is past tense. We need present simple 'mute'."
      }
    ],
    explanationCorrect: "Fantastic! 'won't' is the short form of 'will not'. 'If you mute' + 'you won't get distracted'.",
    explanationGeneral: "Negative First Conditional: won't + base verb in the result clause.",
    studyTip: "Every smartphone notification takes an average of 15 minutes to fully refocus from!",
    clausePattern: "if-first",
    conditionClause: "If you mute your phone notifications,",
    resultClause: "you won't get distracted during homework."
  },
  {
    id: "q6",
    level: 2,
    levelTitle: "Focus & Negative Forms",
    habitTopic: "Pomodoro Breaks",
    imageKey: "pomodoroHabits",
    sentencePrompt: "If Lucas _______ breaks every 25 minutes, he _______ exhausted by 8 PM.",
    fullCorrectSentence: "If Lucas doesn't take breaks every 25 minutes, he will feel exhausted by 8 PM.",
    options: [
      {
        id: "opt_a",
        text: "doesn't take / will feel",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "don't take / will feel",
        isCorrect: false,
        mistakeReason: "Lucas is 3rd-person singular (he), so we must use 'doesn't', not 'don't'."
      },
      {
        id: "opt_c",
        text: "won't take / feels",
        isCorrect: false,
        mistakeReason: "Do not put 'won't' after 'if'. Use 'doesn't take' after 'if'."
      },
      {
        id: "opt_d",
        text: "not take / will feel",
        isCorrect: false,
        mistakeReason: "Present simple negatives require an auxiliary: 'doesn't take'."
      }
    ],
    explanationCorrect: "Superb! For 3rd-person singular ('Lucas'), the negative present simple is 'doesn't take'. The result is 'will feel'.",
    explanationGeneral: "Negative present simple: He/She/It + doesn't + base verb.",
    studyTip: "The Pomodoro Technique (25 min focus + 5 min rest) keeps your brain fresh all evening.",
    clausePattern: "if-first",
    conditionClause: "If Lucas doesn't take breaks every 25 minutes,",
    resultClause: "he will feel exhausted by 8 PM."
  },
  {
    id: "q7",
    level: 2,
    levelTitle: "Focus & Negative Forms",
    habitTopic: "Study Planner",
    imageKey: "cozyDesk",
    sentencePrompt: "If you _______ a weekly study plan, you _______ when assignments are due.",
    fullCorrectSentence: "If you don't keep a weekly study plan, you won't know when assignments are due.",
    options: [
      {
        id: "opt_a",
        text: "don't keep / won't know",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "won't keep / don't know",
        isCorrect: false,
        mistakeReason: "Never put 'won't' in the If-clause."
      },
      {
        id: "opt_c",
        text: "doesn't keep / won't know",
        isCorrect: false,
        mistakeReason: "With 'you', use 'don't', not 'doesn't'."
      },
      {
        id: "opt_d",
        text: "don't keep / not know",
        isCorrect: false,
        mistakeReason: "The result clause requires 'won't know'."
      }
    ],
    explanationCorrect: "Well done! Double negative: 'If you don't keep' (Present Simple) + 'you won't know' (future result with won't).",
    explanationGeneral: "Negative structure: If + don't + base verb, won't + base verb.",
    studyTip: "Writing down deadlines in a planner frees your mind from worrying about forgotten homework.",
    clausePattern: "if-first",
    conditionClause: "If you don't keep a weekly study plan,",
    resultClause: "you won't know when assignments are due."
  },
  {
    id: "q8",
    level: 2,
    levelTitle: "Focus & Negative Forms",
    habitTopic: "Cramming vs Spacing",
    imageKey: "flashcards",
    sentencePrompt: "If students _______ all night before the test, their brains _______ information properly.",
    fullCorrectSentence: "If students cram all night before the test, their brains won't process information properly.",
    options: [
      {
        id: "opt_a",
        text: "cram / won't process",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "will cram / don't process",
        isCorrect: false,
        mistakeReason: "'Will' is in the condition clause, which is incorrect."
      },
      {
        id: "opt_c",
        text: "crams / won't process",
        isCorrect: false,
        mistakeReason: "'Students' is plural (they), so the verb should be 'cram', without '-s'."
      },
      {
        id: "opt_d",
        text: "cram / will process",
        isCorrect: false,
        mistakeReason: "Grammatically possible, but factually backwards! Cramming impairs mental processing."
      }
    ],
    explanationCorrect: "Spot on! 'students cram' (plural present simple) + 'won't process' (negative future result).",
    explanationGeneral: "Use base verb with plural subjects: they cram, students cram.",
    studyTip: "Cramming only enters temporary short-term memory; spacing study sessions builds long-term fluency!",
    clausePattern: "if-first",
    conditionClause: "If students cram all night before the test,",
    resultClause: "their brains won't process information properly."
  },

  // LEVEL 3: Exam Prep & Inverted Clauses
  {
    id: "q9",
    level: 3,
    levelTitle: "Exam Prep & Inverted Clauses",
    habitTopic: "Inverted Order (Result First)",
    imageKey: "successExam",
    sentencePrompt: "You _______ top marks on the quiz if you _______ the practice questions.",
    fullCorrectSentence: "You will achieve top marks on the quiz if you complete the practice questions.",
    options: [
      {
        id: "opt_a",
        text: "will achieve / complete",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "achieve / will complete",
        isCorrect: false,
        mistakeReason: "Inverted order! The clause with 'if' is at the end, so 'complete' belongs after 'if', not 'will complete'."
      },
      {
        id: "opt_c",
        text: "will achieve / will complete",
        isCorrect: false,
        mistakeReason: "Never use 'will' in both clauses! Only the result gets 'will'."
      },
      {
        id: "opt_d",
        text: "achieve / complete",
        isCorrect: false,
        mistakeReason: "One clause must express the future with 'will'."
      }
    ],
    explanationCorrect: "Brilliant! Here the order is reversed: Result First ('You will achieve') + Condition Second ('if you complete'). Notice there is NO comma!",
    explanationGeneral: "Pattern: [Result with will] + if + [Condition in Present Simple]. No comma needed!",
    studyTip: "Practicing with sample test questions teaches your brain how to apply rules under time pressure.",
    clausePattern: "result-first",
    conditionClause: "if you complete the practice questions.",
    resultClause: "You will achieve top marks on the quiz"
  },
  {
    id: "q10",
    level: 3,
    levelTitle: "Exam Prep & Inverted Clauses",
    habitTopic: "Sleep & Memory Consolidation",
    imageKey: "cozyDesk",
    sentencePrompt: "Sophia _______ refreshed for the exam tomorrow if she _______ to bed before 10 PM.",
    fullCorrectSentence: "Sophia will feel refreshed for the exam tomorrow if she goes to bed before 10 PM.",
    options: [
      {
        id: "opt_a",
        text: "will feel / goes",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "feels / will go",
        isCorrect: false,
        mistakeReason: "The result clause needs 'will feel', and the if-clause needs 'goes'."
      },
      {
        id: "opt_c",
        text: "will feel / go",
        isCorrect: false,
        mistakeReason: "'She' requires 3rd person '-es' on 'go' → 'goes'."
      },
      {
        id: "opt_d",
        text: "will feel / will go",
        isCorrect: false,
        mistakeReason: "Never put 'will' after 'if'."
      }
    ],
    explanationCorrect: "Outstanding! Result first: 'Sophia will feel', followed by 'if she goes' (3rd person singular 'goes').",
    explanationGeneral: "Watch both: result gets 'will', and 3rd person subject gets '-es' (go → goes).",
    studyTip: "During deep sleep, the brain replays and organizes study material learned during the day!",
    clausePattern: "result-first",
    conditionClause: "if she goes to bed before 10 PM.",
    resultClause: "Sophia will feel refreshed for the exam tomorrow"
  },
  {
    id: "q11",
    level: 3,
    levelTitle: "Exam Prep & Inverted Clauses",
    habitTopic: "Group Study Sessions",
    imageKey: "groupStudy",
    sentencePrompt: "Emma and Liam _______ each other's doubts if they _______ together in the library.",
    fullCorrectSentence: "Emma and Liam will resolve each other's doubts if they study together in the library.",
    options: [
      {
        id: "opt_a",
        text: "will resolve / study",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "resolve / will study",
        isCorrect: false,
        mistakeReason: "'If' is in the second clause, so 'study' must be in Present Simple."
      },
      {
        id: "opt_c",
        text: "will resolve / studies",
        isCorrect: false,
        mistakeReason: "'They' is plural, so we use 'study', not 'studies'."
      },
      {
        id: "opt_d",
        text: "will resolve / will study",
        isCorrect: false,
        mistakeReason: "Do not use 'will' in both parts."
      }
    ],
    explanationCorrect: "Terrific! Result: 'Emma and Liam will resolve' + Condition: 'if they study' (plural subject 'they').",
    explanationGeneral: "Inverted order: [Result: will + verb] + if + [Condition: present simple].",
    studyTip: "Explaining a grammar rule to a study partner is one of the best ways to test if you truly understand it!",
    clausePattern: "result-first",
    conditionClause: "if they study together in the library.",
    resultClause: "Emma and Liam will resolve each other's doubts"
  },
  {
    id: "q12",
    level: 3,
    levelTitle: "Exam Prep & Inverted Clauses",
    habitTopic: "Time Management",
    imageKey: "pomodoroHabits",
    sentencePrompt: "You _______ panicked on exam morning if you _______ your bag the night before.",
    fullCorrectSentence: "You won't feel panicked on exam morning if you prepare your bag the night before.",
    options: [
      {
        id: "opt_a",
        text: "won't feel / prepare",
        isCorrect: true
      },
      {
        id: "opt_b",
        text: "don't feel / will prepare",
        isCorrect: false,
        mistakeReason: "The result takes 'won't feel', and the if-clause takes present simple 'prepare'."
      },
      {
        id: "opt_c",
        text: "won't feel / prepares",
        isCorrect: false,
        mistakeReason: "'You' takes base verb 'prepare', not 'prepares'."
      },
      {
        id: "opt_d",
        text: "will feel / prepare",
        isCorrect: false,
        mistakeReason: "Meaning trap: preparing your bag prevents panic, so we need negative 'won't feel'!"
      }
    ],
    explanationCorrect: "Masterful! Result: 'You won't feel panicked' + Condition: 'if you prepare your bag'. Meaning and grammar are both perfect!",
    explanationGeneral: "Negative result with 'won't' + positive condition with 'if you prepare'.",
    studyTip: "Pack your pencils, calculator, and notes the night before to eliminate morning stress.",
    clausePattern: "result-first",
    conditionClause: "if you prepare your bag the night before.",
    resultClause: "You won't feel panicked on exam morning"
  }
];

export const SCRAMBLE_CHALLENGES: ScrambleChallenge[] = [
  {
    id: "scramble_1",
    words: ["If", "you", "highlight", "key", "words,", "you", "will", "find", "ideas", "faster."],
    correctOrder: ["If", "you", "highlight", "key", "words,", "you", "will", "find", "ideas", "faster."],
    habitTip: "Highlighting only 2-3 main ideas per page keeps your notes scannable!",
    explanation: "Condition: 'If you highlight key words,' (Present Simple) + Result: 'you will find ideas faster.' (will + base verb)."
  },
  {
    id: "scramble_2",
    words: ["You", "will", "stay", "focused", "if", "you", "clean", "your", "study", "desk."],
    correctOrder: ["You", "will", "stay", "focused", "if", "you", "clean", "your", "study", "desk."],
    habitTip: "A tidy work area sends a psychological signal to start studying.",
    explanation: "Inverted order: 'You will stay focused' (Result) + 'if you clean your study desk.' (Condition). No comma!"
  },
  {
    id: "scramble_3",
    words: ["If", "she", "drinks", "water,", "her", "brain", "will", "think", "clearly."],
    correctOrder: ["If", "she", "drinks", "water,", "her", "brain", "will", "think", "clearly."],
    habitTip: "Even mild dehydration drops attention span by 15%. Keep a water bottle on your desk!",
    explanation: "'she drinks' (3rd person singular -s) + 'her brain will think' (will + base verb)."
  },
  {
    id: "scramble_4",
    words: ["If", "you", "don't", "procrastinate,", "you", "won't", "stress", "before", "exams."],
    correctOrder: ["If", "you", "don't", "procrastinate,", "you", "won't", "stress", "before", "exams."],
    habitTip: "The best anti-procrastination trick: commit to working for just 5 minutes!",
    explanation: "Double negative: 'If you don't procrastinate,' + 'you won't stress before exams.'"
  }
];

export const MATCH_PAIRS: MatchPair[] = [
  {
    id: "match_1",
    condition: "If you use the Pomodoro timer for 25 minutes,",
    result: "you will stay 100% focused without burning out.",
    habitSummary: "Interval studying"
  },
  {
    id: "match_2",
    condition: "If you summarize each chapter in your own words,",
    result: "you will understand the concept deeply.",
    habitSummary: "Active summarizing"
  },
  {
    id: "match_3",
    condition: "If you leave your smartphone in another room,",
    result: "you won't get distracted by social media notifications.",
    habitSummary: "Distraction management"
  },
  {
    id: "match_4",
    condition: "If you sleep eight solid hours before the big test,",
    result: "your brain will recall vocabulary with ease.",
    habitSummary: "Brain rest & memory"
  }
];

export const SPEED_QUESTIONS: SpeedQuestion[] = [
  {
    id: "speed_1",
    sentence: "If you will study with a timer, you will finish faster.",
    isValid: false,
    correction: "If you study with a timer, you will finish faster.",
    explanation: "Never put 'will' right after 'If'! Use Present Simple 'study'."
  },
  {
    id: "speed_2",
    sentence: "If Maya organizes her notes, she will review quickly.",
    isValid: true,
    explanation: "Correct! 'organizes' has 3rd-person -s, and result has 'will review'."
  },
  {
    id: "speed_3",
    sentence: "You will pass the quiz if you review flashcards today.",
    isValid: true,
    explanation: "Correct! Inverted order with 'will pass' first and 'if you review' second. No comma!"
  },
  {
    id: "speed_4",
    sentence: "If he don't sleep well, he won't concentrate tomorrow.",
    isValid: false,
    correction: "If he doesn't sleep well, he won't concentrate tomorrow.",
    explanation: "With 'he', the negative is 'doesn't', not 'don't'."
  },
  {
    id: "speed_5",
    sentence: "If you take short breaks, your memory will improve.",
    isValid: true,
    explanation: "Correct! 'If you take' (Present Simple) + 'will improve' (will + base verb)."
  },
  {
    id: "speed_6",
    sentence: "She will feel confident if she will ask questions in class.",
    isValid: false,
    correction: "She will feel confident if she asks questions in class.",
    explanation: "Don't use 'will' after 'if'. Use present simple: 'if she asks'."
  },
  {
    id: "speed_7",
    sentence: "If we don't start the assignment early, we won't finish it.",
    isValid: true,
    explanation: "Correct! 'If we don't start' + 'we won't finish'."
  },
  {
    id: "speed_8",
    sentence: "If you highlights your textbook, you remember key facts.",
    isValid: false,
    correction: "If you highlight your textbook, you will remember key facts.",
    explanation: "Two errors: 'you highlight' (no -s for 'you') and result needs 'will remember'."
  }
];

export const MASCOT_DIALOGUES = {
  welcome: {
    title: "Welcome to StudyWise!",
    text: "Hoo-ray! I'm Barnaby, your study owl coach! Together, we'll master the First Conditional through powerful study habits. Let's get started!"
  },
  ruleHint: {
    title: "Barnaby's Golden Rule",
    text: "Remember: After 'If', use Present Simple! In the other clause, use 'will' or 'won't' + base verb. Never put 'will' right after 'If'!"
  },
  correctCheer: [
    "Spot on! Your grammar habit is getting stronger!",
    "Hoo-hoo! That was brilliant! Keep up that focus!",
    "Terrific! You followed the First Conditional formula perfectly!",
    "Magnificent! That's the power of good study habits!"
  ],
  incorrectEncourage: [
    "Almost there! Don't worry, learning happens through practice. Look at the explanation below!",
    "Good try! Remember: 'If' takes the present simple. Let's review the tip!",
    "No problem at all! Every mistake teaches us a rule. Read the feedback below and try again!"
  ],
  gameInstructions: {
    quest: "Choose the correct verb forms to complete each study habit sentence. Read the feedback after every choice!",
    scramble: "Tap the word blocks in the right order to build a grammatically correct First Conditional sentence.",
    matcher: "Match the study habit condition on the left with its future result on the right.",
    speed: "Test your reflexes! Decide quickly if each sentence is grammatically correct or incorrect."
  }
};
