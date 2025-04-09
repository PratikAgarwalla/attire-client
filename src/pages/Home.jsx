import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ProductSection from "../ui/ProductSection";
import Slideshow from "../ui/SlideShow";
import SectionProduct from "../ui/SectionProduct";

// Styled components for the modal
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: #fff; /* White background */
//   color: #000; /* Black text */
//   padding: 20px 30px;
//   border-radius: 10px;
//   text-align: center;
//   box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
//   max-width: 400px;
//   width: 80%;
// `;

// const DismissButton = styled.button`
//   background: #000; /* Black background */
//   color: #fff; /* White text */
//   border: none;
//   padding: 10px 20px;
//   font-size: 16px;
//   font-weight: bold;
//   border-radius: 5px;
//   cursor: pointer;
//   margin-top: 15px;

//   &:hover {
//     background: #333; /* Darker black on hover */
//   }
// `;

// Utility functions to manage cookies
// const setCookie = (name, value) => {
//   const date = new Date();
//   date.setTime(date.getTime() + 60 * 60 * 1000);
//   document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
// };

// const getCookie = (name) => {
//   const cookies = document.cookie.split("; ");
//   const cookie = cookies.find((c) => c.startsWith(`${name}=`));
//   return cookie ? cookie.split("=")[1] : null;
// };

function Home() {
  // const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   // Check if the cookie is set; if not, show the message
  //   if (!getCookie("messageDismissed")) {
  //     setShowMessage(true);
  //   }
  // }, []);

  // const dismissMessage = () => {
  //   setShowMessage(false);
  //   setCookie("messageDismissed", "true"); // Set expiry to 7 days
  // };

  return (
    <div>
{/*       {showMessage && (
        <ModalOverlay>
          <ModalContent>
            <p>
              Images may take a few seconds to load. Till then explore the rest!
            </p>
            <DismissButton onClick={dismissMessage}>Dismiss</DismissButton>
          </ModalContent>
        </ModalOverlay>
      )} */}
      <>
        <Slideshow />
        <ProductSection />
        <SectionProduct category="mens" />
        <SectionProduct category="womens" />
        <SectionProduct category="wetsuits" />
      </>
    </div>
  );
}

export default Home;
