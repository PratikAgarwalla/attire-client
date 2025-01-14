import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MiniSpinner from "../ui/MiniSpinner";
import { useMutation } from "@tanstack/react-query";
import { signupAPI } from "../services/apiUser";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const SignupBox = styled.form`
  width: 25%;
  margin-top: 2rem;
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

const InputBox = styled.div`
  margin-top: 2rem;
`;

const ButtonBox = styled.div`
  margin-block: 3rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

const ErrorCancelBtn = styled.button`
  display: block;
  font-size: 2rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
  max-width: 2rem; /* Constrain button width if needed */
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
  line-height: 1.6%;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid currentColor;
  line-height: 1.6%;
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

  &:hover {
    background-color: var(--dark-grey-2);
    cursor: pointer;
  }
`;

const Btn = styled(Link)`
  margin-top: -1.5rem;
  color: var(--dark-grey-1);
  font-weight: 600;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid black;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

function Signup() {
  const { setAuth } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: (data) => signupAPI(data),
    onSuccess: (data) => {
      const token = data.token;
      const user = data.data.user;
      setAuth({ token, user });
      reset();
      toast.success("Your account has been successfully created");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
      setError(error.message);
    },
  });

  function handleCancelBtn(e) {
    e.preventDefault();
    setError("");
  }

  function onSubmit(data) {
    signup(data);
  }

  const isWorking = isLoading || isSubmitting;

  return (
    <Container>
      <SignupBox onSubmit={handleSubmit(onSubmit)}>
        <LogoBox>
          <Logo src="/logo-black.png" />
        </LogoBox>

        {error && (
          <ErrorBox>
            <Error>{error}</Error>
            <ErrorCancelBtn onClick={handleCancelBtn}>&times;</ErrorCancelBtn>
          </ErrorBox>
        )}

        <InputBox>
          <Label>Full Name</Label>
          <Input
            type="text"
            disabled={isWorking}
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <ErrorMsg>{errors.name.message}</ErrorMsg>}
        </InputBox>

        <InputBox>
          <Label>Email</Label>
          <Input
            type="email"
            disabled={isWorking}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </InputBox>

        <InputBox>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            disabled={isWorking}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number should contain only digits",
              },
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
            })}
          />
          {errors.phone && <ErrorMsg>{errors.phone.message}</ErrorMsg>}
        </InputBox>

        <InputBox>
          <Label>Gender</Label>
          <Select
            disabled={isWorking}
            {...register("gender", {
              required: "Please select your gender",
            })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
          {errors.gender && <ErrorMsg>{errors.gender.message}</ErrorMsg>}
        </InputBox>

        <InputBox>
          <Label>Password</Label>
          <Input
            type="password"
            disabled={isWorking}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </InputBox>

        <InputBox>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            disabled={isWorking}
            {...register("confirmPassword", {
              required: "Please confirm your password",
            })}
          />
          {errors.confirmPassword && (
            <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>
          )}
        </InputBox>

        <ButtonBox>
          <Button disabled={isWorking} style={{ alignSelf: "center" }}>
            {isWorking ? <MiniSpinner /> : "sign up"}
          </Button>
          <p>Already have an account?</p>
          <Btn to="/login">login</Btn>
        </ButtonBox>
      </SignupBox>
    </Container>
  );
}

export default Signup;
