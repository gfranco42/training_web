import React, { useState } from 'react'
import { toast } from 'react-toastify';

import Popup from 'reactjs-popup'

// URL GENERATOR
import S3FileUpload from 'react-s3';

/* FUNCTIONS */
// import { stringCut } from '../../../utils'


const EditArticle = (props) => {

    const [article, setArticle] = useState(props.props)
    const [current_video, setCurrent_video] = useState("")
    const oldImg_content = props.props.img_content;
    
    const configuration = {
        access_key: process.env.REACT_APP_ACCESS_KEY,
        secret_key: process.env.REACT_APP_SECRET_KEY,
        bucket_name: process.env.REACT_APP_BUCKET,
        region: process.env.REACT_APP_REGION,
    }

    const updateCurrentVideo = (e) => {
        e.preventDefault();
        setCurrent_video(e.target.value);
    }

    const updateArticleInfo = (e) => {
        e.preventDefault();
        setArticle({...article, [e.target.name]: e.target.value});
    }

    // FILE RELATED
    const updateArticleFile = async (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region} = configuration;
        const config = {
            bucketName: bucket_name,
            dirName: "",
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region,
        };

        const data = await S3FileUpload.uploadFile(e.target.files[0], config)
        const url = data.location;
        // setState({image: url});// remove "name" 
        setArticle({...article, image: url})
    }
    //******************************************* */

    // IMG RELATED
    const updateArticleMultipleFiles = async (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region} = configuration;
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
        // tab.map((item) => {
        //     return setState({img_content: [...img_content, item]})
        // })
        setArticle({...article, img_content: tab})
    }

    const deleteImg = (e, idx) => {
        e.preventDefault();
        const data = article.img_content;
        // setState({img_content: data.filter( (name, index) => index !== idx) });
        setArticle({...article, img_content: data.filter( (name, index) => index !== idx) });
    }

    const resetImgs = (e) => {
        e.preventDefault();
        // setState({img_content: oldImg_content})
        setArticle({...article, img_content: oldImg_content})
    }
    //******************************************* */

    // LINK RELATED
    const addVideoLink = async (e) => {
        e.preventDefault();
        current_video ? setArticle({...article, video_content: [...article.video_content, current_video]})
        : toast.error("Aucune URL renseignée !", {
            className: "toast",
            position: "top-center",
            hideProgressBar: true,
            closeButton: false,
        })
    }

    const deleteLink = (e, idx) => {
        e.preventDefault();
        const data = article.video_content;
        // setState({video_content: data.filter( (name, index) => index !== idx) });
        setArticle({...article,video_content: data.filter( (name, index) => index !== idx)})
    }

    const resetLinks = (e) => {
        e.preventDefault();
        // setState({video_content: oldVideo_content})
        setArticle({...article, video_content: oldImg_content})
    }
    //******************************************* */



    const editArticle = async (e, id) => {
        e.preventDefault();
        const {title, image, description, text_content, img_content, video_content} = article;
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
    }

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
                    <form onSubmit={(e) => {editArticle(e, article.id)}}>
                        <label>
                            Titre: 
                            <input type="text"
                                value={article.title}
                                onChange={(e) => {updateArticleInfo(e)}}
                                maxLength="30"
                                name="title">
                            </input>
                        </label>
                        <div className="edit-popup__file">
                            <label className="edit-popup__file--input">
                                Miniature 
                                <input type="file"
                                    accept="image/*"
                                    onChange={(e) => {updateArticleFile(e)}}
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
                                       <img src={article.image} alt="article-img"></img>
                                    </div>
                                    )
                                }
                            </Popup>
                        </div>
                        <label>
                            Description: 
                            <textarea
                                value={article.description}
                                onChange={(e) => {updateArticleInfo(e)}}
                                maxLength="255"
                                name="description">
                            </textarea>
                        </label>
                        <label>
                            Contenu texte:
                            <textarea type="number"
                                value={article.text_content}
                                onChange={(e) => {updateArticleInfo(e)}}
                                name="text_content">
                            </textarea>
                        </label>
                        <div className="edit-popup__file">
                            <label className="edit-popup__file--input">
                                Contenu image(s)
                                <input
                                    type="file"
                                    onChange={(e) => {updateArticleMultipleFiles(e)}}
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
                                        <button className="edit-popup__showContent--reset" onClick={resetImgs}>
                                            Réinitialiser
                                        </button>
                                        <div className="edit-popup__showContent--imgContent">
                                            {article.img_content.length > 0 ? article.img_content.map( (item, index) =>
                                                <div key={index} className="edit-popup__showContent--block">
                                                    <img src={item} alt="article-img" className="img_content"></img>
                                                    <button onClick={(e) => {deleteImg(e, index)}}>X</button>
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
                                    onChange={(e) => {updateCurrentVideo(e)}}
                                    name="current_video">
                                </input>
                            </label>
                            <button onClick={(e) => addVideoLink(e)} className="edit-popup--linkAdding">
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
                                        <button className="edit-popup__showContent--reset" onClick={resetLinks}>
                                            Réinitialiser
                                        </button>
                                        {article.video_content.length > 0 ?
                                                article.video_content.map( (item, index) => 
                                                    <div className="edit-popup__showContent--block video-popup" key={index}>
                                                        <div className="video-popup--item">{item}</div>
                                                        <button onClick={(e) => {deleteLink(e, index)}}>
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
                                editArticle(e, article.id);
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
 
export default EditArticle;