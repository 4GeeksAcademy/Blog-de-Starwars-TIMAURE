import React, { useContext } from "react";
import { images } from "../views/utils";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { GrFavorite } from "react-icons/gr"; // empty
import { MdFavorite } from "react-icons/md"; // full

export const VehicleCardFav = ({ body }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const imageName = body.name.replaceAll(" ", "_");
    const imageName2 = imageName.replaceAll("/", "-");
    const imagePath = images[imageName2];

    const handleClickCard = async (id, image) => {
        await actions.setSelectedVehicle(id, image);
        await actions.getVehicleInfo();
        navigate("/singleVehicle");
    };

    const handleClickFav = async (id, type) => {
        await actions.addtoFav(id, type);
    };

    const isFavorite = (id, type) => {
        const favorites = store.fav;
        return favorites.find((fav) => fav.id === id && fav.type === type) !== undefined;
    };

    return (
        <div className="card">
            <img
                src={imagePath}
                className="card-img-top"
                alt={body.name}
                onClick={() => handleClickCard(body.uid, imagePath)}
            />
            <div className="card-body" onClick={() => handleClickCard(body.uid, imagePath)}>
                <h5 className="card-title text-black">{body.name}</h5>
            </div>
            <button className="btn btn-warning" onClick={() => handleClickFav(body.uid, "vehicle")}>
                {isFavorite(body.uid, "vehicle") ? <MdFavorite /> : <GrFavorite />}
            </button>
        </div>
    );
};
