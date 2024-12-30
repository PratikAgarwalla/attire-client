import React from "react";
import styled from "styled-components";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Icon library
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f1f3f6;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 5rem;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

const Btn = styled.button`
  background-color: var(--dark-grey-2);
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  font-size: 1.6rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--dark-grey-3);
  }
`;

const SuccessPageContainer = styled(Container)`
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SuccessIcon = styled.div`
  font-size: 6rem;
  color: #4caf50;
  margin-bottom: 2rem;
`;

const Message = styled(Title)`
  font-size: 2.8rem;
  color: #333;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  justify-content: center;
`;

const HomeButton = styled(Btn)`
  background-color: #4caf50;

  &:hover {
    background-color: #388e3c;
  }
`;

const LogoutButton = styled(Btn)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    setAuth();
    toast.success("You are logged out successfully");
    navigate("/");
  };

  return auth ? (
    <SuccessPageContainer>
      <Box>
        <SuccessIcon>
          <AiOutlineCheckCircle />
        </SuccessIcon>
        <Message>Your order has been placed successfully!</Message>
        <ButtonGroup>
          <HomeButton onClick={handleGoHome}>Go to Home</HomeButton>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </ButtonGroup>
      </Box>
    </SuccessPageContainer>
  ) : (
    <Navigate to="/login" />
  );
};

export default OrderSuccess;
