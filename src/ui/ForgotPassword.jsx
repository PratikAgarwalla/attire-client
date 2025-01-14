import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { forgotPasswordAPI } from "../services/apiUser";

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
  border: 1px solid currentColor;
  line-height: 1.6;
`;

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

const SuccessBox = styled.div`
  background-color: #d4edda; /* light green */
  border: 1px solid #c3e6cb; /* soft green border */
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

const SuccessMsg = styled.p`
  color: #155724; /* dark green for text */
  font-size: 16px;
  flex: 1;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  margin: 0;
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
  cursor: pointer;

  &:hover {
    background-color: var(--dark-grey-2);
  }

  &:disabled {
    background-color: var(--dark-grey-1); /* Lighter grey for disabled state */
    color: var(--white-1); /* Lighter text color */
    cursor: not-allowed;
  }
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { mutate: forgotPasswordFn, isPending: isLoading } = useMutation({
    mutationFn: (email) => forgotPasswordAPI(email),
    onSuccess: () => {
      setSuccess(true);
      setError("");
      toast.success("Reset password link is sent successfully");
    },
    onError: (err) => {
      setSuccess(false);
      setError(err.message);
      toast.error(err.message);
    },
  });

  function handleCancelBtn(e) {
    e.preventDefault();
    setError("");
  }

  function handleSubmit() {
    if (!email) {
      toast.error("Please provide a registered email ID");
      return;
    }

    forgotPasswordFn(email);
  }

  return (
    <Container>
      <Box>
        <LogoBox>
          <Logo src="/logo-black.png" />
        </LogoBox>
        {error && (
          <ErrorBox>
            <Error>{error}</Error>
            <ErrorCancelBtn onClick={handleCancelBtn}>&times;</ErrorCancelBtn>
          </ErrorBox>
        )}
        {success && (
          <SuccessBox>
            <SuccessMsg>
              Password reset link is successfully send to your provided email ID
            </SuccessMsg>
          </SuccessBox>
        )}
        <Heading>Forgot Password?</Heading>
        <Description>
          Provide your Email ID we will send a reset link to it.
        </Description>
        <Label>Enter your Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || success}
        />
        <Button onClick={handleSubmit} disabled={isLoading || success}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
