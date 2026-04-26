import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import React from "react";

// Pixel-perfect measurements matching the original logo
const LOGO_WIDTH = 360;
const STROKE_THICKNESS = 72; // Thickness of the C-shape strokes
const C_HEIGHT = 180; // Height of the C-shape

export const RedCPart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for smooth left-to-right entrance
  const entranceProgress = spring({
    frame,
    fps,
    durationInFrames: 45,
    config: { damping: 200 },
  });

  // Start from -600px (off-screen left) to 0 (final position)
  const translateX = entranceProgress * 0 + (1 - entranceProgress) * (-600);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        <svg
          width={LOGO_WIDTH}
          height={C_HEIGHT}
          viewBox={`0 0 ${LOGO_WIDTH} ${C_HEIGHT}`}
          style={{
            display: "block",
          }}
        >
          {/* Red C-shape - exact reconstruction matching the logo */}
          {/* Top horizontal bar - full width */}
          <rect x="0" y="0" width={LOGO_WIDTH} height={STROKE_THICKNESS} fill="#E53935" />
          
          {/* Left vertical bar - full height */}
          <rect x="0" y="0" width={STROKE_THICKNESS} height={C_HEIGHT} fill="#E53935" />
          
          {/* Bottom horizontal bar - full width */}
          <rect x="0" y={C_HEIGHT - STROKE_THICKNESS} width={LOGO_WIDTH} height={STROKE_THICKNESS} fill="#E53935" />
          
          {/* Right vertical bar - top portion only (creates the C opening) */}
          <rect x={LOGO_WIDTH - STROKE_THICKNESS} y="0" width={STROKE_THICKNESS} height={STROKE_THICKNESS} fill="#E53935" />
          
          {/* Right vertical bar - bottom portion only */}
          <rect x={LOGO_WIDTH - STROKE_THICKNESS} y={C_HEIGHT - STROKE_THICKNESS} width={STROKE_THICKNESS} height={STROKE_THICKNESS} fill="#E53935" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
