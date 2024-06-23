// src/VoiceChat.jsx
import React, { useState, useEffect } from 'react';

function VoiceChat() {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);

  const connectToHume = async () => {
    const ws = new WebSocket('wss://api.hume.ai/your-endpoint', [
      'protocolYouNeed', // Update with actual protocols or tokens
    ]);

    ws.onopen = () => {
      console.log('Connected to Hume WebSocket');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);
      setMessages(prev => [...prev, data]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    setConnection(ws);
  };

  useEffect(() => {
    connectToHume();
    return () => connection?.close();
  }, []);

  return (
    <div>
      {/* <h1>Conversation with Hume AI</h1> */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.type === 'response' ? msg.text : 'You: ' + msg.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default VoiceChat;
