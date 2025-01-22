import styled from "styled-components";

export const PreviewCanvasWrapper = styled.div`
  flex-grow: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: center;
  h2 {
    font-size: 12px;
    font-weight: 700;
    line-height: 15.62px;
  }
  .canvas-container {
    canvas {
      border: 1px solid black;
    }
  }
`;
