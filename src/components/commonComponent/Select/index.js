import React from "react";
import { Select as Dropdown } from "antd";
import styled from "styled-components";

const StyledSelect = styled(Dropdown)`
  .ant-select-selector {
    outline: none;
    border: 1px solid #ffffff50 !important;
    background-color: transparent !important;
    &:hover {
      border-color: #ffffff50;
    }
  }
  .ant-select-selection-item {
    color: #ffffff50;
  }
  .ant-select-arrow {
    color: #ffffff50;
  }
`;

export default function Select(props) {
  return <StyledSelect {...props} />;
}
