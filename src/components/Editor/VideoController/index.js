import React, { useState } from "react";
import { defaultAspectRatio, playbackSpeedOptions } from "../../../constants";
import PlayIcon from "../../../assets/Icons/PlayIcon";
import PauseIcon from "../../../assets/Icons/PauseIcon";
import SoundIcon from "../../../assets/Icons/SoundIcon";
import { VideoControllerWrapper } from "./VideoController.style";
import Slider from "../../commonComponent/Slider";
import Select from "../../commonComponent/Select";

export default function VideoController(props) {
  const {
    videoRef,
    aspectRatioOptions,
    currentTime,
    setCurrentTime,
    duration,
    setCropArea,
    setCurrentCoordinates,
  } = props;
  const [aspectRatio, setAspectRatio] = useState(defaultAspectRatio); // Default aspect ratio 16:9

  const handleAspectRatioChange = (e) => {
    const newAspectRatio = parseFloat(e);
    setAspectRatio(newAspectRatio);
    setCropArea((prev) => {
      const newWidth = prev.height * newAspectRatio;
      let updatedX = prev.x;

      // If the new width exceeds the video width, adjust the x position to expand left
      if (updatedX + newWidth > 640) {
        updatedX = Math.max(0, 640 - newWidth);
      }

      const adjustedWidth = Math.min(newWidth, 640 - updatedX);
      const updatedCropArea = {
        ...prev,
        x: updatedX,
        width: adjustedWidth,
        height: adjustedWidth / newAspectRatio,
      };

      // Calculate scale factors based on the video's actual dimensions
      const realVideoWidth = videoRef.current.videoWidth;
      const realVideoHeight = videoRef.current.videoHeight;
      const scaleX = realVideoWidth / 640;
      const scaleY = realVideoHeight / 360;

      // Scale coordinates to match the video's actual size
      const scaledWidth = adjustedWidth * scaleX;
      const scaledHeight = (adjustedWidth / newAspectRatio) * scaleY;
      const scaledX = updatedX * scaleX;
      const scaledY = prev.y * scaleY;

      setCurrentCoordinates([scaledX, scaledY, scaledWidth, scaledHeight]);

      return updatedCropArea;
    });
  };
  const handleVideoPlayback = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <VideoControllerWrapper>
      <div className="row">
        <div onClick={handleVideoPlayback}>
          {videoRef.current?.paused ? (
            <PlayIcon color="#FFF" height="20px" width="20px" />
          ) : (
            <PauseIcon color="#FFF" height="20px" width="20px" />
          )}
        </div>
        <Slider
          min={0}
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={(e) => {
            const newTime = parseFloat(e);
            videoRef.current.currentTime = newTime;
            setCurrentTime(newTime);
          }}
        />
      </div>
      <div className="row space-between">
        <div className="row">
          <span>
            {new Date(currentTime * 1000).toISOString().substr(11, 8)}
          </span>{" "}
          <span className="inactive">
            | {new Date(duration * 1000).toISOString().substr(11, 8)}
          </span>
        </div>
        <div className="row">
          <SoundIcon color="#FFF" height="20px" width="20px" />
          <Slider
            min={0}
            max={1}
            step={0.01}
            defaultValue={videoRef?.current?.volume}
            onChange={(e) => {
              videoRef.current.volume = parseFloat(e);
            }}
          />
        </div>
      </div>
      <div className="row">
        <Select
          prefix={<span className="text">Cropper Aspect Ratio</span>}
          onChange={handleAspectRatioChange}
          defaultValue={aspectRatio}
          options={aspectRatioOptions}
        />
        <Select
          onChange={(e) => {
            if (videoRef.current) videoRef.current.playbackRate = parseFloat(e);
          }}
          defaultValue={videoRef?.current?.playbackRate || 1}
          options={playbackSpeedOptions}
          prefix={<span className="text">Playback Speed</span>}
        />
      </div>
    </VideoControllerWrapper>
  );
}
