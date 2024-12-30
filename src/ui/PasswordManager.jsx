import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { updatePasswordAPI } from "../services/apiUser";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import MiniSpinner from "./MiniSpinner";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 50%; /* Adjust the form width to make it narrower */
  margin: 0; /* Center the form horizontally */
`;

const Label = styled.label`
  display: block;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--dark-grey-1);
  text-transform: uppercase;
  margin-bottom: 1rem; /* Added margin below the label */
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  line-height: 1.6;
  border: 1px solid var(--dark-grey-2);
  max-width: 400px; /* Set a max-width for inputs to prevent them from taking the entire width */
`;

const Button = styled.button`
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  border-radius: 5px;
  padding: 1.2rem;
  text-transform: uppercase;
  transition: all 0.25s ease-in-out;
  max-width: 200px; /* Set a max-width for the button */
  margin: 2rem 0; /* Center the button vertically */

  &:hover {
    background-color: var(--dark-grey-2);
    cursor: pointer;
  }
`;

const ErrorBox = styled.div`
  background-color: #f7d2c4;
  border: 1px solid #e6c796;
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
  max-width: 400px; /* Set a max-width for the error box */
  margin-bottom: 2.5rem; /* Added margin below the error message */
`;

const Error = styled.p`
  color: #e90e0e;
  font-size: 1.4rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--white-4);
  margin-bottom: 2rem;
`;

function PasswordManager() {
  const {
    auth: { token },
    setAuth,
  } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutate: updatePassword, isPending: isLoading } = useMutation({
    mutationFn: ({ currentPassword, password, confirmPassword, token }) =>
      updatePasswordAPI({ currentPassword, password, confirmPassword, token }),
    onSuccess: (data) => {
      const token = data.token;
      const user = data.data.user;
      setAuth({ token, user });
      setConfirmPassword("");
      setCurrentPassword("");
      setPassword("");
      toast.success("Password is successfully updated");
    },
    onError: (err) => {
      setConfirmPassword("");
      setCurrentPassword("");
      setPassword("");
      toast.error(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentPassword || !password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }
    updatePassword({ currentPassword, password, confirmPassword, token });
  };

  return (
    <div>
      <Title>Change Password</Title>

      {errorMessage && (
        <ErrorBox>
          <Error>{errorMessage}</Error>
        </ErrorBox>
      )}

      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Current Password</Label>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label>Confirm New Password</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <MiniSpinner /> : "change Password"}
        </Button>
      </Form>
    </div>
  );
}

export default PasswordManager;
