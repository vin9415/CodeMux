import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  Shield,
  Briefcase,
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Phone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { loginUser, registerUser, addToast, navigateTo } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regInterest, setRegInterest] = useState('Full-Stack Web Development');
  const [regPhone, setRegPhone] = useState('');
  const [regConsent, setRegConsent] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('error', 'Missing Information', 'Please enter both your email address and password.');
      return;
    }
    loginUser(email, selectedRole);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      addToast('error', 'Missing Information', 'Please provide your full name, email, and password.');
      return;
    }
    if (!regConsent) {
      addToast('error', 'Consent Required', 'Please accept the Code Mux terms of service to continue.');
      return;
    }
    registerUser(regName, regEmail, regInterest, regPhone);
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    if (role === 'admin') {
      loginUser('admin@codemux.in', 'admin', 'Administrator');
    } else if (role === 'mentor') {
      loginUser('mentor@codemux.in', 'mentor', 'Senior Mentor');
    } else {
      loginUser('student@codemux.in', 'student', 'Rahul Sharma');
    }
  };

  return (
    <div className="w-full py-12 sm:py-20 bg-[#FAF8F5] min-h-[85vh] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-xl bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden p-6 sm:p-10">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2.5 mx-auto focus:outline-none cursor-pointer group"
          >
            <img
              src="/assets/aistudio/codemuxlogo_913c6b11.png"
              alt="Code Mux"
              className="w-12 h-12 object-contain rounded-2xl shadow-xs transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <span className="text-2xl font-bold tracking-tight text-stone-900 font-display">
              Code <span className="text-[#FF6B16]">Mux</span>
            </span>
          </button>
          <h1 className="text-2xl font-bold text-stone-900 font-display">
            {mode === 'login' ? 'Portal Authentication' : 'Create Student Account'}
          </h1>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {mode === 'login'
              ? 'Select your portal role to access your personalized workspace.'
              : 'Register to access learning toolkits, track upcoming batches, and connect with mentors.'}
          </p>
        </div>

        {/* 1-Click Instant Demo Login Strip */}
        <div className="mb-8 p-4 rounded-2xl bg-[#FAF8F5] border border-orange-200/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
            <span className="flex items-center gap-1.5 text-stone-900 font-display">
              <Sparkles className="w-4 h-4 text-[#FF6B16]" /> Instant Demo Access (1-Click)
            </span>
            <span className="text-[11px] text-orange-800">Pre-authenticated</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('student')}
              className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-stone-800 transition-all flex flex-col items-center gap-1 text-center cursor-pointer shadow-xs"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-stone-900">Student</span>
              <span className="text-[10px] text-stone-500">Learner Portal</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('mentor')}
              className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-amber-500 hover:bg-amber-50/40 text-stone-800 transition-all flex flex-col items-center gap-1 text-center cursor-pointer shadow-xs"
            >
              <Briefcase className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-stone-900">Mentor</span>
              <span className="text-[10px] text-stone-500">Instructor Desk</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin')}
              className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-orange-500 hover:bg-orange-50/40 text-stone-800 transition-all flex flex-col items-center gap-1 text-center cursor-pointer shadow-xs"
            >
              <Shield className="w-4 h-4 text-[#FF6B16]" />
              <span className="text-xs font-bold text-stone-900">Admin</span>
              <span className="text-[10px] text-stone-500">Control Center</span>
            </button>
          </div>
        </div>

        {/* Mode Switcher: Sign In vs Register */}
        <div className="flex items-center gap-2 p-1.5 bg-[#FAF8F5] rounded-xl border border-stone-200 mb-6">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign In to Portal
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Student Registration
          </button>
        </div>

        {mode === 'login' ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {/* Role Selection Tabs */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Select Your Role Portal
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'student'
                      ? 'border-[#FF6B16] bg-orange-50/40 text-stone-900'
                      : 'border-stone-200 bg-[#FAF8F5] text-stone-600 hover:bg-white'
                  }`}
                >
                  <GraduationCap className={`w-4 h-4 mb-1 ${selectedRole === 'student' ? 'text-[#FF6B16]' : 'text-stone-400'}`} />
                  <div className="text-xs font-bold">Student</div>
                  <div className="text-[10px] text-stone-500">Learner account</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('mentor')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'mentor'
                      ? 'border-[#FF6B16] bg-orange-50/40 text-stone-900'
                      : 'border-stone-200 bg-[#FAF8F5] text-stone-600 hover:bg-white'
                  }`}
                >
                  <Briefcase className={`w-4 h-4 mb-1 ${selectedRole === 'mentor' ? 'text-[#FF6B16]' : 'text-stone-400'}`} />
                  <div className="text-xs font-bold">Mentor</div>
                  <div className="text-[10px] text-stone-500">Instructor portal</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'border-[#FF6B16] bg-orange-50/40 text-stone-900'
                      : 'border-stone-200 bg-[#FAF8F5] text-stone-600 hover:bg-white'
                  }`}
                >
                  <Shield className={`w-4 h-4 mb-1 ${selectedRole === 'admin' ? 'text-[#FF6B16]' : 'text-stone-400'}`} />
                  <div className="text-xs font-bold">Admin</div>
                  <div className="text-[10px] text-stone-500">System admin</div>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Official Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'admin'
                      ? 'admin@codemux.in'
                      : selectedRole === 'mentor'
                      ? 'mentor@codemux.in'
                      : 'student@example.com'
                  }
                  required
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16] transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-stone-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => addToast('info', 'Password Demo', 'Use any password or click the 1-Click Instant Demo buttons above.')}
                  className="text-xs text-[#FF6B16] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-stone-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-stone-300 text-[#FF6B16] focus:ring-[#FF6B16]"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Sign In to {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Portal <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="rahul@college.edu"
                  required
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765..."
                    className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Area of Interest
                </label>
                <select
                  value={regInterest}
                  onChange={(e) => setRegInterest(e.target.value)}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-2.5 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#FF6B16]"
                >
                  <option value="Full-Stack Web Development">Web Development</option>
                  <option value="Data Analytics & BI">Data Analytics</option>
                  <option value="Python & AI Fundamentals">Python &amp; AI</option>
                  <option value="Placement Preparation">Placement Prep</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Create Secure Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="regConsent"
                checked={regConsent}
                onChange={(e) => setRegConsent(e.target.checked)}
                className="mt-0.5 rounded border-stone-300 text-[#FF6B16] focus:ring-[#FF6B16]"
              />
              <label htmlFor="regConsent" className="text-[11px] text-stone-600 leading-tight">
                I agree to the Code Mux Terms of Service and acknowledge educational updates policy.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              Complete Registration <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
