import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Product from "./Product";
import SubHeading from "./SubHeading";
import { getProducts } from "../services/apiTopProducts";
import { useQuery } from "@tanstack/react-query";
import Spinner from "./Spinner";

const Container = styled.div`
  margin: 5rem;
  color: var(--dark-grey-2);
`;

const MainCategory = styled.h1`
  color: inherit;
  font-size: 4.8rem;
  margin-bottom: 2rem;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* You can adjust this as needed */
`;

const Description = styled.p`
  color: inherit;
  font-size: 1.4rem;
  line-height: 1.5;
  margin-bottom: 2.5rem;
`;

const FilterBox = styled.div`
  border: 1px solid black;
  height: 10rem;
  margin-bottom: 2rem;
`;

const CategoryBox = styled.div`
  margin-block: 5rem;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
`;

const formatTitle = (category, mainCategory) => {
  const genderMap = {
    mens: "Men's",
    womens: "Women's",
    kids: "Kids'",
    wetsuits: "",
  };

  const formattedCategory =
    mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1);

  return `${genderMap[category]} ${formattedCategory}`;
};

function CategoryPage() {
  const { category, mainCategory } = useParams();

  const {
    data: products = [], // Default empty array to avoid mapping on undefined
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", category, mainCategory],
    queryFn: () => getProducts(category, mainCategory),
  });

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

  const productsBySubCategory = products.reduce((acc, product) => {
    const { subCategory } = product;
    if (!acc[subCategory]) acc[subCategory] = [];
    acc[subCategory].push(product);
    return acc;
  }, {});

  const description = {
    mens: {
      clothing:
        "Redefine your wardrobe with our premium collection of men's clothing at Attire. From casual tees and stylish shirts to cozy sweaters and sharp suits, we offer something for every occasion. Our collection features top brands like Levi's, Quiksilver, and Dickies, ensuring unmatched quality and style. Whether you're dressing for a formal event or a laid-back weekend, explore our versatile range that combines comfort and fashion effortlessly. Shop at Attire to find your signature look and elevate your everyday style.",
      accessories:
        "Complete your outfit with our curated range of men's accessories at Attire. From sleek belts and versatile hats to functional backpacks and wallets, we have everything to add a finishing touch to your style. Featuring top brands like Columbia, Billabong, and Quiksilver, our accessories are designed to be both practical and fashionable. Whether you're heading to work or out on an adventure, find the perfect accessory to complement your look at Attire.",
      footwear:
        "Step into style with our diverse collection of men's shoes at Attire. From rugged boots to sleek loafers and casual sneakers, we offer footwear for every occasion. Our range features renowned brands like Vans, Converse, and Timberland, ensuring premium quality and comfort. Whether you're exploring the outdoors or hitting the city streets, find the perfect pair that combines functionality and fashion. Shop now at Attire and put your best foot forward.",
      jeans:
        "Discover your perfect fit with our wide selection of men's jeans at Attire. Whether you're into slim, straight, or relaxed styles, our jeans are crafted from high-quality materials for lasting comfort and durability. Featuring iconic brands like Levi's, Wrangler, and Volcom, our collection blends timeless styles with modern trends. Perfect for any occasion, from casual outings to semi-formal settings. Find your next go-to pair at Attire and experience unbeatable quality and style.",
      jackets:
        "Stay warm and stylish with our premium collection of men's jackets at Attire. Whether you're braving the cold or adding a layer of flair, our jackets deliver both functionality and fashion. Featuring trusted brands like Columbia, Dickies, and Quiksilver, our range is crafted with high-quality materials for ultimate comfort and durability. Perfect for adventures, casual wear, or formal occasions. Shop at Attire and find your ideal jacket to suit any season.",
    },
    womens: {
      clothing:
        "Refresh your wardrobe with our elegant collection of women's clothing at Attire. From chic dresses and cozy knits to versatile tops and tailored blazers, we have something for every occasion. Featuring renowned brands like Levi's, Billabong, and Volcom, our clothing combines comfort, style, and quality. Whether you're dressing for a casual day out or a formal evening event, explore our range to find the perfect pieces that reflect your unique style. Shop now at Attire to redefine your fashion journey.",
      accessories:
        "Elevate your look with our exquisite range of women's accessories at Attire. From stylish scarves and handbags to functional backpacks and jewelry, we offer a variety of options to complete your outfit. Featuring brands like Cotopaxi, Columbia, and Billabong, our accessories are designed to enhance both practicality and elegance. Perfect for daily wear or special occasions, discover the perfect additions to your wardrobe at Attire.",
      footwear:
        "Step into comfort and style with our stunning collection of women's shoes at Attire. From trendy sneakers and chic heels to durable boots and comfy sandals, we have footwear for every season and occasion. Featuring trusted brands like Vans, Converse, and Timberland, our range offers the perfect blend of quality, fashion, and functionality. Whether you're walking the city streets or heading to a formal event, find your ideal pair at Attire.",
      jeans:
        "Find your perfect fit with our stylish collection of women's jeans at Attire. From skinny and straight cuts to relaxed and wide-leg styles, our jeans are designed to flatter every silhouette. Featuring top brands like Levi's, Wrangler, and Volcom, our collection blends timeless classics with modern trends. Perfect for casual days, nights out, or anything in between, upgrade your wardrobe with durable and versatile jeans from Attire.",
      jackets:
        "Stay cozy and fashionable with our exclusive collection of women's jackets at Attire. Whether you need a lightweight layer for cool evenings or a heavy coat for winter chills, our jackets provide the perfect blend of function and flair. Featuring premium brands like Columbia, Cotopaxi, and Billabong, our range is crafted with high-quality materials for lasting warmth and style. Discover your new favorite jacket for any occasion at Attire.",
    },
  };

  return (
    <Container>
      <MainCategory>{formatTitle(category, mainCategory)}</MainCategory>
      <Description>{description[category][mainCategory]}</Description>

      {/* Render a CategoryBox for each subCategory */}
      {Object.keys(productsBySubCategory).map((subCategory) => (
        <CategoryBox key={subCategory}>
          <SubHeading>{subCategory}</SubHeading>
          <CategoryGrid>
            {productsBySubCategory[subCategory].map((product) => (
              <Product product={product} key={product.id} />
            ))}
          </CategoryGrid>
        </CategoryBox>
      ))}
    </Container>
  );
}

export default CategoryPage;
