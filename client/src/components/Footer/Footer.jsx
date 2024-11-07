import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>CookBook</h3>
          <p>
            Discover and share delicious recipes from around the world. Join our
            community of food lovers and cooking enthusiasts.
          </p>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/category/starters">Starters</Link>
            </li>
            <li>
              <Link to="/category/main-courses">Main Courses</Link>
            </li>
            <li>
              <Link to="/category/side-dishes">Side Dishes</Link>
            </li>
            <li>
              <Link to="/category/desserts">Desserts</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li>
              <Link to="/recipes">All Recipes</Link>
            </li>
            <li>
              <Link to="/popular">Popular Recipes</Link>
            </li>
            <li>
              <Link to="/recent">Recent Recipes</Link>
            </li>
            <li>
              <Link to="/seasonal">Seasonal Dishes</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <div className="newsletter-container">
            <h3>Stay Updated</h3>
            <div className="newsletter-form">
              <div className="input-wrapper">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email subscription"
                />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="Pinterest">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-links">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>
        <p>&copy; {currentYear} CookBook. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
