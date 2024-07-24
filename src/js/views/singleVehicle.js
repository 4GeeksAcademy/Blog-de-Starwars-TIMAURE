import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import "../../styles/single.css";
import { VehicleCard } from "../component/vehicleCard";
export const SingleVehicle = () => {
	const { store } = useContext(Context);
	const info = store.infoVehicle;

	const currentID = store.selectedVehicle;
	const filteredVehicles = store.vehicles.filter(
		(vehicles) => vehicles.uid !== currentID
	);

	return (
		<div className="container mt-4 d-flex flex-column min-vh-100">
			<div className="row altura bg-white">
				<div className="col-md-7 p-0">
					<img
						src={store.vehicleImg}
						alt="Character"
						className="limited-image"
					/>
				</div>
				<div className="col-md-5 d-flex align-items-center justify-content-center">
					<div className="text-center">
						<h4 className="fw-bold">{info.name}</h4>
						<p className="ms-3 me-3">
							This is the {info.name}, a {info.vehicle_class} vehicle designed by {info.manufacturer}.
							It has a model designation of "{info.model}" and costs {info.cost_in_credits} credits.
							The vehicle measures {info.length} meters in length, can carry a crew of {info.crew},
							and accommodates up to {info.passengers} passengers. It has a maximum speed of {info.max_atmosphering_speed} in atmospheric conditions.
							With a cargo capacity of {info.cargo_capacity} units and provisions for {info.consumables}.
						</p>
					</div>
				</div>
			</div>
			<div className="scroll text-white mt-3 d-flex horizontal-scroll">
				{filteredVehicles.map((vehicle, index) => (
					<VehicleCard key={index} body={vehicle}></VehicleCard>
				))}
			</div>
		</div>
	);
};
