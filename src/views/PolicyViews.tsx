import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';

export const PrivacyPolicyView: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen text-stone-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-[#FF6B16] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-stone-200 pb-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Legal Document
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Code Mux Privacy Policy
            </h1>
            <p className="text-xs text-stone-500">
              Effective Date: March 2026
            </p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm leading-relaxed text-stone-600">
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">1. Information Collection</h2>
              <p>
                Code Mux collects information voluntarily submitted by visitors and learners through waitlist registrations and contact forms (name, email address, optional contact phone, and program preferences).
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">2. How We Use Information</h2>
              <p>
                Submitted information is utilized solely to provide batch curriculum details, schedule updates, and respond to educational inquiries. We do not sell or monetize personal information.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">3. Communications &amp; Opt-Out</h2>
              <p>
                Learners on our waitlist will receive notifications regarding schedule releases. You can opt out of communications anytime by replying with an unsubscribe request to contact@codemux.in.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TermsView: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen text-stone-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-[#FF6B16] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-stone-200 pb-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Terms of Service
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Terms and Conditions
            </h1>
            <p className="text-xs text-stone-500">Effective Date: March 2026</p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm leading-relaxed text-stone-600">
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">1. Platform Nature</h2>
              <p>
                Code Mux provides online technical training courses and career preparation guidance. The platform is not an accredited degree-granting institution.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">2. Placement Disclaimer</h2>
              <p>
                Code Mux offers career preparation, resume reviews, and interview guidance, but does not guarantee job placement or employment outcomes. Hiring decisions rest solely with independent employers.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">3. Intellectual Property</h2>
              <p>
                Students own their original code written during assignments. Course syllabi, video lectures, and website assets remain the property of Code Mux.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RefundPolicyView: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen text-stone-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-[#FF6B16] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-stone-200 pb-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Enrollment Guidelines
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Refund &amp; Fee Policy
            </h1>
            <p className="text-xs text-stone-500">Transparent guidelines</p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm leading-relaxed text-stone-600">
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">1. Course Pricing Status</h2>
              <p>
                Course fees have not yet been finalized. Official fee structures and payment methods will be published alongside confirmed batch schedules.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">2. Pre-Batch Cancellation</h2>
              <p>
                Once fees are announced and accepted, enrolled students may cancel up to 48 hours prior to batch commencement for a full refund.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">3. Contact for Inquiries</h2>
              <p>
                For fee or schedule inquiries, please write to contact@codemux.in.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CodeOfConductView: React.FC = () => {
  const { navigateTo } = useApp();
  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen text-stone-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <button
          onClick={() => navigateTo('home')}
          className="text-xs font-semibold text-[#FF6B16] hover:underline flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </button>

        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="space-y-1 border-b border-stone-200 pb-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
              Community Guidelines
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
              Student Code of Conduct
            </h1>
            <p className="text-xs text-stone-500">Mutual respect and academic integrity</p>
          </div>

          <div className="space-y-5 text-xs sm:text-sm leading-relaxed text-stone-600">
            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">1. Respectful Environment</h2>
              <p>
                All participants in Code Mux sessions, discussion threads, and cohorts are expected to treat peers and instructors with professional courtesy.
              </p>
            </section>

            <section className="space-y-1.5">
              <h2 className="text-sm font-bold text-stone-900">2. Academic Honesty</h2>
              <p>
                Students are encouraged to collaborate and learn together, but submitted assignments must reflect genuine personal comprehension.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
