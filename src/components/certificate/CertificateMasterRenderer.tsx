import React, { useRef, useState } from 'react';
import { Download, ShieldCheck, Check, Sparkles, ExternalLink, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface CertificateMasterRendererProps {
  studentName: string;
  courseName: string;
  duration?: string;
  startDate?: string;
  completionDate?: string;
  instructorName?: string;
  certificateSerialNumber?: string;
  issueDate?: string;
  isPreview?: boolean;
  status?: 'active' | 'revoked';
  showControls?: boolean;
  onVerifyClick?: () => void;
  className?: string;
}

export const CertificateMasterRenderer: React.FC<CertificateMasterRendererProps> = ({
  studentName,
  courseName,
  duration = '60 Days',
  startDate = '1-11-26',
  completionDate = '1-1-26',
  instructorName = 'Priya Sharma',
  certificateSerialNumber = 'CMX-2026-MERN-000001',
  issueDate,
  isPreview = false,
  status = 'active',
  showControls = true,
  onVerifyClick,
  className = '',
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Format dates for the certificate description
  const formatDisplayDate = (d?: string) => {
    if (!d) return '1-1-26';
    // If format is YYYY-MM-DD convert to D-M-YY for compact alignment
    if (d.includes('-') && d.length === 10) {
      const [year, month, day] = d.split('-');
      return `${parseInt(day, 10)}-${parseInt(month, 10)}-${year.slice(2)}`;
    }
    return d;
  };

  const formattedStart = formatDisplayDate(startDate);
  const formattedCompletion = formatDisplayDate(completionDate);

  const handleDownloadPDF = async () => {
    if (isPreview) {
      alert('This certificate is in PREVIEW mode. Official PDF downloads are unlocked upon completing all course requirements.');
      return;
    }

    if (!certificateRef.current || isExporting) return;

    try {
      setIsExporting(true);
      const element = certificateRef.current;

      // Render at high resolution (scale 2.5) for crisp PDF printing
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      // Landscape A4: 297mm x 210mm
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      const cleanStudentName = studentName.trim().replace(/[^a-zA-Z0-9]/g, '_');
      const cleanCourse = courseName.slice(0, 25).trim().replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`CodeMux_Certificate_${cleanStudentName}_${cleanCourse}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Unable to generate PDF directly. You can use Print to PDF as fallback.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyVerifyLink = () => {
    const url = `${window.location.origin}/verify-certificate?id=${encodeURIComponent(certificateSerialNumber)}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className={`flex flex-col items-center w-full ${className}`}>
      {/* Action Toolbar above Certificate */}
      {showControls && (
        <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 px-1 text-xs">
          <div className="flex items-center gap-2">
            {isPreview ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 border border-amber-500/30 font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Live Dynamic Preview (Pre-Completion)
              </span>
            ) : status === 'revoked' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-300 font-semibold">
                Revoked Credential
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Official Verified Credential
              </span>
            )}

            {!isPreview && (
              <span className="text-stone-500 font-mono text-[11px] hidden sm:inline">
                ID: {certificateSerialNumber}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isPreview && (
              <>
                <button
                  type="button"
                  onClick={handleCopyVerifyLink}
                  className="px-3 py-1.5 rounded-lg bg-white border border-stone-300 hover:border-stone-400 text-stone-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  title="Copy verification link for recruiters"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <ExternalLink className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Verification Link'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  disabled={isExporting}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FF6B16] hover:bg-orange-600 text-white font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
                  title="Download High-Resolution Official Certificate PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Generating PDF...' : 'Download PDF'}</span>
                </button>
              </>
            )}

            {isPreview && (
              <span className="text-[11px] text-stone-500 italic">
                Complete all course modules to unlock official PDF download.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Responsive Aspect-Ratio Certificate Container (1280 x 904 = 1.4159) */}
      <div className="w-full relative shadow-xl rounded-2xl overflow-hidden border border-stone-200 bg-white">
        <div
          ref={certificateRef}
          className="relative w-full aspect-[1280/904] select-none overflow-hidden"
          style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          {/* Master Certificate Template Background Image */}
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-10-29_at_9.00.34_PM_3fdb0a95.jpeg"
            alt="Official Code Mux Master Certificate Template"
            className="absolute inset-0 w-full h-full object-fill pointer-events-none"
            crossOrigin="anonymous"
          />

          {/* DYNAMIC FIELD 1: Golden Ribbon Student Name Overlay */}
          {/* Exact position over the yellow/gold ribbon in master template (Y: ~38.5% to ~47.5%, Width: ~62%) */}
          <div
            className="absolute z-10 flex items-center justify-center text-center px-4"
            style={{
              top: '38.6%',
              left: '20%',
              width: '60%',
              height: '8.8%',
            }}
          >
            {/* Seamless gold gradient backplate to cleanly mask out the template's placeholder word 'Name' */}
            <div
              className="absolute inset-y-1 inset-x-4 rounded-md pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(235,178,24,0.95) 0%, rgba(254,217,66,0.98) 50%, rgba(235,178,24,0.95) 100%)',
              }}
            />

            {/* Dynamic Student Name in Calligraphic Cursive Font */}
            <span
              className="relative z-10 text-stone-900 tracking-wide font-normal truncate max-w-full"
              style={{
                fontFamily: "'Alex Brush', 'Dancing Script', 'Brush Script MT', cursive",
                fontSize: 'clamp(20px, 3.8vw, 48px)',
                lineHeight: 1.1,
                textShadow: '0 1px 1px rgba(255,255,255,0.4)',
              }}
            >
              {studentName || 'Student Name'}
            </span>
          </div>

          {/* DYNAMIC FIELD 2: Course Description, Duration, and Dates */}
          {/* Overlays the center light-blue section (Y: ~52.5% to ~73%, Width: ~66%) */}
          <div
            className="absolute z-10 flex flex-col items-center justify-center text-center px-4 leading-relaxed"
            style={{
              top: '52.5%',
              left: '17%',
              width: '66%',
              height: '21%',
            }}
          >
            {/* Seamless light-blue patch to cleanly mask out the template's default course placeholder */}
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                backgroundColor: '#9bc3dd',
                boxShadow: '0 0 16px 8px #9bc3dd',
              }}
            />

            {/* Dynamic Course Completion Paragraph */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-1 sm:space-y-1.5 w-full">
              <p
                className="text-stone-950 font-bold tracking-tight text-center max-w-[94%] leading-tight"
                style={{
                  fontSize: 'clamp(11px, 1.68vw, 22px)',
                }}
              >
                for successfully completing the{' '}
                <span className="text-stone-950 font-black underline decoration-orange-500/60 decoration-2 underline-offset-2">
                  {courseName}
                </span>{' '}
                course of {duration} from {formattedStart} to {formattedCompletion}.
              </p>

              <p
                className="font-bold text-stone-900 tracking-wider uppercase"
                style={{
                  fontSize: 'clamp(10px, 1.45vw, 19px)',
                }}
              >
                Provided by CODMUX
              </p>
            </div>
          </div>

          {/* DYNAMIC FIELD 3: Instructor Name (Bottom Right above "Instructor CODMUX") */}
          <div
            className="absolute z-10 flex items-center justify-center text-center"
            style={{
              bottom: '8.4%',
              right: '11.5%',
              width: '27%',
              height: '5.2%',
            }}
          >
            {/* White backplate to cleanly cover template's placeholder "Mentor name" */}
            <div
              className="absolute inset-0 bg-white rounded pointer-events-none"
              style={{
                boxShadow: '0 0 8px 4px #ffffff',
              }}
            />

            <span
              className="relative z-10 text-stone-900 tracking-wide font-normal truncate max-w-full"
              style={{
                fontFamily: "'Dancing Script', 'Alex Brush', cursive",
                fontSize: 'clamp(13px, 2.1vw, 27px)',
              }}
            >
              {instructorName || 'Academic Mentor'}
            </span>
          </div>

          {/* DYNAMIC FIELD 4: Official Certificate Serial Number (Bottom Center) */}
          <div
            className="absolute z-10 flex items-center justify-center text-center"
            style={{
              bottom: '1.2%',
              left: '30%',
              width: '40%',
              height: '3.6%',
            }}
          >
            {/* White backplate to cleanly cover template's placeholder "Certificate No:- 1226112325" */}
            <div
              className="absolute inset-0 bg-white rounded pointer-events-none"
              style={{
                boxShadow: '0 0 6px 3px #ffffff',
              }}
            />

            <span
              className="relative z-10 text-stone-800 font-mono font-bold tracking-wider"
              style={{
                fontSize: 'clamp(8px, 1.1vw, 14px)',
              }}
            >
              Certificate No.: {isPreview ? 'CMX-PREVIEW-DRAFT' : certificateSerialNumber}
            </span>
          </div>

          {/* WATERMARK: Rendered visibly when isPreview is true */}
          {isPreview && (
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
              <div
                className="transform -rotate-12 px-6 py-3 sm:px-10 sm:py-5 rounded-2xl border-4 border-dashed border-rose-500/80 bg-rose-500/15 backdrop-blur-[1px] text-center shadow-2xl"
                style={{
                  maxWidth: '85%',
                }}
              >
                <span
                  className="block font-black tracking-widest text-rose-700 uppercase"
                  style={{
                    fontSize: 'clamp(18px, 3.8vw, 52px)',
                    textShadow: '0 2px 4px rgba(255,255,255,0.8)',
                  }}
                >
                  PREVIEW DRAFT
                </span>
                <span
                  className="block font-bold tracking-wider text-rose-900 text-[10px] sm:text-xs md:text-sm mt-0.5"
                >
                  NOT AN OFFICIAL CREDENTIAL • COMPLETE COURSE TO UNLOCK
                </span>
              </div>
            </div>
          )}

          {/* REVOKED STAMP: When certificate has been revoked */}
          {!isPreview && status === 'revoked' && (
            <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
              <div className="transform rotate-12 px-8 py-3 rounded-2xl border-4 border-rose-600 bg-rose-600/20 backdrop-blur-xs text-center shadow-2xl">
                <span
                  className="block font-black tracking-widest text-rose-700 uppercase"
                  style={{
                    fontSize: 'clamp(20px, 4.2vw, 56px)',
                    textShadow: '0 2px 4px rgba(255,255,255,0.9)',
                  }}
                >
                  REVOKED
                </span>
                <span className="block font-bold tracking-wider text-rose-900 text-xs mt-0.5">
                  INVALIDATED BY CODE MUX ADMINISTRATION
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
