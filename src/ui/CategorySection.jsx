import React from "react";
import styled from "styled-components";
import CategoryCard from "./CategoryCard";

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 7.5rem 5rem;
  display: flex;
  overflow-x: auto;
  gap: 2.5rem;
`;

function CategorySection({ categories }) {
  return (
    <Container>
      {categories.map((el) => (
        <CategoryCard category={el} key={el.title} />
      ))}
    </Container>
  );
}

export default CategorySection;
