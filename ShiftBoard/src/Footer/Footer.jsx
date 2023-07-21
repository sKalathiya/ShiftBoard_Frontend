import React from "react";
import "./Footer.css"; // Make sure to import your CSS file for styling

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ backgroundColor: "#2C3E50", color: "#FFFFFF" }}
    >
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Shift Management App</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
