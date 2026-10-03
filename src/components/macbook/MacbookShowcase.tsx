import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  animate,
  useMotionValueEvent,
  cubicBezier,
  AnimatePresence,
} from "framer-motion";
import {
  AlertTriangle,
  Cpu,
  Sparkles,
  Terminal,
  Mouse,
  CheckCircle2,
  Bug,
  Activity,
  Power,
  RotateCcw,
} from "lucide-react";

// ==================================================
// MOTION VALUES & CONSTANTS (Strictly Preserved)
// ==================================================

const BLUE = "#6182ff";

const macEase = cubicBezier(0.65, 0, 0.35, 1);
const hingeEase = cubicBezier(0.34, 0, 0.1, 1);

// Deterministic ambient star field & constellations
const STARS: [number, number, number][] = [
  [7, 22, 0.16], [16, 64, 0.10], [24, 36, 0.20], [33, 79, 0.12], [39, 14, 0.15],
  [46, 55, 0.09], [54, 29, 0.18], [60, 70, 0.11], [66, 43, 0.14], [73, 17, 0.10],
  [79, 61, 0.17], [85, 33, 0.12], [90, 75, 0.15], [94, 49, 0.10], [12, 9, 0.13],
  [29, 6, 0.14], [57, 11, 0.10], [88, 8, 0.12], [4, 47, 0.11], [96, 26, 0.13],
];

const CONSTELLATION: [number, number, number, number][] = [
  [79, 61, 85, 33], [85, 33, 90, 75], [90, 75, 94, 49],
  [7, 22, 16, 64], [16, 64, 4, 47],
  [24, 36, 33, 79], [73, 17, 79, 61],
];

// Keyboard 6 rows / 73 keys definition
const KEY_ROWS: number[][] = [
  Array(13).fill(1),
  [1.4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4],
  [1.65, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.2],
  [1.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.95],
  [2.45, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.45],
  [1.3, 1.3, 1.3, 6.8, 1.3, 1.3, 1.3],
];

const ROW_LABELS: string[][] = [
  ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "del"],
  ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
  ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "return"],
  ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "shift"],
  ["fn", "ctrl", "opt", "cmd", "space", "cmd", "opt"],
];

// Re:Learn Platform Live Projects Data
const PROJECTS = [
  {
    id: "ast-diagnosis",
    badge: "01 // COGNITIVE AST DIAGNOSIS",
    title: "Line-Level Fault & Misconception Isolation",
    category: "AST Diagnostic Engine",
    description: "Pinpoints semantic faults on line 3, disambiguating return-vs-print confusion.",
  },
  {
    id: "micro-probe",
    badge: "02 // COGNITIVE PROBE DISAMBIGUATION",
    title: "Look-Alike Disambiguation Probes",
    category: "Targeted Probing",
    description: "Discriminates between syntax slips and deeply rooted mental model flaws.",
  },
  {
    id: "execution-trace",
    badge: "03 // EXECUTION TRACE STUDIO",
    title: "Frame Stack & Heap Memory Visualizer",
    category: "Step-by-Step Runtime Tracer",
    description: "Step through execution frames to trace exact variable mutation & return values.",
  },
  {
    id: "retention-radar",
    badge: "04 // SPNotification & RETENTION RADAR",
    title: "Adaptive Mastery & Spaced Retention",
    category: "Cognitive Mastery Matrix",
    description: "Validates conceptual retention over time with automated transfer challenges.",
  },
];

