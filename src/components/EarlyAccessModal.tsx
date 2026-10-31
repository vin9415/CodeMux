import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Mail, User, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { COUNTRY_CODES } from '../data/countryCodes';
import {
  sanitizeName,
  sanitizePhone,
  validateName,
  validatePhone,
  validateEmail,
} from '../utils/validation';

export const EarlyAccessModal: React.FC = () => {
  const {
    isEarlyAccessModalOpen,
    closeEarlyAccessModal,
    joinEarlyAccess,
    modalDefaultInterest,
    addToast,
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [learnerAge, setLearnerAge] = useState<string>('');
  const [interest, setInterest] = useState(modalDefaultInterest);
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');

  const numericAge = parseInt(learnerAge, 10);
  const hasAge = !isNaN(numericAge) && numericAge > 0;

  if (!isEarlyAccessModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Strict Name validation (alphabets only)
    const nameCheck = validateName(name);
    if (!nameCheck.isValid) {
      addToast('error', 'Name Protection Error', nameCheck.error || 'Name can only contain alphabets and spaces.');
      return;
    }

    // 2. Strict Email validation
    const emailCheck = validateEmail(email);
    if (!emailCheck.isValid) {
      addToast('error', 'Invalid Email', emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    // 3. Strict Phone validation (digits only)
    if (phone.trim()) {
      const phoneCheck = validatePhone(phone, false);
      if (!phoneCheck.isValid) {
        addToast('error', 'Phone Protection Error', phoneCheck.error || 'Phone number must contain numerical digits only.');
        return;
      }
    }

    const cleanPhoneDigits = sanitizePhone(phone);
    const fullPhone = cleanPhoneDigits ? `${countryCode} ${cleanPhoneDigits}` : '';
    const ageNote = hasAge ? ` [Age: ${numericAge}]` : '';
    joinEarlyAccess(name.trim(), email.trim(), `${interest}${ageNote}`, fullPhone);
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
          {/* Ask Age First */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Learner's Age (Optional)
              </label>
              <span className="text-[10px] text-[#FF6B16] font-medium">
                {hasAge && (numericAge < 18 ? 'Foundation Tracks Filtered' : 'Career Tracks Filtered')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="5"
                max="80"
                value={learnerAge}
                onChange={(e) => setLearnerAge(e.target.value)}
                placeholder="Enter age (e.g. 10 or 21)..."
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
              />
              <div className="flex items-center gap-1 shrink-0">
                {[8, 12, 16, 18, 21].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setLearnerAge(a.toString())}
                    className={`px-2 py-1 text-[11px] rounded font-semibold transition-all cursor-pointer ${
                      numericAge === a
                        ? 'bg-[#FF6B16] text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-orange-50'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Relatable Area of Interest
            </label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#FF6B16] font-medium"
            >
              <option value="All Programs">All Programs &amp; Announcements</option>

              {hasAge && numericAge < 18 ? (
                <optgroup label="🌟 Junior Foundation Tracks">
                  <option value="Vedic Maths & Speed Mental Arithmetic">
                    Vedic Maths &amp; Speed Mental Arithmetic
                  </option>
                  <option value="English Mastery: Grammar, Spoken Fluency & Writing">
                    English Mastery: Grammar, Spoken Fluency &amp; Writing
                  </option>
                  <option value="Hindi Vyakaran, Sahitya & Conversational Fluency">
                    Hindi Vyakaran, Sahitya &amp; Conversational Fluency
                  </option>
                  <option value="Young Coders: Scratch & Creative Python">
                    Young Coders: Scratch &amp; Creative Python
                  </option>
                </optgroup>
              ) : hasAge && numericAge >= 18 ? (
                <optgroup label="💼 Career & Technical Specializations">
                  <option value="Full-Stack Web Development">
                    Full-Stack Web Development
                  </option>
                  <option value="Data Analytics & BI">
                    Data Analytics &amp; BI
                  </option>
                  <option value="Python Programming & AI Fundamentals">
                    Python Programming &amp; AI Fundamentals
                  </option>
                  <option value="Placement Preparation & Interview Mastery">
                    Placement Preparation &amp; Interview Mastery
                  </option>
                </optgroup>
              ) : (
                <>
                  <optgroup label="🌟 Junior Foundation Tracks">
                    <option value="Vedic Maths & Speed Mental Arithmetic">
                      Vedic Maths &amp; Speed Mental Arithmetic
                    </option>
                    <option value="English Mastery: Grammar, Spoken Fluency & Writing">
                      English Mastery: Grammar, Spoken Fluency &amp; Writing
                    </option>
                    <option value="Hindi Vyakaran, Sahitya & Conversational Fluency">
                      Hindi Vyakaran, Sahitya &amp; Conversational Fluency
                    </option>
                    <option value="Young Coders: Scratch & Creative Python">
                      Young Coders: Scratch &amp; Creative Python
                    </option>
                  </optgroup>
                  <optgroup label="💼 Career & Technical Specializations">
                    <option value="Full-Stack Web Development">
                      Full-Stack Web Development
                    </option>
                    <option value="Data Analytics & BI">
                      Data Analytics &amp; BI
                    </option>
                    <option value="Python Programming & AI Fundamentals">
                      Python Programming &amp; AI Fundamentals
                    </option>
                    <option value="Placement Preparation & Interview Mastery">
                      Placement Preparation &amp; Interview Mastery
                    </option>
                  </optgroup>
                </>
              )}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Your Full Name
              </label>
              <span className="text-[10px] text-stone-500 font-medium bg-stone-100 px-1.5 py-0.5 rounded">
                Alphabets only (A-Z)
              </span>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(sanitizeName(e.target.value))}
                placeholder="e.g. Vinit Sharma"
                required
                pattern="[a-zA-Z\s]+"
                title="Only letters and spaces are allowed"
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Email Address
              </label>
              <span className="text-[10px] text-stone-500 font-medium bg-stone-100 px-1.5 py-0.5 rounded">
                Strict email
              </span>
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder="xyz@gmail.com"
                required
                className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                WhatsApp / Phone Number (Optional)
              </label>
              <span className="text-[10px] text-stone-500 font-medium bg-stone-100 px-1.5 py-0.5 rounded">
                Digits only (0-9)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-32 shrink-0">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  aria-label="Country phone code"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-2 py-2 text-xs text-stone-900 focus:outline-none focus:border-[#FF6B16] font-medium"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={`${c.code}-${c.dialCode}`} value={c.dialCode}>
                      {c.flag} {c.dialCode} ({c.code})
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={15}
                  value={phone}
                  onChange={(e) => setPhone(sanitizePhone(e.target.value))}
                  placeholder="9876543210 (10 digits)"
                  className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                />
              </div>
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
