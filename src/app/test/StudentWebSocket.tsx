'use client';

import { useEffect, useState } from 'react';

const StudentWebSocket = ({ studentID }: { studentID: string }) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws/student/${studentID}`);

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      console.log('WebSocket Message:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onclose = () => {
      console.log('❌ WebSocket closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => ws.close();
  }, [studentID]);

  return (
    <div>
      <h2>📢 Notifications</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentWebSocket;
