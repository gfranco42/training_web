import react, {Component} from 'react'


export class AddYtVideo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            url: "",
            category: "",
            ep_nb: ""
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    addVideo = async (e, state) => {
        e.preventDefault();
        try {
            const {title, url, category, ep_nb} = state;// rendre lecriture + propre
            const body = {title, url, category, ep_nb};// creation d'un objet 'users'
            const response =  await fetch(                  // recup le resultat d'un 'POST'
                "http://localhost:9000/ytvideos", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body)              // on fait en sorte que ce soit lisible en json
                }
            );
            window.location.reload();
            if (response === null)
                console.log(response);
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
                            <option value="True Warriors">True Warriors</option>
                            <option value="League of Lesglands">League of Lesglands</option>
                            <option value="Hors Séries">Hors-Série</option>
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
                    <input type="submit"
                        value="Et zé partiiiii !"
                        className="">
                    </input>
                </form>
            </div>
        )
    }
    
}