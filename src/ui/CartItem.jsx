import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getProduct } from "../services/apiTopProducts";

const ItemContainer = styled.div`
  width: 100%;
  height: 15rem;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const ImageBox = styled.div`
  flex: 1;
  background-color: var(--white-3);
  border-radius: 5px;
  overflow: hidden;
`;

const ContentBox = styled.div`
  margin-left: 2rem;
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Size = styled.span`
  color: var(--white-5);
  font-size: 1.4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  margin-right: 1.5rem;
`;

const QuantityBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;

  button {
    background: transparent;
    border: none;
    font-size: 1.6rem;
    cursor: pointer;
    margin: 0 0.5rem;
  }

  span {
    font-weight: bold;
    font-size: 1.4rem;
  }
`;

const RemoveBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.4rem;
  color: var(--white-5);
  cursor: pointer;
  text-decoration: underline;
`;

function CartItem({ product, onUpdateQuantity, onRemoveItem }) {
  const { price, productId, quantity, size } = product;
  const {
    data: productDetails, // Default empty array to avoid mapping on undefined
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
    discount,
    sale,
    new: isNew,
  } = productDetails ?? {};

  let imageUrl = "";
  if (category === "wetsuits") {
    imageUrl = `/${category}/${mainCategory}`;
  } else {
    imageUrl = `/${category}/${mainCategory}/${subCategory}`;
  }

  return (
    <ItemContainer>
      <ImageBox>
        <img src={`${imageUrl}/${id}-pic1.png`} alt={title} />
      </ImageBox>
      <ContentBox>
        <Title>{name}</Title>
        <Size>Size: {size}</Size>
        <ButtonContainer>
          <QuantityBtn>
            <button onClick={() => onUpdateQuantity(productId, "decrease")}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => onUpdateQuantity(productId, "increase")}>
              +
            </button>
          </QuantityBtn>
          <RemoveBtn onClick={() => onRemoveItem(productId)}>Remove</RemoveBtn>
        </ButtonContainer>
      </ContentBox>
    </ItemContainer>
  );
}

export default CartItem;
