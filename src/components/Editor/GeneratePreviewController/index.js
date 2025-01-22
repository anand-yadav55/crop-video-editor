import React from "react";

export default function GeneratePreviewController(props) {
  const { videoSettings, setVideoSettings, videoRef, cropArea } = props;
  const handleStartPreview = () => {
    setVideoSettings((prev) => [buildPreviewSetting(true), prev[1]]);
  };

  const handleStopPreview = () => {
    setVideoSettings((prev) => [prev[0], buildPreviewSetting(false)]);
  };

  const buildPreviewSetting = (previewActive) => {
    const video = videoRef.current;
    return {
      timeStamp: video.currentTime,
      coordinates: [cropArea.x, cropArea.y, cropArea.width, cropArea.height],
      volume: video.volume,
      playbackRate: video.playbackRate,
      previewActive,
      previewTimeStamp: video.currentTime,
    };
  };

  return (
    <div>
      <div>
        <button onClick={handleStartPreview}>Start Preview</button>
        <button onClick={handleStopPreview}>Stop Preview</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Saved Settings</h3>
        <pre style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
          {JSON.stringify(videoSettings, null, 2)}
        </pre>
      </div>
    </div>
  );
}
