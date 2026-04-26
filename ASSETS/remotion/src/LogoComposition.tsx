import { Composition } from "remotion";
import { LogoAnimation } from "./LogoAnimation";
import { LogoIconOnly } from "./LogoIconOnly";
import React from "react";

export const LogoComposition = () => {
  return (
    <>
      <Composition
        id="LogoAnimation"
        component={LogoAnimation}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="LogoIconOnly"
        component={LogoIconOnly}
        durationInFrames={90}
        fps={30}
        width={600}
        height={400}
        defaultProps={{}}
      />
    </>
  );
};
