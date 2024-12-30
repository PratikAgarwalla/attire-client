import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px); /* Blur the background */
`;

const ModalContainer = styled.div`
  background-color: var(--white-1);
  border-radius: 10px;
  padding: 3rem;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  padding: 1rem 2rem;
  width: 10rem;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: var(--dark-grey-2);
  }
`;

const CancelButton = styled.button`
  background-color: var(--white-1);
  color: var(--dark-grey-1);
  border: 1px solid var(--dark-grey-2);
  padding: 1rem 2rem;
  width: 10rem;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: var(--white-2);
  }
`;

function Modal({ title, message, onOk, onCancel }) {
  return (
    <ModalBackground>
      <ModalContainer>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonBox>
          <Button onClick={() => onOk(true)}>Ok</Button>
          <CancelButton onClick={() => onCancel(false)}>Cancel</CancelButton>
        </ButtonBox>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;
