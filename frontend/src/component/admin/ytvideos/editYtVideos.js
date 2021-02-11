import React, { Component } from 'react';
import { toast } from 'react-toastify';

/* POPUP */
import Popup from 'reactjs-popup';


/* ADMIN EDIT POPUP */
class EditYtVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.title,
            url: props.url,
            category: props.category,
            ep_nb: props.ep_nb,
            description: props.description,
        }
    }

    updateVideoInfo = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    editVideo = async (e, id) => {
        e.preventDefault();
        try {
            const {title, url, category, ep_nb, description} = this.state;
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
        } catch (error) {
           console.error(error.message); 
        }
    }


    render() {
        if (this.state.loading === true)
            return <div className="">Loading...</div>
        else {
            return (
                <Popup
                    trigger={<button className="">Modifier</button>}
                    modal
                    nested
                >
                    {close => (
                        <div className="">
                            <div>Modifier une video</div>
                            <form onSubmit={(e) => {this.editVideo(e, this.props.videoId)}}>
                                <label>
                                    Titre: 
                                    <input type="text"
                                        value={this.state.title}
                                        onChange={(e) => {this.updateVideoInfo(e)}}
                                        name="title"
                                        >
                                    </input>
                                </label>
                                <label>
                                    Lien: 
                                    <input type="text"
                                        value={this.state.url}
                                        onChange={(e) => {this.updateVideoInfo(e)}}
                                        name="url"
                                        >
                                    </input>
                                </label>
                                <label>
                                   Catégorie: 
                                    <select value={this.state.category}
                                    onChange={(e) => {this.updateVideoInfo(e)}}
                                    name="category"
                                    >
                                        <option value="">Catégorie de la vidéo...</option>
                                        <option value="TW">True Warriors</option>
                                        <option value="LOL">League of Lesglands</option>
                                        <option value="HS">Hors-Série</option>
                                    </select>
                                </label>
                                <label>
                                    Nº de l'épisode:
                                    <input type="number"
                                        value={this.state.ep_nb}
                                        onChange={(e) => {this.updateVideoInfo(e)}}
                                        name="ep_nb"
                                        >
                                    </input>
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        value={this.state.description}
                                        onChange={(e) => {this.updateVideoInfo(e)}}
                                        name="description"
                                        >
                                    </textarea>
                                </label>
                                <input
                                className="registrationpopup__form--submit"
                                type="submit"
                                value="Modifier"
                                onClick={(e) => {
                                    this.editVideo(e, this.props.videoId);
                                    close()
                                }}
                                ></input>
                            </form>
                            <button onClick={close}>Close</button>
                        </div>
                    )}
            </Popup>
        )}
    }
}

export {
    EditYtVideo,
};