export const MacbookShowcase: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  // Motion value for explicit Start click opening animation (0 = closed, 1 = opened)
  const openProgress = useMotionValue(0);

  // Scroll tracking on pinned track
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Spring smoothed scroll progress
  const sp = useSpring(scrollYProgress, {
    stiffness: 250,
    damping: 40,
    mass: 0.45,
    restDelta: 0.0001,
  });

  // Handle explicit Start click
  const handleStart = () => {
    setIsStarted(true);
    setIsOpening(true);
    animate(openProgress, 1, {
      duration: 1.35,
      ease: hingeEase,
      onComplete: () => {
        setIsOpening(false);
      },
    });
  };

  // Optional reset control to re-close
  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpening(true);
    animate(openProgress, 0, {
      duration: 0.9,
      ease: hingeEase,
      onComplete: () => {
        setIsStarted(false);
        setIsOpening(false);
      },
    });
  };

  // Laptop Lid opening transform driven by explicit Start interaction
  const lidAngle = useTransform(
    openProgress,
    [0, 0.25, 0.58, 0.84, 0.95, 1.0],
    [-90, -71, -30, -7, 1.1, 0]
  );

  const lidRotate = useTransform(lidAngle, (a) => `rotateX(${a}deg)`);

  // Screen power-on & lighting transforms
  const panelBlack = useTransform(openProgress, [0.72, 0.98], [1, 0]);
  const contentOpacity = useTransform(openProgress, [0.78, 1.0], [0, 1]);
  const ledOpacity = useTransform(openProgress, [0.55, 0.85], [0, 1]);
  const screenGlowOpacity = useTransform(openProgress, [0.72, 0.88, 1.0], [0, 0.35, 0.12]);

  // Project Filmstrip Transitions driven by scroll
  const N = PROJECTS.length;
  const STEP = 100 / N;

  const stripIn: number[] = [];
  const stripOut: number[] = [];

  for (let i = 0; i < N; i++) {
    stripIn.push(
      (i / N),
      ((i + 0.68) / N)
    );
    stripOut.push(-i * STEP, -i * STEP);
  }

  stripIn.push(1);
  stripOut.push(-(N - 1) * STEP);

  const stripX = useTransform(sp, stripIn, stripOut, { ease: macEase });
  const stripTransform = useTransform(stripX, (v) => `translateX(${v}%)`);

  // Sync active project index for indicators
  useMotionValueEvent(sp, "change", (latest) => {
    if (!isStarted) {
      setActiveProjectIdx(0);
      return;
    }
    const idx = Math.min(Math.floor(latest * N), N - 1);
    setActiveProjectIdx(Math.max(0, idx));
  });

  return (
    <div
      ref={trackRef}
      className={`relative w-full ${isStarted ? "h-[380vh]" : "h-[100vh]"} bg-[#07090e] text-[#f0f6fc] select-none transition-[height] duration-500`}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col items-center justify-between py-6 px-4">
        
        {/* Subtle Deterministic Ambient Lighting & Star Constellation */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[1200px] h-[55vh] rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(circle, rgba(97, 130, 255, 0.055) 0%, rgba(13, 17, 26, 0.3) 50%, transparent 80%)`,
            }}
          />
          {/* Subtle Background Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(#f0f6fc 1px, transparent 1px), linear-gradient(90deg, #f0f6fc 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
          {/* Constellation Lines & Stars (NO Math.random) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {CONSTELLATION.map(([x1, y1, x2, y2], i) => (
              <line
                key={`c-${i}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(255, 255, 255, 0.09)"
                strokeWidth="0.8"
                strokeDasharray="2 3"
              />
            ))}
            {STARS.map(([x, y, op], i) => (
              <circle
                key={`s-${i}`}
                cx={`${x}%`}
                cy={`${y}%`}
                r="1.1"
                fill={`rgba(255, 255, 255, ${op})`}
              />
            ))}
          </svg>
        </div>

        {/* Top Header Tag inside pinned view */}
        <div className="relative z-20 text-center space-y-1 mt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111622] border border-[#232d42] text-[11px] font-mono text-[#8b949e]">
            <Cpu className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span>Interactive Diagnostic Showcase</span>
          </div>
          <h2 className="text-sm sm:text-base font-bold font-mono tracking-tight text-[#f0f6fc]">
            Live Interactive Diagnostic Environment
          </h2>
        </div>

        {/* 3D MACBOOK SHOWCASE ARENA */}
        <div
          className="relative z-10 w-full flex-1 flex flex-col items-center justify-center my-auto"
          style={{
            perspective: "calc(var(--mbw) * 2.45)",
            perspectiveOrigin: "50% 34%",
          }}
        >
          {/* NEW SEPARATE START CONTROL (Prominently displayed when closed) */}
          <AnimatePresence>
            {!isStarted && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.94 }}
                transition={{ duration: 0.25 }}
                className="absolute z-40 flex flex-col items-center gap-3.5 pointer-events-auto"
              >
                <button
                  onClick={handleStart}
                  className="group relative px-6 py-3 rounded-xl bg-[#121622] hover:bg-[#182030] text-[#f0f6fc] border border-[#2d3a52] hover:border-[#4d628a] font-mono text-xs font-bold tracking-wider shadow-[0_8px_30px_rgba(0,0,0,0.85)] flex items-center gap-3 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58a6ff] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#58a6ff]" />
                  </span>
                  <span>START SHOWCASE</span>
                  <span className="px-2 py-0.5 rounded bg-[#1e273a] text-[10px] text-[#8b949e] border border-[#2e3e5c] group-hover:text-[#f0f6fc] transition-colors">
                    Click to Open
                  </span>
                </button>
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#8b949e]">
                  <span>Physical 3D Startup</span>
                  <span>•</span>
                  <span>Live DOM Studio</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Laptop Assembly */}
          <div
            className="relative flex flex-col items-center"
            style={{
              width: "var(--mbw)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* ================================================== */}
            {/* 1. DISPLAY / LID (Rotates from -90deg to 0deg)      */}
            {/* ================================================== */}
            <motion.div
              className="relative z-20 w-full rounded-t-[14px] rounded-b-[2px] shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
              style={{
                height: "calc(var(--mbw) * 0.635)",
                transformOrigin: "50% 100% 0px",
                transform: lidRotate,
                transformStyle: "preserve-3d",
                background: "linear-gradient(180deg, #242833 0%, #1a1d26 50%, #12141c 100%)",
                border: "1px solid #363d4e",
              }}
            >
              {/* Screen Bezel Frame */}
              <div className="absolute inset-[6px] sm:inset-[8px] bg-[#05070a] rounded-t-[10px] rounded-b-[2px] p-[3px] flex flex-col overflow-hidden border border-[#1b202c]">
                
                {/* Screen Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] max-w-[130px] h-[12px] bg-[#05070a] rounded-b-md z-40 flex items-center justify-center gap-1.5 border-b border-x border-[#1e2330]">
                  {/* Camera lens */}
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0d131f] border border-[#2d3748] flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-[#38bdf8]" />
                  </div>
                  {/* Power indicator LED */}
                  <motion.div
                    className="w-1 h-1 rounded-full bg-[#22c55e]"
                    style={{ opacity: ledOpacity }}
                  />
                </div>

                {/* LIVE DOM SCREEN VIEWPORT */}
                <div className="relative w-full h-full bg-[#080b11] rounded-t-[7px] rounded-b-[2px] overflow-hidden">
                  
                  {/* Power-on Screen Bloom */}
                  <motion.div
                    className="absolute inset-0 z-30 pointer-events-none"
                    style={{
                      opacity: screenGlowOpacity,
                      background: `radial-gradient(ellipse at center, ${BLUE}66 0%, transparent 70%)`,
                    }}
                  />

                  {/* Panel Black Power-On Layer */}
                  <motion.div
                    className="absolute inset-0 bg-[#05070a] z-20 pointer-events-none"
                    style={{ opacity: panelBlack }}
                  />

                  {/* Glass Reflection Overlay (NO rectangular artifact) */}
                  <div
                    className="absolute inset-0 pointer-events-none z-20"
                    style={{
                      background: "linear-gradient(118deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 35%, transparent 55%)",
                    }}
                  />

                  {/* PROJECT FILMSTRIP (Live DOM, shrink-0, 100/N% per project) */}
                  <motion.div
                    className="relative z-10 flex h-full"
                    style={{
                      width: `${N * 100}%`,
                      transform: isStarted ? stripTransform : "translateX(0%)",
                      opacity: contentOpacity,
                    }}
                  >
                    {/* -------------------------------------------------- */}
                    {/* Project 1: Cognitive AST Diagnosis Engine           */}
                    {/* -------------------------------------------------- */}
                    <div
                      className="h-full shrink-0 flex flex-col bg-[#0b0f17] text-[#c9d1d9] p-3 sm:p-5 font-mono text-xs overflow-hidden relative"
                      style={{ width: `${100 / N}%` }}
                    >
                      {/* Browser / Editor Top Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#212836] text-[10px] text-[#8b949e]">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-[#f85149]" />
                            <span className="w-2 h-2 rounded-full bg-[#d29922]" />
                            <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
                          </div>
                          <span className="font-bold text-[#f0f6fc] ml-1">relearn_diagnosis.py</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#388bfd] bg-[#14233a] px-2 py-0.5 rounded border border-[#234575]">
                            AST Inspector // Line 3 Fault
                          </span>
                          <span className="hidden sm:inline">Python 3.12</span>
                        </div>
                      </div>

                      {/* Split Editor & AST Inspector */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 overflow-hidden">
                        {/* Code Editor Pane */}
                        <div className="p-3 rounded bg-[#07090f] border border-[#1b2230] flex flex-col justify-between relative overflow-hidden">
                          <div className="space-y-1 text-[11px] leading-relaxed">
                            <div className="text-[#6e7681]">1  def calculate_bonus(salary, score):</div>
                            <div className="text-[#6e7681]">2      if score &gt; 80:</div>
                            <div className="bg-[#381a1e]/80 -mx-2 px-2 py-0.5 rounded text-[#f85149] font-bold border border-[#f85149]/40 flex items-center justify-between">
                              <span>3          print(salary * 0.20)</span>
                              <span className="text-[9px] text-[#ff7b72] uppercase font-mono">AST Fault</span>
                            </div>
                            <div className="text-[#6e7681]">4      else:</div>
                            <div className="text-[#6e7681]">5          return 0</div>
                            <div className="text-[#6e7681]">6</div>
                            <div className="text-[#6e7681]">7  total = calculate_bonus(50000, 95)</div>
                            <div className="text-[#6e7681]">8  print(f"Total: &#123;total + 50000&#125;")</div>
                          </div>

                          {/* Simulated Animated Cursor Indicator (Only allowed looping animation) */}
                          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#58a6ff] border border-white animate-mb-cursor pointer-events-none shadow-[0_0_8px_#58a6ff]" />

                          <div className="pt-2 text-[10px] text-[#f85149] flex items-center gap-1.5 border-t border-[#212836]">
                            <Bug className="w-3 h-3" />
                            <span>TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'</span>
                          </div>
                        </div>

                        {/* Cognitive Diagnosis Card */}
                        <div className="p-3 rounded bg-[#101622] border border-[#2b3850] flex flex-col justify-between text-xs space-y-2">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] uppercase font-bold text-[#58a6ff] flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3 text-[#d29922]" /> Misconception Isolated
                              </span>
                              <span className="px-1.5 py-0.5 rounded bg-[#1c2c44] text-[#79c0ff] text-[9px] border border-[#2f4972]">
                                98.4% Confidence
                              </span>
                            </div>

                            <div className="p-2 rounded bg-[#1a1205] border border-[#48330d] text-[#d29922] text-[11px] leading-snug">
                              <strong className="text-[#f0883e]">Return vs Print:</strong> Learner expects <code className="bg-[#2c1d07] px-1 rounded text-[#e3b341]">print()</code> to return a computed value to variable <code className="text-[#e3b341]">total</code>.
                            </div>

                            <p className="text-[11px] text-[#8b949e] leading-relaxed">
                              <code className="text-[#79c0ff]">print()</code> emits side-effects to standard output and evaluates to <code className="text-[#79c0ff]">None</code>.
                            </p>
                          </div>

                          <div className="p-2 rounded bg-[#090d14] border border-[#1b2230] text-[10px] text-[#3fb950] flex items-center justify-between font-mono">
                            <span>Remediation: Replace print() with return</span>
                            <span className="text-[#58a6ff]">Verify Probe →</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Project 2: Look-Alike Micro-Probe Disambiguation    */}
                    {/* -------------------------------------------------- */}
                    <div
                      className="h-full shrink-0 flex flex-col bg-[#0b0f17] text-[#c9d1d9] p-3 sm:p-5 font-mono text-xs overflow-hidden relative"
                      style={{ width: `${100 / N}%` }}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#212836] text-[10px] text-[#8b949e]">
                        <div className="flex items-center gap-2">
                          <Cpu className="w-3.5 h-3.5 text-[#a371f7]" />
                          <span className="font-bold text-[#f0f6fc]">Diagnostic Probe #204</span>
                        </div>
                        <span className="text-[#a371f7] bg-[#211836] px-2 py-0.5 rounded border border-[#3e2c64]">
                          Disambiguation Mode
                        </span>
                      </div>

                      {/* Probe Content */}
                      <div className="flex-1 flex flex-col justify-between pt-3 space-y-2">
                        <div className="p-2.5 rounded bg-[#10141d] border border-[#212a3b] space-y-1.5">
                          <div className="text-[10px] text-[#8b949e] uppercase font-bold">Mental Model Test</div>
                          <div className="text-xs text-[#f0f6fc] font-bold">
                            What does this assignment store in variable <code className="text-[#79c0ff]">x</code>?
                          </div>
                          <div className="p-1.5 rounded bg-[#07090e] border border-[#1a2130] text-[#79c0ff] text-xs font-mono">
                            x = print(5)
                          </div>
                        </div>

                        {/* Options Grid */}
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded bg-[#0e121a] border border-[#1e2636] text-[#8b949e]">
                            A) <span className="text-[#c9d1d9]">5</span> (Output value)
                          </div>
                          <div className="p-2 rounded bg-[#102319] border border-[#238636] text-[#3fb950] font-bold flex items-center justify-between">
                            <span>B) None (Ground Truth)</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
                          </div>
                          <div className="p-2 rounded bg-[#0e121a] border border-[#1e2636] text-[#8b949e]">
                            C) <span className="text-[#c9d1d9]">"5"</span> (Stringified)
                          </div>
                          <div className="p-2 rounded bg-[#0e121a] border border-[#1e2636] text-[#8b949e]">
                            D) <span className="text-[#c9d1d9]">SyntaxError</span>
                          </div>
                        </div>

                        {/* Bayesian Shift Bar */}
                        <div className="p-2 rounded bg-[#0e131d] border border-[#1c2738] flex items-center justify-between text-[10px]">
                          <span className="text-[#8b949e]">Misconception Probability Shift:</span>
                          <span className="text-[#3fb950] font-bold">87% → 12% (Slip Disambiguated)</span>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Project 3: Step-by-Step Runtime Tracer             */}
                    {/* -------------------------------------------------- */}
                    <div
                      className="h-full shrink-0 flex flex-col bg-[#0b0f17] text-[#c9d1d9] p-3 sm:p-5 font-mono text-xs overflow-hidden relative"
                      style={{ width: `${100 / N}%` }}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#212836] text-[10px] text-[#8b949e]">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-[#3fb950]" />
                          <span className="font-bold text-[#f0f6fc]">Execution Trace Visualizer</span>
                        </div>
                        <span className="text-[#3fb950] bg-[#12251a] px-2 py-0.5 rounded border border-[#1f4a2e]">
                          Step 4 / 6 // Frame: calculate_bonus
                        </span>
                      </div>

                      {/* Visualizer Panes */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 overflow-hidden">
                        {/* Frame Stack */}
                        <div className="p-2.5 rounded bg-[#07090f] border border-[#1c2434] space-y-1.5 text-[10px] animate-mb-drift">
                          <div className="text-[#8b949e] uppercase font-bold text-[9px]">Frame Stack &amp; Variables</div>
                          <div className="p-1.5 rounded bg-[#101726] border border-[#20314d] space-y-0.5">
                            <div className="text-[#79c0ff] font-bold">Frame: calculate_bonus</div>
                            <div className="text-[#8b949e]">salary: <span className="text-[#f0f6fc]">50000</span></div>
                            <div className="text-[#8b949e]">score: <span className="text-[#f0f6fc]">95</span></div>
                            <div className="text-[#f85149]">return_value: <span className="font-bold">None</span></div>
                          </div>
                          <div className="p-1.5 rounded bg-[#0a0e16] border border-[#171f2e] text-[#6e7681]">
                            <div>Frame: &lt;module&gt;</div>
                            <div>total: None</div>
                          </div>
                        </div>

                        {/* Terminal Output Stream */}
                        <div className="p-2.5 rounded bg-[#06080d] border border-[#18202d] flex flex-col justify-between text-[10px]">
                          <div className="space-y-1">
                            <div className="text-[#6e7681] flex items-center gap-1">
                              <Terminal className="w-3 h-3" /> Console Stdout
                            </div>
                            <div className="text-[#79c0ff]">&gt; python3 main.py</div>
                            <div className="text-[#f0f6fc]">10000.0 (Side-effect printed to stdout)</div>
                            <div className="text-[#f85149] pt-1 leading-tight">
                              TypeError: unsupported operand type(s) for +: 'NoneType' and 'int'
                            </div>
                          </div>
                          <div className="text-[#3fb950] text-[9px] pt-1 border-t border-[#1a2130]">
                            ✓ Scope lifecycle resolved
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* Project 4: Adaptive Mastery & Retention Radar      */}
                    {/* -------------------------------------------------- */}
                    <div
                      className="h-full shrink-0 flex flex-col bg-[#0b0f17] text-[#c9d1d9] p-3 sm:p-5 font-mono text-xs overflow-hidden relative"
                      style={{ width: `${100 / N}%` }}
                    >
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-2 border-b border-[#212836] text-[10px] text-[#8b949e]">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#e3b341]" />
                          <span className="font-bold text-[#f0f6fc]">Student Mastery Radar</span>
                        </div>
                        <span className="text-[#e3b341] bg-[#2a220a] px-2 py-0.5 rounded border border-[#524112]">
                          Learner: Alex Morgan • Level 8
                        </span>
                      </div>

                      {/* Mastery Grid */}
                      <div className="flex-1 grid grid-cols-2 gap-2 pt-2 text-[10px]">
                        <div className="p-2 rounded bg-[#0c121c] border border-[#1c2b3e] space-y-1">
                          <div className="flex justify-between text-[#79c0ff]">
                            <span>Variables &amp; Types</span>
                            <span className="font-bold">91%</span>
                          </div>
                          <div className="w-full h-1 rounded bg-[#162232]">
                            <div className="w-[91%] h-full bg-[#388bfd] rounded" />
                          </div>
                          <span className="text-[9px] text-[#3fb950]">Mastered</span>
                        </div>

                        <div className="p-2 rounded bg-[#0c121c] border border-[#1c2b3e] space-y-1">
                          <div className="flex justify-between text-[#79c0ff]">
                            <span>Conditions &amp; Logic</span>
                            <span className="font-bold">78%</span>
                          </div>
                          <div className="w-full h-1 rounded bg-[#162232]">
                            <div className="w-[78%] h-full bg-[#388bfd] rounded" />
                          </div>
                          <span className="text-[9px] text-[#3fb950]">Proficient</span>
                        </div>

                        <div className="p-2 rounded bg-[#0c121c] border border-[#1c2b3e] space-y-1">
                          <div className="flex justify-between text-[#79c0ff]">
                            <span>Lists &amp; Sequences</span>
                            <span className="font-bold">73%</span>
                          </div>
                          <div className="w-full h-1 rounded bg-[#162232]">
                            <div className="w-[73%] h-full bg-[#388bfd] rounded" />
                          </div>
                          <span className="text-[9px] text-[#3fb950]">Proficient</span>
                        </div>

                        <div className="p-2 rounded bg-[#181308] border border-[#423010] space-y-1">
                          <div className="flex justify-between text-[#e3b341]">
                            <span>Functions &amp; Return</span>
                            <span className="font-bold">52%</span>
                          </div>
                          <div className="w-full h-1 rounded bg-[#2b200b]">
                            <div className="w-[52%] h-full bg-[#d29922] rounded" />
                          </div>
                          <span className="text-[9px] text-[#e3b341]">Remediating Line 3</span>
                        </div>
                      </div>

                      {/* Retention Status Banner */}
                      <div className="mt-2 p-2 rounded bg-[#0a1018] border border-[#1c2b3f] flex items-center justify-between text-[10px]">
                        <span className="text-[#8b949e]">17 Misconceptions Resolved</span>
                        <span className="text-[#3fb950] font-bold">Transfer Challenge Verified ✓</span>
                      </div>
                    </div>

                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* ================================================== */}
            {/* 2. BASE / DECK (Preserves 3D perspective spread)    */}
            {/* ================================================== */}
            <div
              className="relative z-10 w-full rounded-b-[16px] shadow-[0_12px_45px_rgba(0,0,0,0.95)]"
              style={{
                height: "calc(var(--mbw) * 0.615)",
                transformOrigin: "50% 0% 0px",
                transform: "rotateX(60deg)",
                transformStyle: "preserve-3d",
                marginTop: "-1px",
                background: "linear-gradient(180deg, #181b22 0%, #20242e 35%, #15171e 100%)",
                borderLeft: "1px solid #363d4c",
                borderRight: "1px solid #363d4c",
                borderBottom: "1px solid #282d38",
              }}
            >
              {/* Recessed Keyboard Well & Flanking Speaker Grilles */}
              <div className="pt-2 px-3 sm:px-5 flex items-start justify-between gap-2">
                
                {/* Left Speaker Grille */}
                <div
                  className="w-[4%] h-[120px] rounded-sm opacity-40"
                  style={{
                    background: "radial-gradient(circle, #3a4150 0.65px, transparent 0.65px)",
                    backgroundSize: "3px 3px",
                  }}
                />

                {/* Recessed Keyboard Well */}
                <div className="flex-1 p-1.5 sm:p-2.5 rounded-lg bg-[#0c0e12] border border-[#212632] shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] space-y-1 sm:space-y-1.5">
                  {KEY_ROWS.map((row, rIdx) => (
                    <div key={`r-${rIdx}`} className="flex items-center gap-[2px] sm:gap-[3px] w-full">
                      {row.map((weight, kIdx) => {
                        const label = ROW_LABELS[rIdx]?.[kIdx] || "";
                        return (
                          <motion.div
                            key={`k-${rIdx}-${kIdx}`}
                            className="h-[14px] sm:h-[20px] md:h-[24px] rounded-[2.5px] bg-[#090b0e] border border-[#1b1f28] flex items-center justify-center select-none"
                            style={{
                              flexGrow: weight,
                              flexShrink: 1,
                              flexBasis: 0,
                              minWidth: 0,
                              boxShadow: ledOpacity ? "0 0 1px rgba(97,130,255,0.25)" : "none",
                            }}
                          >
                            <span className="text-[7px] sm:text-[9px] font-mono text-[#555e6d] truncate px-0.5">
                              {label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Right Speaker Grille */}
                <div
                  className="w-[4%] h-[120px] rounded-sm opacity-40"
                  style={{
                    background: "radial-gradient(circle, #3a4150 0.65px, transparent 0.65px)",
                    backgroundSize: "3px 3px",
                  }}
                />
              </div>

              {/* Glass Trackpad */}
              <div className="w-[36%] h-[26%] mx-auto mt-2 sm:mt-3 rounded-md bg-[#13161d] border border-[#272c38] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />

              {/* Front Lip Thumb Notch & Front Edge Bevel */}
              <div className="w-[12%] h-[2.5px] bg-[#0c0e12] mx-auto rounded-b-sm border-t border-[#232835] mt-1" />
            </div>

            {/* ================================================== */}
            {/* 3. CONTACT SHADOW & SUBTLE SURFACE REFLECTION       */}
            {/* ================================================== */}
            <div className="absolute top-[88%] left-1/2 -translate-x-1/2 w-[125%] h-[140px] pointer-events-none z-0">
              {/* Pure radial contact shadow */}
              <div
                className="w-full h-full"
                style={{
                  background: "radial-gradient(ellipse 65% 30% at 50% 35%, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 75%)",
                }}
              />
              {/* Subtle Blue Screen Reflection */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 50% 16% at 50% 10%, rgba(97, 130, 255, 0.05) 0%, transparent 70%)",
                }}
              />
            </div>

          </div>
        </div>

        {/* ================================================== */}
        {/* BOTTOM RESTRAINED INDICATORS                       */}
        {/* ================================================== */}
        <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#8b949e] pt-2 border-t border-[#181f2c]/60">
          
          {/* Active Project Number & Title */}
          <div className="flex items-center gap-2.5">
            <span className="text-[#f0f6fc] font-bold px-2 py-0.5 rounded bg-[#131a26] border border-[#232f45]">
              {String(activeProjectIdx + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </span>
            <span className="text-[#c9d1d9] font-medium hidden sm:inline">
              {isStarted ? PROJECTS[activeProjectIdx]?.title : "MacBook Showcase (Closed)"}
            </span>
          </div>

          {/* Project Dots */}
          <div className="flex items-center gap-1.5">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isStarted && activeProjectIdx === idx
                    ? "w-6 bg-[#58a6ff]"
                    : "w-2 bg-[#212a3b]"
                }`}
              />
            ))}
          </div>

          {/* Interactive Status & Reset Option */}
          <div className="flex items-center gap-3 text-[#8b949e]">
            {isStarted ? (
              <>
                <div className="flex items-center gap-1.5 text-[#58a6ff]">
                  <Mouse className="w-3.5 h-3.5" />
                  <span>Scroll to navigate live pages</span>
                </div>
                <button
                  onClick={handleReset}
                  disabled={isOpening}
                  className="px-2 py-0.5 rounded bg-[#141b27] hover:bg-[#1f293b] text-[#8b949e] hover:text-[#f0f6fc] border border-[#222d40] text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                  title="Close and Reset"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1.5 text-[#8b949e]">
                <Power className="w-3.5 h-3.5 text-[#58a6ff]" />
                <span>Click Start to power on laptop</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
