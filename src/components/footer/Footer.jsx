import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import style from "./footer.module.scss";

const Footer = () => {
  return (
    <div className={style.footers}>
      <div className={style.footerContainer}>
        <div className={style.footerColumn}>
          <h3>About Us</h3>
          <a href="/about">Company Info</a>
          <a href="/team">Our Team</a>
          <a href="/careers">Careers</a>
          <a href="/blog">Blog</a>
        </div>

        <div className={style.footerColumn}>
          <h3>Services</h3>
          <a href="/services">Web Development</a>
          <a href="/services">Mobile Apps</a>
          <a href="/services">Design Solutions</a>
          <a href="/services">SEO Services</a>
        </div>
        <div className={style.footerColumn}>
          <h3>Contact Us</h3>
          <a href="mailto:support@example.com">zeynebquliyeva2708@gmail.com</a>
          <a href="tel:+1234567890">+994 55 342 42 59</a>
          <a href="/contact">Contact Form</a>
        </div>

        <div className={style.footerColumn}>
          <h3>Follow Us</h3>
          <div className={style.footerSocials}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={style.facebook}>
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={style.instagram}>
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={style.twitter}>
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={style.linkedin}>
              <FaLinkedin />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={style.youtube}>
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className={style.footerBottom}>
        <p>&copy; 2025 YourCompany. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
