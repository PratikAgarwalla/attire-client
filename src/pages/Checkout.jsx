import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";
import { getManyProduct, getProduct } from "../services/apiTopProducts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, replace, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCartAPI } from "../services/apiCart";
import { createOrderAPI } from "../services/apiOrder";

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 2rem;
  background-color: var(--dark-grey-2);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.6rem;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--dark-grey-3);
  }
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f1f3f6;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }

  & > div {
    flex: 1;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
`;

const Box = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
`;

const Detail = styled.p`
  font-size: 1.6rem;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const HorizontalLine = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 1.5rem 0;
`;

const ItemBox = styled.div`
  padding: 1.5rem;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  margin-bottom: 2rem;
  background-color: ${(props) => (props.isSelected ? "#e0f7fa" : "#fff")};
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: space-between;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const SelectButton = styled(Btn)`
  align-self: flex-end;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ProductInfo = styled.p`
  font-size: 1.4rem;
  color: #555;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  padding: 0 1rem;
  color: #333;
`;

const Button = styled(Btn)`
  margin-top: 2rem;
  width: 100%;
`;

function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { auth, setAuth } = useAuth();

  if (!auth) return <Navigate to="/login" />;

  const token = auth.token ?? "";
  const { name, email, gender, phone } = auth.user ?? {};
  const addresses = auth.user.addresses ?? [];
  const products = auth.user.cart ?? [];
  const productIds = auth.user.cart?.map((item) => item.productId) ?? [];
  const navigate = useNavigate();

  const {
    data: productDetails,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", productIds],
    queryFn: () => getManyProduct(productIds),
  });

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: ({ token, data }) => createOrderAPI({ token, data }),
    onSuccess: (data) => {
      setAuth((prevAuth) => ({ ...prevAuth, user: data.data.user }));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading product details: {error.message}</p>;
  }

  const subtotal = products
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  const mergedProducts = products.map((product) => {
    const details =
      productDetails.find((detail) => detail._id === product.productId) || {};
    const { price: _, ...detailsWithoutPrice } = details;
    return { ...product, ...detailsWithoutPrice };
  });

  const orderedProducts = mergedProducts.map((product) => {
    return {
      productId: product.productId,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    };
  });

  const ordersData = {
    products: orderedProducts,
    addressId: selectedAddress,
  };

  const handleSelectAddress = (id) => {
    setSelectedAddress(id);
  };

  function handleSubmit(e) {
    if (selectedAddress === null) {
      toast.error("Please select an address");
      return;
    }
    createOrder({ token, data: ordersData });
    toast.success("Order placed successfully");
    navigate("/orderPlaced", { replace: true });
  }

  return (
    <Container>
      <BackButton onClick={() => navigate(-1, { replace: true })}>
        Back
      </BackButton>

      <Layout>
        <Column>
          <Box>
            <Title>Personal Details</Title>
            <HorizontalLine />
            <ItemBox>
              <Detail>
                <strong>Name:</strong> {name}
                <br />
                <strong>Email:</strong> {email}
                <br />
                <strong>Phone:</strong> {phone}
                <br />
                <strong>Gender:</strong> {gender}
              </Detail>
            </ItemBox>
            <FlexContainer>
              <Title>Delivery Addresses</Title>
            </FlexContainer>
            <HorizontalLine />
            {addresses.map((address) => (
              <ItemBox
                key={address._id}
                isSelected={selectedAddress === address._id}
              >
                <Detail>
                  <strong>{address.name}</strong> ({address.phone})
                  <br />
                  {address.street}, {address.landmark}
                  <br />
                  {address.city} - {address.pincode}
                  <br />
                  {address.state}, {address.country}
                </Detail>
                <SelectButton onClick={() => handleSelectAddress(address._id)}>
                  Select
                </SelectButton>
              </ItemBox>
            ))}
          </Box>
        </Column>

        <Column>
          <Box>
            <Title>Order Summary</Title>
            <HorizontalLine />
            <ProductList>
              {mergedProducts.map((product) => (
                <ProductItem key={product._id}>
                  <ProductImage
                    src={
                      product.category === "wetsuits"
                        ? `${import.meta.env.VITE_BACKEND_URL}/${
                            product.category
                          }/${product.mainCategory}/${product._id}-pic1.png`
                        : `${import.meta.env.VITE_BACKEND_URL}/${
                            product.category
                          }/${product.mainCategory}/${product.subCategory}/${
                            product._id
                          }-pic1.png`
                    }
                    alt={product.name}
                  />
                  <ProductDetails>
                    <ProductName>{product.name}</ProductName>
                    <ProductInfo>
                      Quantity: {product.quantity || "N/A"}
                    </ProductInfo>
                    <ProductInfo>Price: ${product.price}</ProductInfo>
                  </ProductDetails>
                  <ProductInfo style={{ alignSelf: "flex-end" }}>
                    Total: ${product.price * (product.quantity || 1)}
                  </ProductInfo>
                </ProductItem>
              ))}
            </ProductList>
            <Total>
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </Total>
            <Button onClick={handleSubmit}>Proceed to Payment</Button>
          </Box>
        </Column>
      </Layout>
    </Container>
  );
}

export default Checkout;
