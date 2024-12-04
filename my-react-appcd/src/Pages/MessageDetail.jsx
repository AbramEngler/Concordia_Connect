import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MessageDetail.css';

const MessageDetail = () => {
    const { messageId } = useParams();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState('');
    const [replyBody, setReplyBody] = useState('');
    const [replies, setReplies] = useState([]);
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/message/${messageId}`);
                setMessage(response.data);
                setReplies(response.data.replies || []);
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
                senderId: currentUserId,
                senderName: localStorage.getItem('userName'),
                body: replyBody,
            });

            setReplies((prevReplies) => [...prevReplies, response.data]);
            setReplyBody('');
        } catch (err) {
            console.error('Error adding reply:', err);
        }
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!message) {
        return <p>Loading...</p>;
    }

    return (
        <div className="message-detail-container">
            <div className="conversation-header">
                <h2>
                    {message.senderName} <span className="to-arrow"> to </span> {message.receiverName}
                </h2>
            </div>
            <div className="conversation-body">
                <div
                    className={`chat-bubble ${
                        message.senderId === currentUserId ? 'sender-bubble' : 'receiver-bubble'
                    }`}
                >
                    <p>{message.body}</p>
                    <span className="chat-timestamp">
                        {new Date(message.createdAt).toLocaleString()}
                    </span>
                </div>
                {replies.map((reply, index) => (
                    <div
                        key={index}
                        className={`chat-bubble ${
                            reply.senderId === currentUserId ? 'sender-bubble' : 'receiver-bubble'
                        }`}
                    >
                        <p>{reply.body}</p>
                        <span className="chat-timestamp">
                            {reply.senderName} • {new Date(reply.createdAt).toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>

            <form onSubmit={handleReplySubmit} className="reply-form">
                <textarea
                    placeholder="Write your reply..."
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    required
                />
                <button type="submit" className="reply-button">Reply</button>
            </form>
        </div>
    );
};

export default MessageDetail;