export const defaultAspectRatio = 16 / 9;
export const defaultCropArea = {
  x: 0,
  y: 0,
  width: 640,
  height: 640 / defaultAspectRatio,
};

export const aspectRatioOptions = [
  { label: "9:18", value: 9 / 18 },
  { label: "9:16", value: 9 / 16 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:4", value: 3 / 4 },
  { label: "1:1", value: 1 / 1 },
  { label: "4:5", value: 4 / 5 },
];

export const playbackSpeedOptions = [
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "1.5x", value: 1.5 },
  { label: "2x", value: 2 },
];
