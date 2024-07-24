import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { MdDelete } from "react-icons/md";
import { images } from "../views/utils";
import { useNavigate } from "react-router-dom";

export const FavRow = ({ body }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    let itemName = "Desconocido"; // Nombre por defecto
    let imagePath = ""; // Ruta de imagen por defecto

    // Determinar nombre e imagen según el tipo
    if (body.type === "character") {
        const charactersList = store.characters;
        const character = charactersList.find((c) => c.uid === body.id);
        itemName = character ? character.name : "Personaje desconocido";

        if (character) {
            const imageName = character.name.replaceAll(" ", "_");
            const imageName2 = imageName.replaceAll("/", "-");
            imagePath = images[imageName2];
        }
    } else if (body.type === "planet") {
        const planetsList = store.planets;
        const planet = planetsList.find((p) => p.uid === body.id);
        itemName = planet ? planet.name : "Planeta desconocido";

        if (planet) {
            const imageName = planet.name.replaceAll(" ", "_");
            const imageName2 = imageName.replaceAll("/", "-");
            imagePath = images[imageName2];
        }
    } else if (body.type === "vehicle") {
        const vehiclesList = store.vehicles;
        const vehicle = vehiclesList.find((v) => v.uid === body.id);
        itemName = vehicle ? vehicle.name : "Vehículo desconocido";

        if (vehicle) {
            const imageName = vehicle.name.replaceAll(" ", "_");
            const imageName2 = imageName.replaceAll("/", "-");
            imagePath = images[imageName2];
        }
    }

    // Navegación basada en el tipo de objeto
    const handleNavClick = async (id, image, type) => {
        switch (type) {
            case "character":
                await actions.setSelectedCharacter(id, image);
                await actions.getCharacterInfo();
                navigate("/singleCharacter");
                break;
            case "planet":
                await actions.setSelectedPlanet(id, image);
                await actions.getPlanetInfo();
                navigate("/singlePlanet");
                break;
            case "vehicle":
                await actions.setSelectedVehicle(id, image);
                await actions.getVehicleInfo();
                navigate("/singleVehicle");
                break;
            default:
                console.error("Tipo desconocido:", type);
        }
    };

    const handleDeleteClick = (id, type) => {
        actions.deleteFromFav(id, type);
    };

    return (
        <div className="dropdown-item d-flex align-items-center">
            <span onClick={() => handleNavClick(body.id, imagePath, body.type)}>{itemName}</span>
            <MdDelete className="ms-auto text-danger" onClick={() => handleDeleteClick(body.id, body.type)} />
        </div>
    );
};
