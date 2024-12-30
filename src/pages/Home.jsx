import React from "react";

import ProductSection from "../ui/ProductSection";
import Slideshow from "../ui/SlideShow";
import SectionProduct from "../ui/SectionProduct";

function Home() {
  return (
    <>
      <Slideshow />
      <ProductSection />
      <SectionProduct category="mens" />
      <SectionProduct category="womens" />
      <SectionProduct category="wetsuits" />
    </>
  );
}

export default Home;
