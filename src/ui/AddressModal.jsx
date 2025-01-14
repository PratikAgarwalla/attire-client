import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addAddressAPI, updateAddressAPI } from "../services/apiAddress";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthProvider";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  margin: 2rem 0;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  border: 1px solid #d3d3d3; /* Light grey border */
  border-radius: 10px;
  padding: 2rem;
`;

const FullWidth = styled.div`
  grid-column: span 2;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: var(--dark-grey-1);
  font-weight: 600;
  display: inline-block;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.4rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  line-height: 1.6;
`;

const Select = styled.select`
  padding: 1rem;
  font-size: 1.4rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  grid-column: span 2;
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

function AddressModal({ onClose, addressId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [existingAddress, setExistingAddress] = useState(null);
  const { auth, setAuth } = useAuth();
  const token = auth && auth.token ? auth.token : "";

  const { mutate: addAddress, isPending: isAdding } = useMutation({
    mutationFn: ({ data, token }) => addAddressAPI({ address: data, token }),
    onSuccess: (data) => {
      const user = data.data.user;
      setAuth((prevAuth) => ({ ...prevAuth, user }));
      toast.success("New address added successfully");
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: updateAddress, isPending: isUpdating } = useMutation({
    mutationFn: ({ address, token }) => updateAddressAPI({ address, token }),
    onSuccess: (data) => {
      setAuth((prevAuth) => ({ ...prevAuth, user: data.data.user }));
      toast.success("Address updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (addressId && !existingAddress && auth?.user?.addresses) {
    const selectedAddress = auth.user.addresses.find(
      (address) => address._id === addressId
    );
    if (selectedAddress) {
      setExistingAddress(selectedAddress);
      reset(selectedAddress); // Reset the form with the existing address
    }
  }

  const onSubmit = (data) => {
    const currentAddresses = auth?.user?.addresses || [];

    if (addressId) {
      const updatedAddresses = currentAddresses.map((address) =>
        address._id === addressId ? { ...address, ...data } : address
      );
      updateAddress({ address: updatedAddresses, token });
    } else {
      addAddress({ data, token });
    }
    onClose();
  };

  const onError = (errors) => {
    const errorMessages = Object.values(errors)
      .map((error) => error.message)
      .join("\n");

    toast.error(errorMessages);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>{addressId ? "Edit Address" : "Add New Address"}</h2>
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <FullWidth>
            <Label>Country</Label>
            <Input
              {...register("country", { required: "Country is required" })}
              value="India"
              readOnly
            />
          </FullWidth>
          <FullWidth>
            <Label>Name</Label>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
            />
          </FullWidth>
          <FullWidth>
            <Label>Phone</Label>
            <Input
              {...register("phone", {
                required: "Phone number is required",
                pattern: /^\d{10}$/,
              })}
              placeholder="Enter your phone number"
            />
          </FullWidth>
          <div>
            <Label>House No.</Label>
            <Input
              {...register("houseno", { required: "House number is required" })}
              placeholder="Enter your house number"
            />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input
              {...register("pincode", { required: "Pincode is required" })}
              placeholder="Enter your pincode"
            />
          </div>
          <FullWidth>
            <Label>Street</Label>
            <Input
              {...register("street", { required: "Street is required" })}
              placeholder="Enter your street"
            />
          </FullWidth>
          <FullWidth>
            <Label>Landmark</Label>
            <Input
              {...register("landmark", { required: "Landmark is required" })}
              placeholder="Enter a landmark"
            />
          </FullWidth>
          <div>
            <Label>City</Label>
            <Input
              {...register("city", { required: "City is required" })}
              placeholder="Enter your city"
            />
          </div>
          <div>
            <Label>State</Label>
            <Select
              {...register("state", { required: "State is required" })}
              defaultValue=""
            >
              <option value="" disabled>
                Select your state
              </option>
              {[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
              ].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </div>
          <ButtonBox>
            <Button type="submit">
              {addressId ? "Edit Address" : "Add Address"}
            </Button>
            <CancelButton
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </CancelButton>
          </ButtonBox>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

export default AddressModal;
