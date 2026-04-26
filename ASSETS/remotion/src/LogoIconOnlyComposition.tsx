import { Composition } from "remotion";
import { LogoIconOnly } from "./LogoIconOnly";
import React from "react";

export const LogoIconOnlyComposition = () => {
  return (
    <Composition
      id="LogoIconOnly"
      component={LogoIconOnly}
      durationInFrames={90}
      fps={30}
      width={600}
      height={400}
      defaultProps={{}}
    />
  );
};
