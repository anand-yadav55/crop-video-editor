import styled from "styled-components";

export const VideoEditorContainer = styled.div`
  position: relative;
  width: 640px;
  height: auto;
  margin-bottom: 15px;
  video {
    width: 100%;
    height: auto;
    border-radius: 6px;
    background-size: cover;
  }

  .crop-overlay {
    position: absolute;
    border-color: #ffffff;
    box-sizing: border-box;
    cursor: move;
    max-width: 100%;
    border-style: dashed;
    max-height: 100%;
    ${({ $cropArea }) => `
        top: calc(${$cropArea.y}px - 1px);
        left: ${$cropArea.x}px;
        width: ${
          $cropArea.width - 4
        }px; /* Subtract total border width (2px each side) */
        height: ${
          $cropArea.height - 4
        }px; /* Subtract total border width (2px each side) */
        background-size: 100% 100%;
    `}
  }
`;
