import React from "react";
import styled from "styled-components";
import CategoryCard from "../ui/CategoryCard";
import CategorySection from "../ui/CategorySection";
import SectionProduct from "../ui/SectionProduct";
import Banner from "../ui/Banner";

const categories = [
  {
    image: "/categoryimg5.png",
    title: "Clothing",
    description: "Hoodies, tees, jackets, shorts and more...",
    link: "clothing",
  },
  {
    image: "/categoryimg4.png",
    title: "Jackets",
    description: "Stay warm with a huge range of fleeces, jackets & coats",
    link: "jackets",
  },
  {
    image: "/categoryimg3.png",
    title: "Shoes",
    description: "Vans, New Balance, Dr Marten's, Birkenstock & more!",
    link: "footwear",
  },
  {
    image: "/categoryimg2.png",
    title: "Accessories",
    description: "The finishing touches of all the accessories",
    link: "accessories",
  },
  {
    image: "/categoryimg.png",
    title: "Jeans",
    description: "Stylish and comfortable jeans for every occasion.",
    link: "jeans",
  },
];

function Mens() {
  return (
    <>
      <Banner imageUrl="/mensbanner.jpg" title="mens" />
      <CategorySection categories={categories} />
      <SectionProduct category="mens" mainCategory="clothing" />
      <SectionProduct category="mens" mainCategory="jackets" />
      <SectionProduct category="mens" mainCategory="footwear" />
      <SectionProduct category="mens" mainCategory="accessories" />
      <SectionProduct category="mens" mainCategory="jeans" />
    </>
  );
}

export default Mens;
