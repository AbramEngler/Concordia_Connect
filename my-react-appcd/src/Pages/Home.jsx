import { Link } from 'react-router-dom';

const Home = () => {
  const userName = localStorage.getItem('userName') || '';

  return (
    <div className="container">
      <div className="banner-container">
        <div className="banner">
          {userName ? (
            <>
			<div style={{ marginTop: '40px' }}></div>
              <h2>Welcome, {userName}!</h2>
			<div style={{ marginTop: '40px' }}></div>
              <Link to={`/buyandsell/`}>
                <h2>Buy&Sell</h2>
              </Link>
              <p>Your one-stop shop for all your marketplace needs on campus!</p>
			  <div style={{ marginTop: '40px' }}></div>
              <Link to={`/messagepage/`}>
                <h2>Inbox</h2>
              </Link>
              <p>Reach out and connect to other students!</p>
            </>
          ) : (
            <>
			<div style={{ marginTop: '40px' }}></div>
              <h2>
                Welcome, please{' '}
                <Link to="/login" style={{ textDecoration: 'underline', color: 'blue' }}>
                  log in
                </Link>{' '}
                to get started!
              </h2>
			  <div style={{ marginTop: '40px' }}>
				<h5>
				New to ConcordiaConnect?{' '}
                <Link to="/newuser" style={{ textDecoration: 'underline', color: 'blue' }}>
                  Register
                </Link>{' '}
                to get started today!
				</h5>
			  	
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;