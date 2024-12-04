import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MessagePage.css';

const MessagePage = ({ userId }) => {
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`http://localhost:5000/messages/${userId}`);
                setMessages(response.data);
            } catch (err) {
                setError('Error fetching messages');
            }
        };

        if (userId) fetchMessages();
    }, [userId]);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            try {
                const response = await axios.get(`http://localhost:5000/users/search?query=${query}`);
                setSuggestedUsers(response.data);
            } catch (err) {
                console.error('Error fetching user suggestions:', err);
            }
        } else {
            setSuggestedUsers([]);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            setError('Please select a recipient before sending a message.');
            return;
        }

        const senderName = localStorage.getItem('userName');

        try {
            const response = await axios.post('http://localhost:5000/message', {
                senderId: userId,
                receiverId: selectedUser._id,
                senderName,
                receiverName: selectedUser.name,
                body: messageContent,
            });

            setMessages([...messages, response.data]);
            setMessageContent('');
            setSelectedUser(null);
            setSearchQuery('');
            setSuggestedUsers([]);
        } catch (err) {
            setError('Error sending message');
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.delete(`http://localhost:5000/message/${messageId}`, {
                data: { userId },
            });

            setMessages(messages.filter((message) => message._id !== messageId));
        } catch (err) {
            setError('Error deleting message.');
        }
    };

    return (
        <div className="message-page-container">
            <h2 className="page-title">Messages</h2>
            {error && <p className="error-message">{error}</p>}

            <div className="message-list">
                {messages.map((message) => (
                    <div key={message._id} className="message-card">
                        <Link to={`/message/${message._id}`} className="message-link">
                            <div className="message-header">
                                <strong>{message.senderName} </strong>  to    <strong> {message.receiverName}</strong>
                                <span className="message-date">
                                    {new Date(message.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="message-body">
                                {message.body.length > 80
                                    ? `${message.body.substring(0, 80)}...`
                                    : message.body}
                            </p>
                            <div className="message-meta">
                                <span>{message.replies?.length || 0} replies</span> |{' '}
                                <span>Status: {message.status}</span>
                            </div>
                        </Link>
                        <button
                            onClick={() => handleDeleteMessage(message._id)}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <form className="message-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for a user"
                    className="search-input"
                />
                {suggestedUsers.length > 0 && (
                    <ul className="suggested-users-list">
                        {suggestedUsers.map((user) => (
                            <li
                                key={user._id}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setSearchQuery(user.name);
                                    setSuggestedUsers([]);
                                }}
                                className="suggested-user"
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                )}
                {selectedUser && (
                    <p className="selected-user">
                        Sending message to: <strong>{selectedUser.name}</strong>
                    </p>
                )}
                <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message here..."
                    required
                    className="message-textarea"
                />
                <button type="submit" className="send-button" disabled={!selectedUser}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessagePage;
