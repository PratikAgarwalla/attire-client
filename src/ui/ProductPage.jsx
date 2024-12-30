import React, { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getProduct } from "../services/apiTopProducts";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { addItemAPI } from "../services/apiCart";

const Container = styled.div`
  padding: 7.5rem 5rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  gap: 5rem;
`;

const ImageSection = styled.div`
  flex: 1.6;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
`;

const ImageBox = styled.div`
  background-color: var(--white-3);
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
`;

const ContentSection = styled.div`
  flex: 1.4;
  position: sticky;
  top: 5rem;
  align-self: flex-start;
  background-color: var(--white-1);
  z-index: 1;
`;

const Tags = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Discount = styled.span`
  background-color: var(--white-2);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-grey-1);
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border-radius: 3px;
`;

const Sale = styled.span`
  background-color: orange;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--white-1);
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border-radius: 3px;
`;

const New = styled.span`
  background-color: var(--white-2);
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--dark-grey-1);
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  border-radius: 3px;
`;

const Category = styled.h3`
  font-size: 1.6rem;
  text-transform: uppercase;
  color: var(--dark-grey-5);
  margin-bottom: 3rem;
`;

const Heading = styled.h1`
  font-size: 3.6rem;
  line-height: 1.6;
  color: var(--dark-grey-2);
  width: 90%;
  margin-bottom: 3rem;
`;

const OriginalPrice = styled.span`
  margin-left: 1rem;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--white-5);
  text-decoration: line-through;
`;

const DiscountPrice = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--dark-grey-2);
`;

const SizeBox = styled.div`
  padding-top: 2rem;
  border-top: 1px solid var(--dark-grey-5);
  margin: 3rem 0;
  color: var(--dark-grey-2);
`;

const SelectSize = styled.p`
  font-size: 1.6rem;

  & span {
    font-weight: 700;
  }
`;

const DropDown = styled.select`
  background-color: var(--white-3);
  width: 100%;
  border: 1px solid var(--dark-grey-1);
  padding: 1.5rem 2.5rem;
  margin: 2.5rem 0 0 0;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
`;

const Option = styled.option``;

const Button = styled.button`
  display: block;
  background-color: var(--dark-grey-2);
  color: var(--white-1);
  border: none;
  border-radius: 5px;
  width: 90%;
  padding: 1.5rem 2.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.25s ease-in-out;
  &:hover {
    background-color: var(--dark-grey-1);
    color: var(--white-1);
  }
`;

const Btn = styled.button`
  display: block;
  background-color: transparent;
  color: var(--dark-grey-2);
  font-weight: 600;
  font-size: 1.6rem;
  padding: 1.25rem;
  border: 1px solid black;
  border-radius: 5px;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
`;

const Action = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* You can adjust this as needed */
`;

const Information = styled.div`
  margin-top: 3.5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top: 1px solid var(--dark-grey-5);
  border-bottom: 1px solid var(--dark-grey-5);
  color: var(--dark-grey-2);
`;

const Description = styled.p`
  line-height: 1.5;
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const Head = styled.p`
  line-height: 1.5;
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2rem;
`;

const Info = styled.ul`
  line-height: 1.5;
  font-size: 1.4rem;
  margin-left: 2rem;
`;

function ProductPage() {
  const { productId } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const {
    data: product, // Default empty array to avoid mapping on undefined
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  const {
    _id: id,
    title,
    description,
    category,
    mainCategory,
    subCategory,
    info,
    imageCount,
    name,
    sizes,
    price,
    discount,
    sale,
    new: isNew,
  } = product ?? {};

  const imageNumbers = Array.from({ length: imageCount }, (_, i) => i + 1);
  const discountedPrice = parseFloat(
    (price - price * (discount / 100)).toFixed(2)
  );

  let imageUrl = "";
  if (category === "wetsuits") {
    imageUrl = `/${category}/${mainCategory}`;
  } else {
    imageUrl = `/${category}/${mainCategory}/${subCategory}`;
  }

  const { auth, setAuth } = useAuth();
  const cartItems = auth && auth.user ? auth.user.cart : [];
  const token = auth && auth.token ? auth.token : "";

  const { mutate: addItem, isPending } = useMutation({
    mutationFn: ({ productId, size, quantity, price, token }) =>
      addItemAPI({ productId, size, quantity, price, token }),
    onSuccess: (data) => {
      const user = data.data.user;
      setAuth((prevAuth) => ({ ...prevAuth, user }));
      toast.success("Product Added to cart successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function handleClick() {
    if (!auth) {
      toast.error("You have to login first to add items in cart");
      return;
    }

    if (selectedSize === "") {
      toast.error("Please select a size");
      return;
    }

    const itemExists = cartItems.some(
      (item) => item.productId === id && item.size === selectedSize
    );

    if (itemExists) {
      toast.error("This item of this size is already added to cart");
      return;
    }

    addItem({
      productId: id,
      size: selectedSize,
      quantity: 1,
      price: discountedPrice,
      token,
    });
  }

  // Loading or Error Handling
  if (isLoading) {
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );
  }

  if (error) {
    return (
      <CenteredContainer>
        <p>Error: {error.message}</p>
      </CenteredContainer>
    );
  }

  return (
    <Container>
      <ImageSection>
        {imageNumbers.map((num, index) => (
          <ImageBox key={index} style={num === 1 ? { gridColumn: "1/-1" } : {}}>
            <Image src={`${imageUrl}/${id}-pic${num}.png`} alt={title} />
          </ImageBox>
        ))}
      </ImageSection>
      <ContentSection>
        <Tags>
          {discount > 0 && <Discount>{`-${discount}%`}</Discount>}
          {sale && <Sale>Sale</Sale>}
          {isNew && <New>New</New>}
        </Tags>
        <Category>{title}</Category>
        <Heading>{name}</Heading>
        <DiscountPrice>${discountedPrice.toFixed(2)}</DiscountPrice>
        {discount > 0 && <OriginalPrice>${price}</OriginalPrice>}

        <SizeBox>
          <SelectSize>
            Select Size: <span>{selectedSize}</span>
          </SelectSize>
          <DropDown
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {sizes?.map((sizeObj) => (
              <Option
                key={sizeObj.size}
                value={sizeObj.size}
                disabled={sizeObj.quantity === 0}
              >
                {sizeObj.size} {sizeObj.quantity === 0 ? "(Out of stock)" : ""}
              </Option>
            ))}
          </DropDown>
        </SizeBox>
        <Action>
          <Button onClick={handleClick}>Add to cart</Button>
          <Btn>
            <HiHeart />
          </Btn>
        </Action>
        <Information>
          <Head>Product Information</Head>
          <Description>{description}</Description>
          <Info>
            {info?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </Info>
        </Information>
      </ContentSection>
    </Container>
  );
}

export default ProductPage;
