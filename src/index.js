import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import { antdThemeConfig } from "./themeConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider theme={antdThemeConfig}>
    <App />
  </ConfigProvider>
);
