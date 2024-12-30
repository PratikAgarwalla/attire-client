import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Link)`
  flex: 1;
  height: max-content;
  overflow: hidden;
  /* margin: 2rem; */
  text-decoration: none;
  color: inherit;
`;

const ImageBox = styled.div`
  background-color: var(--white-3);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

const ContentBox = styled.div`
  margin-top: 2rem;
`;

const Image = styled.img`
  width: 100%;
  height: 41rem;
`;

const Button = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: var(--dark-grey-1); /* Black background */
  color: var(--white-1); /* White text */
  border: none;
  border-radius: 5px;
  width: 90%;
  padding: 1.2rem 0;
  margin: 1.5rem auto;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: var(--dark-grey-2); /* Dark Grey on hover */
    color: var(--white-1); /* Keep text white */
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  color: var(--dark-grey-5);
`;

const OriginalPrice = styled.span`
  margin-left: 1rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--white-5);
  text-decoration: line-through;
`;

const DiscountPrice = styled.span`
  font-size: 1.4rem;
  font-weight: 700;
`;

const Discount = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background-color: var(--white-1);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-grey-1);
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 3px;
`;

const Sale = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background-color: orange;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white-1);
  text-transform: uppercase;
  padding: 0.25rem 0.75rem;
  border-radius: 3px;
`;

function Product({ product }) {
  const {
    _id: id,
    sale,
    discount,
    title,
    name,
    category,
    mainCategory,
    subCategory,
    price,
  } = product;
  const discountPrice = (price - price * (discount / 100)).toFixed(2);

  let imageUrl = "";

  if (category == "wetsuits") {
    imageUrl = `/${category}/${mainCategory}`;
  } else {
    imageUrl = `/${category}/${mainCategory}/${subCategory}`;
  }

  return (
    <Container to={`/product/${id}`}>
      <ImageBox>
        {sale && <Sale>Sale</Sale>}
        {discount > 0 && <Discount>-{discount}%</Discount>}
        <Button>Quick Add</Button>
        <Image src={`${imageUrl}/${id}-pic1.png`} />
      </ImageBox>
      <ContentBox>
        <Title>{title}</Title>
        <Description>{name}</Description>
        <DiscountPrice>${discountPrice}</DiscountPrice>
        {discount > 0 && <OriginalPrice>${price}</OriginalPrice>}
      </ContentBox>
    </Container>
  );
}

export default Product;
