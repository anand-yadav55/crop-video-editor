import React, { useEffect, useState, useRef, useCallback } from "react";
import { videoUrl } from "../../constants";
import ZeroState from "../ZeroState";
import VideoTimeStampContoller from "../Editor/VideoController/VideoTimeStampContoller";

export default function ResultVideo(props) {
  const { videoSettings } = props;

  const startTime = videoSettings[0]?.timeStamp,
    endTime = videoSettings[1]?.timeStamp,
    cropCoordinates = videoSettings[0]?.coordinates;

  const [resultCurrentTime, setResultCurrentTime] = useState(startTime);
  const [isResultAvailable, setIsResultAvailable] = useState(false);
  const resultVideoRef = useRef(null);
  const resultCanvasRef = useRef(null);

  const handleTimeChange = (time) => {
    const newTime = parseFloat(time);
    resultVideoRef.current.currentTime = newTime;
    setResultCurrentTime(newTime);
  };

  const handleVideoPlayback = () => {
    if (resultVideoRef.current?.paused) {
      resultVideoRef.current.play();
    } else {
      resultVideoRef.current.pause();
    }
  };
  const setDefaultPlayer = () => {
    if (resultVideoRef.current) {
      resultVideoRef.current.playbackRate = videoSettings[0].playbackRate;
      resultVideoRef.current.volume = videoSettings[0].volume;
    }
  };
  const resultControllerProps = {
    duration: endTime - startTime,
    currentTime: resultCurrentTime,
    handleTimeChange,
    handleVideoPlayback,
    videoRef: resultVideoRef,
    modifiedCurrentTime: resultCurrentTime - startTime,
  };

  useEffect(() => {
    setIsResultAvailable(
      videoSettings && !!videoSettings[0] && !!videoSettings[1]
    );
    setDefaultPlayer();
  }, [videoSettings]);

  useEffect(() => {
    setTimeout(() => {
      if (resultVideoRef.current) {
        resultVideoRef.current.currentTime = resultCurrentTime;
      }
    }, 0);
    const vid = resultVideoRef.current;
    if (!vid) return;
    if (vid.current) {
      vid.current.currentTime = resultCurrentTime;
    }
    const handleTimeUpdate = () => {
      if (vid.currentTime >= endTime) {
        vid.pause();
        vid.currentTime = startTime;
        return setResultCurrentTime(startTime);
      } else {
        return setResultCurrentTime(vid.currentTime);
      }
    };

    const updateCanvas = () => {
      drawCroppedFrame();
    };

    if (vid) {
      vid.addEventListener("timeupdate", updateCanvas);
      setTimeout(() => {
        drawCroppedFrame();
      }, 0);
    }
    vid.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      vid.removeEventListener("timeupdate", handleTimeUpdate);
      vid.removeEventListener("timeupdate", updateCanvas);
    };
  }, []);

  const drawCroppedFrame = useCallback(() => {
    const video = resultVideoRef.current;
    const canvas = resultCanvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      const [x1, y1, width, height] = cropCoordinates;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, x1, y1, width, height, 0, 0, width, height);
    }
  }, [resultVideoRef, resultCanvasRef, cropCoordinates]);

  if (!isResultAvailable) {
    return (
      <div className="app-container pb-100">
        <ZeroState />
      </div>
    );
  }

  const handleTimeUpdate = () => {
    if (
      resultVideoRef.current &&
      resultVideoRef.current.currentTime >= endTime
    ) {
      resultVideoRef.current.pause();
      resultVideoRef.current.currentTime = startTime;
      setResultCurrentTime(startTime);
    } else {
      setResultCurrentTime(resultVideoRef.current.currentTime);
    }
    drawCroppedFrame();
  };

  return (
    <div className="app-container pb-100 center ">
      <div>
        <video
          ref={resultVideoRef}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          controls
          style={{ display: "none" }}
        ></video>
        <canvas
          ref={resultCanvasRef}
          width={cropCoordinates[2]}
          height={cropCoordinates[3]}
        ></canvas>
        <VideoTimeStampContoller {...resultControllerProps} />
      </div>
    </div>
  );
}
