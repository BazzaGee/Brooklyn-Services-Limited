import { Config } from "@remotion/cli/config";

const config: Config = {
  // Video dimensions - 1920x1080 Full HD
  width: 1920,
  height: 1080,

  // Frame rate
  fps: 30,

  // Duration in frames (5 seconds @ 30fps)
  durationInFrames: 150,

  // Output directory
  outDir: "./out",

  // Default codec
  codec: "h264",

  // Image sequence settings
  imageFormat: "png",

  // Quality
  jpegQuality: 95,
};

export default config;
