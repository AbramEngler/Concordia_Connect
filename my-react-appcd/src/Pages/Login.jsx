import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState(''); // Email state
    const [password, setPassword] = useState(''); // Password state
    const [loginStatus, setLoginStatus] = useState(''); // Login status state
    const [userName, setUserName] = useState(''); // To store the user's name
    const [userId, setUserId] = useState(''); // To store the user's ID
    const navigate = useNavigate(); // To handle redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email, password);
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }) // Send email and password from state
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.userName); //update user's name
                localStorage.setItem('userId', data.userId); //update user's id
                console.log(userName)
                console.log(localStorage.getItem('userId'))
                setLoginStatus('Login successful!'); // Update loginStatus on success

                // Optionally navigate to the user dashboard or main app here
                setTimeout(() => {
                navigate('/'); // Replace with your homepage route
                }, 1000);
            } else {
                setLoginStatus('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginStatus('An error occurred. Please try again later.'); // Update loginStatus on error
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {/* Conditionally render the login status message */}
            {loginStatus && (
                <p style={{ color: loginStatus.includes('successful') ? 'green' : 'red' }}>
                    {loginStatus}
                </p>
            )}
        </div>
    );
};

export default Login;