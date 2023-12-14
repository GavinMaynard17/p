import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  const location = useLocation();
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navItemRefs = useRef([]);

  useEffect(() => {
    const activeItem = navItemRefs.current.find(item => item && item.getAttribute('href') === location.pathname);
    if (activeItem) {
      updateUnderlineStyle(activeItem);
    }
  }, [location]);

  const updateUnderlineStyle = (element) => {
    setUnderlineStyle({
      left: element.offsetLeft,
      width: element.offsetWidth
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const activeItem = navItemRefs.current.find(item => item && item.getAttribute('href') === location.pathname);
      if (activeItem) {
        updateUnderlineStyle(activeItem);
      }
    };
  
    // Attach the event listener
    window.addEventListener('resize', handleResize);
  
    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location]);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo-link">
            Your Logo
          </Link>
          <div className="nav-links">
            {['/', '/about', '/projects', '/contact'].map((path, index) => (
              <NavLink
              key={path}
              to={path}
              label={path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2) || 'Home'}
              ref={el => navItemRefs.current[index] = el}
            />
            ))}
            <div className="underline" style={underlineStyle} />
          </div>
        </div>
      </nav>

    </div>
  );
};

const NavLink = React.forwardRef(({ to, label }, ref) => {
  return (
    <Link to={to} className="link" ref={ref}>
      {label}
    </Link>
  );
});

export default Navbar;