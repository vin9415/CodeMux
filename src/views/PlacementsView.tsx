import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  FileCheck,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Code2,
} from 'lucide-react';

export const PlacementsView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
            Career &amp; Placements
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display">
            Prepare for the Opportunities Ahead
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Code Mux supports students through technical interview preparation, resume reviews, mock interviews, practical capstone projects, and career guidance.
          </p>
        </div>

        {/* Mandatory Transparency Notice */}
        <div className="p-6 rounded-2xl bg-orange-50 border border-orange-200 text-xs sm:text-sm text-orange-950 space-y-2 leading-relaxed shadow-xs">
          <div className="flex items-center gap-2 font-bold text-orange-900">
            <ShieldCheck className="w-5 h-5 text-[#FF6B16]" />
            Code Mux Placement Assistance &amp; Transparency Policy
          </div>
          <p className="text-xs sm:text-sm text-stone-700">
            Code Mux assists learners through resume audits, coding problem sessions, and mock interviews. <strong>Placement assistance does not constitute a guarantee of employment</strong>. Job opportunities depend on student skills, academic background, employer requirements, and economic conditions. All hiring decisions remain solely at the discretion of prospective recruiting companies.
          </p>
        </div>

        {/* 4 Pillars of Placement Prep */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-center text-[#FF6B16]">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Resume Building</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Format ATS-friendly software engineering resumes emphasizing measurable project contributions and GitHub source code.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">DSA &amp; Aptitude</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Practice essential algorithm patterns (two pointers, sliding window, binary search, trees) tested during technical screening tests.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-center text-[#FF6B16]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Mock Interviews</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              1-on-1 simulated video coding rounds with feedback on communication, problem decomposition, and code clarity.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Job Opportunity Guidance</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Guidance on searching and applying for verified fresher opportunities, junior developer roles, and tech internships.
            </p>
          </div>
        </div>

        {/* Detailed Roadmap Box */}
        <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6">
          <h3 className="text-xl font-bold text-stone-900 font-display">
            How Code Mux Prepares You for Technical Hiring
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600">
            <div className="space-y-2">
              <span className="font-semibold text-stone-900 text-sm">Phase 1: Foundation &amp; Builds</span>
              <p className="leading-relaxed">
                Build robust projects that prove you can write clean, modular software with Git history, rather than tutorial clones.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-stone-900 text-sm">Phase 2: CS Theory &amp; Problem Solving</span>
              <p className="leading-relaxed">
                Revisit core computer science fundamentals: Database normalization, operating systems concurrency, and algorithmic complexity.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-semibold text-stone-900 text-sm">Phase 3: Rehearsal &amp; Outreach</span>
              <p className="leading-relaxed">
                Refine interview communication, participate in mock coding assessments, and receive constructive guidance on application strategies.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              Have questions about our placement preparation program?
            </div>
            <button
              onClick={() => navigateTo('contact')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              Inquire About Placement Support <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
