import React, { useState } from 'react';
import { useDemoState } from '../context/DemoStateContext';
import { X, Copy, Check, Download, FileJson, ShieldCheck, Database } from 'lucide-react';

interface FHIRViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FHIRViewer: React.FC<FHIRViewerProps> = ({ isOpen, onClose }) => {
  const { getFhirBundleJson } = useDemoState();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = getFhirBundleJson();

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Saarthi_FHIR_Bundle_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                FHIR R4 / ABDM Document Bundle
                <span className="text-[10px] bg-teal-500/20 text-teal-300 font-semibold px-2 py-0.5 rounded border border-teal-500/40">
                  FHIR-compatible demo export
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Standardized interoperable format for India's Ayushman Bharat Digital Mission (ABDM)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-teal-300 bg-slate-950/90 leading-relaxed">
          <pre className="whitespace-pre-wrap break-all">{jsonString}</pre>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Database className="w-4 h-4 text-teal-400" />
            <span>ABHA Health Record Compatible</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Bundle (.json)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
