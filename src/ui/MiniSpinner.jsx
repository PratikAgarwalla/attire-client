// MiniSpinner.js
import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const MiniSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3); /* Light gray/transparent trail */
  border-left-color: white; /* White spinner color */
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spin} 0.75s linear infinite;
  display: inline-block;
  vertical-align: middle;
`;

export default MiniSpinner;
