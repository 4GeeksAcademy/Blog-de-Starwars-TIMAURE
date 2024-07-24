import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/single.css";
import { PlanetCard } from "../component/planetCard";

export const SinglePlanet = () => {
	const { store } = useContext(Context);
	const info = store.infoPlanet;

	const currentID = store.selectedPlanet;
	const filteredPlanets = store.planets.filter(
		(planets) => planets.uid !== currentID
	);

	return (
		<div className="container mt-4 d-flex flex-column min-vh-100">
			<div className="row altura bg-white">
				<div className="col-md-7 p-0">
					<img
						src={store.planetImg}
						alt="Planet"
						className="limited-image"
					/>
				</div>
				<div className="col-md-5 d-flex align-items-center justify-content-center">
					<div className="text-center">
						<h4 className="fw-bold">{info.name}</h4>
						<p className="ms-3 me-3">
							This is {info.name}, a planet with a diameter of {info.diameter} km.
							It has a rotation period of {info.rotation_period} hours and an orbital period of {info.orbital_period} days.
							The gravity on this planet is {info.gravity}. Its climate is characterized as {info.climate}, with terrain that includes {info.terrain}.
							The population of this planet is {info.population}, and the surface water coverage is {info.surface_water}%.
						</p>
					</div>
				</div>
			</div>


			<div className="scroll text-white mt-3 d-flex horizontal-scroll">
				{filteredPlanets.map((planet, index) => (
					<PlanetCard key={index} body={planet}></PlanetCard>
				))}
			</div>
		</div>
	);
};
