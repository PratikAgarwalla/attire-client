import React, { useState } from "react";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordAPI } from "../services/apiUser";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 30%;
`;

const Logo = styled.img`
  width: 10rem;
  height: auto;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  margin-block: 3rem;
`;

const Label = styled.label`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--dark-grey-1);
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  line-height: 1.6;
  border: 1px solid currentColor;
`;

const Button = styled.button`
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  border-radius: 5px;
  padding: 1.2rem 5.5rem;
  text-transform: uppercase;
  text-align: center;
  transition: all 0.25s ease-in-out;
  margin-top: 2rem;
  margin-inline: auto;
  display: block;

  &:hover {
    background-color: var(--dark-grey-2);
    cursor: pointer;
  }
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 2rem;
`;
const Error = styled.p`
  color: #e90e0e; /* dark gray */
  font-size: 14px;
`;
const InputBox = styled.div`
  margin-block: 2rem;
`;

const ErrorBox = styled.div`
  background-color: #f7d2c4; /* light orange */
  border: 1px solid #e6c796; /* light brown */
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
`;

function ResetPassword() {
  const { setAuth } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate: resetFn, isPending: isLoading } = useMutation({
    mutationFn: ({ password, confirmPassword, token }) =>
      resetPasswordAPI({ password, confirmPassword, token }),
    onSuccess: (data) => {
      setPassword("");
      setConfirmPassword("");
      setError("");
      const token = data.token;
      const user = data.data.user;
      setAuth({ token, user });
      toast.success("Password has been successfully reset");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
      setError(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please provide both password and confirmPassword");
      return;
    }

    resetFn({ password, confirmPassword, token });
  };

  return (
    <Container>
      <Box>
        <LogoBox>
          <Logo src="/logo-black.png" />
        </LogoBox>
        <ErrorMessage err={error} />
        <Heading>Reset Password?</Heading>
        <form onSubmit={handleSubmit}>
          <InputBox>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputBox>
          <InputBox>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputBox>
          <Button type="submit">Submit</Button>
        </form>
      </Box>
    </Container>
  );
}

export default ResetPassword;
