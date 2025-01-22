import React from "react";
import { StyledSelect } from "./Select.style";

export default function Select(props) {
  return (
    <StyledSelect
      {...props}
      dropdownStyle={{ backgroundColor: "#37393f" }}
      optionRender={(option) => (
        <span style={{ color: "#ffffff" }}>{option.label}</span>
      )}
    />
  );
}
