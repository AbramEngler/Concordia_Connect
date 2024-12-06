import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="about-page container">
            <button className="btn btn-outline-primary back-button" onClick={() => navigate(-1)}>
                ← Go Back
            </button>
            <div className="about-header">
                <h1 className="about-title">About ConcordiaConnect</h1>
            </div>
            <div className="about-content">
                <p>
                    Welcome to <strong>ConcordiaConnect</strong>, the social media platform designed to bring Concordia students together.
                </p>
                <p>
                    Our mission is to enhance the student experience by offering tools that foster meaningful connections, 
                    whether through the <em>Buy&Sell</em> marketplace or direct messaging with other students.
                </p>
                <p>
                    We are constantly working on improving our platform to make it beneficial for everyone in the Concordia community.
                </p>
                <p>Thank you for being a part of our journey!</p>
            </div>
        </div>
    );
};

export default About;