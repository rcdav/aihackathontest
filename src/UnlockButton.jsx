// UnlockButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UnlockButton.css';

export default function UnlockButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/options');
  };

  return (
    <button onClick={handleClick} className="new-button">
      View My Options
    </button>
  );
}
