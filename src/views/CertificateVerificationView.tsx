import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Eye,
  ShieldAlert,
  Copy,
  Check,
} from 'lucide-react';
import { CertificatePreviewModal } from '../components/certificate/CertificatePreviewModal';
import { CertificateRecord } from '../types';

export const CertificateVerificationView: React.FC = () => {
  const { navigateTo } = useApp();
  const [serialInput, setSerialInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    searched: boolean;
    valid: boolean;
    status?: 'active' | 'revoked';
    message?: string;
    certificate?: any;
  }>({
    searched: false,
    valid: false,
  });

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Check URL query parameters for direct link verification (e.g. ?id=CMX-2026-MERN-000001)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idParam = params.get('id');
    if (idParam) {
      setSerialInput(idParam);
      performVerification(idParam);
    }
  }, []);

  const performVerification = async (serialToVerify: string) => {
    const cleanSerial = serialToVerify.trim().toUpperCase();
    if (!cleanSerial) return;

    setIsLoading(true);
    setVerificationResult({ searched: false, valid: false });

    try {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(cleanSerial)}`);
      const data = await res.json();

      setVerificationResult({
        searched: true,
        valid: data.valid,
        status: data.status,
        message: data.message,
        certificate: data.certificate,
      });
    } catch (err) {
      console.error('Verification query error:', err);
      setVerificationResult({
        searched: true,
        valid: false,
        message: 'Network error communicating with official registry. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(serialInput);
  };

  const handleCopyLink = () => {
    if (!verificationResult.certificate) return;
    const url = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(
      verificationResult.certificate.certificate_serial_number
    )}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#FF6B16] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Official Credential Registry</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
          Verify Your Code Mux Certificate
        </h1>

        <p className="text-sm text-stone-600 leading-relaxed">
          Verify the authenticity of certificates issued by Code Mux. Enter the unique certificate identification number below to validate the credential against our permanent registry.
        </p>
      </div>

      {/* Verification Search Card */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="certificate-id-input" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Certificate Identification Number
            </label>
            <div className="relative">
              <input
                id="certificate-id-input"
                type="text"
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                placeholder="e.g. CMX-2026-MERN-000001"
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-300 focus:border-[#FF6B16] focus:outline-none text-stone-900 font-mono text-sm tracking-wider uppercase transition-colors"
                required
              />
              <button
                type="submit"
                disabled={isLoading || !serialInput.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-[#FF6B16] hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl font-semibold text-xs flex items-center justify-center transition-all cursor-pointer shadow-xs"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-stone-400 mt-2">
              Format: <span className="font-mono">CMX-YYYY-COURSE-XXXXXX</span> (printed on the bottom centre of the certificate).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
            <span className="text-[11px] text-stone-400 font-medium">Quick Test Credentials:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSerialInput('CMX-2026-MERN-000001');
                  performVerification('CMX-2026-MERN-000001');
                }}
                className="text-[11px] font-mono text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                title="Test active certificate verification"
              >
                CMX-2026-MERN-000001 (Valid)
              </button>
              <button
                type="button"
                onClick={() => {
                  setSerialInput('CMX-2026-JAVA-000003');
                  performVerification('CMX-2026-JAVA-000003');
                }}
                className="text-[11px] font-mono text-rose-700 hover:text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 cursor-pointer"
                title="Test revoked certificate verification"
              >
                CMX-2026-JAVA-000003 (Revoked)
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Verification Result Section */}
      {verificationResult.searched && (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* CASE 1: Valid Active Certificate */}
          {verificationResult.valid && verificationResult.certificate && (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/40 shadow-xl overflow-hidden">
              {/* Header Badge */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black tracking-wide font-display">
                      ✓ CERTIFICATE VERIFIED
                    </h2>
                    <p className="text-xs text-emerald-100 font-medium">
                      Authentic credential officially issued and recognized by Code Mux
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

              {/* Certificate Snapshot Information (Strictly Safe Public Information) */}
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Recipient Name</span>
                    <span className="text-base font-bold text-stone-900 block">
                      {verificationResult.certificate.student_name_snapshot}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Identity Verified
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Course Name</span>
                    <span className="text-sm font-bold text-stone-900 block leading-tight">
                      {verificationResult.certificate.course_name_snapshot}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Duration: {verificationResult.certificate.course_duration_snapshot}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Certificate Number</span>
                    <span className="font-mono text-sm font-black text-[#FF6B16] block">
                      {verificationResult.certificate.certificate_serial_number}
                    </span>
                    <span className="text-[10px] text-stone-500">Unique Ledger Serial</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Assigned Faculty</span>
                    <span className="text-sm font-bold text-stone-900 block">
                      {verificationResult.certificate.instructor_name_snapshot}
                    </span>
                    <span className="text-[10px] text-stone-500">Authorized Mentor</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Issue Date</span>
                    <span className="text-sm font-bold text-stone-900 block">
                      {verificationResult.certificate.issue_date}
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Completed: {verificationResult.certificate.completion_date}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-bold block">Issuing Organization</span>
                    <span className="text-sm font-bold text-stone-900 block">
                      Code Mux
                    </span>
                    <span className="text-[10px] text-stone-500">
                      Educational &amp; Placement Platform
                    </span>
                  </div>
                </div>

                {/* Privacy Guarantee Note */}
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
                  <span>🔒 Privacy Shield Active: Private contact info and passwords are never exposed.</span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedLink ? 'Link Copied!' : 'Copy Verification URL'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="px-5 py-2 rounded-xl bg-[#FF6B16] hover:bg-orange-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Official Certificate Design</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2: Revoked Certificate */}
          {verificationResult.status === 'revoked' && (
            <div className="bg-white rounded-3xl border-2 border-rose-500 shadow-xl overflow-hidden p-6 sm:p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-black text-rose-700 tracking-tight font-display">
                  Certificate Revoked
                </h2>
                <p className="text-xs text-rose-800 font-semibold mt-1">
                  This certificate is no longer valid. Please contact Code Mux for further information.
                </p>
              </div>

              {verificationResult.certificate && (
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-left max-w-md mx-auto space-y-2">
                  <div className="flex justify-between border-b border-rose-200 pb-1">
                    <span className="text-stone-500 font-medium">Recipient:</span>
                    <span className="font-bold text-stone-900">{verificationResult.certificate.student_name_snapshot}</span>
                  </div>
                  <div className="flex justify-between border-b border-rose-200 pb-1">
                    <span className="text-stone-500 font-medium">Certificate ID:</span>
                    <span className="font-mono font-bold text-stone-900">{verificationResult.certificate.certificate_serial_number}</span>
                  </div>
                  <div className="flex justify-between border-b border-rose-200 pb-1">
                    <span className="text-stone-500 font-medium">Course:</span>
                    <span className="font-bold text-stone-900">{verificationResult.certificate.course_name_snapshot}</span>
                  </div>
                  {verificationResult.certificate.revoked_reason && (
                    <div className="pt-1">
                      <span className="text-rose-700 font-bold block mb-0.5">Revocation Notice:</span>
                      <p className="text-rose-900 italic">{verificationResult.certificate.revoked_reason}</p>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[11px] text-stone-500">
                For administrative audits or inquiries regarding credential revocation, contact{' '}
                <a href="mailto:admin@codemux.in" className="text-[#FF6B16] underline font-medium">
                  admin@codemux.in
                </a>
              </p>
            </div>
          )}

          {/* CASE 3: Certificate Not Found */}
          {!verificationResult.valid && verificationResult.status !== 'revoked' && (
            <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 sm:p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-stone-900 font-display">
                  Certificate Not Found
                </h2>
                <p className="text-xs text-stone-600 mt-1 max-w-md mx-auto">
                  The provided certificate ID is invalid or does not exist in our official records. Please double-check the identification number or contact the issuing authority.
                </p>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl max-w-sm mx-auto text-xs font-mono text-stone-600">
                Searched: "{serialInput}"
              </div>
            </div>
          )}
        </div>
      )}

      {/* Trust & Verification Standards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B16] flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="text-sm font-bold text-stone-900">Cryptographically Unique</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Every certificate features a backend-generated serial key linked to the student's immutable course completion record.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B16] flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="text-sm font-bold text-stone-900">Direct Recruiter Verification</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Hiring managers and university admissions officers can validate credentials in real-time with zero friction.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B16] flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h3 className="text-sm font-bold text-stone-900">Privacy &amp; Data Security</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Personal contact details and student credentials remain completely private. Only course completion snapshots are displayed.
          </p>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {verificationResult.certificate && (
        <CertificatePreviewModal
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          certificate={verificationResult.certificate as CertificateRecord}
          isPreview={false}
        />
      )}
    </div>
  );
};
