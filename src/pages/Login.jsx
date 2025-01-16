import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { loginAPI } from "../services/apiUser";
import MiniSpinner from "../ui/MiniSpinner";
import { useAuth } from "../context/AuthProvider";

// Styled Components

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column; /* Center the content vertically */
`;

const TopBanner = styled.div`
  background-color: #f1f1f1; /* Soft light gray background */
  color: #333333; /* Darker gray text */
  font-size: 1.6rem;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem; /* Reduced margin for better layout */
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0; /* Light border for a subtle separation */
`;

const LoginBox = styled.form`
  width: 25%;
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
  margin-block: 2rem;
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
  display: block;
  width: 100%;
  font-size: 1.6rem;
  line-height: 1.6;
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid currentColor;
`;

const Button = styled.button`
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  border-radius: 5px;
  padding: 1.2rem 0;
  width: 15rem;
  text-transform: uppercase;
  text-align: center;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: var(--dark-grey-2);
    cursor: pointer;
  }
`;

const MainLink = styled(Link)`
  color: var(--dark-grey-1);
  font-weight: 400;
  text-decoration: underline;
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

function Login() {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("demouser@attire.com"); // Default email
  const [password, setPassword] = useState("demo1234"); // Default password
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleCancelBtn(e) {
    e.preventDefault();
    setError("");
  }

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (data) => {
      const token = data.token;
      const user = data.data.user;
      setAuth({ token, user });
      setEmail("");
      setPassword("");
      toast.success("You are logged in successfully");
      navigate("/", { replace: true });
    },
    onError: () => {
      setEmail("");
      setPassword("");
      setError("Incorrect email or password");
      toast.error("Incorrect email or password");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please provide both email and password");
      return;
    }
    login({ email, password });
  }

  return (
    <Container>
      <TopBanner>
        Login with the following credentials:
        <br />
        Email: <strong>demouser@attire.com</strong>, Password:{" "}
        <strong>demo1234</strong>
      </TopBanner>

      <LoginBox onSubmit={handleSubmit}>
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
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </InputBox>
        <InputBox>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </InputBox>
        <MainLink to="/forgotPassword">Forgot Password</MainLink>
        <ButtonBox>
          <Button type="submit" style={{ alignSelf: "center" }}>
            {isLoading ? <MiniSpinner /> : "Login"}
          </Button>
          <p>Don't have an account?</p>
          <Btn to="/signup">sign up</Btn>
        </ButtonBox>
      </LoginBox>
    </Container>
  );
}

export default Login;
