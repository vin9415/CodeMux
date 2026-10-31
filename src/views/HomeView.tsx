import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FOCUS_AREAS, FAQ_ITEMS } from '../data/initialData';
import {
  ArrowRight,
  Code,
  Layers,
  Terminal,
  Cpu,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigateTo, openEarlyAccessModal } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const steps = [
    { number: '01', title: 'Learn', desc: 'Follow structured, practical roadmaps designed for deep conceptual comprehension.' },
    { number: '02', title: 'Practice', desc: 'Solve hands-on exercises, debugging tasks, and practical challenges.' },
    { number: '03', title: 'Build', desc: 'Develop real portfolio capstones that demonstrate applied engineering competence.' },
    { number: '04', title: 'Improve', desc: 'Receive constructive feedback on your code architecture and best practices.' },
    { number: '05', title: 'Prepare', desc: 'Rehearse technical mock interviews, DSA patterns, and resume formulation.' },
    { number: '06', title: 'Apply', desc: 'Explore suitable job opportunities and interview with structured confidence.' },
  ];

  return (
    <div className="w-full flex flex-col bg-[#FAF8F5]">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-stone-200 bg-gradient-to-b from-[#FFFDF9] via-[#FAF8F5] to-[#F5F2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FF6B16]">
                <span className="w-2 h-2 rounded-full bg-[#FF6B16]" />
                Practical Tech Education for Your Career
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 tracking-tight leading-[1.1] font-display">
                Learn to Code. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-900 via-stone-800 to-[#FF6B16]">
                  Build Your Future.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                Master in-demand technology skills, work on real-world projects, learn with mentors and prepare for your next career opportunity with Code Mux.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => openEarlyAccessModal()}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  Get Early Access <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigateTo('domains')}
                  className="px-6 py-3.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white border border-stone-300 hover:border-[#FF6B16] hover:text-[#FF6B16] rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Explore Focus Areas
                </button>
              </div>

              {/* Supporting Highlights */}
              <div className="pt-6 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-stone-600">
                <div className="space-y-1">
                  <div className="font-semibold text-stone-900">Project-Based</div>
                  <div>Build real apps</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-stone-900">Structured</div>
                  <div>Clear roadmaps</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-stone-900">Mentor Guidance</div>
                  <div>Constructive reviews</div>
                </div>
                <div className="space-y-1">
                  <div className="font-semibold text-stone-900">Career Prep</div>
                  <div>Interviews &amp; DSA</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200/80 shadow-xl bg-white group">
                <img
                  src="/src/assets/images/student_codemux_cup_1793428677514.jpg"
                  alt="Student studying in Code Mux class with Code Mux coffee cup"
                  className="w-full h-auto object-cover aspect-[16/10] group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 bg-white border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-stone-900">Practical Tech Training</div>
                    <div className="text-[11px] text-stone-500">Curriculums &amp; Schedules in Preparation</div>
                  </div>
                  <button
                    onClick={() => navigateTo('domains')}
                    className="text-[#FF6B16] font-semibold text-xs hover:underline shrink-0 cursor-pointer"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FOCUS AREAS */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Core Training Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              Build Skills That Move Your Career Forward
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We are preparing structured tracks focused on modern industry proficiencies and real-world project builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOCUS_AREAS.map((area) => (
              <div
                key={area.id}
                className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-center text-[#FF6B16] mb-4">
                    {area.id === 'webdev' && <Code className="w-6 h-6" />}
                    {area.id === 'data' && <Layers className="w-6 h-6 text-amber-700" />}
                    {area.id === 'python-ai' && <Terminal className="w-6 h-6" />}
                    {area.id === 'placement' && <Cpu className="w-6 h-6 text-amber-700" />}
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 font-display mb-2 group-hover:text-[#FF6B16] transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <div className="text-xs space-y-1.5 pt-3 border-t border-stone-200 text-stone-700">
                    <div className="font-semibold text-stone-900">Core Areas:</div>
                    {area.topics.slice(0, 3).map((t, idx) => (
                      <div key={idx}>· {t}</div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openEarlyAccessModal(area.title)}
                  className="mt-6 w-full py-2.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-xl hover:border-[#FF6B16] hover:text-[#FF6B16] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  Join Waitlist <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="py-20 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Structured Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              From Learning to Career Preparation
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              A 6-step practical pathway designed to transition you from theoretical concepts to portfolio readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:border-orange-300 transition-colors group"
              >
                <div className="text-3xl font-extrabold text-stone-300 font-mono mb-3 group-hover:text-[#FF6B16] transition-colors">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-stone-900 font-display mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Core Differentiators
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              More Than Just Watching Tutorials
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              We focus on active coding proficiency, project execution, and constructive feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-center text-[#FF6B16] mb-3">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-1.5">Hands-On Learning</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Write code, build interfaces, and solve challenges directly rather than memorizing syntax.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-1.5">Structured Roadmaps</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Progressive tracks that build confidence from core fundamentals to advanced patterns.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-center text-[#FF6B16] mb-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-1.5">Practical Assignments</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Project-based evaluation where assignments mirror realistic software development requirements.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700 mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-stone-900 mb-1.5">Mentor Guidance</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Constructive feedback to help identify edge cases, clean architecture, and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: CAREER & PLACEMENTS */}
      <section className="py-20 bg-[#FAF8F5] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
            Career Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
            Prepare for the Opportunities Ahead
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Code Mux supports students through technical interview preparation, resume reviews, mock interviews, practical projects, and career guidance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
            <div className="p-5 rounded-xl bg-white border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 mb-1">Resume Building</h4>
              <p className="text-xs text-stone-600">
                Format engineering resumes highlighting practical projects and measurable technical contributions.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-white border border-stone-200">
              <h4 className="text-sm font-bold text-stone-900 mb-1">Aptitude &amp; DSA Practice</h4>
              <p className="text-xs text-stone-600">
                Targeted practice on high-yield problem-solving patterns frequently evaluated in technical screens.
              </p>
            </div>
          </div>

          {/* Transparency Disclaimer */}
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-xs text-orange-950 leading-relaxed text-left">
            <strong className="text-orange-900">Placement Assistance Policy:</strong> Job opportunities depend on student eligibility, skills, employer requirements, and market availability. Placement assistance does not guarantee employment.
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateTo('placements')}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Explore Career Support Details →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQS */}
      <section className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Clear Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-stone-600">
              Honest, transparent answers about Code Mux, our focus areas, and batch releases.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#FAF8F5] border border-stone-200 shadow-xs overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-stone-900">
                      {item.question}
                    </span>
                    <span className="p-1 rounded bg-white text-[#FF6B16] shrink-0 border border-stone-200">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200 pt-4">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FAF8F5] border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-950 font-display tracking-tight">
            Your Tech Journey Starts Here.
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            Register for early access to receive batch schedules, curriculum announcements, and priority notifications from Code Mux.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openEarlyAccessModal()}
              className="px-6 py-3.5 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              Get Early Access <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="px-6 py-3.5 text-xs font-semibold text-stone-800 bg-white border border-stone-300 hover:border-stone-400 rounded-xl transition-all cursor-pointer"
            >
              Contact Advisory Desk
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
