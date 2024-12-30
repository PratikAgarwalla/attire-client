import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Styled Components
const CardWrapper = styled.div`
  flex: 1;
  min-width: 45rem;
  background-color: var(--white-2);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 2rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  padding: 2.5rem 2rem;
`;

const Title = styled.h3`
  font-size: 2.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2.5rem;
`;

const ButtonLink = styled(Link)`
  font-size: 1.8rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--dark-grey-2);
  padding-bottom: 0.5rem;

  border-bottom: 2px solid currentColor;

  &:hover {
    color: var(--dark-grey-1);
  }
`;

// Card Component
const ProductCard = ({ imageUrl, title, link }) => {
  return (
    <CardWrapper>
      <Image src={imageUrl} alt={title} />
      <Content>
        <Title>{title}</Title>
        <ButtonContainer>
          <ButtonLink to={`/mens/${link}`}>Shop Mens</ButtonLink>
          <ButtonLink to={`/womens/${link}`}>Shop Womens</ButtonLink>
        </ButtonContainer>
      </Content>
    </CardWrapper>
  );
};

export default ProductCard;
