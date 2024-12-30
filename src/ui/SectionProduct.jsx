import React from "react";
import Product from "./Product";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getTopPicks } from "../services/apiTopProducts";
import Spinner from "./Spinner"; // Assuming Spinner is in the same directory

const Section = styled.div`
  padding: 0 0 7.5rem 0;
`;

const ProductCategory = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  grid-auto-columns: minmax(35rem, 1fr);
  gap: 4rem;
  overflow-x: auto;
  margin-top: 4rem;
  padding-inline: 2rem;
  white-space: nowrap;
`;

const Heading = styled.h1`
  color: var(--dark-grey-2);
  font-size: 3.6rem;
  text-align: left;
  margin-bottom: 2rem;
  margin-left: 2rem;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100px; /* You can adjust this as needed */
`;

function SectionProduct({ category, mainCategory, limit }) {
  let title;

  if (!mainCategory) {
    title = category;
  } else {
    title = mainCategory;
  }

  if (title) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
  }

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["topPicks", category, mainCategory],
    queryFn: () => getTopPicks(category, mainCategory, limit),
  });

  return (
    <Section>
      <Heading>Top {title} Pick</Heading>

      {isLoading ||
        (error && (
          <CenteredContainer>
            {isLoading && <Spinner />}
            {error && <p>Error: {error.message}</p>}
          </CenteredContainer>
        ))}

      {!isLoading && !error && (
        <ProductCategory>
          {products.map((el) => (
            <Product product={el} key={el.id} />
          ))}
        </ProductCategory>
      )}
    </Section>
  );
}

export default SectionProduct;
