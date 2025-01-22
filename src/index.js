import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        Slider: {
          dotActiveBorderColor: "transparent",
          handleSize: 10,
          handleSizeHover: 10,
          handleActiveColor: "#FFFFFF",
          handleActiveOutlineColor: "#FFFFFF",
          handleColor: "#FFFFFF",
          railBg: "#FFFFFF50",
          railHoverBg: "#FFFFFF50",
          trackBg: "#FFFFFF",
          trackHoverBg: "#FFFFFF",
        },
      },
      components: {
        Select: {
          activeBorderColor: "transparent",
          hoverBorderColor: "transparent",
          optionActiveBg: "#FFFFFF50",
          selectorBg: "#FFFFFF50",
          activeOutlineColor: "#FFFFFF50",
        },
      },
    }}
  >
    <App />
  </ConfigProvider>
);
