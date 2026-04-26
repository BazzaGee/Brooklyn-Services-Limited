import { useCurrentFrame, useVideoConfig, interpolate, Easing, AbsoluteFill } from "remotion";
import React from "react";

// Measurements
const C_HEIGHT = 180;
const LINE_HEIGHT = 72;
const GAP = 16;
const LOGO_BOTTOM = C_HEIGHT + GAP + LINE_HEIGHT; // Total height of logo elements
const TEXT_SPACING = 48; // Space between logo and text

export const LogoText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Fade-in animation - starts at 2.5s (75 frames)
  const adjustedFrame = frame - 75;

  const opacity = interpolate(
    adjustedFrame,
    [0, 45],
    [0, 1],
    {
      easing: Easing.out(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          marginTop: LOGO_BOTTOM + TEXT_SPACING,
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
    </AbsoluteFill>
  );
};
