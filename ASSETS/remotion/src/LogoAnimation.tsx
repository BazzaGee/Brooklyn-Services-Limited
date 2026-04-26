import { useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import React from "react";

// Pixel-perfect measurements matching the original logo
const LOGO_WIDTH = 360;
const STROKE_THICKNESS = 72;
const C_HEIGHT = 180;
const LINE_HEIGHT = 72;
const GAP = 36; // Increased gap to match the logo spacing (approximately half the line height)

export const LogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Red C animation - left to right
  const cEntranceProgress = spring({
    frame,
    fps,
    durationInFrames: 45,
    config: { damping: 200 },
  });
  const cTranslateX = (1 - cEntranceProgress) * (-600);

  // Grey line animation - right to left
  const lineAdjustedFrame = frame - 15;
  const lineEntranceProgress = spring({
    frame: lineAdjustedFrame,
    fps,
    durationInFrames: 45,
    config: { damping: 200 },
  });
  const lineTranslateX = (1 - lineEntranceProgress) * 600;

  // Text fade-in
  const textAdjustedFrame = frame - 75;
  const textOpacity = interpolate(
    textAdjustedFrame,
    [0, 45],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Calculate total logo height
  const totalLogoHeight = C_HEIGHT + GAP + LINE_HEIGHT;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      {/* Logo Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          height: totalLogoHeight,
          width: LOGO_WIDTH,
        }}
      >
        {/* Red C-shape */}
        <div
          style={{
            transform: `translateX(${cTranslateX}px)`,
            width: LOGO_WIDTH,
            height: C_HEIGHT,
          }}
        >
          <svg
            width={LOGO_WIDTH}
            height={C_HEIGHT}
            viewBox={`0 0 ${LOGO_WIDTH} ${C_HEIGHT}`}
            style={{ display: "block" }}
          >
            {/* Top horizontal bar */}
            <rect x="0" y="0" width={LOGO_WIDTH} height={STROKE_THICKNESS} fill="#E53935" />
            {/* Left vertical bar */}
            <rect x="0" y="0" width={STROKE_THICKNESS} height={C_HEIGHT} fill="#E53935" />
            {/* Bottom horizontal bar */}
            <rect x="0" y={C_HEIGHT - STROKE_THICKNESS} width={LOGO_WIDTH} height={STROKE_THICKNESS} fill="#E53935" />
            {/* Right vertical - top */}
            <rect x={LOGO_WIDTH - STROKE_THICKNESS} y="0" width={STROKE_THICKNESS} height={STROKE_THICKNESS} fill="#E53935" />
            {/* Right vertical - bottom */}
            <rect x={LOGO_WIDTH - STROKE_THICKNESS} y={C_HEIGHT - STROKE_THICKNESS} width={STROKE_THICKNESS} height={STROKE_THICKNESS} fill="#E53935" />
          </svg>
        </div>

        {/* Spacer div for the gap */}
        <div style={{ height: GAP, width: LOGO_WIDTH }} />

        {/* Grey line */}
        <div
          style={{
            transform: `translateX(${lineTranslateX}px)`,
            width: LOGO_WIDTH,
            height: LINE_HEIGHT,
          }}
        >
          <svg
            width={LOGO_WIDTH}
            height={LINE_HEIGHT}
            viewBox={`0 0 ${LOGO_WIDTH} ${LINE_HEIGHT}`}
            style={{ display: "block" }}
          >
            <rect x="0" y="0" width={LOGO_WIDTH} height={LINE_HEIGHT} fill="#616161" />
          </svg>
        </div>
      </div>

      {/* Text */}
      <div
        style={{
          marginTop: 48,
          opacity: textOpacity,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 900,
          fontSize: "44px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#1b1b1c",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        BROOKLYN SERVICES LIMITED
      </div>
    </div>
  );
};
