import styled from "styled-components";
import { Select } from "antd";

export const StyledSelect = styled(Select)`
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
