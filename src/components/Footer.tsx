import React from 'react';
import { useApp, PageRoute } from '../context/AppContext';
import { Mail, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, openEarlyAccessModal } = useApp();

  const handleLink = (page: PageRoute) => {
    navigateTo(page);
  };

  return (
    <footer className="w-full bg-[#F5F3EE] border-t border-stone-200 text-stone-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/codemuxlogo_913c6b11.png"
                alt="Code Mux"
                className="w-10 h-10 object-contain rounded-xl shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span className="text-xl font-bold tracking-tight text-stone-900 font-display">
                Code <span className="text-[#FF6B16]">Mux</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed max-w-sm text-stone-600">
              Code Mux is an Indian education platform delivering foundational academic mastery in Vedic Maths, English, Hindi, and Young Coding, alongside practical project-centered career programs for college students and graduates.
            </p>

            <div className="text-xs text-stone-500 pt-1">
              <strong className="text-stone-700">Mission:</strong> Foundational Mastery &amp; Real-World Career Skills.
            </div>

            <div className="pt-2 text-xs text-stone-500 space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B16] shrink-0" />
                <span>Online Learning Platform · Serving Learners Across India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>contact@codemux.in</span>
              </div>
            </div>
          </div>

          {/* Column 2: Focus Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
              Learning Tracks
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="text-[10px] font-bold text-[#FF6B16] uppercase pt-0.5">Junior Foundation Academy</li>
              <li>
                <button
                  onClick={() => handleLink('domains')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Vedic Maths &amp; Mental Speed
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('domains')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  English Mastery &amp; Public Speaking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('domains')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Hindi Vyakaran &amp; Sahitya
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('domains')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Young Coders (Scratch &amp; Python)
                </button>
              </li>

              <li className="text-[10px] font-bold text-[#FF6B16] uppercase pt-2">Career Specializations</li>
              <li>
                <button
                  onClick={() => handleLink('domains')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Full-Stack Web Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('domains')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Data Analytics &amp; Python AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => openEarlyAccessModal()}
                  className="text-[#FF6B16] hover:underline flex items-center gap-1 font-semibold pt-1 cursor-pointer"
                >
                  Join Early Access <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
              Career &amp; Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLink('placements')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Career Support &amp; Roadmap
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('about')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  About Code Mux
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('contact')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Contact &amp; Admissions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('verify-certificate')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer font-semibold text-[#FF6B16]"
                >
                  Verify Certificate
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('faq')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider">
              Legal &amp; Transparency
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleLink('privacy')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('terms')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('refund')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Refund &amp; Fee Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleLink('conduct')}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Student Code of Conduct
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Transparency Notice */}
        <div className="mt-12 pt-6 border-t border-stone-300 text-xs text-stone-500 space-y-3">
          <p className="leading-relaxed">
            <strong className="text-stone-700">Transparency Notice:</strong> Code Mux is an independent online technology skill-building initiative. Programs and batch schedules are currently in preparation. Placement assistance and interview preparation do not guarantee employment; all hiring decisions remain solely with independent recruiting companies.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-stone-200 text-stone-500">
            <div>
              © {new Date().getFullYear()} Code Mux. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-xs">
              <button onClick={() => handleLink('privacy')} className="hover:text-stone-800 cursor-pointer">Privacy</button>
              <span>·</span>
              <button onClick={() => handleLink('terms')} className="hover:text-stone-800 cursor-pointer">Terms</button>
              <span>·</span>
              <button onClick={() => handleLink('refund')} className="hover:text-stone-800 cursor-pointer">Refunds</button>
              <span>·</span>
              <button onClick={() => handleLink('contact')} className="hover:text-stone-800 cursor-pointer">Contact</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
