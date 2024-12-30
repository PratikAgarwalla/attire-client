// ButtonWithSpinner.js
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

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  position: relative;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-left-color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  animation: ${spin} 0.8s linear infinite;
`;

const ButtonWithSpinner = ({ isLoading, children, ...props }) => (
  <StyledButton disabled={isLoading} {...props}>
    {isLoading && <Spinner />}
    {children}
  </StyledButton>
);

export default ButtonWithSpinner;
