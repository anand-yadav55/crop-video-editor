export function getScaledCoordinates(cropArea, vid) {
  debugger;
  const realVideoWidth = vid.videoWidth;
  const realVideoHeight = vid.videoHeight;
  const scaleX = realVideoWidth / 640;
  const scaleY = realVideoHeight / 360;

  const scaledWidth = cropArea.width * scaleX;
  const scaledHeight = cropArea.height * scaleY;
  const scaledX = cropArea.x * scaleX;
  const scaledY = cropArea.y * scaleY;

  return [scaledHeight, scaledWidth, scaledX, scaledY];
}

export const buildPreviewSetting = (videoRef, cropArea) => {
  const video = videoRef.current;
  const [scaledHeight, scaledWidth, scaledX, scaledY] = getScaledCoordinates(
    cropArea,
    video
  );
  return {
    timeStamp: video.currentTime,
    coordinates: [scaledX, scaledY, scaledWidth, scaledHeight],
    volume: video.volume,
    playbackRate: video.playbackRate,
  };
};
