import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2025 FlavorFlow. All rights reserved.</p>
      <div className="social-links">
        <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
