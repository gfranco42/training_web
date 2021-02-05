import React, {Component} from 'react'
import { toast } from 'react-toastify';

// URL GENERATOR
import S3FileUpload from 'react-s3';

// VIDEO PLAYER
import ReactPlayer from 'react-player';

// SLIDE SHOW
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


class AddArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            image: "",
            description: "",
            text_content: "",
            img_content: [],
            video_content: [],
            current_video: "",
            access_key: process.env.REACT_APP_ACCESS_KEY,
            secret_key: process.env.REACT_APP_SECRET_KEY,
            bucket_name: process.env.REACT_APP_BUCKET,
            region: process.env.REACT_APP_REGION,
        }
    }

    addArticle = async (e, state) => {
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

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    handleChangeFile = async (e) => {
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

    handleChangeMultipleFiles = async (e) => {
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
        this.setState({img_content: tab})
    }

    addLink = (e) => {
        e.preventDefault();
        const {current_video} = this.state;
        this.setState({video_content: [...this.state.video_content, current_video]})
    }

    removeLink = (e, idx) => {
        e.preventDefault();
        const data = this.state.video_content;
        this.setState({video_content: data.filter( (name, index) => index !== idx) });
    }



    // PREVISUALISATION DE L'ARTICLE
    selectedVideos = () => {
        if (this.state.video_content) {
            return (
                <div>
                    {this.state.video_content.map( ( item, index ) =>
                        <div key={index}>
                            {item}
                            <button onClick={(e) => this.removeLink(e, index)}>Enlever</button>
                        </div>)}
                </div>)}
        else
            return null;
    }

    componentDidMount = () => {
    }

    render() {
        const slideProps = {
            transitionDuration: 250,
            indicators: true,
            arrows: true,
            autoplay: false,
        };
        return (
            <div className="adm-article">
                <p className="">Ajouter un article:</p>
                <form onSubmit={(e) => this.addArticle(e, this.state)}>
                    <label>
                        Titre
                        <input type="text"
                            value={this.state.title}
                            onChange={(e) => {this.handleChange(e)}}
                            name="title"
                            placeholder="ex. True Warriors 16"
                            className=""
                            required
                            >
                        </input>
                    </label>
                    <label htmlFor="uploadBtn">
                        Image de présentation:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {this.handleChangeFile(e)}}
                            className=""
                            name="image"
                            required>
                        </input>
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={this.state.description}
                            onChange={(e) => {this.handleChange(e)}}
                            name="description"
                            placeholder="ex: Dans cette vidéo, vous verrez comment arroser des Hamsters..."
                            className=""
                            required>
                        </textarea>
                    </label>
                    <label>
                        Contenu de l'article type texte:
                        <textarea
                            value={this.state.text_content}
                            onChange={(e) => {this.handleChange(e)}}
                            name="text_content"
                            placeholder="ex: Il était une fois..."
                            className="">
                        </textarea>
                    </label>
                    <label>
                        Image(s) de l'article:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {this.handleChangeMultipleFiles(e)}}
                            className=""
                            name="img_content"
                            multiple>
                        </input>
                    </label>
                    <label>
                        Vidéos(s) de l'article:
                        <input
                            type="text"
                            onChange={(e) => {this.handleChange(e)}}
                            className=""
                            name="current_video">
                        </input>
                        <button onClick={(e) => this.addLink(e)}>Ajouter un lien</button>
                        <this.selectedVideos />
                    </label>
                    <input type="submit"
                        value="Et zé partiiiii !"
                        className="">
                    </input>
                </form>


                <div className="adm-article__previsualisation">
                    <div>{this.state.title}</div>
                    <div>{this.state.description}</div>
                    <img alt="img" src={this.state.image}></img>
                    <div className="adm-article__content">
                        <div className="section">
                            <h3>TEXT_CONTENT</h3>
                            {this.state.text_content}
                        </div>
                        <div className="slide-container section">
                            <h3>IMG_CONTENT</h3>
                            <Slide {...slideProps}>
                                {this.state.img_content.map( (item, index) => {
                                    return (
                                        <div key={index} className="each-slide">
                                            <img alt="img" src={item}/>
                                        </div>
                                    )
                                })}
                            </Slide>
                        </div>
                        <div className="slide-container section">
                            <h3>VIDEO_CONTENT</h3>
                            <Slide {...slideProps}>
                                {this.state.video_content.map( (item, index) => {
                                    return (
                                        <div className="each-slide" key={index}>
                                            <ReactPlayer
                                                volume={0.5}
                                                controls={true}
                                                url={item}/>
                                        </div>
                                    )
                                })}
                            </Slide>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddArticle;