import ZeroState from "../../ZeroState";
import { PreviewCanvasWrapper } from "./PreviewCanvasWrapper.style";

const { useEffect, useRef, useState, useCallback } = require("react");

const PreviewCanvas = ({ videoSettings, videoRef, currentCoordinates }) => {
  const canvasRef = useRef(null);
  const [isZeroState, setIsZeroState] = useState(!!!videoSettings[0]);

  const drawCroppedFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && currentCoordinates.length === 4) {
      const ctx = canvas.getContext("2d");
      const [x1, y1, width, height] = currentCoordinates;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, x1, y1, width, height, 0, 0, width, height);
    }
  }, [videoRef, canvasRef, currentCoordinates]);

  useEffect(() => {
    const video = videoRef.current;
    setIsZeroState(!!!videoSettings[0]);
    const updateCanvas = () => {
      drawCroppedFrame();
    };

    if (video) {
      video.addEventListener("timeupdate", updateCanvas);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateCanvas);
      }
    };
  }, [currentCoordinates, videoSettings, videoRef, drawCroppedFrame]);

  return (
    <PreviewCanvasWrapper>
      <div>
        <h2 className="inactive">Preview</h2>
        {isZeroState ? (
          <ZeroState />
        ) : (
          <div className="canvas-container" style={{ marginTop: "20px" }}>
            <canvas
              ref={canvasRef}
              width={currentCoordinates[2]}
              height={currentCoordinates[3]}
              style={{ border: "1px solid black" }}
            ></canvas>
          </div>
        )}
      </div>
    </PreviewCanvasWrapper>
  );
};
export default PreviewCanvas;
