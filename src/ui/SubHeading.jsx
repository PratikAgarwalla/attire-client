import styled from "styled-components";
import React from "react";

const SubCategoryContainer = styled.div`
  display: flex;
  align-items: center; /* Vertically align the subheading and lines */
  justify-content: center; /* Center the subheading horizontally */
  width: 100%; /* Full width of the container */
  margin-bottom: 3.5rem;
`;

const SubCategory = styled.h2`
  display: inline-block;
  color: inherit;
  font-size: 3.6rem;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 2rem; /* Add space between the lines and the text */
  text-decoration: none;
  white-space: nowrap; /* Prevent text from wrapping */
`;

const Line = styled.hr`
  flex-grow: 1; /* Allow the line to stretch and fill the remaining space */
  border: none;
  border-top: 1px solid #000; /* Style the line */
  height: 1px;
`;

function SubHeading({ children }) {
  return (
    <SubCategoryContainer>
      <Line /> {/* Use the Line component here */}
      <SubCategory>{children}</SubCategory>
      <Line /> {/* Use the Line component here */}
    </SubCategoryContainer>
  );
}

export default SubHeading;
