import React, { useState } from "react";
import styled from "styled-components";

const ErrorBox = styled.div`
  background-color: #f7d2c4; /* light orange */
  border: 1px solid #e6c796; /* light brown */
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center; /* Center vertically if button icon is next to text */
  gap: 1rem;
  overflow: hidden; /* Prevent overflow */
  margin-bottom: 1.5rem;
`;

const ErrorCancelBtn = styled.button`
  display: block;
  font-size: 2rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  max-width: 2rem; /* Constrain button width if needed */
`;

const Error = styled.p`
  color: #e90e0e;
  font-size: 14px;
  flex: 1; /* Take up remaining space in the ErrorBox */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word; /* Additional wrap for long words */
  margin: 0;
`;

const ErrorMsg = styled.p`
  color: #e90e0e;
  font-size: 14px;
  flex: 1; /* Take up remaining space in the ErrorBox */
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word; /* Additional wrap for long words */
  margin-top: 0.5rem;
`;

function ErrorMessage({ err }) {
  const [error, setError] = useState(err);
  function handleCancelBtn(e) {
    e.preventDefault();
    setError("");
  }
  return (
    <>
      {error && (
        <ErrorBox>
          <Error>{error}</Error>
          <ErrorCancelBtn onClick={handleCancelBtn}>&times;</ErrorCancelBtn>
        </ErrorBox>
      )}
    </>
  );
}

export default ErrorMessage;
