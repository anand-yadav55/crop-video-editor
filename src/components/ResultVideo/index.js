import React, { useEffect, useState } from "react";
import { videoUrl } from "../../constants";
import ZeroState from "../ZeroState";

export default function ResultVideo(props) {
  const { videoSettings } = props;
  const [isResultAvailable, setIsResultAvailable] = useState(false);
  useEffect(() => {
    setIsResultAvailable(
      videoSettings && !!videoSettings[0] && !!videoSettings[1]
    );
  }, [videoSettings]);
  console.log(videoSettings);
  if (!isResultAvailable) {
    return (
      <div className="app-container pb-100">
        <ZeroState />
      </div>
    );
  }

  return (
    <div className="app-container pb-100">
      <video src={videoUrl} controls></video>
    </div>
  );
}
