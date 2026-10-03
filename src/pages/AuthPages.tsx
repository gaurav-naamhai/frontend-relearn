import React, { useState } from "react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

interface AuthProps {
  mode: "login" | "signup";
  onSuccess: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
}

export const AuthPages: React.FC<AuthProps> = ({ mode, onSuccess, onSwitchMode }) => {
  const [email, setEmail] = useState("alex.morgan@relearn.io");
  const [password, setPassword] = useState("••••••••");
  const [name, setName] = useState("Alex Morgan");
  const [confirmPassword, setConfirmPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl shadow-black space-y-6">
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base mx-auto shadow-md shadow-indigo-600/30">
            RE
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {mode === "login" ? "Welcome back to Re:Learn" : "Create your Re:Learn account"}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === "login"
              ? "Continue strengthening your cognitive Python mastery."
              : "Start discovering and mastering programming misconceptions."}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === "signup" && (
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-slate-300 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium">Password</label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => alert("Password reset link sent to " + email)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>
          </div>

          {mode === "signup" && (
            <div className="space-y-1">
              <label className="text-slate-300 font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white shadow-md shadow-indigo-950/50 flex items-center justify-center gap-2 transition-all mt-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{mode === "login" ? "Continue to Dashboard" : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center py-2">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-3 text-[11px] text-slate-500 font-mono absolute">
            OR
          </span>
        </div>

        <button
          onClick={onSuccess}
          className="w-full py-2.5 rounded-lg bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="text-center pt-2">
          {mode === "login" ? (
            <p className="text-xs text-slate-400">
              Don't have an account?{" "}
              <button
                onClick={() => onSwitchMode("signup")}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <button
                onClick={() => onSwitchMode("login")}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
