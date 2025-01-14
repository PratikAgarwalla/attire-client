// Spinner.js
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

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SpinnerWheel = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1); /* Light gray background */
  border-left-color: black; /* Black spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const Spinner = () => (
  <SpinnerContainer>
    <SpinnerWheel />
  </SpinnerContainer>
);

export default Spinner;
