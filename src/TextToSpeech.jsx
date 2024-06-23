import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to read out"
        rows="4"
        cols="50"
      />
      <button onClick={speakText}>Read Text</button>
    </div>
  );
};

export default TextToSpeech;
