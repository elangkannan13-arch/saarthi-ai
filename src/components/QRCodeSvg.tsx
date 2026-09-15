import React, { useMemo } from 'react';
import QRCode from 'qrcode';
import { Activity } from 'lucide-react';

interface QRCodeSvgProps {
  value?: string;
  size?: number;
  className?: string;
  onClick?: () => void;
  showCenterBadge?: boolean;
}

export const QRCodeSvg: React.FC<QRCodeSvgProps> = ({
  value,
  size = 200,
  className = '',
  onClick,
  showCenterBadge = true,
}) => {
  // If no value provided, construct default patient login URL
  const targetUrl = useMemo(() => {
    if (value) return value;
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/login/patient?token=SA-2841`;
    }
    return 'http://localhost:5174/login/patient?token=SA-2841';
  }, [value]);

  const qrData = useMemo(() => {
    try {
      // Use errorCorrectionLevel 'H' (30% recovery capacity) so center logo badge doesn't affect mobile scannability
      const qr = QRCode.create(targetUrl, { errorCorrectionLevel: 'H' });
      const gridSize = qr.modules.size;
      const modules: boolean[][] = [];
      for (let r = 0; r < gridSize; r++) {
        const row: boolean[] = [];
        for (let c = 0; c < gridSize; c++) {
          row.push(qr.modules.get(r, c) === 1);
        }
        modules.push(row);
      }
      return { gridSize, modules };
    } catch (err) {
      console.error('QR code creation error:', err);
      return null;
    }
  }, [targetUrl]);

  if (!qrData) {
    return (
      <div className="w-48 h-48 bg-slate-100 flex items-center justify-center rounded-2xl text-xs font-bold text-slate-400">
        QR Error
      </div>
    );
  }

  const { gridSize, modules } = qrData;
  const cellSize = size / gridSize;
  const badgeSize = Math.max(28, Math.floor(size * 0.22));

  return (
    <div
      onClick={onClick}
      className={`relative inline-block bg-white p-3 rounded-2xl border border-slate-200 shadow-md cursor-pointer group transition-transform hover:scale-105 ${className}`}
      title={`Scan with mobile camera to open: ${targetUrl}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full text-slate-900"
      >
        {/* Background */}
        <rect width={size} height={size} fill="#ffffff" rx="8" />

        {/* Real QR Data Grid */}
        {modules.map((row, rIdx) =>
          row.map((isDark, cIdx) => {
            if (!isDark) return null;
            return (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx * cellSize}
                y={rIdx * cellSize}
                width={cellSize + 0.08}
                height={cellSize + 0.08}
                fill="#0f172a"
              />
            );
          })
        )}
      </svg>

      {/* Center Brand Overlay Badge */}
      {showCenterBadge && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            style={{ width: `${badgeSize}px`, height: `${badgeSize}px` }}
            className="rounded-xl bg-teal-600 text-white flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform"
          >
            <Activity className="w-1/2 h-1/2 text-white" />
          </div>
        </div>
      )}
    </div>
  );
};
