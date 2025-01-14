import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const ResendButton = styled(Button)`
  background-color: transparent;
  border: 2px solid var(--dark-grey-1);
  color: var(--dark-grey-1);
  font-size: 1.2rem;
  padding: 1rem 4rem;
  display: inline-block;
  margin-inline: auto;
  margin-top: 1rem;

  &:hover {
    background-color: var(--dark-grey-1);
    color: var(--white-1);
  }

  &:disabled {
    background-color: transparent;
    border-color: #aaa;
    color: #aaa;
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

const ErrorBox = styled.div`
  background-color: #f7d2c4;
  border: 1px solid #e6c796;
  padding: 1rem;
  border-radius: 5px;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Error = styled.p`
  color: #e90e0e;
  font-size: 1.4rem;
`;

const Timer = styled.p`
  width: max-content;
  font-size: 1.2rem;
  margin-top: 2.5rem;
  text-align: center;
  color: var(--dark-grey-2);
`;

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleSubmit = () => {
    if (otp !== "123456") {
      setIsOtpValid(false);
    } else {
      setIsOtpValid(true);
      // Proceed after OTP validation success
    }
  };

  const handleResend = () => {
    setOtp("");
    setTimer(60);
    setIsResendDisabled(true);
    // Trigger resend OTP logic here
  };

  return (
    <Container>
      <Box>
        <LogoBox>
          <Logo src="/logo-black.png" />
        </LogoBox>
        {!isOtpValid && (
          <ErrorBox>
            <Error>Incorrect OTP. Please try again.</Error>
          </ErrorBox>
        )}
        <Heading>OTP Verification</Heading>
        <Description>
          Enter the OTP sent to your registered email. You can request a new OTP
          after the timer runs out.
        </Description>
        <Label>Enter OTP</Label>
        <Input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
        />
        <Button onClick={handleSubmit}>Submit</Button>
        <Timer>Resend available in {timer}s</Timer>
        <ResendButton onClick={handleResend} disabled={isResendDisabled}>
          Resend OTP
        </ResendButton>
      </Box>
    </Container>
  );
}

export default OtpVerification;
