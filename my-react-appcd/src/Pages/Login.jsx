import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.userName);
                localStorage.setItem('userId', data.userId);

                setLoginStatus('Login successful!');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                setLoginStatus('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLoginStatus('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="login-form container">
            <h2 className="text-center mb-4">Log In</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                {loginStatus && (
                    <div
                        className={`mt-3 text-center ${
                            loginStatus.includes('successful') ? 'text-success' : 'text-danger'
                        }`}
                    >
                        {loginStatus}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;