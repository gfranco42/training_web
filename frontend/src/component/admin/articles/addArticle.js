import React, { useState } from 'react'
import { toast } from 'react-toastify';

// URL GENERATOR
import S3FileUpload from 'react-s3';

// VIDEO PLAYER
import ReactPlayer from 'react-player';

// SLIDE SHOW
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

// nl2br
import nl2br from 'react-nl2br'


// draft
// import {Editor, EditorState, RichUtils, convertFromRaw, convertToRaw} from 'draft-js'
// import { stateToHTML } from "draft-js-export-html";

// FUNCTIONS
// import { LineBreakMaker } from '../../../utils'


const AddArticle = (display) => {

    const [article, setArticle] = useState({});
    const configuration = {
        access_key: process.env.REACT_APP_ACCESS_KEY,
        secret_key: process.env.REACT_APP_SECRET_KEY,
        bucket_name: process.env.REACT_APP_BUCKET,
        region: process.env.REACT_APP_REGION,
    }
    const slideProps = {
        transitionDuration: 250,
        indicators: true,
        arrows: true,
        autoplay: false,
    };

    const addArticle = async (e, state) => {
        e.preventDefault();
        try {
            // FETCH SECTION ****************************************************************************
            const {title, image, description, text_content, img_content, video_content} = state;// rendre lecriture + propre
            const body = {title, image, description, text_content, img_content, video_content};// creation d'un objet 'users'
            const response =  await fetch(                  // recup le resultat d'un 'POST'
                "http://localhost:9000/articles", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body)              // on fait en sorte que ce soit lisible en json
                }
            );
            if (response === null)
                console.log(response);
            const parseRes = await response.json();
            // ******************************************************************************************


            // TOAST ************************************************************************************
            parseRes === 200 ?
                toast.success("Ajout de l'article réussi !", {
                    className: "toast",
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                })
                : toast.error("Erreur lors de l'ajout d'article", {
                    className: "toast",
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                });
            // ******************************************************************************************
        } catch (error) {
           console.error(error.message); 
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setArticle({...article, [e.target.name]: [e.target.value]})
    }

    const handleChangeFile = async (e) => {
        e.preventDefault();
        const {bucket_name, access_key, secret_key, region} = configuration;
        const config = {
            bucketName: bucket_name,
            dirName: "",
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region,
        };

        const data = await S3FileUpload.uploadFile(e.target.files[0], config)
        const url = data.location;
        setArticle({...article, image: url});// remove "name" 
    }

    const handleChangeMultipleFiles = async (e) => {
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
        setArticle({...article, img_content: tab})
    }


    // ********************************** IMGS RELATED **********************************
    const removeImg = (e, idx) => {
        e.preventDefault();
        const data = article.img_content;
        setArticle({...article, img_content: data.filter( (name, index) => index !== idx) });
    }

    const SelectedImgs = () => {
        if (article.img_content) {
            return (
                <div className="bottom__previsual--list left-list">
                    {article.img_content.map( ( item, index ) =>
                        <div className="list-item" key={index}>
                            <div className="list-item__url url-img">{item}</div>
                            <button onClick={(e) => removeImg(e, index)}>Enlever</button>
                        </div>)}
                </div>)}
        else
            return null;
    }
    // ********************************** ************ **********************************


    // ********************************** LINK RELATED **********************************
    const addLink = (e) => {
        e.preventDefault();
        const {current_video} = article;
        current_video ? setArticle({...article, video_content: article.video_content ?
                [...article.video_content, current_video] : [current_video]})
        : toast.error("Aucune URL renseignée !", {
            className: "toast",
            position: "top-center",
            hideProgressBar: true,
            closeButton: false,
        })
    
    }

    const removeLink = (e, idx) => {
        e.preventDefault();
        const data = article.video_content;
        setArticle({...article, video_content: data.filter( (name, index) => index !== idx) });
    }

    const SelectedVideos = () => {
        if (article.video_content) {
            return (
                <div className="bottom__previsual--list right-list">
                    {article.video_content.map( ( item, index ) =>
                        <div className="list-item" key={index}>
                            <div className="list-item__url">{item}</div>
                            <button onClick={(e) => removeLink(e, index)}>Enlever</button>
                        </div>)}
                </div>)}
        else
            return null;
    }
    // ********************************** ************ **********************************

    return (
        <div className="adm-article" style={{display: display.display}}>

            {/* ADD ARTICLE */}
            <div>
                <form className="adm-article__adding"
                    onSubmit={(e) => addArticle(e, article)}>
                    <p className="adm-article__title">Ajouter un article</p>

                    <div className="top">
                        <label className="top__title">
                            Titre
                            <input type="text"
                                value={article.title || ''}
                                onChange={(e) => {handleChange(e)}}
                                name="title"
                                placeholder="ex. True Warriors 16"
                                maxLength="50"
                                required>
                            </input>
                        </label>
                        <label className="top__img">
                            Miniature
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {handleChangeFile(e)}}
                                className=""
                                name="image"
                                required>
                            </input>
                        </label>
                        <label className="top__description">
                            Description
                            <textarea
                                value={article.description || ''}
                                onChange={(e) => {handleChange(e)}}
                                name="description"
                                placeholder="ex: Dans cette vidéo, vous verrez comment arroser des Hamsters..."
                                maxLength="255"
                                required>
                            </textarea>
                        </label>
                    </div>
{/* ********************************************************************************************* */}
                    <div className="bottom">
                        <label className="bottom__text">
                            Texte de l'article
                            <textarea
                                value={article.text_content || ''}
                                onChange={(e) => {handleChange(e)}}
                                name="text_content"
                                placeholder="ex: Il était une fois...">
                            </textarea>
                        </label>
                        <label className="bottom__img">
                            Image(s) de l'article
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {handleChangeMultipleFiles(e)}}
                                className=""
                                name="img_content"
                                multiple>
                            </input>
                        </label>
                        <label className="bottom__video">
                            Vidéo(s) de l'article
                            <input
                                type="text"
                                onChange={(e) => {handleChange(e)}}
                                className=""
                                name="current_video"
                                placeholder="ex: https://video.com">
                            </input>
                            <button onClick={(e) => addLink(e)}>Ajouter un lien</button>
                        </label>
                        <div className="bottom__previsual">
                            <SelectedImgs />
                            <SelectedVideos />
                        </div>
                    </div>
                    <input type="submit"
                        value="Et zé partiiiii !"
                        className="adm-article__adding--input">
                    </input>
                </form>
            </div>


            {/* SHOW ARTICLE */}
            <div className="adm-article__previsualisation">
                <div className="adm-article__previsualisation--title">Prévisualisation de l'article</div>
                <div className="adm-article__presentation">
                    <div className="adm-article__presentation__texts">
                        <div className="adm-article__presentation--title">{article.title}</div>
                        <div className="adm-article__presentation--description">{nl2br(article.description)}</div>
                    </div>
                    <img className="adm-article__presentation--img" alt="presentation_img" src={article.image}></img>
                </div>
                <div className="adm-article__pipe"></div>
                <div className="adm-article__content">
                    <div className="section">
                        <h3>Contenu TEXTE</h3>
                        {nl2br(article.text_content)}
                    </div>
                    <div className="slide-container section">
                        <h3>Contenu IMAGE</h3>
                        { (article.img_content)
                            ? <Slide {...slideProps}>
                                {article.img_content.map( (item, index) => {
                                    return (
                                        <div key={index} className="each-slide">
                                            <img alt="img" src={item}/>
                                        </div>)
                                })}
                            </Slide>
                            : <div></div>
                        }
                    </div>
                    <div className="slide-container section">
                        <h3>Contenu VIDEO</h3>
                        { (article.video_content)
                            ? <Slide {...slideProps}>
                                {article.video_content.map( (item, index) => {
                                    return (
                                        <div key={index} className="each-slide">
                                            <ReactPlayer
                                                volume={0.5}
                                                controls={true}
                                                url={item}/>
                                        </div>)
                                })}
                            </Slide>
                            : <div></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddArticle;