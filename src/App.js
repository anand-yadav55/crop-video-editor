import React, { useState, useRef, useEffect } from "react";
import { aspectRatioOptions, defaultCropArea } from "./constants";
import Editor from "./components/Editor";
import PreviewCanvas from "./components/Preview/PreviewCanvas";
import GeneratePreviewController from "./components/Editor/GeneratePreviewController";

const App = () => {
  const [cropArea, setCropArea] = useState(defaultCropArea);
  const [videoSettings, setVideoSettings] = useState([null, null]);
  const [currentCoordinates, setCurrentCoordinates] = useState([]);

  const videoRef = useRef(null);
  const cropRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    const handleLoadedMetadata = () => {
      setDuration(vid.duration);
      // Initialize currentCoordinates based on initial cropArea
      const realVideoWidth = vid.videoWidth;
      const realVideoHeight = vid.videoHeight;
      const scaleX = realVideoWidth / 640;
      const scaleY = realVideoHeight / 360;

      const scaledWidth = cropArea.width * scaleX;
      const scaledHeight = cropArea.height * scaleY;
      const scaledX = cropArea.x * scaleX;
      const scaledY = cropArea.y * scaleY;

      setCurrentCoordinates([scaledX, scaledY, scaledWidth, scaledHeight]);
    };

    const handleTimeUpdate = () => setCurrentTime(vid.currentTime);

    vid.addEventListener("loadedmetadata", handleLoadedMetadata);
    vid.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      vid.removeEventListener("loadedmetadata", handleLoadedMetadata);
      vid.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [cropArea]);

  return (
    <div className="app">
      <div className="app-container">
        <Editor
          videoRef={videoRef}
          cropRef={cropRef}
          cropArea={cropArea}
          setCropArea={setCropArea}
          setCurrentCoordinates={setCurrentCoordinates}
          aspectRatioOptions={aspectRatioOptions}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          duration={duration}
          videoSettings={videoSettings}
          setVideoSettings={setVideoSettings}
        />

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
      />
    </div>
  );
};

export default App;
