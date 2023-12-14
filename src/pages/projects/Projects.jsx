import React, { useState, useEffect, useRef } from 'react';
import './Projects.scss';
import Project from '../../components/project/Project';
import { projects } from '../../data/data';

const Projects = () => {
  const [typedText, setTypedText] = useState('');
  const [typingFinished, setTypingFinished] = useState(false);
  const [animationInProgress, setAnimationInProgress] = useState(true);
  const contentEditableRef = useRef(null);
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
        const aboutText = "  Projects!";
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

  useEffect(() => {
    // Start typing "About me!" when the component mounts
    const aboutText = "P rojects!";
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
  }, [contentEditableRef]); // Add contentEditableRef to the dependency array

  return (
    <div className="projects-container">
      <h2>
        <span ref={contentEditableRef} contentEditable={false} onInput={handleUserInput} onKeyDown={handleKeyDown}>
          {typedText}
        </span>
        <span className="cursor"></span>
      </h2>

      <div className='projects-wrapper'>
        {projects.map((project) => 
          <Project project={project}/>
        )}
      </div>
    </div>
  );
};

export default Projects;