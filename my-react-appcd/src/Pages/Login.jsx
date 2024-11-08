import React, { useState } from 'react';
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState(''); // Email state
    const [password, setPassword] = useState(''); // Password state
    const [loginStatus, setLoginStatus] = useState(''); // Login status state

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }) // Send email and password from state
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                setLoginStatus('Login successful!'); // Update loginStatus on success
                // Optionally navigate to the user dashboard or main app here
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