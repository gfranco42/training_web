import React, { useState } from 'react';
import { toast } from 'react-toastify';

/* POPUP */
import Popup from 'reactjs-popup';


/* ADMIN EDIT POPUP */
const EditYtVideo = (props) => {

    const [video, setVideo] = useState(props.props)

    const updateVideoInfo = (e) => {
        e.preventDefault();
        // setState({[e.target.name]: e.target.value});
        setVideo({...video, [e.target.name]: e.target.value})
    }

    const editVideo = async (e, id) => {
        e.preventDefault();
        const {title, url, category, ep_nb, description} = video;
        let body = {title, url, category, ep_nb, description};
        const response = await fetch(`http://localhost:9000/ytvideos/${id}`, {
            method: 'PUT',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body) 
        });
        if (response === null)
            console.log(response);
        const parseRes = await response.json();// Message: "Modification reussi !"
        parseRes === "Modification réussi !" ?
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
    }


    return (
        <Popup
            trigger={<button className="adm-ytvideos--button">Modifier</button>}
            modal
            nested
        >
            {close => (
                <div className="edit-popup">
                    <button className="edit-popup--closeCross" onClick={close}>
                        &times;
                    </button>
                    <div className="edit-popup--title">Modifier une video</div>
                    <form onSubmit={(e) => {editVideo(e, video.id)}}>
                        <label>
                            Titre: 
                            <input type="text"
                                value={video.title}
                                onChange={(e) => {updateVideoInfo(e)}}
                                name="title">
                            </input>
                        </label>
                        <label>
                            Lien: 
                            <input type="text"
                                value={video.url}
                                onChange={(e) => {updateVideoInfo(e)}}
                                name="url">
                            </input>
                        </label>
                        <label>
                            Catégorie: 
                            <div className="edit-popup--select-field">
                                <select value={video.category}
                                    onChange={(e) => {updateVideoInfo(e)}}
                                    name="category">
                                    <option value="">Catégorie de la vidéo...</option>
                                    <option value="TW">True Warriors</option>
                                    <option value="LOL">League of Lesglands</option>
                                    <option value="HS">Hors-Série</option>
                                </select>
                            </div>
                        </label>
                        <label>
                            Nº de l'épisode:
                            <input type="number"
                                value={video.ep_nb}
                                onChange={(e) => {updateVideoInfo(e)}}
                                name="ep_nb">
                            </input>
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={video.description}
                                onChange={(e) => {updateVideoInfo(e)}}
                                name="description">
                            </textarea>
                        </label>
                        <input
                            className="edit-popup--submit"
                            type="submit"
                            value="Modifier"
                            onClick={(e) => {
                                editVideo(e, video.id);
                                close()
                        }}>
                        </input>
                    </form>
                    <button className="edit-popup--closeBtn" onClick={close}>Fermer</button>
                </div>
            )}
        </Popup>
    )
}

export {
    EditYtVideo,
};