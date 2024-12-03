import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const userName = localStorage.getItem('userName') || '';

    return (
        <div className="home-container">
            <div className="welcome-banner">
                {userName ? (
                    <>
                        <h2>Welcome, {userName}!</h2>
                        <p className="lead-text">Explore, connect, and make the most of your campus experience.</p>
                    </>
                ) : (
                    <>
                        <h2>Welcome to ConcordiaConnect!</h2>
                        <p className="lead-text">Your gateway to connecting with students on campus.</p>
                    </>
                )}
            </div>
            <div className="action-links">
                {userName ? (
                    <>
                        <Link to="/buyandsell" className="action-card">
                            <h3>Buy&Sell</h3>
                            <p>Discover deals or post items for sale—your campus marketplace awaits!</p>
                        </Link>
                        <Link to="/messagepage" className="action-card">
                            <h3>Inbox</h3>
                            <p>Reach out and connect to other students!</p>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="action-card">
                            <h3>Log In</h3>
                            <p>Already have an account? Log in to get started.</p>
                        </Link>
                        <Link to="/newuser" className="action-card">
                            <h3>Register</h3>
                            <p>New here? Sign up and join the ConcordiaConnect community today.</p>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;