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
					This is the first react demo of CSC3070 Software Engineering.
				</p>
				<p>
					It is 11/5/2024
				</p>
			</div>
		</div>
	);
};

export default About;