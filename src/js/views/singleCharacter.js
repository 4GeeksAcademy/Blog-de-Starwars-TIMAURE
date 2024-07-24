import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import { CharacterCard } from "../component/characterCard";
import "../../styles/single.css";

export const SingleCharacter = () => {
	const { store } = useContext(Context);
	const info = store.infoCharacter;

	const currentID = store.selectedCharacter;
	const filteredCharacters = store.characters.filter(
		(character) => character.uid !== currentID
	);

	return (
		<div  className="container mt-4 d-flex flex-column min-vh-100">
			<div className="row altura bg-white">
				<div className="col-md-7 p-0">
					<img
						src={store.characterImg}
						alt="Character"
						className="limited-image"
					/>
				</div>
				<div className="col-md-5 d-flex align-items-center justify-content-center">
					<div className="text-center">
						<h4 className="fw-bold">{info.name}</h4>
						<p className="ms-3 me-3">
							This is {info.name}, a notable character from the Star Wars universe.
							He stands {info.height} cm tall and weighs {info.mass} kg. His hair is {info.hair_color} in color,
							his skin is {info.skin_color}, and his eyes are {info.eye_color}.
							{info.name} was born in the year {info.birth_year}, and his gender is {info.gender}.
						</p>
					</div>
				</div>
			</div>
			<div className="scroll text-white mt-3 d-flex horizontal-scroll ">
				{filteredCharacters.map((character, index) => (
					<CharacterCard key={index} body={character}></CharacterCard>
				))}
			</div>
		</div>
	);
};
