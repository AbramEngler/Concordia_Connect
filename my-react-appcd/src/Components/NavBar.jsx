import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg bg-body-tertiary">
				<div class="container-fluid">
					<div class="navbar-brand">
						<a href="/">
							<h1>React Demo</h1>
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
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;