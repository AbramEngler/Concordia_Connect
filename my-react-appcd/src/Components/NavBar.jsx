import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css'; 

const NavBar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('token'); // Check if user is logged in

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');

        window.location.reload();
        setTimeout(() => {
            navigate('/'); 
        }, 1000);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <h1 className="brand-title">ConcordiaConnect</h1>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/">
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">
                                        About
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/buyandsell">
                                        Buy&Sell
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/messagepage">
                                        Inbox
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/userdirectory">
                                        User Directory
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger nav-btn" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/newuser">
                                        Sign Up
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;