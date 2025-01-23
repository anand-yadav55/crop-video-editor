import React, { useState, useRef, useEffect } from "react";
import { Segmented } from "antd";
import { aspectRatioOptions, defaultCropArea, previewTabs } from "./constants";
import Editor from "./components/Editor";
import PreviewCanvas from "./components/Preview/PreviewCanvas";
import GeneratePreviewController from "./components/Editor/GeneratePreviewController";
import ResultVideo from "./components/ResultVideo";
import { buildPreviewSetting, getScaledCoordinates } from "./utils";

const App = () => {
  const [cropArea, setCropArea] = useState(defaultCropArea);
  const [videoSettings, setVideoSettings] = useState([null, null]);
  const [currentCoordinates, setCurrentCoordinates] = useState([]);
  const [activeTab, setActiveTab] = useState(previewTabs[1]);

  const videoRef = useRef(null);
  const cropRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRecordable, setIsRecordable] = useState(false);
  const handleStartPreview = () => {
    if (isRecordable && videoSettings[0] == null)
      setVideoSettings((prev) => [
        buildPreviewSetting(videoRef, cropArea),
        prev[1],
      ]);
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleLoadedMetadata = () => {
      setDuration(vid.duration);
      // Initialize currentCoordinates based on initial cropArea
      const [scaledHeight, scaledWidth, scaledX, scaledY] =
        getScaledCoordinates(cropArea, vid);

      setCurrentCoordinates([scaledX, scaledY, scaledWidth, scaledHeight]);
    };

    const handleTimeUpdate = () => setCurrentTime(vid.currentTime);

    vid.addEventListener("loadedmetadata", handleLoadedMetadata);
    vid.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      vid.removeEventListener("loadedmetadata", handleLoadedMetadata);
      vid.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [cropArea, activeTab]);

  const editorProps = {
    videoRef,
    cropRef,
    cropArea,
    setCropArea,
    setCurrentCoordinates,
    currentTime,
    aspectRatioOptions,
    duration,
    setCurrentTime,
    videoSettings,
    setVideoSettings,
    handleStartPreview,
    isRecordable,
  };

  return (
    <div className="app">
      <div className="tab-container flex center pb-0">
        <Segmented
          value={activeTab}
          style={{
            marginBottom: 8,
          }}
          onChange={setActiveTab}
          options={previewTabs}
        />
      </div>
      {activeTab === previewTabs[0] && <ResultVideo {...editorProps} />}

      {activeTab === previewTabs[1] && (
        <div>
          <div className="app-container flex pb-100">
            <Editor {...editorProps} />

            <PreviewCanvas
              videoRef={videoRef}
              currentCoordinates={currentCoordinates}
              videoSettings={videoSettings}
            />
          </div>
          <GeneratePreviewController
            videoSettings={videoSettings}
            setVideoSettings={setVideoSettings}
            videoRef={videoRef}
            cropArea={cropArea}
            setIsRecordable={setIsRecordable}
            isRecordable={isRecordable}
          />
        </div>
      )}
    </div>
  );
};

export default App;
