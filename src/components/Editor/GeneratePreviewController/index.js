import React from "react";
import Button from "../../commonComponent/Button";
import { buildPreviewSetting } from "../../../utils";

export default function GeneratePreviewController(props) {
  const {
    videoSettings,
    setVideoSettings,
    videoRef,
    cropArea,
    setIsRecordable,
    isRecordable,
  } = props;

  const handleStopPreview = () => {
    setVideoSettings((prev) => [
      prev[0],
      buildPreviewSetting(videoRef, cropArea),
    ]);
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
    // setVideoSettings([null, null]);
  };

  return (
    <div className="preview-controller">
      <div className="row space-between">
        <div className="row">
          <Button
            disabled={!!videoSettings[0] || isRecordable}
            onClick={() => {
              setIsRecordable(true);
            }}
          >
            Start Cropper
          </Button>
          <Button disabled={!!videoSettings[1]} onClick={handleStopPreview}>
            Remove Cropper
          </Button>
          <Button disabled={!isRecordable} onClick={handleGeneratePreview}>
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
      {videoSettings[0] && (
        <div style={{ marginTop: "20px" }}>
          <h3>Crop data</h3>
          <span className="inactive">
            Click "Generate Preview" to download data
          </span>
          <pre style={{ padding: "10px" }}>
            {JSON.stringify(videoSettings, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
