import React, { useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthProvider";
import { getOrdersAPI } from "../services/apiOrder";
import { useQuery } from "@tanstack/react-query";

const Box = styled.div`
  border: 1px solid #d3d3d3; /* Light grey border */
  border-radius: 10px;
  padding: 2rem;
  width: 100%; /* Full width for the address box */
`;

const Title = styled.h2`
  font-size: 2rem;
`;

const MainTitle = styled.h2`
  font-size: 2.4rem;
  text-transform: uppercase;
`;

const HorizontalLine = styled.hr`
  border: none;
  height: 1px;
  background-color: #e0e0e0;
  margin: 1.5rem 0;
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
  margin-bottom: 1.25rem;
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

function Orders() {
  const { auth, setAuth } = useAuth();
  const token = auth.token ?? "";
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrdersAPI({ token }),
    staleTime: 0,
    enabled: !!token,
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const groupedOrders = orders?.reduce((acc, order) => {
    const date = formatDate(order.date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(order);
    return acc;
  }, {});

  return (
    <div>
      <MainTitle>Orders</MainTitle>
      <HorizontalLine />
      {groupedOrders &&
        Object.keys(groupedOrders).map((date) => (
          <Box key={date}>
            <Title>{date}</Title>
            <HorizontalLine />
            {groupedOrders[date].map((order) => (
              <div key={order._id}>
                <ProductList>
                  {order.products.map((product) => (
                    <ProductItem key={product._id}>
                      <ProductImage
                        src={
                          product.productId.category === "wetsuits"
                            ? `${import.meta.env.VITE_IMAGE_URL}/${
                                product.productId.category
                              }/${product.productId.mainCategory}/${
                                product.productId._id
                              }-pic1.png`
                            : `${import.meta.env.VITE_IMAGE_URL}/${
                                product.productId.category
                              }/${product.productId.mainCategory}/${
                                product.productId.subCategory
                              }/${product.productId._id}-pic1.png`
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
              </div>
            ))}
          </Box>
        ))}
    </div>
  );
}

export default Orders;
