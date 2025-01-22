import React from "react";
import { Slider as RangeSelector } from "antd";

export default function Slider(props) {
  return (
    <RangeSelector
      {...props}
      style={{ flexGrow: 1, minWidth: "45px" }}
      tooltip={{ open: false }}
    />
  );
}
