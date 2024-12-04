import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [replyBody, setReplyBody] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/post/${postId}`);
                setPost(response.data);
            } catch (err) {
                setError('Post not found');
                console.error('Error fetching post:', err);
            }
        };
        if (postId) fetchPost();
    }, [postId]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        const authorId = localStorage.getItem('userId');
        const authorName = localStorage.getItem('userName');

        if (!authorId || !authorName) {
            setError('Failed to submit the post. Please log in.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/post/${postId}/reply`, {
                body: replyBody,
                authorId,
                authorName,
            });

            setReplyBody('');
            setPost({
                ...post,
                replies: [...post.replies, { body: replyBody, authorId, authorName, createdAt: new Date() }],
            });
        } catch (err) {
            setError('Failed to submit the reply. Please try again.');
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-detail-container">
            <button className="btn-back" onClick={() => navigate(-1)}>Go Back</button>
            <div className="post-card">
                <h1>{post.title}</h1>
                <p className="post-body">{post.body}</p>
                <p className="post-meta">
                    <strong>Author:</strong> {post.authorName} | <strong>Date:</strong>{' '}
                    {new Date(post.createdAt).toLocaleString()}
                </p>
            </div>

            <div className="replies-section">
                <h2>Replies ({post.replies.length})</h2>
                {post.replies.length > 0 ? (
                    post.replies.map((reply, index) => (
                        <div key={index} className="reply-card">
                            <p className="reply-body">{reply.body}</p>
                            <p className="reply-meta">
                                <strong>Author:</strong> {reply.authorName} | <strong>Date:</strong>{' '}
                                {new Date(reply.createdAt).toLocaleString()}
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="no-replies">No replies yet. Be the first to comment!</p>
                )}
            </div>

            <div className="reply-form">
                <h3>Post a Reply</h3>
                <form onSubmit={handleReplySubmit}>
                    <textarea
                        value={replyBody}
                        onChange={(e) => setReplyBody(e.target.value)}
                        placeholder="Write your reply here..."
                        required
                    ></textarea>
                    <button type="submit" className="btn-submit">Submit Reply</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default PostDetail;