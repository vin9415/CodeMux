import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, Compass, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
            About Code Mux
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 font-display">
            Connecting Learning, Practical Experience &amp; Careers
          </h1>
          <p className="text-base text-stone-600 leading-relaxed">
            Code Mux is an affordable, practical technology learning platform designed to help students bridge the gap between academic theory and industry engineering expectations.
          </p>
        </div>

        {/* Mission and Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100/70 border border-orange-200 flex items-center justify-center text-[#FF6B16]">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">Our Mission</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              To help students develop practical technology skills through structured learning, real-world projects, mentor feedback, and transparent career preparation.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-700">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-display">Our Vision</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              To bridge the gap between academic education and industry requirements by connecting learning, practical experience, and employment opportunities.
            </p>
          </div>
        </div>

        {/* The Transparency Pledge */}
        <div className="p-8 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-5">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#FF6B16]" />
            <h3 className="text-xl font-bold text-stone-900 font-display">
              The Code Mux Transparency Pledge
            </h3>
          </div>
          <p className="text-sm text-stone-700 leading-relaxed">
            We believe that technical education should be honest and grounded in reality. Code Mux adheres to the following principles:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-stone-700">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B16] shrink-0 mt-0.5" />
              <span>We do not claim official government university accreditation or promise automatic placements.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B16] shrink-0 mt-0.5" />
              <span>We do not publish fabricated student reviews, mock ratings, or invented partner lists.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B16] shrink-0 mt-0.5" />
              <span>We focus on real engineering practices: Git version control, pull requests, testing, and clean architecture.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B16] shrink-0 mt-0.5" />
              <span>Course fee structures will be kept accessible and transparent once finalized.</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 rounded-2xl bg-white border border-stone-200 shadow-xs text-center space-y-4">
          <h4 className="text-xl font-bold text-stone-900 font-display">
            Interested in our upcoming cohorts?
          </h4>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Join the waitlist to receive curriculum updates and early fee announcements as soon as they are finalized.
          </p>
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            Join Priority Waitlist <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
