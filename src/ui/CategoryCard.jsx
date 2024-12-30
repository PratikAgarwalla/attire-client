import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  max-width: 30rem;
  height: auto;
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 3.5rem;
  color: var(--dark-grey-2);
`;

const Title = styled.h2`
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  background-color: transparent;
  color: inherit;
  text-decoration: none;
  padding: 1rem 2.5rem;
  border: 2px solid currentColor;
  border-radius: 5px;
  font-size: 1.4rem;
  font-weight: 600;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: var(--dark-grey-2);
    color: var(--white-1);
  }
`;

function CategoryCard({ category }) {
  const { image, title, description, link } = category;
  return (
    <Container>
      <Image src={image} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Button to={link}>Shop now</Button>
    </Container>
  );
}

export default CategoryCard;
