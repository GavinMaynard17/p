import React, { useState, useEffect, useRef } from 'react';
import './Contact.scss';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const contentEditableRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);
  const [animationInProgress, setAnimationInProgress] = useState(true);
  const pauseDuration = 1500; // Adjust the pause duration after hitting Enter

  const handleUserInput = () => {
    if (typingFinished) {
      let newText = typedText; // Declare newText outside the if statement
      const containerWidth = contentEditableRef.current.offsetWidth;
      const textWidth = contentEditableRef.current.scrollWidth;

      if (textWidth > containerWidth) {
        // Text exceeds container width
        const words = newText.split(' ');
        words.pop(); // Remove the last word
        newText = words.join(' ');

        setTypedText(newText);
        moveCursorToEnd();
      }

      if (textWidth > containerWidth && newText.trim() === '') {
        // No original text left, move cursor down
        setTypedText('');
        moveCursorDown();
      }
    }
  };

  const moveCursorDown = () => {
    setTypedText((prevText) => prevText + '\n'); // Start a new line
    moveCursorToEnd();
  };

  const moveCursorToEnd = () => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(contentEditableRef.current);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!animationInProgress) {
        setTypedText('');
        setAnimationInProgress(true);
        setTypingFinished(false);
        contentEditableRef.current && (contentEditableRef.current.contentEditable = false);

        // Restart the typing animation after a brief pause
        const aboutText = "  Contact me!";
        let index = 0;
        const timerIds = [];

        const typeText = () => {
          if (index < aboutText.length) {
            setTypedText((prevText) => prevText + aboutText.charAt(index));
            index += 1;
            timerIds.push(setTimeout(typeText, 150)); // Adjust the typing speed here
          } else {
            setTypingFinished(true);
            setAnimationInProgress(false);
            contentEditableRef.current && (contentEditableRef.current.contentEditable = true);
            contentEditableRef.current && contentEditableRef.current.focus();
            contentEditableRef.current && moveCursorToEnd();
          }
        };

        setTimeout(() => {
          typeText();
        }, pauseDuration);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gather user input
    const userData = {
      name,
      email,
      message,
    };

    // Send email (you need to implement this part on the server side)
    sendEmail(userData);

    // Update state to indicate form submission
    setFormSubmitted(true);
  };

  const sendEmail = async (userData) => {
    try {
      const response = await fetch('/api/send-email', {//change the api thing for actual emailing
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  useEffect(() => {
    // Start typing "About me!" when the component mounts
    const aboutText = "C ontact me!";
    let index = 0;
    const timerIds = [];

    const typeText = () => {
      if (index < aboutText.length) {
        setTypedText((prevText) => prevText + aboutText.charAt(index));
        index += 1;
        timerIds.push(setTimeout(typeText, 150)); // Adjust the typing speed here
      } else {
        setTypingFinished(true);
        setAnimationInProgress(false);
        contentEditableRef.current && (contentEditableRef.current.contentEditable = true);
        contentEditableRef.current && contentEditableRef.current.focus();
        contentEditableRef.current && moveCursorToEnd();
      }
    };

    timerIds.push(setTimeout(() => typeText(), 1000)); // Initial delay before starting the typing effect

    // Add event listener for keydown
    if (contentEditableRef.current) {
      contentEditableRef.current.addEventListener('keydown', handleKeyDown);
    }

    // Cleanup the event listener and timers on component unmount
    return () => {
      if (contentEditableRef.current) {
        contentEditableRef.current.removeEventListener('keydown', handleKeyDown);
      }
      timerIds.forEach((id) => clearTimeout(id));
    };
  }, [contentEditableRef]);

  return (
    <div className="contact-container">
      <h2>
        <span ref={contentEditableRef} contentEditable={false} onInput={handleUserInput} onKeyDown={handleKeyDown}>
          {typedText}
        </span>
        <span className="cursor"></span>
      </h2>

      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Message:
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <h2>Thank you for your submission!</h2>
      )}
    </div>
  );
};

export default Contact;