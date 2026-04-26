import { useCurrentFrame, useVideoConfig, spring } from "remotion";
import React from "react";

const LOGO_WIDTH = 360;
const STROKE_THICKNESS = 72;
const C_HEIGHT = 180;
const LINE_HEIGHT = 72;
const GAP = 36;

export const LogoIconOnly: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cEntranceProgress = spring({
    frame,
    fps,
    durationInFrames: 45,
    config: { damping: 200 },
  });
  const cTranslateX = (1 - cEntranceProgress) * (-600);

  const lineAdjustedFrame = frame - 15;
  const lineEntranceProgress = spring({
    frame: lineAdjustedFrame,
    fps,
    durationInFrames: 45,
    config: { damping: 200 },
  });
  const lineTranslateX = (1 - lineEntranceProgress) * 600;

  const totalLogoHeight = C_HEIGHT + GAP + LINE_HEIGHT;

  return (
    <div
      style={{
        width: 600,
        height: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: totalLogoHeight,
          width: LOGO_WIDTH,
        }}
      >
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
            <rect x="0" y="0" width={LOGO_WIDTH} height={STROKE_THICKNESS} fill="#E53935" />
            <rect x="0" y="0" width={STROKE_THICKNESS} height={C_HEIGHT} fill="#E53935" />
            <rect x="0" y={C_HEIGHT - STROKE_THICKNESS} width={LOGO_WIDTH} height={STROKE_THICKNESS} fill="#E53935" />
            <rect x={LOGO_WIDTH - STROKE_THICKNESS} y="0" width={STROKE_THICKNESS} height={STROKE_THICKNESS} fill="#E53935" />
            <rect x={LOGO_WIDTH - STROKE_THICKNESS} y={C_HEIGHT - STROKE_THICKNESS} width={STROKE_THICKNESS} height={STROKE_THICKNESS} fill="#E53935" />
          </svg>
        </div>

        <div style={{ height: GAP, width: LOGO_WIDTH }} />

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
    </div>
  );
};
