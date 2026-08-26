import React from 'react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  logoUrl?: string;
  title?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  size = 180,
  fgColor = '#0f172a',
  bgColor = '#ffffff',
  logoUrl,
  title,
}) => {
  // Deterministic 21x21 QR-like mock matrix pattern generated from value hash
  const getMatrix = (text: string) => {
    const matrix: boolean[][] = Array(21).fill(false).map(() => Array(21).fill(false));
    
    // Finder patterns (3 corners 7x7)
    const drawFinder = (startX: number, startY: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r >= 2 && r <= 4 && c >= 2 && c <= 4)
          ) {
            matrix[startY + r][startX + c] = true;
          }
        }
      }
    };

    drawFinder(0, 0);       // Top-left
    drawFinder(14, 0);      // Top-right
    drawFinder(0, 14);      // Bottom-left

    // Timing patterns
    for (let i = 8; i < 13; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Hash pseudo-random data bits
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < 21; r++) {
      for (let c = 0; c < 21; c++) {
        // Skip corner finder patterns & center logo area
        const isCorner = 
          (r < 8 && c < 8) || 
          (r < 8 && c > 12) || 
          (r > 12 && c < 8);
        const isCenter = r >= 9 && r <= 11 && c >= 9 && c <= 11;
        
        if (!isCorner && !isCenter) {
          const bit = Math.abs(Math.sin((r * 21 + c + hash) * 999)) > 0.45;
          matrix[r][c] = bit;
        }
      }
    }

    return matrix;
  };

  const matrix = getMatrix(value);
  const cellSize = size / 21;

  return (
    <div className="inline-flex flex-col items-center p-3 rounded-2xl shadow-sm border border-slate-200" style={{ backgroundColor: bgColor }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {matrix.map((row, rIdx) =>
            row.map((filled, cIdx) =>
              filled ? (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={cIdx * cellSize}
                  y={rIdx * cellSize}
                  width={cellSize * 0.92}
                  height={cellSize * 0.92}
                  rx={cellSize * 0.2}
                  fill={fgColor}
                />
              ) : null
            )
          )}
        </svg>

        {logoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-lg p-0.5 bg-white shadow-md border border-slate-200 overflow-hidden flex items-center justify-center">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-md" />
            </div>
          </div>
        )}
      </div>

      {title && (
        <span className="mt-2 text-[11px] font-bold tracking-tight text-slate-500 max-w-[170px] truncate text-center">
          {title}
        </span>
      )}
    </div>
  );
};
