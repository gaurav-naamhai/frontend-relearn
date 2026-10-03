import React, { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Brain,
} from "lucide-react";
import { learnerService } from "../services/learnerService";

interface OnboardingProps {
  onComplete: () => void;
}

export const OnboardingPage: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGoal, setSelectedGoal] = useState("Placements & Interviews");
  const [selectedExperience, setSelectedExperience] = useState("Intermediate");
  const [quizIndex, setQuizIndex] = useState(0);

  const goals = [
    {
      title: "Python Basics",
      desc: "I want to understand programming fundamentals from scratch.",
    },
    {
      title: "Placements & Interviews",
      desc: "I want programming skills and deep conceptual clarity for placement preparation.",
    },
    {
      title: "Data Analysis",
      desc: "I want Python for data, statistics, and analytics workflows.",
    },
    {
      title: "College",
      desc: "I want to strengthen my academic CS grades and lab performance.",
    },
    {
      title: "Build Projects",
      desc: "I want to learn Python by building real tools and backend systems.",
    },
  ];

  const experiences = [
    {
      title: "Complete beginner",
      desc: "I've never programmed in any language before.",
    },
    {
      title: "Beginner",
      desc: "I know basic concepts like variables and print statements.",
    },
    {
      title: "Intermediate",
      desc: "I can write simple programs with loops and functions.",
    },
    {
      title: "Advanced beginner",
      desc: "I can solve basic algorithm problems independently.",
    },
  ];

  const diagnosticQuestions = [
    {
      concept: "Variables",
      q: "What is the value of y after: x = 10; y = x; x = 20?",
      options: ["10", "20", "None", "Error"],
      correct: 0,
    },
    {
      concept: "Conditions",
      q: "Which expression checks whether n is between 1 and 10 (inclusive)?",
      options: ["1 <= n <= 10", "1 < n < 10", "n == 1 or 10", "between(n, 1, 10)"],
      correct: 0,
    },
    {
      concept: "Loops",
      q: "What does list(range(2, 5)) evaluate to in Python?",
      options: ["[2, 3, 4]", "[2, 3, 4, 5]", "[3, 4, 5]", "[2, 5]"],
      correct: 0,
    },
    {
      concept: "Functions",
      q: "What is the return value of a Python function that has no 'return' statement?",
      options: ["None", "0", "False", "Empty string"],
      correct: 0,
    },
    {
      concept: "Lists",
      q: "If nums = [10, 20, 30], what does nums[-1] access?",
      options: ["30", "10", "20", "IndexError"],
      correct: 0,
    },
    {
      concept: "Dictionaries",
      q: "How do you safely retrieve a key 'age' with a fallback of 0 if absent?",
      options: ["d.get('age', 0)", "d['age'] or 0", "d.fetch('age', 0)", "d.age"],
      correct: 0,
    },
    {
      concept: "Return Values",
      q: "What does this output? x = print('Hi'); print(x)",
      options: ["Hi then None", "Hi then Hi", "None only", "SyntaxError"],
      correct: 0,
    },
    {
      concept: "List Mutation",
      q: "What does items = [3, 1].sort() leave in variable items?",
      options: ["None", "[1, 3]", "[3, 1]", "Error"],
      correct: 0,
    },
    {
      concept: "Strings",
      q: "Can you change s[0] = 'H' in s = 'hello' directly?",
      options: [
        "No, strings are immutable in Python",
        "Yes, strings support item assignment",
        "Only if lowercase",
        "Only in Python 3",
      ],
      correct: 0,
    },
    {
      concept: "Problem Solving",
      q: "To accumulate a running total across a list, where should total = 0 be placed?",
      options: [
        "Before the loop begins",
        "Inside the loop on each pass",
        "After the loop finishes",
        "At the module top only",
      ],
      correct: 0,
    },
  ];

  const handleQuizAnswer = (_optIdx: number) => {
    if (quizIndex < diagnosticQuestions.length - 1) {
      setQuizIndex((p) => p + 1);
    } else {
      setStep(4); // Show initial skill map
    }
  };

  const handleFinishOnboarding = () => {
    learnerService.updateLearner({
      goal: selectedGoal,
    });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black space-y-6">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              {step}
            </span>
            <span className="text-slate-300 font-semibold">
              {step === 1 && "Step 1: Choose Your Learning Goal"}
              {step === 2 && "Step 2: Programming Experience"}
              {step === 3 && "Step 3: Diagnostic Skill Calibration"}
              {step === 4 && "Your Starting Skill Map"}
            </span>
          </div>

          <span className="text-slate-400">Step {step} of 4</span>
        </div>

        {/* STEP 1: GOAL */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">What is your primary goal?</h2>
              <p className="text-xs text-slate-400 mt-1">
                We customize the problem contexts and application examples to match your target.
              </p>
            </div>

            <div className="space-y-2.5">
              {goals.map((g) => {
                const isSelected = selectedGoal === g.title;
                return (
                  <button
                    key={g.title}
                    onClick={() => setSelectedGoal(g.title)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-950/40"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-100">{g.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{g.desc}</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white flex items-center gap-2 shadow-lg shadow-indigo-950/50"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: EXPERIENCE */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-white">How much programming have you done?</h2>
              <p className="text-xs text-slate-400 mt-1">
                This helps us calibrate starting difficulty and explanation depth.
              </p>
            </div>

            <div className="space-y-2.5">
              {experiences.map((exp) => {
                const isSelected = selectedExperience === exp.title;
                return (
                  <button
                    key={exp.title}
                    onClick={() => setSelectedExperience(exp.title)}
                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-950/40"
                        : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-slate-100">{exp.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{exp.desc}</div>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white flex items-center gap-2 shadow-lg shadow-indigo-950/50"
              >
                <span>Start Diagnostic Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DIAGNOSTIC QUIZ */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-800/50 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-indigo-400" />
                Let's understand what you already know.
              </div>
              <p className="text-slate-400">
                This is not a test you can fail. It personalizes your cognitive skill baseline.
              </p>
            </div>

            {/* Quiz Progress Indicator */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>
                  Question {quizIndex + 1} / {diagnosticQuestions.length}
                </span>
                <span className="text-indigo-400 font-semibold">
                  {diagnosticQuestions[quizIndex].concept}
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{
                    width: `${((quizIndex + 1) / diagnosticQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="p-5 rounded-xl bg-black/60 border border-slate-800 space-y-4">
              <h3 className="text-sm font-semibold text-slate-100 leading-relaxed font-mono">
                {diagnosticQuestions[quizIndex].q}
              </h3>

              <div className="space-y-2">
                {diagnosticQuestions[quizIndex].options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleQuizAnswer(optIdx)}
                    className="w-full p-3 rounded-lg border border-slate-800/90 bg-slate-900/80 hover:bg-slate-800 hover:border-slate-700 text-left font-mono text-xs text-slate-200 transition-colors flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded bg-slate-800 flex items-center justify-center font-bold text-[10px] text-slate-400">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: SKILL MAP SUMMARY */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono text-xs mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Diagnostic Completed
              </div>
              <h2 className="text-xl font-bold text-white">Your starting skill map</h2>
              <p className="text-xs text-slate-400 mt-1">
                Here is your baseline cognitive profile. Re:Learn adapts problem selection based on these confidence scores.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-850">
                <span className="font-bold text-sm text-slate-200">Python Fundamentals</span>
                <span className="font-mono font-bold text-base text-indigo-400">72% Baseline</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {[
                  { name: "Variables", pct: 91 },
                  { name: "Conditions", pct: 78 },
                  { name: "Lists", pct: 68 },
                  { name: "Loops", pct: 54 },
                  { name: "Problem Solving", pct: 51 },
                  { name: "Functions", pct: 42 },
                  { name: "Dictionaries", pct: 39 },
                ].map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-850">
                    <span className="text-slate-300">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                      <span className="text-slate-200 font-bold w-8 text-right">{item.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleFinishOnboarding}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-xs text-white shadow-xl shadow-indigo-950/50 flex items-center gap-2"
              >
                <span>Start My Learning Path</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
