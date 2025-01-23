import React, { useRef, useEffect } from "react";
import { VideoEditorContainer } from "./VideoEditor.style";
import { videoUrl } from "../../../constants";
import { getScaledCoordinates } from "../../../utils";

export default function VideoEditor(props) {
  const {
    videoRef,
    cropRef,
    cropArea,
    setCropArea,
    setCurrentCoordinates,
    currentTime,
    isRecordable,
  } = props;
  const isDragging = useRef(false);
  const isCropOverlayPresent = isRecordable;

  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseDown = (e) => {
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const { clientX } = e;
    const cropRect = cropRef.current.getBoundingClientRect();
    const videoRect = videoRef.current.getBoundingClientRect();

    // Define border width
    const borderWidth = 1;

    // Adjust calculations to account for border width
    const newX = Math.max(
      borderWidth,
      Math.min(
        clientX - videoRect.left - cropRect.width / 2,
        videoRect.width - cropRect.width - borderWidth
      )
    );

    setCropArea((prev) => ({
      ...prev,
      x: newX,
      y: 0,
    }));

    const [scaledHeight, scaledWidth, scaledX, scaledY] = getScaledCoordinates(
      cropArea,
      videoRef.current
    );

    setCurrentCoordinates([scaledX, 0, scaledWidth, scaledHeight]);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime;
    }
  }, []);

  return (
    <VideoEditorContainer
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      $cropArea={cropArea}
    >
      <video ref={videoRef} src={videoUrl}></video>
      {isCropOverlayPresent && (
        <div
          className="crop-overlay"
          ref={cropRef}
          onMouseDown={handleMouseDown}
        ></div>
      )}
    </VideoEditorContainer>
  );
}
