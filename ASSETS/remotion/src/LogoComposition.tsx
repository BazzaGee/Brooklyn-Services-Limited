import { Composition, AbsoluteFill } from "remotion";
import { LogoAnimation } from "./LogoAnimation";
import React from "react";

// Composition definition
export const LogoComposition = () => {
  return (
    <Composition
      id="LogoAnimation"
      component={LogoAnimation}
      durationInFrames={150} // 5 seconds @ 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
