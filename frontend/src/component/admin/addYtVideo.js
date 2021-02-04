import React, {Component} from 'react'
import { toast } from 'react-toastify';


export class AddYtVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            url: "",
            category: "",
            ep_nb: "",
            description: "",
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    addVideo = async (e, state) => {
        e.preventDefault();
        try {
            const {title, url, category, ep_nb, description} = state;// rendre lecriture + propre
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
            // window.location.reload();
        } catch (error) {
           console.error(error.message); 
        }
    };

    render() {
        return (
            <div className="">
                <p className="">Ajouter une vidéo Youtube:</p>
                <form onSubmit={(e) => this.addVideo(e, this.state)}>
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
                    <label>
                        Lien:
                        <input type="text"
                            value={this.state.url}
                            onChange={(e) => {this.handleChange(e)}}
                            name="url"
                            placeholder="ex. https://video.com"
                            className=""
                            required
                            >
                        </input>
                    </label>
                    <label>
                        Catégorie:
                        <select value={this.state.category}
                        onChange={(e) => {this.handleChange(e)}}
                        name="category"
                        className=""
                        required>
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
                            onChange={(e) => {this.handleChange(e)}}
                            name="ep_nb"
                            className=""
                            required
                            >
                        </input>
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={this.state.description}
                            onChange={(e) => {this.handleChange(e)}}
                            name="description"
                            className=""
                            placeholder="ex: Dans cette vidéo, vous verrez comment arroser des Hamsters..."
                            >
                        </textarea>
                    </label>
                    <input type="submit"
                        value="Et zé partiiiii !"
                        className="">
                    </input>
                </form>
            </div>
        )
    }
    
}