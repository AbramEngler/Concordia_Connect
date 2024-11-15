import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessagePage = ({ userId }) => {
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [error, setError] = useState('');
  //const userId = localStorage.getItem('userId'); // Get the logged-in user's ID from localStorage


  // Fetch messages for the logged-in user
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get the logged-in user's ID from localStorage
        const response = await axios.get(`http://localhost:5000/messages/${userId}`);
        setMessages(response.data);
      } catch (err) {
        setError('Error fetching messages');
      }
    };

    if (userId) fetchMessages();
  }, [userId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const senderName = localStorage.getItem('userName'); // Assuming this is saved during login

    try {
      // Send the message to the backend
      const response = await axios.post('http://localhost:5000/message', {
        senderId: userId,
        receiverId,
        senderName,
        receiverName,
        body: messageContent,
      });

      // Add the new message to the messages list (optimistic update)
      setMessages([
        ...messages,
        { senderName, receiverName, body: messageContent, status: 'unread' },
      ]);
      setMessageContent(''); // Clear the message input
    } catch (err) {
      setError('Error sending message');
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p><strong>{message.senderName}</strong> to <strong>{message.receiverName}</strong>:</p>
            <p>{message.body}</p>
            <p>Status: {message.status}</p>
            <p>Date: {new Date(message.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Enter receiver's ID"
          required
        />
        <input
          type="text"
          value={receiverName}
          onChange={(e) => setReceiverName(e.target.value)}
          placeholder="Enter receiver's Name"
          required
        />
        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Type your message here"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessagePage;