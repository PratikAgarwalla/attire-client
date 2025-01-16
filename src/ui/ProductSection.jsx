import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Section = styled.div`
  padding: 7.5rem 0;
`;

const ProductCategory = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
`;

const Heading = styled.h1`
  color: var(--dark-grey-2);
  font-size: 3.6rem;
  text-align: center;
  margin-bottom: 2rem;
`;

function ProductSection() {
  return (
    <Section>
      <Heading>Our Categories</Heading>
      <ProductCategory>
        <ProductCard
          imageUrl={`${import.meta.env.VITE_IMAGE_URL}/CategoryClothing.png`}
          title="Clothing"
          link="clothing"
        />
        <ProductCard
          imageUrl={`${import.meta.env.VITE_IMAGE_URL}/CategoryShoes.png`}
          title="Shoes & Sandals"
          link="footwear"
        />
        <ProductCard
          imageUrl={`${import.meta.env.VITE_IMAGE_URL}/CategoryCaps.png`}
          title="Accessories"
          link="accessories"
        />
        <ProductCard
          imageUrl={`${import.meta.env.VITE_IMAGE_URL}/CategoryJeans.png`}
          title="Jeans"
          link="jeans"
        />
        <ProductCard
          imageUrl={`${import.meta.env.VITE_IMAGE_URL}/CategoryWinter.png`}
          title="Coats & Winterwear"
          link="winterwear"
        />
      </ProductCategory>
    </Section>
  );
}

export default ProductSection;
