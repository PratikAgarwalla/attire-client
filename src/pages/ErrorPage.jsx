import React from "react";
import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--white-1);
  color: var(--dark-grey-1);
  text-align: center;
  padding: 2rem;
`;

const ErrorMessage = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const ErrorStatus = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--dark-grey-2);
`;

const HomeButton = styled.button`
  padding: 1rem 3rem;
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  cursor: pointer;

  &:hover {
    background-color: var(--dark-grey-2);
  }
`;

function ErrorPage() {
  const error = useRouteError();

  return (
    <ErrorWrapper>
      <ErrorMessage>Oops! Something went wrong.</ErrorMessage>
      {error && (
        <ErrorStatus>{`Error ${error.status || 500}: ${
          error.statusText || error.message
        }`}</ErrorStatus>
      )}
      <Link to="/">
        <HomeButton>Go to Home</HomeButton>
      </Link>
    </ErrorWrapper>
  );
}

export default ErrorPage;
