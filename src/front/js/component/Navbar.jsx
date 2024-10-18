import React from "react";
import { Link } from "react-router-dom";
import { BtnFavorites } from "./BtnFavorites.jsx";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-between">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ms-auto d-flex">
					<Link to="/characters">
						<button className="btn btn-dark">Characters</button>
					</Link>
					<Link to="/planets" className="ms-2"> 
						<button className="btn btn-dark">Planets</button>
					</Link>

					<Link to="/starships" className="ms-2">
						<button className="btn btn-dark">StarShips</button>
					</Link>
					<Link to="/contact" className="mx-2">
						<button className="btn btn-dark">Contact</button>
					</Link>
					<BtnFavorites />
				</div>
			</div>
		</nav>
	);
};
