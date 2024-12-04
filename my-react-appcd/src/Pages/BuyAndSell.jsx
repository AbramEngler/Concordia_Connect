import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BuyAndSell.css';

const BuyAndSell = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postStatus, setPostStatus] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
        const intervalId = setInterval(fetchPosts, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('userName');
        const userId = localStorage.getItem('userId');

        if (!userId) {
            setPostStatus('Error: User is not logged in');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:5000/post',
                {
                    title,
                    body,
                    authorId: userId,
                    authorName: userName,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.status === 200) {
                setPostStatus('Post submitted successfully!');
                setTitle('');
                setBody('');
                setPosts([...posts, response.data]);
            }
        } catch (error) {
            setPostStatus('Failed to submit the post. Please try again.');
        }
    };

    return (
        <div className="buy-sell-container">
            <div className="header">
                <h1>Buy & Sell</h1>
                <p>Your go-to marketplace for campus trading!</p>
            </div>
            <div className="post-form">
                <h2>Create a Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Item Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Item Description"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Post Item</button>
                </form>
                {postStatus && <p className="post-status">{postStatus}</p>}
            </div>
            <div className="posts-section">
                <h2>Marketplace Posts</h2>
                {posts.map((post) => (
                    <div key={post._id} className="post-card">
                        <h3>
                            <Link to={`/post/${post._id}`} className="post-title-link">
                                {post.title}
                            </Link>
                        </h3>
                        <p className="post-body">{post.body}</p>
                        <p className="post-details">
                            <strong>Author:</strong> {post.authorName} |{' '}
                            <strong>Date:</strong> {new Date(post.createdAt).toLocaleString()} |{' '}
                            <strong>Replies:</strong> {post.replies?.length || 0}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyAndSell;