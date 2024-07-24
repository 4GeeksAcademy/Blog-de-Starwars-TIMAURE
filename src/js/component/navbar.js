import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FavRow } from "../component/favRow";

export const Navbar = () => {
	const { store } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-dark">
			<Link className="link-no-underline" to={"/"}>
				<span className="navbar-brand ms-2 text-warning">Star Wars</span>
			</Link>
			<div className="dropdown me-2">
				<button
					className="btn btn-warning dropdown-toggle"
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Favorites
				</button>
				<div className="dropdown-menu dropdown-menu-end mt-2 ms-1">
					{store.fav.map((favo, index) => (
						<FavRow key={index} body={favo} />
					))}
				</div>
			</div>
		</nav>
	);
};