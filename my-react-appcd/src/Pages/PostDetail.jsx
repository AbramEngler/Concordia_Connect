import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [replyBody, setReplyBody] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //const isLoggedIn = localStorage.getItem('userId') && localStorage.getItem('token');

    useEffect(() => {
        console.log("Fetching post with ID:", postId);
        const fetchPost = async () => { 
        try{
            const response = await axios.get(`http://localhost:5000/post/${postId}`);
            setPost(response.data);
        } catch (err) {
            setError('Post not found');
            console.error('Error fetching post:', err);
        };
        }
        if (postId) fetchPost();
        //fetchPost();
    }, [postId]);

    const handleReplySubmit = async (e) => {
        e.preventDefault();
        
        const authorId = localStorage.getItem('userId'); 
        const authorName = localStorage.getItem('userName');

        if (!authorId || !authorName) {
            setError("Failed to submit the post. Please log in.");
            return;
        }

        axios.post(`http://localhost:5000/post/${postId}/reply`, {
            body: replyBody,
            authorId,
            authorName
        });

        setReplyBody('');
        setPost({ ...post, replies: [...post.replies, { body: replyBody, authorId, authorName, createdAt: new Date() }] });
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p>Author: {post.authorName}</p>
            <p>Date: {new Date(post.createdAt).toLocaleString()}</p>

            <h3>Replies ({post.replies.length})</h3>
            {post.replies.map((reply, index) => (
                <div key={index}>
                    <p>{reply.body}</p>
                    <p>Author: {reply.authorName}</p>
                    <p>Date: {new Date(reply.createdAt).toLocaleString()}</p>
                </div>
            ))}

            <form onSubmit={handleReplySubmit}>
                <textarea
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder="Write your reply here"
                ></textarea>
                <button type="submit">Post Reply</button>
            </form>
        </div>
    );
};

export default PostDetail;