const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			planets: [],
			vehicles: [],

			selectedCharacter: "",
			selectedPlanet: "",
			selectedVehicle: "",

			characterImg: "",
			planetImg: "",
			vehicleImg: "",

			infoCharacter: {},
			infoPlanet: {},
			infoVehicle: {},

			fav: []
		},

		actions: {

			setSelectedCharacter: (id, img) => {
				setStore({ selectedCharacter: id });
				setStore({ characterImg: img })
			},

			setSelectedPlanet: (id, img) => {
				setStore({ selectedPlanet: id });
				setStore({ planetImg: img })
			},

			setSelectedVehicle: (id, img) => {
				setStore({ selectedVehicle: id });
				setStore({ vehicleImg: img })
			},

			getCharacters: async () => {
				fetch("https://www.swapi.tech/api/people/")
					.then(res => res.json())
					.then(data => {
						const { results } = data;
						setStore({ characters: results });
					})
					.catch(err => console.error(err))
			},

			getPlanets: async () => {
				fetch("https://www.swapi.tech/api/planets/")
					.then(res => res.json())
					.then(data => {
						const { results } = data;
						setStore({ planets: results });
					})
					.catch(err => console.error(err))
			},

			getVehicles: async () => {
				fetch("https://www.swapi.tech/api/vehicles/")
					.then(res => res.json())
					.then(data => {
						const { results } = data;
						setStore({ vehicles: results });
					})
					.catch(err => console.error(err))
			},

			getCharacterInfo: async () => {
				console.log("dentro metodo")
				const id = getStore().selectedCharacter;
				fetch(`https://www.swapi.tech/api/people/${id}`)
					.then(res => res.json())
					.then(data => {
						const { result } = data;
						const info = result.properties;
						setStore({ infoCharacter: info })
					})
					.catch(err => console.error(err))
			},

			getPlanetInfo: async () => {
				const id = getStore().selectedPlanet;
				fetch(`https://www.swapi.tech/api/planets/${id}`)
					.then(res => res.json())
					.then(data => {
						const { result } = data;
						const info = result.properties;
						setStore({ infoPlanet: info })
					})
					.catch(err => console.error(err))
			},

			getVehicleInfo: async () => {
				const id = getStore().selectedVehicle;
				fetch(`https://www.swapi.tech/api/vehicles/${id}`)
					.then(res => res.json())
					.then(data => {
						const { result } = data;
						const info = result.properties;
						setStore({ infoVehicle: info })
					})
					.catch(err => console.error(err))
			},

			addtoFav: (id, type) => {
				const store = getStore();
				const object = { id, type };

				const isAlreadyFav = store.fav.some(
					(fav) => fav.id === id && fav.type === type
				);

				if (!isAlreadyFav) {
					const updatedFav = [...store.fav, object];
					setStore({ ...store, fav: updatedFav });
					console.log(store.fav);
				} else {
					console.log("El objeto ya está en favoritos, no se agrega.");
				}
			},

			deleteFromFav: (id,type) => {
				const store = getStore();
				const updatedFav = store.fav.filter(
					(fav) => fav.id !== id || fav.type !== type
				);
				setStore({ ...store, fav: updatedFav });
			}
		}
	};
};

export default getState;