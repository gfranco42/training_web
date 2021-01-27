import React, { Component } from 'react';

/* POPUP */
import Popup from 'reactjs-popup';


/* ADMIN EDIT POPUP */
class EditPopup extends Component {

    editVideo = async (e, id) => {
        e.preventDefault();
        try {
            this.setState({loading: true});
            const {title, url, category, ep_nb} = this.props;
            let body = {title, url, category, ep_nb};
            const response = await fetch(`http://localhost:9000/ytvideos/${id}`, {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body) 
            });
            window.location.reload();
            if (response === null)
                console.log(response);
        } catch (error) {
           console.error(error.message); 
        }
    }

    render() {
        if (this.props.loading === true)
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
                                        value={this.props.videos.title}
                                        onChange={(e) => {this.props.updateVideoInfo(e)}}
                                        name="title"
                                        >
                                    </input>
                                </label>
                                <label>
                                    Lien: 
                                    <input type="text"
                                        value={this.props.videos.url}
                                        onChange={(e) => {this.props.updateVideoInfo(e)}}
                                        name="url"
                                        >
                                    </input>
                                </label>
                                <label>
                                   Catégorie: 
                                    <select value={this.props.videos.category}
                                    onChange={(e) => {this.props.updateVideoInfo(e)}}
                                    name="category"
                                    >
                                        <option value="">Catégorie de la vidéo...</option>
                                        <option value="trueWarriors">True Warriors</option>
                                        <option value="leagueofLesglands">League of Lesglands</option>
                                        <option value="horsSeries">Hors-Série</option>
                                    </select>
                                </label>
                                <label>
                                    Nº de l'épisode:
                                    <input type="number"
                                        value={this.props.videos.ep_nb}
                                        onChange={(e) => {this.props.updateVideoInfo(e)}}
                                        name="ep_nb"
                                        >
                                    </input>
                                </label>
                                <button>Submit</button>
                            </form>
                            <button onClick={close}>Close</button>
                        </div>
                    )}
            </Popup>
        )}
    }
}

export {
    EditPopup,
};