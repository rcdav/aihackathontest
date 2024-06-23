// MicButton.js
import React, { useRef, useEffect, useState } from 'react';
import './MicButton.css';

const MicButton = ({ onClick }) => {
  const canvasRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    let width = canvas.width;
    let height = canvas.height;
    let x = 0;
    let amplitude = 20;
    let frequency = 0.15;
    let speed = 0.1;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let i = 0; i < width; i++) {
        let y = height / 2 + Math.sin(i * frequency + x) * amplitude;
        ctx.lineTo(i, y);
      }

      ctx.strokeStyle = '#ffffff'; // White color for contrast
      ctx.stroke();

      x += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    if (isAnimating) {
      draw();
    } else {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrameId);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAnimating]);

  const handleClick = () => {
    setIsAnimating((prev) => !prev);
    onClick();
  };

  return (
    <div className="mic-container" onClick={handleClick}>
      <button className="mic-button">
        <span className={isAnimating ? 'listening pulsate' : ''}>
          {isAnimating ? <b>Listening...</b> : <img src="/mic.png" alt="Click to match your vibe" />}
        </span>
      </button>
      <canvas ref={canvasRef} className="soundwave-canvas"></canvas>
    </div>
  );
};

export default MicButton;
