import React from "react";
import Banner from "../ui/Banner";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiTopProducts";
import Spinner from "../ui/Spinner";
import SubHeading from "../ui/SubHeading";
import Product from "../ui/Product";

const Container = styled.div`
  margin: 5rem;
  color: var(--dark-grey-2);
`;

const MainCategory = styled.h1`
  color: inherit;
  font-size: 4.8rem;
  margin-bottom: 2rem;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* You can adjust this as needed */
`;

const Description = styled.p`
  color: inherit;
  font-size: 1.4rem;
  line-height: 1.5;
  margin-bottom: 2.5rem;
`;

const FilterBox = styled.div`
  border: 1px solid black;
  height: 10rem;
  margin-bottom: 2rem;
`;

const CategoryBox = styled.div`
  margin-block: 5rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
`;

function Wetsuits() {
  const category = "wetsuits";
  const mainCategory = "wetsuits";

  const {
    data: products = [], // Default empty array to avoid mapping on undefined
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category, mainCategory],
    queryFn: () => getProducts(category, mainCategory),
  });

  const productsBySubCategory = products.reduce((acc, product) => {
    const { subCategory } = product;
    if (!acc[subCategory]) acc[subCategory] = [];
    acc[subCategory].push(product);
    return acc;
  }, {});

  return (
    <>
      <Banner
        imageUrl={`${import.meta.env.VITE_IMAGE_URL}/wetsuitbanner.jpg`}
        title="wetsuits"
      />
      {isLoading && (
        <CenteredContainer>
          <Spinner />
        </CenteredContainer>
      )}
      {error && (
        <CenteredContainer>
          <p>Error: {error.message}</p>
        </CenteredContainer>
      )}

      {!isLoading && !error && (
        <Container>
          <MainCategory>Wetsuits</MainCategory>
          <Description>
            Dive into ultimate comfort and performance with our premium
            collection of men's wetsuits at Attire. Whether you're surfing,
            diving, or paddleboarding, our wetsuits are designed to keep you
            warm and flexible in all water conditions. Featuring top brands like
            Rip Curl, O'Neill, and Billabong, our range offers advanced
            materials and cutting-edge technology for superior insulation and
            durability. Perfect for every skill level, explore our selection to
            find the ideal fit and enjoy your aquatic adventures in style.
          </Description>

          {/* Render a CategoryBox for each subCategory */}
          {Object.keys(productsBySubCategory).map((subCategory) => (
            <CategoryBox key={subCategory}>
              <SubHeading>{subCategory}</SubHeading>
              <CategoryGrid>
                {productsBySubCategory[subCategory].map((product) => (
                  <Product product={product} key={product.id} />
                ))}
              </CategoryGrid>
            </CategoryBox>
          ))}
        </Container>
      )}
    </>
  );
}

export default Wetsuits;
