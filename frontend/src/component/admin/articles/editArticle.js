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
                    <div className="edit-popup">
                        <button className="edit-popup--closeCross" onClick={close}>
                            &times;
                        </button>
                        <div className="edit-popup--title">Modifier un article</div>
                        <form onSubmit={(e) => {this.editArticle(e, this.props.articleId)}}>
                            <label>
                                Titre: 
                                <input type="text"
                                    value={this.state.title}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    maxLength="30"
                                    name="title">
                                </input>
                            </label>
                            <div className="edit-popup__file">
                                <label className="edit-popup__file--input">
                                    Miniature 
                                    <input type="file"
                                        accept="image/*"
                                        onChange={(e) => {this.updateArticleInfo(e)}}
                                        name="image">
                                    </input>
                                </label>
                                <Popup trigger={ open => (
                                    <div className="edit-popup__file--show">
                                        {open ? 'Cacher' : 'Afficher'}
                                    </div>)}
                                    position="right center"
                                    closeOnDocumentClick
                                >
                                    {close => (
                                        <div className="edit-popup__showImg">
                                           <img src={this.state.image} alt="article-img"></img>
                                        </div>
                                        )
                                    }
                                </Popup>
                            </div>
                            <label>
                                Description: 
                                <textarea
                                    value={this.state.description}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    maxLength="255"
                                    name="description">
                                </textarea>
                            </label>
                            <label>
                                Contenu texte:
                                <textarea type="number"
                                    value={this.state.text_content}
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="text_content">
                                </textarea>
                            </label>
                            <label className="edit-popup--file">
                                Contenu image(s)
                                <input
                                    type="file"
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="img_content"
                                    multiple
                                    >
                                </input>
                            </label>
                            <label>
                                Contenu video(s):
                                <input
                                    type="text"
                                    onChange={(e) => {this.updateArticleInfo(e)}}
                                    name="current_video">
                                </input>
                            </label>
                            {/* <button onClick={this.addLink()} className="edit-popup--linkAdding">
                                Ajouter un lien
                            </button> */}
                            <button className="edit-popup--linkAdding">Ajouter un lien</button>
                            <input
                                className="edit-popup--submit"
                                type="submit"
                                value="Modifier"
                                onClick={(e) => {
                                    this.editArticle(e, this.props.articleId);
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