import React from "react";
import VideoEditor from "./VideoEditor";
import VideoController from "./VideoController";

export default function Editor(props) {
  return (
    <div>
      <VideoEditor {...props} />
      <VideoController {...props} />
    </div>
  );
}
