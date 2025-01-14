import React from "react";
import styled from "styled-components";

// Styled component for the banner container
const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px; /* Set height for the banner */
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled component for the title
const BannerTitle = styled.h1`
  color: white;
  font-size: 7.5rem;
  text-transform: uppercase;
  z-index: 1;
  text-align: center;
`;

// Optional overlay to darken the image for better text readability
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25); /* Darkens the image */
  z-index: 0;
`;

const Banner = ({ imageUrl, title }) => {
  return (
    <BannerContainer imageUrl={imageUrl}>
      <Overlay />
      <BannerTitle>{title}</BannerTitle>
    </BannerContainer>
  );
};

export default Banner;
