import React from 'react';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="social-links">
        <a href="https://twitter.com/gavinakagmay" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a href="https://www.linkedin.com/in/gavin-maynard-59564a240/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/gavinmaynard17" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
      <div className="copyright">
        &copy; {currentYear} Gavin Maynard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;