import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../../types";
import { chatService, RETURN_PRINT_HINTS } from "../../services/chatService";
import {
  Send,
  Bot,
  User,
  Lightbulb,
} from "lucide-react";

interface ChatPanelProps {
  onShowTraceModal: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ onShowTraceModal }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    chatService.getInitialMessages()
  );
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Why is print different from return?",
    "Give me another contrast example.",
    "Can you explain this more simply?",
    "Can you show me what happened step by step?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    if (query.toLowerCase().includes("step by step")) {
      setIsTyping(false);
      onShowTraceModal();
      return;
    }

    try {
      const result = await chatService.askQuestion(query, hintLevel);
      setMessages((prev) => [...prev, result.responseMessage]);
      setHintLevel(result.nextHintLevel);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTriggerNextHint = () => {
    const nextLvl = Math.min(4, hintLevel + 1);
    const hint = RETURN_PRINT_HINTS[nextLvl - 1];
    setHintLevel(nextLvl);
    const hintMsg: ChatMessage = {
      id: "hint-msg-" + Date.now(),
      sender: "relearn",
      text: `💡 **${hint.title}**\n\n${hint.content}`,
      timestamp: "Just now",
      hintLevel: nextLvl,
    };
    setMessages((prev) => [...prev, hintMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0e17] border border-slate-800 rounded-xl overflow-hidden text-xs">
      {/* Header */}
      <div className="p-3.5 bg-[#0d131f] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 text-xs">Ask Re:Learn</h4>
            <p className="text-[10px] text-slate-400">Contextual Tutor & Hint Ladder</p>
          </div>
        </div>

        {/* Hint Ladder Indicator (Section 19) */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/60">
            Hint level {hintLevel} / 4
          </span>
          {hintLevel < 4 && (
            <button
              onClick={handleTriggerNextHint}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 font-medium transition-colors flex items-center gap-1"
            >
              <Lightbulb className="w-3 h-3 text-amber-400" />
              <span>Next Hint</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3.5 overflow-y-auto space-y-3 custom-scrollbar">
        {messages.map((msg) => {
          const isRelearn = msg.sender === "relearn";
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isRelearn ? "justify-start" : "justify-end"}`}
            >
              {isRelearn && (
                <div className="w-6 h-6 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-300 shrink-0 text-[10px]">
                  RE
                </div>
              )}

              <div
                className={`max-w-[85%] p-3 rounded-xl ${
                  isRelearn
                    ? "bg-slate-900 border border-slate-800 text-slate-200"
                    : "bg-indigo-600 text-white"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed text-xs">
                  {msg.text}
                </div>
              </div>

              {!isRelearn && (
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 text-[10px]">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400 text-xs italic p-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce delay-200" />
            <span>Re:Learn is formulating guidance...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions (Section 19) */}
      <div className="px-3 py-2 bg-[#0d131f]/60 border-t border-slate-850 flex flex-wrap gap-1.5">
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(q)}
            className="px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-2.5 bg-[#0d131f] border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question about this misconception..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
