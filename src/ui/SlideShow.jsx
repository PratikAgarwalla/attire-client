import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// Sample data array for the slideshow
const slides = [
  {
    src: `${import.meta.env.VITE_IMAGE_URL}/slide2.png`,
    title: "See you in the lineup",
    subTitle:
      "Gear up for your next surf session with our premium wetsuits and accessories.",
    buttons: [{ name: "Shop wetsuits", link: "/wetsuits" }],
  },
  {
    src: `${import.meta.env.VITE_IMAGE_URL}/slide1.png`,
    title: "Autumn Fits",
    subTitle: "Check out the new autumn attires for both men and women.",
    buttons: [
      { name: "Shop mens", link: "/mens" },
      { name: "Shop Womens", link: "/womens" },
    ],
  },
];

const SlideshowContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 8rem);
  overflow: hidden;
`;

const SlideImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
`;

// Overlay on top of the image
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Black overlay with 40% opacity */
  z-index: 1;
`;

const SlideContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--white-1); /* White color for text */
  z-index: 10;
`;

const Heading = styled.h1`
  font-size: 6.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const SubHeading = styled.p`
  font-size: 2rem;
  margin-bottom: 5rem;
  font-weight: 500;
`;

const Button = styled(Link)`
  background-color: var(--white-1); /* Black background */
  color: var(--dark-grey-1); /* White text */
  border: none;
  border-radius: 5px;
  padding: 1.2rem 3rem;
  margin: 0 1rem;
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

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--dark-grey-1); /* Black background */
  color: var(--white-1); /* White arrow */
  border: none;
  padding: 1rem;
  cursor: pointer;
  border-radius: 50%;
  font-size: 1.6rem;
  z-index: 10;
  &:hover {
    background-color: var(--dark-grey-3); /* Dark Grey on hover */
  }

  ${(props) => props.left && `left: 20px;`}
  ${(props) => props.right && `right: 20px;`}
`;

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { src, title, subTitle, buttons } = slides[currentSlide];

  return (
    <SlideshowContainer>
      <SlideImageWrapper>
        <SlideImage src={src} alt={`Slide ${currentSlide + 1}`} />
      </SlideImageWrapper>
      <Overlay />
      <SlideContent>
        <Heading>{title}</Heading>
        <SubHeading>{subTitle}</SubHeading>
        {buttons.map((button, index) => (
          <Button key={index} to={button.link}>
            {button.name}
          </Button>
        ))}
      </SlideContent>
      <ArrowButton left onClick={handlePrevSlide}>
        ←
      </ArrowButton>
      <ArrowButton right onClick={handleNextSlide}>
        →
      </ArrowButton>
    </SlideshowContainer>
  );
};

export default Slideshow;
