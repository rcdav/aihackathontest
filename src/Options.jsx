import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Options.css';

const Options = () => {
  const [springItems, setSpringItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const recognitionRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    fetch('/clothing.json')
      .then((response) => response.json())
      .then((data) => {
        const springItems = data.filter(item => item.season.trim().toLowerCase() === 'spring');
        setSpringItems(springItems);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (springItems.length > 0) {
      speakDescription(springItems[currentIndex].description);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Stop speaking when the component unmounts
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop(); // Stop listening when the component unmounts
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear timeout if the component unmounts
      }
    };
  }, [currentIndex, springItems]);

  const speakDescription = (description) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.onend = () => {
        startListening();
      };
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser.');
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        handleVoiceCommand(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
      };

      recognition.onend = () => {
        console.log('Speech recognition service disconnected');
      };

      recognition.start();

      // Stop listening after 5 seconds
      timeoutRef.current = setTimeout(() => {
        recognition.stop();
      }, 5000);
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  };

  const handleVoiceCommand = (command) => {
    if (command.includes('next')) {
      handleNext();
    } else if (command.includes('previous')) {
      handlePrevious();
    } else if (command.includes('view item')) {
      window.open(springItems[currentIndex].URL, '_blank');
    } else {
      console.log('Command not recognized: ', command);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % springItems.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + springItems.length) % springItems.length);
  };

  if (springItems.length === 0) return <div>Loading...</div>;

  return (
    <div className="options-container">
      <div className="header-container">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="logo" />
        </Link>
        <h1 className="options-title">recommendations for you</h1>
        <Link to="/shoppingcart">
          <img src="/shopcart.png" alt="shopcart" className="shopcart" />
        </Link>
      </div>

      <div className="carousel-container">
        <button onClick={handlePrevious} className="nav-button">Previous</button>
        <div className="carousel-wrapper">
          <AnimatePresence>
            <motion.div
              key={springItems[currentIndex].title}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="carousel-item"
            >
              <img src={springItems[currentIndex].image} alt={springItems[currentIndex].title} />
              <h2>{springItems[currentIndex].title}</h2>
              <p>{springItems[currentIndex].description}</p>
              <div className="buttons">
                <a href={springItems[currentIndex].URL} target="_blank" rel="noopener noreferrer">View Item</a>
                <a href="./Options" rel="noopener noreferrer">Add to Cart</a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={handleNext} className="nav-button">Next</button>
      </div>
    </div>
  );
};

export default Options;
