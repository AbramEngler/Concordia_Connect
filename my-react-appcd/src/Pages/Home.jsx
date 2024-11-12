import { Link } from 'react-router-dom';

//lamba expression, this is a non named function, assigned to the named variable "home"
//returns a template of HTML
const Home = () => {
	const userName = localStorage.getItem('userName') || '';
	return (
		<div className="container">
			<div className="banner-container">
				<div className="banner">
					<h2>Welcome, {userName}!</h2>
					{/* <Link to="/users">
						<div className="btn">Check all users</div>
					</Link> */}
				</div>
			</div>
		</div>
	);
};

export default Home;