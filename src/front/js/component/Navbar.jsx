import React from "react";
import { Link } from "react-router-dom";
import { BtnFavorites } from "./BtnFavorites.jsx";


export const Navbar = () => {
	
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/characters">
						<button className="btn btn-dark">Characters</button>
					</Link>
					<Link to="/contact">
						<button className="btn btn-dark">Contact</button>
					</Link>
					<BtnFavorites/>
				</div>
			</div>
		</nav>
	);
};
