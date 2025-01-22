import ZeroState from "../../ZeroState";
import { PreviewCanvasWrapper } from "./PreviewCanvasWrapper.style";

const { useEffect, useRef } = require("react");

const PreviewCanvas = ({ videoRef, currentCoordinates }) => {
  const canvasRef = useRef(null);
  const isZeroState = false;
  const drawCroppedFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && currentCoordinates.length === 4) {
      const ctx = canvas.getContext("2d");
      const [x1, y1, width, height] = currentCoordinates;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, x1, y1, width, height, 0, 0, width, height);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
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
  }, [currentCoordinates]);

  return (
    <PreviewCanvasWrapper>
      <div>
        <h2 className="inactive">Preview</h2>
        {isZeroState ? (
          <ZeroState />
        ) : (
          <div class="canvas-container" style={{ marginTop: "20px" }}>
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
