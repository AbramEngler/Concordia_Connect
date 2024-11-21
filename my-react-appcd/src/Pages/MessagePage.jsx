import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MessagePage = ({ userId }) => {
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');

    // Fetch messages for the logged-in user
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Get the logged-in user's ID
                const response = await axios.get(`http://localhost:5000/messages/${userId}`);
                setMessages(response.data);
            } catch (err) {
                setError('Error fetching messages');
            }
        };

        if (userId) fetchMessages();
    }, [userId]);

    // Handle user search
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

    // Handle message send
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            setError('Please select a recipient before sending a message.');
            return;
        }

        const senderName = localStorage.getItem('userName'); // Assuming this is saved during login

        try {
            const response = await axios.post('http://localhost:5000/message', {
                senderId: userId,
                receiverId: selectedUser._id,
                senderName,
                receiverName: selectedUser.name,
                body: messageContent,
            });

            setMessages([...messages, response.data]); // Add the new message to the list
            setMessageContent(''); // Clear the message input
            setSelectedUser(null); // Clear selected recipient
            setSearchQuery(''); // Clear search bar
            setSuggestedUsers([]); // Clear suggestions
        } catch (err) {
            setError('Error sending message');
        }
    };

    // Handle message delete (user-specific)
    const handleDeleteMessage = async (messageId) => {
        try {
            const userId = localStorage.getItem('userId');
            await axios.delete(`http://localhost:5000/message/${messageId}`, {
                data: { userId },
            });

            // Update the messages list to reflect the deletion
            setMessages(messages.filter((message) => message._id !== messageId));
        } catch (err) {
            setError('Error deleting message.');
        }
    };

    return (
        <div>
            <h2>Messages</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {messages.map((message, index) => (
                    <div key={index}>
                        <Link to={`/message/${message._id}`}>
                            <p>
                                <strong>{message.senderName}</strong> to <strong>{message.receiverName}</strong>
                            </p>
                        </Link>
                        <p>{message.body}</p>
                        <p><strong>Replies:</strong> {message.replies?.length || 0} replies</p>
                        <p>Status: {message.status}</p>
                        <p>Date: {new Date(message.createdAt).toLocaleString()}</p>
                        <button
                            onClick={() => handleDeleteMessage(message._id)}
                            style={{ color: 'red', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search for a user"
                />
                {suggestedUsers.length > 0 && (
                    <ul>
                        {suggestedUsers.map((user) => (
                            <li
                                key={user._id}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setSearchQuery(user.name); // Show selected user's name in the search bar
                                    setSuggestedUsers([]); // Clear suggestions
                                }}
                                style={{ cursor: 'pointer', listStyle: 'none', padding: '5px' }}
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                )}
                {selectedUser && (
                    <p>
                        Sending message to: <strong>{selectedUser.name}</strong>
                    </p>
                )}
                <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Type your message here"
                    required
                />
                <button type="submit" disabled={!selectedUser}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessagePage;