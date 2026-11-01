import React from 'react';
import { X, ShieldCheck, Download, ExternalLink, Sparkles, AlertCircle, Calendar, User, BookOpen, Award } from 'lucide-react';
import { CertificateMasterRenderer } from './CertificateMasterRenderer';
import { CertificateRecord } from '../../types';

export interface CertificatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate?: CertificateRecord | null;
  // If previewing before issuance
  draftData?: {
    studentName: string;
    courseName: string;
    duration?: string;
    startDate?: string;
    completionDate?: string;
    instructorName?: string;
  };
  isPreview?: boolean;
}

export const CertificatePreviewModal: React.FC<CertificatePreviewModalProps> = ({
  isOpen,
  onClose,
  certificate,
  draftData,
  isPreview = false,
}) => {
  if (!isOpen) return null;

  const studentName = certificate ? certificate.student_name_snapshot : draftData?.studentName || 'Student Name';
  const courseName = certificate ? certificate.course_name_snapshot : draftData?.courseName || 'Course Name';
  const duration = certificate ? certificate.course_duration_snapshot : draftData?.duration || '60 Days';
  const startDate = certificate ? certificate.enrollment_date : draftData?.startDate || '2026-02-15';
  const completionDate = certificate ? certificate.completion_date : draftData?.completionDate || '2026-04-15';
  const instructorName = certificate ? certificate.instructor_name_snapshot : draftData?.instructorName || 'Priya Sharma';
  const serialNumber = certificate ? certificate.certificate_serial_number : 'CMX-PREVIEW-DRAFT';
  const status = certificate ? certificate.certificate_status : 'active';
  const isRevoked = status === 'revoked';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl max-h-[94vh] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Modal Top Header */}
        <div className="px-5 py-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-[#FF6B16]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold font-display flex items-center gap-2">
                <span>Code Mux Official Certificate</span>
                {isPreview && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/30">
                    Preview Mode
                  </span>
                )}
                {!isPreview && isRevoked && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/30 text-rose-300 font-semibold border border-rose-500/30">
                    Revoked
                  </span>
                )}
                {!isPreview && !isRevoked && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/30">
                    Active &amp; Verified
                  </span>
                )}
              </h3>
              <p className="text-[11px] text-stone-400">
                {isPreview
                  ? 'Dynamic preview before course completion. Real credential issued upon 100% criteria fulfillment.'
                  : `Credential Serial: ${serialNumber}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
            title="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Certificate Viewer + Verification Sidebar */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF8F5] space-y-6">
          {/* Certificate Master Renderer */}
          <div className="max-w-4xl mx-auto">
            <CertificateMasterRenderer
              studentName={studentName}
              courseName={courseName}
              duration={duration}
              startDate={startDate}
              completionDate={completionDate}
              instructorName={instructorName}
              certificateSerialNumber={serialNumber}
              isPreview={isPreview}
              status={status}
              showControls={true}
            />
          </div>

          {/* Credential Details Grid */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-2xs">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6B16]" />
              <span>Official Credential Registry Data</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block mb-0.5">Recipient</span>
                <span className="font-bold text-stone-900 truncate block">{studentName}</span>
                <span className="text-[10px] text-stone-500">Verified Student Profile</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block mb-0.5">Program Track</span>
                <span className="font-bold text-stone-900 truncate block">{courseName}</span>
                <span className="text-[10px] text-stone-500">Duration: {duration}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block mb-0.5">Credential ID</span>
                <span className="font-mono font-bold text-stone-900 truncate block">
                  {isPreview ? 'DRAFT-PREVIEW' : serialNumber}
                </span>
                <span className="text-[10px] text-stone-500">Backend Unique Serial</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] text-stone-500 uppercase font-semibold block mb-0.5">Assigned Instructor</span>
                <span className="font-bold text-stone-900 truncate block">{instructorName}</span>
                <span className="text-[10px] text-stone-500">Authorized Faculty Member</span>
              </div>
            </div>

            {/* Revocation Warning if revoked */}
            {isRevoked && certificate?.revoked_reason && (
              <div className="mt-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Administrative Revocation Notice:</span>
                </div>
                <p>{certificate.revoked_reason}</p>
                {certificate.revoked_at && (
                  <span className="text-[10px] text-rose-600 mt-1 block">
                    Revoked on: {new Date(certificate.revoked_at).toLocaleDateString()} by {certificate.revoked_by || 'Admin'}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-white border-t border-stone-200 flex items-center justify-between shrink-0 text-xs">
          <span className="text-stone-500 text-[11px] hidden sm:inline">
            Issuing Authority: Code Mux Educational Platform • ISO &amp; Industry Aligned
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-xl transition-colors cursor-pointer ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
