import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Clock, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { submitContactForm, addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [interest, setInterest] = useState('Full-Stack Web Development');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addToast('error', 'Missing Information', 'Please provide your full name, email address, and inquiry message.');
      return;
    }
    if (!consent) {
      addToast('error', 'Consent Required', 'Please acknowledge the privacy consent notice to send your enquiry.');
      return;
    }

    submitContactForm({
      name,
      email,
      subject: subject || `Course Inquiry: ${interest}`,
      interest,
      message,
    });

    setSubmitted(true);
  };

  return (
    <div className="w-full py-12 sm:py-16 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#FF6B16]">
            Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 font-display">
            Contact &amp; Admissions Inquiry
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Have questions about upcoming batches, curriculum tracks, or early waitlist priority? Send us a message and our academic team will get back to you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-6">
              <h3 className="text-base font-bold text-stone-900 font-display">
                Communication Channels
              </h3>

              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-orange-100/70 border border-orange-200 text-[#FF6B16] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-900 font-semibold">Email Admissions Desk</div>
                    <div className="text-stone-600 mt-0.5">contact@codemux.in</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Response within 24 business hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100/70 border border-amber-200 text-amber-700 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-900 font-semibold">Office &amp; Support Hours</div>
                    <div className="text-stone-600 mt-0.5">Monday to Saturday: 10:00 AM – 7:00 PM IST</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Sundays reserved for workshops</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-orange-100/70 border border-orange-200 text-[#FF6B16] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-stone-900 font-semibold">Mode of Delivery</div>
                    <div className="text-stone-600 mt-0.5">Online Platform serving students across India</div>
                    <div className="text-[11px] text-stone-500 mt-0.5">Live video cohorts + recorded portal access</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 leading-relaxed">
                Code Mux does not maintain unverified physical storefronts. All admissions counseling and technical batch orientations occur securely online.
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 shadow-xs">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-stone-900 font-display">
                    Thank You for Reaching Out!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                    We have received your message regarding{' '}
                    <strong className="text-stone-900">{interest}</strong>. An advisor will get back to your email ({email}) within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                      setSubject('');
                    }}
                    className="px-5 py-2 text-xs font-semibold text-stone-700 bg-[#FAF8F5] border border-stone-300 rounded-lg hover:border-stone-400 transition-colors cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 font-display mb-1">
                    Send an Inquiry or Feedback
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Leave your contact details and question below, and we will get back to you promptly.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aarav Sharma"
                        required
                        className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aarav@example.com"
                        required
                        className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Program of Interest
                      </label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-2.5 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#FF6B16]"
                      >
                        <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                        <option value="Data Analytics & BI">Data Analytics &amp; BI</option>
                        <option value="Python & AI Fundamentals">Python &amp; AI Fundamentals</option>
                        <option value="Placement Preparation Program">Placement Preparation Program</option>
                        <option value="General Query">General Question</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                        Subject Line (Optional)
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Batch Timings or Syllabus"
                        className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Your Message or Inquiry
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you would like to know regarding the curriculum, upcoming batches, or prerequisites..."
                      rows={4}
                      required
                      className="w-full bg-[#FAF8F5] border border-stone-300 rounded-lg p-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#FF6B16]"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="contactConsent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-[#FF6B16] focus:ring-[#FF6B16]"
                    />
                    <label htmlFor="contactConsent" className="text-[11px] text-stone-600 leading-tight">
                      I consent to Code Mux responding to my inquiry via email regarding course schedules and batch information.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4" /> Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
