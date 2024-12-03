import { useNavigate } from 'react-router-dom';

const About = () => {
	const navigate = useNavigate();
	return (
		<div className="container">
			<button className="btn" onClick={() => navigate(-1)}>
				Go Back
			</button>
			<div className="title">
				<h1>About</h1>
			</div>
			<div className="about-container">
				<p>
					This is our about page for ConcordiaConnect
				</p>
				<p>
					We want to work on bettering the user experience
				</p>
			</div>
		</div>
	);
};

export default About;