import React, { useEffect, useState } from "react";
import Slider from "../../commonComponent/Slider";
import PlayIcon from "../../../assets/Icons/PlayIcon";
import PauseIcon from "../../../assets/Icons/PauseIcon";

export default function VideoTimeStampContoller(props) {
  const {
    videoRef,
    handleVideoPlayback,
    currentTime,
    duration,
    handleTimeChange,
    modifiedCurrentTime,
  } = props;

  const [isVideoPaused, setIsVideoPaused] = useState(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateIsVideoPaused = () => {
      setIsVideoPaused(videoElement.paused);
    };

    videoElement.addEventListener("play", updateIsVideoPaused);
    videoElement.addEventListener("pause", updateIsVideoPaused);

    return () => {
      videoElement.removeEventListener("play", updateIsVideoPaused);
      videoElement.removeEventListener("pause", updateIsVideoPaused);
    };
  }, [videoRef]);

  return (
    <div className="row">
      <div onClick={handleVideoPlayback}>
        {isVideoPaused ? (
          <PlayIcon color="#FFF" height="20px" width="20px" />
        ) : (
          <PauseIcon color="#FFF" height="20px" width="20px" />
        )}
      </div>
      <Slider
        min={0}
        max={duration}
        value={modifiedCurrentTime ?? currentTime}
        step={0.01}
        onChange={handleTimeChange}
      />
    </div>
  );
}
