import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MessageDetail = () => {
    const { messageId } = useParams(); // Get the messageId from the URL
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const [replyBody, setReplyBody] = useState('');
    const [replies, setReplies] = useState([]);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/message/${messageId}`);
                setMessage(response.data);
                setReplies(response.data.replies || []); // Initialize replies
            } catch (err) {
                console.error('Error fetching message:', err);
                setError('Message not found');
            }
        };

        fetchMessage();
    }, [messageId]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/message/${messageId}/reply`, {
                senderId: localStorage.getItem('userId'), // Assuming userId is stored in localStorage
                senderName: localStorage.getItem('userName'), // Assuming userName is stored in localStorage
                body: replyBody,
            });
            
            setReplies((prevReplies) => [...prevReplies, response.data,]); // Update replies list
            setReplyBody(''); // Clear input field
        } catch (err) {
            console.error('Error adding reply:', err);
        }
    };

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!message) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Message Details</h2>
            <p><strong>From:</strong> {message.senderName}</p>
            <p><strong>To:</strong> {message.receiverName}</p>
            <p><strong>Message:</strong> {message.body}</p>
            <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>

            <hr />
            <h3>Replies</h3>
            {replies.length === 0 ? (
                <p>No replies yet.</p>
            ) : (
                <ul>
                    {replies.map((reply, index) => (
                        <li key={index}>
                            <p><strong>{reply.senderName}:</strong> {reply.body}</p>
                            <p><em>{new Date(reply.createdAt).toLocaleString()}</em></p>
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleReplySubmit}>
                <textarea
                    placeholder="Write your reply..."
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    required
                />
                <button type="submit">Reply</button>
            </form>
        </div>
    );
};

export default MessageDetail;