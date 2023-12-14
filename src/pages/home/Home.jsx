import React, { useState, useEffect } from 'react';
import './Home.scss';

const Home = () => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const greeting = "H i!";
    const myName = ", I'm Gavin!";
    let index = 0;

    const typeText = () => {
      if (index < greeting.length) {
        setTypedText((prevText) => prevText + greeting.charAt(index));
        index += 1;
        setTimeout(typeText, 150); // Adjust the typing speed here
      } else if (index === greeting.length) {
        setTimeout(() => eraseExclamation(), 1500); // Pause before erasing exclamation
      } else {
        typeMyName();
      }
    };

    const eraseExclamation = () => {
      setTypedText((prevText) => prevText.slice(0, -1));
      index -= 1;
      setTimeout(() => typeMyName(), 1300); // Adjust the pause before typing myName
    };

    const typeMyName = () => {
      const myNamePart1 = ", I'";
      
      if (index < greeting.length + myNamePart1.length) {
        setTypedText((prevText) => prevText + myName.charAt(index - greeting.length));
        index += 1;
        setTimeout(typeMyName, 150); // Adjust the typing speed for the first part
      } else if (index < greeting.length + myName.length-3) {
        setTypedText((prevText) => prevText + myName.charAt(index - greeting.length));
        index += 1;
        setTimeout(typeMyName, 75); // Adjust the typing speed for the second part
      } else if (index < greeting.length + myName.length) {
        setTypedText((prevText) => prevText + myName.charAt(index - greeting.length));
        index += 1;
        const randomDelay = Math.floor(Math.random() * (2500 - 150 + 1)) + 150; // Generate random delay between 150 and 2500
        setTimeout(typeMyName, randomDelay);
      }
    };

    setTimeout(() => typeText(), 1000); // Initial delay before starting the typing effect

  }, []);

  return (
    <div className="home-container">
      <h2>{typedText}<span className="cursor"></span></h2>
      <div className="content">
        <p>
          Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
        </p>
        <img src="your-image-path.jpg" alt="Your Name" className="profile-image" />
      </div>
    </div>
  );
};

export default Home;