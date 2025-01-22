import React, { useEffect, useState } from "react";
import Button from "../../commonComponent/Button";

export default function GeneratePreviewController(props) {
  const { videoSettings, setVideoSettings, videoRef, cropArea } = props;
  const [isGenerateDisabled, setIsGenerateDisabled] = useState(true);
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
    };
  };

  const handleGeneratePreview = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(videoSettings)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "videoSettings.json";
    document.body.appendChild(element);
    element.click();
    setVideoSettings([null, null]);
  };

  useEffect(() => {
    setIsGenerateDisabled(!!videoSettings[0] && !!videoSettings[1]);
  }, [videoSettings]);

  return (
    <div className="preview-controller">
      <div className="row space-between">
        <div className="row">
          <Button
            disabled={!!videoSettings[0] || isGenerateDisabled}
            onClick={handleStartPreview}
          >
            Start Cropper
          </Button>
          <Button disabled={!!videoSettings[1]} onClick={handleStopPreview}>
            Remove Cropper
          </Button>
          <Button
            disabled={!isGenerateDisabled}
            onClick={handleGeneratePreview}
          >
            Generate Preview
          </Button>
        </div>
        <Button
          color="default"
          variant="filled"
          style={{ color: "#fff", backgroundColor: "#FFFFFF40" }}
        >
          Cancel
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Saved Settings</h3>
        <pre style={{ padding: "10px" }}>
          {JSON.stringify(videoSettings, null, 2)}
        </pre>
      </div>
    </div>
  );
}
