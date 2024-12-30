import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";
import AddressModal from "./AddressModal";
import { useMutation } from "@tanstack/react-query";
import { updateAddressAPI } from "../services/apiAddress";
import Modal from "./Modal";
import toast from "react-hot-toast";

// Styled components
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AddressBox = styled.div`
  border: 1px solid #d3d3d3; /* Light grey border */
  border-radius: 10px;
  padding: 2rem;
  width: 100%; /* Full width for the address box */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddressList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two addresses per row */
  gap: 2rem;
  margin-bottom: 2rem;
`;

const AddressItem = styled.div`
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AddressText = styled.p`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const MainButton = styled.button`
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

const Button = styled.button`
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: var(--dark-grey-2);
  }
`;

const DeleteButton = styled.button`
  background-color: var(--white-1);
  color: var(--dark-grey-1);
  border: 1px solid var(--dark-grey-2);
  padding: 0.5rem 2rem;
  border-radius: 5px;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: var(--white-2);
  }
`;

function Addresses() {
  const { auth, setAuth } = useAuth();
  const addressesData = auth && auth.user.addresses ? auth.user.addresses : [];
  const token = auth && auth.token ? auth.token : "";
  const [addresses, setAddresses] = useState(addressesData);
  const [addNew, setAddNew] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (auth) {
      setAddresses(auth.user.addresses);
    }
  }, [auth]);

  const { mutate: updateAddress, isPending } = useMutation({
    mutationFn: ({ address, token }) => updateAddressAPI({ address, token }),
    onSuccess: (data) => {
      setAuth((prevAuth) => ({ ...prevAuth, user: data.data.user }));
      toast.success("Address updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleEdit = (id) => {
    setSelectedAddressId(id);
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setSelectedAddressId(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    setSelectedAddressId(id);
    setShowModal(true);
  };

  const handleModalAction = (action) => {
    if (action === true) {
      const updatedAddresses = addresses.filter(
        (address) => address._id !== selectedAddressId
      );
      setAddresses(updatedAddresses);
      updateAddress({ address: updatedAddresses, token });
    }
    setShowModal(false);
  };

  const handleAddNew = () => {
    setAddNew(true);
  };

  const handleAddClose = () => {
    setAddNew(false);
  };

  return (
    <Container>
      <AddressBox>
        <Header>
          <Title>My Addresses</Title>
          <ButtonBox>
            <MainButton onClick={handleAddNew}>Add New Address</MainButton>
          </ButtonBox>
        </Header>

        <AddressList>
          {addresses.map((address) => (
            <AddressItem key={address.id}>
              <AddressText>
                <strong>Name:</strong> {address.name} <br />
                <strong>Phone:</strong> {address.phone} <br />
                {address.street}, {address.landmark} <br />
                <span style={{ textTransform: "uppercase" }}>
                  {address.city} - {address.pincode}
                  <br />
                  {address.state}, {address.country}
                </span>
              </AddressText>
              <ButtonBox>
                <Button onClick={() => handleEdit(address._id)}>Edit</Button>
                <DeleteButton onClick={() => handleDelete(address._id)}>
                  Delete
                </DeleteButton>
              </ButtonBox>
            </AddressItem>
          ))}
        </AddressList>
      </AddressBox>

      {addNew && <AddressModal onClose={handleAddClose} addressId={null} />}
      {showEditModal && (
        <AddressModal onClose={handleEditClose} addressId={selectedAddressId} />
      )}

      {showModal && (
        <Modal
          title="Confirm Deletion"
          message="Are you sure you want to delete this address?"
          onOk={() => handleModalAction(true)}
          onCancel={() => handleModalAction(false)}
        />
      )}
    </Container>
  );
}

export default Addresses;
