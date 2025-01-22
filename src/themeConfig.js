import { Segmented } from "antd";

export const antdThemeConfig = {
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
      optionActiveBg: "#37393f",
      optionSelectedBg: "#000000c3",
      optionSelectedColor: "#000000",
      selectorBg: "#FFFFFF50",
      activeOutlineColor: "#FFFFFF50",
    },
    Button: {
      defaultBg: "#7C36D6",
      defaultColor: "#FFFFFF",
      textHoverBg: "#7C36D6",
      defaultBorderColor: "transparent",
      defaultHoverBorderColor: "transparent",
      defaultHoverBg: "#7C36D680",
      defaultHoverColor: "#FFFFFF",
      fontWeight: 500,
    },
    Segmented: {
      itemColor: "#FFFFFF",
      itemActiveBg: "#37393F",
      itemHoverColor: "#FFFFFF",
      itemSelectedBg: "#37393F",
      itemSelectedColor: "#FFFFFF",
      trackBg: "#45474E",
    },
  },
};
