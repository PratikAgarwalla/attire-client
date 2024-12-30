import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { getUser, updateUserAPI } from "../services/apiUser";
import Spinner from "./Spinner";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const Box = styled.div`
  border: 1px solid #d3d3d3; /* Light grey border */
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: left;
`;

const HorizontalLine = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin-bottom: 1.5rem;
`;

const Detail = styled.p`
  font-size: 1.4rem;
  color: var(--dark-grey-1);
  margin-bottom: 1.5rem;
  text-align: left;
`;

const EditLink = styled.a`
  color: var(--dark-grey-1);
  font-size: 1.4rem;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 1rem;
  display: inline-block;
`;

const Form = styled.form`
  margin-top: 2rem;
  border: 1px solid #d3d3d3; /* Light grey border */
  border-radius: 10px;
  padding: 2rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: var(--dark-grey-1);
  font-weight: 600;
  display: inline-block;
  margin-bottom: 0.75rem;
  width: 10rem;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.4rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

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

const Select = styled.select`
  padding: 1rem;
  font-size: 1.4rem;
  width: 100%;
  max-width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1.5rem;
`;

function AccountDetails() {
  const {
    auth: { token, user },
    setAuth,
  } = useAuth();
  const { name, email, phone, gender } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [editDetails, setEditDetails] = useState(user);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditDetails(user); // Reset form values to original details on cancel
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails({ ...editDetails, [name]: value });
  };

  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: ({ data, token }) => updateUserAPI({ data, token }),
    onSuccess: (data) => {
      const token = data.token;
      const user = data.data.user;
      setAuth({ token, user });
      toast.success("User data is successfully updated");
    },
    onError: (err) => {
      setEditDetails(user);
      toast.error(err.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ data: editDetails, token }); // Save changes
    setIsEditing(false);
  };

  return (
    <Container>
      <Box>
        <Title>Personal Details</Title>
        <HorizontalLine />

        <Detail>
          <strong>Name:</strong> {name}
        </Detail>
        <Detail>
          <strong>Email:</strong> {email}
        </Detail>
        <Detail>
          <strong>Phone:</strong> {phone}
        </Detail>
        <Detail>
          <strong>Gender:</strong> {gender}
        </Detail>

        {!isEditing && <EditLink onClick={handleEditClick}>Edit</EditLink>}
      </Box>

      {isEditing && (
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={editDetails.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={editDetails.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="phone"
              value={editDetails.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label>Gender</Label>
            <Select
              name="gender"
              value={editDetails.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </div>

          <ButtonBox>
            <Button type="submit">Submit</Button>
            <CancelButton type="button" onClick={handleCancelClick}>
              Cancel
            </CancelButton>
          </ButtonBox>
        </Form>
      )}
    </Container>
  );
}

export default AccountDetails;
