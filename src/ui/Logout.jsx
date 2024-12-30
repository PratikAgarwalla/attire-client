import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmBox = styled.div`
  border: 1px solid #d3d3d3; /* Light grey border */
  border-radius: 10px;
  padding: 2rem;
  width: 400px; /* Fixed width for the confirmation box */
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
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
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: var(--white-2);
  }
`;

function Logout() {
  const [isConfirming, setIsConfirming] = useState(true); // Change to false if not confirming
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogout = () => {
    setAuth();
    toast.success("You are logged out successfully");
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Container>
      <ConfirmBox>
        <Title>Confirm Logout</Title>
        <Message>Are you sure you want to logout?</Message>
        <ButtonBox>
          <Button onClick={handleLogout}>Confirm</Button>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonBox>
      </ConfirmBox>
    </Container>
  );
}

export default Logout;
