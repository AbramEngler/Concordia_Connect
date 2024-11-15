import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
	const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userName');

        // Redirect to login page or home page
        setTimeout(() => {
			navigate('/login'); // Replace with your homepage route
			}, 1000);
    };

	return (
		<div>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div class="container-fluid">
					<div class="navbar-brand">
						<a href="/">
							<h1>ConcordiaConnect</h1>
						</a>
					</div>
					<ul class="navbar-nav me-auto mb-2 mb-lg-0">
						<li class="nav-item">
							<NavLink class="nav-link" to="/">Home</NavLink>
						</li>
						<li class="nav-item">
							<NavLink class="nav-link" to="/about">About</NavLink>
						</li>
						<li class="nav-item">
							<NavLink class="nav-link" to="/users">Users</NavLink>
						</li>
						{/* <li class="nav-item">
							<NavLink class="nav-link" to="/users">---</NavLink>
						</li> */}
						<li class="nav-item">
							<NavLink class="nav-link" to="/login">Login</NavLink>
						</li>
						<li className="nav-item">
                            <NavLink class="nav-link" onClick={handleLogout}>Logout</NavLink>
                        </li>
						<li class="nav-item">
    						<NavLink class="nav-link" to="/buyandsell">Buy&Sell</NavLink>
						</li>
						<li class="nav-item">
    						<NavLink class="nav-link" to="/messagepage">Messages</NavLink>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;