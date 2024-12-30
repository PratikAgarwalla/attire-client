import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTiktok,
  FaEnvelope,
} from "react-icons/fa";

// Styled Components
const FooterWrapper = styled.footer`
  background-color: var(--dark-grey-2);
  color: var(--white-1);
  padding: 3.5rem 5rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Section = styled.div`
  flex: 1;
  min-width: 150px;
  margin-right: 2rem;
`;

const SectionTitle = styled.h3`
  color: var(--white-1);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const FooterLink = styled.p`
  display: block;
  width: max-content;
  color: var(--white-1);
  text-decoration: none;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column; // Arrange icons in a column
`;

const IconLink = styled.a`
  color: var(--white-1);
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpSection = styled.div`
  flex: 2;
  max-width: 300px;
`;

const InputField = styled.input`
  padding: 1rem;
  width: 80%;
  border: none;
  font-size: 1.4rem;
  margin-right: 1rem;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: var(--dark-grey-2);
  color: var(--white-1);
  font-size: 1.4rem;
  border: 1px solid var(--white-1);
  border-radius: 5px;
  cursor: pointer;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
`;

function Footer() {
  return (
    <FooterWrapper>
      <Section>
        <SectionTitle>Help & Info</SectionTitle>
        <FooterLink>About Us</FooterLink>
        <FooterLink>Contact Us</FooterLink>
        <FooterLink>Delivery</FooterLink>
        <FooterLink>Returns</FooterLink>
        <FooterLink>FAQs</FooterLink>
        <FooterLink>Careers</FooterLink>
        <FooterLink>T&Cs</FooterLink>
        <FooterLink>Privacy Policy</FooterLink>
      </Section>
      <Section>
        <SectionTitle>Shop</SectionTitle>
        <FooterLink>Mens</FooterLink>
        <FooterLink>Womens</FooterLink>
        <FooterLink>Kids</FooterLink>
        <FooterLink>Wetsuits</FooterLink>
        <FooterLink>Boardsports</FooterLink>
        <FooterLink>Brands</FooterLink>
        <FooterLink>Outlet</FooterLink>
        <FooterLink>Store Locator</FooterLink>
      </Section>
      <Section>
        <SectionTitle>Follow Us</SectionTitle>
        <SocialIcons>
          <IconLink target="_blank" href="https://www.facebook.com">
            <FaFacebookF />
            <span>Facebook</span>
          </IconLink>
          <IconLink target="_blank" href="https://www.instagram.com">
            <FaInstagram />
            <span>Instagram</span>
          </IconLink>
          <IconLink target="_blank" href="https://www.pinterest.com">
            <FaPinterestP />
            <span>Pinterest</span>
          </IconLink>
          <IconLink target="_blank" href="https://www.tiktok.com">
            <FaTiktok />
            <span>TikTok</span>
          </IconLink>
          <IconLink target="_blank" href="mailto:info@example.com">
            <FaEnvelope />
            <span>Email</span>
          </IconLink>
        </SocialIcons>
      </Section>

      <Section>
        <SectionTitle>Contact</SectionTitle>
        <P>
          <a href="mailto:attire.connect@gmail.com">attire.connect@gmail.com</a>
        </P>
        <P>01208 869923</P>
        <P>Mon to Fri 9am - 5pm GMT</P>
      </Section>
      <SignUpSection>
        <SectionTitle>Sign Up</SectionTitle>
        <P style={{ marginBottom: "2.5rem" }}>
          Sign up for 10% off your first order and keep up to date with all
          things Attire Clothing.
        </P>
        <div>
          <InputField type="email" placeholder="Email address" />
          <Button>→</Button>
        </div>
      </SignUpSection>
    </FooterWrapper>
  );
}

export default Footer;
