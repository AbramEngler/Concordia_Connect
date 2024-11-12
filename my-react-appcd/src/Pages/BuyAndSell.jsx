import React, { useState, useEffect } from 'react';
import axios from 'axios';


const BuyAndSell = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [postStatus, setPostStatus] = useState('');

    // const userName = localStorage.getItem('userName'); //retrieve User name
    // const userId = localStorage.getItem('userId'); // Assuming you save user ID on login, retrieve userID

     // Fetch posts when the component mounts
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
        const intervalId = setInterval(fetchPosts, 5000); // Fetch posts every 5 seconds
        return () => clearInterval(intervalId); // Clean up on component unmount
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userName = localStorage.getItem('userName'); //retrieve User name
        const userId = localStorage.getItem('userId'); // Assuming you save user ID on login, retrieve userID
        console.log("Title:", title);
        console.log("Body:", body);
        console.log("Author ID:", userId);
        console.log("Author Name:", userName);

        if (!userId) {
            setPostStatus('Error: User is not logged in');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:5000/post', {
                title,
                body,
                authorId: localStorage.getItem('userId'),
                authorName: userName,
            },
            {
                headers: { 'Content-Type': 'application/json' }
            });
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
        <div>
            <h2>Buy & Sell</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Post Item</button>
            </form>
            {postStatus && <p>{postStatus}</p>}
            <h2>Posts</h2>
            <div>
                {posts.map((post) => (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <p>Posted by: {post.authorName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BuyAndSell;