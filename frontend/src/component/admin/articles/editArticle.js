import React, { Component } from 'react'
import { toast } from 'react-toastify';

import Popup from 'reactjs-popup'

// URL GENERATOR
import S3FileUpload from 'react-s3';

/* FUNCTIONS */
// import { stringCut } from '../../../utils'



class EditArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            image: props.image,
            description: props.description,
            text_content: props.text_content,
            img_content: props.img_content,
            oldImg_content: props.img_content,
            video_content: props.video_content,
            oldVideo_content: props.video_content,
            current_video: "",
            access_key: process.env.REACT_APP_ACCESS_KEY,
            secret_key: process.env.REACT_APP_SECRET_KEY,
            bucket_name: process.env.REACT_APP_BUCKET,
            region: process.env.REACT_APP_REGION,
        }
    }

    updateArticleInfo = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    // FILE RELATED
    updateArticleFile = async (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region} = this.state;
        const config = {
            bucketName: bucket_name,
            dirName: "",
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region,
        };

        const data = await S3FileUpload.uploadFile(e.target.files[0], config)
        const url = data.location;
        this.setState({image: url});// remove "name" 
    }
    //******************************************* */

    // IMG RELATED
    updateArticleMultipleFiles = async (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region} = this.state;
        const config = {
            bucketName: bucket_name,
            dirName: "",
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region,
        };

        const len = e.target.files.length;
        var tab = [];
        for (let i = 0; i < len; i++) {
            const data = await S3FileUpload.uploadFile(e.target.files[i], config)
            const url = data.location;
            tab[i] = url;//remove "name"
        }
        tab.map((item) => {
            return this.setState({img_content: [...this.state.img_content, item]})
        })
    }

    deleteImg = (e, idx) => {
        e.preventDefault();
        const data = this.state.img_content;
        this.setState({img_content: data.filter( (name, index) => index !== idx) });
    }

    resetImgs = (e) => {
        e.preventDefault();
        this.setState({img_content: this.state.oldImg_content})
    }
    //******************************************* */

    // LINK RELATED
    addVideoLink = async (e) => {
        e.preventDefault();
        const {current_video} = this.state;
        current_video ? this.setState({video_content: [...this.state.video_content, current_video]})
        : toast.error("Aucune URL renseignée !", {
            className: "toast",
            position: "top-center",
            hideProgressBar: true,
            closeButton: false,
        })
    }

    deleteLink = (e, idx) => {
        e.preventDefault();
        const data = this.state.video_content;
        this.setState({video_content: data.filter( (name, index) => index !== idx) });
    }

    resetLinks = (e) => {
        e.preventDefault();
        this.setState({video_content: this.state.oldVideo_content})
    }
    //******************************************* */



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
                                        onChange={(e) => {this.updateArticleFile(e)}}
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
                                        <div className="edit-popup__showContent">
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
                            <div className="edit-popup__file">
                                <label className="edit-popup__file--input">
                                    Contenu image(s)
                                    <input
                                        type="file"
                                        onChange={(e) => {this.updateArticleMultipleFiles(e)}}
                                        name="img_content"
                                        multiple
                                        >
                                    </input>
                                </label>
                                <Popup trigger={ open => (
                                    <div className="edit-popup__file--show">
                                        {open ? 'Cacher' : 'Afficher'}
                                    </div>)}
                                    position="right bottom"
                                    closeOnDocumentClick
                                >
                                    {close => (
                                        <div className="edit-popup__showContent">
                                            <button className="edit-popup__showContent--reset" onClick={this.resetImgs}>
                                                Réinitialiser
                                            </button>
                                            <div className="edit-popup__showContent--imgContent">
                                                {this.state.img_content.length > 0 ? this.state.img_content.map( (item, index) =>
                                                    <div key={index} className="edit-popup__showContent--block">
                                                        <img src={item} alt="article-img" className="img_content"></img>
                                                        <button onClick={(e) => {this.deleteImg(e, index)}}>X</button>
                                                    </div>
                                                ) : "auncun contenu"}
                                            </div>
                                        </div>
                                        )
                                    }
                                </Popup>
                            </div>
                            <div className="edit-popup__file">
                                <label>
                                    Contenu video(s):
                                    <input
                                        type="text"
                                        onChange={(e) => {this.updateArticleInfo(e)}}
                                        name="current_video">
                                    </input>
                                </label>
                                <button onClick={(e) => this.addVideoLink(e)} className="edit-popup--linkAdding">
                                    Ajouter un lien
                                </button>
                                <Popup trigger={ open => (
                                    <div className="edit-popup__file--show">
                                        {open ? 'Cacher' : 'Afficher'}
                                    </div>)}
                                    position="right bottom"
                                    closeOnDocumentClick
                                >
                                    {close => (
                                        <div className="edit-popup__showContent">
                                            <button className="edit-popup__showContent--reset" onClick={this.resetLinks}>
                                                Réinitialiser
                                            </button>
                                            {this.state.video_content.length > 0 ?
                                                // <div className="edit-popup__showContent--block video-popup">
                                                    this.state.video_content.map( (item, index) => 
                                                        <div className="edit-popup__showContent--block video-popup" key={index}>
                                                            <div className="video-popup--item">{item}</div>
                                                            <button onClick={(e) => {this.deleteLink(e, index)}}>
                                                                X
                                                            </button>
                                                        </div>
                                                    ) : "auncun contenu"}
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <input
                                className="edit-popup--submit"
                                type="submit"
                                value="Modifier"
                                onClick={(e) => {
                                    this.editArticle(e, this.props.articleId);
                                    close()
                                }}
                            >
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