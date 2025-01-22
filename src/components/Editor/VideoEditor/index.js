import React, { useRef } from "react";
import { VideoEditorContainer } from "./VideoEditor.style";
import { videoUrl } from "../../../constants";

export default function VideoEditor(props) {
  const {
    videoRef,
    cropRef,
    cropArea,
    setCropArea,
    setCurrentCoordinates,
    videoSettings,
  } = props;
  const isDragging = useRef(false);
  const isCropOverlayPresent = !!videoSettings[0];

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

    // Calculate scale factors
    const realVideoWidth = videoRef.current.videoWidth;
    const realVideoHeight = videoRef.current.videoHeight;
    const scaleX = realVideoWidth / videoRect.width;
    const scaleY = realVideoHeight / videoRect.height;

    // Scale width/height of the crop box
    const scaledWidth = cropRect.width * scaleX;
    const scaledHeight = cropRect.height * scaleY;

    // Scale x/y positions
    const scaledX = newX * scaleX;

    setCurrentCoordinates([scaledX, 0, scaledWidth, scaledHeight]);
  };

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
