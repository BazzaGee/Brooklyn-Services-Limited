import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import React from "react";

// Pixel-perfect measurements matching the original logo
const LOGO_WIDTH = 360; // Same width as C-shape
const LINE_HEIGHT = 72; // Same thickness as C-shape strokes
const C_HEIGHT = 180;
const GAP = 16; // Exact gap between C and line as in the logo

export const GreyLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for smooth right-to-left entrance
  const adjustedFrame = frame - 15;
  const entranceProgress = spring({
    frame: adjustedFrame,
    fps,
    durationInFrames: 45,
    config: { damping: 200 },
  });

  // Start from +600px (off-screen right) to 0 (final position)
  const translateX = entranceProgress * 0 + (1 - entranceProgress) * 600;

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
          marginTop: C_HEIGHT + GAP, // Exact positioning with the proper gap
        }}
      >
        {/* Grey line - exact same width as C-shape */}
        <svg
          width={LOGO_WIDTH}
          height={LINE_HEIGHT}
          viewBox={`0 0 ${LOGO_WIDTH} ${LINE_HEIGHT}`}
          style={{
            display: "block",
          }}
        >
          <rect x="0" y="0" width={LOGO_WIDTH} height={LINE_HEIGHT} fill="#616161" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
