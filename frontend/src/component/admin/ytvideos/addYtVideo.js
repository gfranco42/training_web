import React, { useState } from 'react'
import { toast } from 'react-toastify';


const AddYtVideo = (props) => {

    const [video, setVideo] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const addVideo = async (e) => {
        e.preventDefault();
        const {title, url, category, ep_nb, description} = video;// rendre lecriture + propre
        const body = {title, url, category, ep_nb, description};// creation d'un objet 'users'
        const response =  await fetch(                  // recup le resultat d'un 'POST'
            "http://localhost:9000/ytvideos", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)              // on fait en sorte que ce soit lisible en json
            }
        );
        if (response === null)
            console.log(response);
        const parseRes = await response.json();
        parseRes === "Ajout réussi !" ?
            toast.success(parseRes, {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            })
            : toast.error(parseRes, {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            });
    };

    return (
        <div className="adm-ytvideos" style={{display: props.display}}>
            <form className="adm-ytvideos__adding"
                onSubmit={(e) => addVideo(e)}>
                <p className="adm-ytvideos--title">Ajouter une vidéo Youtube:</p>
                <label className="adm-ytvideos__adding--field">
                    Titre
                    <input type="text"
                        value={video.title || ""}
                        onChange={(e) => {handleChange(e)}}
                        name="title"
                        placeholder="ex. True Warriors 16"
                        required
                        >
                    </input>
                </label>
                <label className="adm-ytvideos__adding--field">
                    Lien
                    <input type="text"
                        value={video.url || ""}
                        onChange={(e) => {handleChange(e)}}
                        name="url"
                        placeholder="ex. https://video.com"
                        required
                        >
                    </input>
                </label>
                <label className="adm-ytvideos__adding--field">
                    Catégorie
                    <div className="adm-ytvideos__adding--select-field">
                        <select value={video.category || ""}
                        onChange={(e) => {handleChange(e)}}
                        name="category"
                        required>
                            <option value="">Catégorie de la vidéo</option>
                            <option value="TW">True Warriors</option>
                            <option value="LOL">League of Lesglands</option>
                            <option value="HS">Hors-Série</option>
                        </select>
                    </div>
                </label>
                <label className="adm-ytvideos__adding--field">
                    Nº de l'épisode
                    <input type="number"
                        value={video.ep_nb || ""}
                        onChange={(e) => {handleChange(e)}}
                        name="ep_nb"
                        required
                        >
                    </input>
                </label>
                <label className="adm-ytvideos__adding--field description">
                    Description
                    <textarea
                        value={video.description || ""}
                        onChange={(e) => {handleChange(e)}}
                        name="description"
                        placeholder="ex: Dans cette vidéo, vous verrez comment arroser des Hamsters..."
                        >
                    </textarea>
                </label>
                <input type="submit"
                    value="Et zé partiiiii !"
                    className="adm-ytvideos__adding--submit">
                </input>
            </form>
        </div>
    )
}

export default AddYtVideo;