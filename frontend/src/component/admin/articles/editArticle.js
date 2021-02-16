import React, { Component } from 'react'
import { toast } from 'react-toastify';

import Popup from 'reactjs-popup'


class EditArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            image: props.image,
            description: props.description,
            text_content: props.text_content,
            img_content: props.img_content,
            video_content: props.video_content,
        }
    }

    updateArticleInfo = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    editArticle = async (e, id) => {
        e.preventDefault();
        try {
            const {title, image, description, text_content, img_content, video_content} = this.state;
            let body = {title, image, description, text_content, img_content, video_content};
            const response = await fetch(`http://localhost:9000/articles/${id}`, {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body) 
            });
            if (response === null)
                console.log(response);
            const parseRes = await response.json();// Message: "Modification reussi !"
            parseRes === 200 ?
                toast.success("Modification réussi !", {
                    className: "toast",
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                })
                : toast.error("Echec de la modification !", {
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
        return (
            <Popup
                trigger={<button className="adm-article--button">Modifier</button>}
                modal
                nested
            >
                {close => (
                    <div>
                        <button>
                            &times;
                        </button>
                        <div className="edit-popup--title">Modifier un article</div>
                        <form onSubmit={(e) => {this.editVideo(e, this.props.videoId)}}>
                            <label>
                                Titre: 
                                <input type="text"
                                    value={this.state.title}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="title">
                                </input>
                            </label>
                            <label>
                                Miniature: 
                                <input type="file"
                                    value={this.state.image}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="image">
                                </input>
                            </label>
                            <label>
                                Description: 
                                <textarea
                                    value={this.state.description}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="description">
                                </textarea>
                            </label>
                            <label>
                                Contenu texte:
                                <input type="number"
                                    value={this.state.ep_nb}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="ep_nb">
                                </input>
                            </label>
                            <label>
                                Contenu image:
                                <textarea
                                    value={this.state.description}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="description">
                                </textarea>
                            </label>
                            <label>
                                Contenu video:
                                <textarea
                                    value={this.state.description}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="description">
                                </textarea>
                            </label>
                            <input
                                className="edit-popup--submit"
                                type="submit"
                                value="Modifier"
                                onClick={(e) => {
                                    this.editVideo(e, this.props.videoId);
                                    close()
                            }}>
                            </input>
                        </form>
                        <button className="edit-popup--closeBtn" onClick={close}>Fermer</button>
                    </div>
                )}
            </Popup>
        );
    }
}
 
export default EditArticle;