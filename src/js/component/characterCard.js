import React, { useContext } from "react";
import { images } from "../views/utils";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const CharacterCard = ({ body }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const imageName = body.name.replaceAll(" ", "_");
    const imageName2 = imageName.replaceAll("/", "-");
    const imagePath = images[imageName2];

    const handleClick = async (id, image) => {
        await actions.setSelectedCharacter(id, image);
        await actions.getCharacterInfo();
        navigate("/singleCharacter");
    }

    return (
        <div className="custom-box" onClick={() => handleClick(body.uid, imagePath)}>
            <img src={imagePath} className="custom-image" alt={body.name} />
            <div className="custom-content">
                <h5 className="custom-title text-black">{body.name}</h5>
            </div>
        </div>
    );
};
