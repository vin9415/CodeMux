import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, User, Phone, ArrowRight, Sparkles } from 'lucide-react';

export const EarlyAccessModal: React.FC = () => {
  const {
    isEarlyAccessModalOpen,
    closeEarlyAccessModal,
    joinEarlyAccess,
    modalDefaultInterest,
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(modalDefaultInterest);
  const [phone, setPhone] = useState('');

  if (!isEarlyAccessModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    joinEarlyAccess(name, email, interest, phone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        <button
          onClick={closeEarlyAccessModal}
          className="absolute top-4 right-4 p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <img
            src="/assets/aistudio/codemuxlogo_913c6b11.png"
            alt="Code Mux"
            className="w-12 h-12 object-contain rounded-xl mb-3 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <h3 className="text-xl font-bold text-stone-900 font-display">
            Join Early Notification List
          </h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs">
            We are preparing our practical training curriculums and schedule. Sign up to receive program announcements first.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Area of Interest
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#FF6B16]"
            >
              <option value="Full-Stack Web Development">Full-Stack Web Development</option>
              <option value="Data Analytics & BI">Data Analytics &amp; BI</option>
              <option value="Python & AI Fundamentals">Python &amp; AI Fundamentals</option>
              <option value="Placement Preparation & Interview Mastery">Placement Preparation</option>
              <option value="All Programs">All Programs</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Your Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                required
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com"
                required
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              WhatsApp / Phone (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
              />
            </div>
          </div>

          <div className="text-[11px] text-stone-500 bg-orange-50 border border-orange-200/60 p-3 rounded-lg leading-relaxed">
            We will only contact you with genuine batch launch updates and early schedule releases. No spam.
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            Submit Early Registration <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
