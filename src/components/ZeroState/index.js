import React from "react";
import { ZeroStateWrapper } from "./ZeroStateWrapper.style";
import YTIcon from "../../assets/Icons/YTIcon";

export default function ZeroState() {
  return (
    <ZeroStateWrapper>
      <YTIcon height="24px" width="24px" />
      <h3 className="sub-title">Preview not available</h3>
      <p className="description inactive">
        Please click on “Start Cropper” and then play video
      </p>
    </ZeroStateWrapper>
  );
}
