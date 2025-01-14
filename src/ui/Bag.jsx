import React, { useState, useEffect } from "react";
import { HiShoppingBag } from "react-icons/hi";
import styled from "styled-components";
import { createPortal } from "react-dom";
import CartItem from "./CartItem";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { updateCartAPI } from "../services/apiCart";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BagButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  color: inherit;
  text-decoration: none;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: var(--white-4);
    cursor: pointer;
  }
`;

// Overlay the entire viewport with Container
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

const CartBox = styled.div`
  width: 30%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--white-1);
  color: var(--dark-grey-1);
  transform: translateX(100%);
  transition: all 0.3s ease-in-out;
  z-index: 200;
  display: flex;
  flex-direction: column;

  &.open {
    transform: translateX(0);
  }
`;

const HeaderSection = styled.div`
  width: 100%;
  height: max-content;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const LoginSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
`;

const FooterSection = styled.div`
  width: 100%;
  height: max-content;
  background-color: var(--dark-grey-2);
  color: var(--white-1);
  padding: 2rem;
`;

const MainSection = styled.div`
  margin: 1rem 0;
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 5.5rem;
  color: inherit;
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  line-height: 1;
  padding: 0;

  &:hover {
    color: var(--white-4);
  }
`;

const Btn = styled(Link)`
  background-color: var(--dark-grey-1);
  color: var(--white-1);
  border: none;
  border-radius: 5px;
  padding: 1.2rem 0;
  width: 15rem;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: var(--dark-grey-2);
    cursor: pointer;
  }
`;

const CheckOutBtn = styled.button`
  background-color: var(--white-1);
  color: var(--dark-grey-2);
  font-weight: 700;
  width: 100%;
  text-transform: uppercase;
  padding: 1.5rem 0;
  border: none;
  border-radius: 5px;
  margin: 2rem 0 0 0;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  &:hover {
    background-color: var(--white-3);
  }
`;

function Cart({ onClose, open }) {
  const { auth, setAuth } = useAuth();
  const token = auth && auth.token ? auth.token : "";
  const [cartItems, setCartItems] = useState(auth ? auth.user.cart : []);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: ({ cartItems, token }) => updateCartAPI({ cartItems, token }),
    onSuccess: (data) => {
      setAuth((prevAuth) => ({ ...prevAuth, user: data.data.user }));
      toast.success("Cart updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (auth) {
      setCartItems(auth.user.cart);
    }
  }, [auth]);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setTotal(newTotal.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleUpdateQuantity = (product, action) => {
    const updatedCart = cartItems.map((item) => {
      if (item.productId === product) {
        return action === "increase"
          ? { ...item, quantity: item.quantity + 1 }
          : action === "decrease" && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      }
      return item;
    });
    setCartItems(updatedCart);
    updateCart({ cartItems: updatedCart, token });
  };

  const handleRemoveItem = (product) => {
    const updatedCart = cartItems.filter((item) => item.productId !== product);
    setCartItems(updatedCart);
    updateCart({ cartItems: updatedCart, token });
  };

  const handleCheckOut = () => {
    const items = cartItems.length;

    if (items === 0) {
      toast.error("You don't have any item in your bag. Go Shopping");
      onClose();
      return;
    }
    onClose();
    navigate("/checkout");
  };

  return createPortal(
    <Container open={open}>
      <Overlay onClick={onClose} />
      <CartBox className={open ? "open" : ""}>
        {auth ? (
          <>
            <HeaderSection>
              <h1>Your Bag</h1>
              <p
                style={{
                  fontSize: "1.4rem",
                  marginTop: "1rem",
                  paddingLeft: ".25rem",
                }}
              >
                Items : <span>{cartItems.length}</span>
              </p>
              <CloseButton onClick={onClose}>×</CloseButton>
            </HeaderSection>
            <MainSection>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  product={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </MainSection>
            <FooterSection>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>Sub-Total</h3>
                <h3>${total}</h3>
              </div>
              <p
                style={{
                  color: "var(--dark-grey-5)",
                  marginTop: "1rem",
                  fontSize: "1.4rem",
                }}
              >
                Shipping, discounts & tax calculated at checkout
              </p>
              <CheckOutBtn onClick={handleCheckOut}>
                Checkout Securely
              </CheckOutBtn>
            </FooterSection>
          </>
        ) : (
          <LoginSection>
            <h2>You are not Logged in</h2>
            <Btn to="/login">login</Btn>
            <CloseButton onClick={onClose}>×</CloseButton>
          </LoginSection>
        )}
      </CartBox>
    </Container>,
    document.body
  );
}

function Bag() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <BagButton onClick={() => setOpen((prev) => !prev)}>
        <HiShoppingBag /> Bag
      </BagButton>
      <Cart open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Bag;
