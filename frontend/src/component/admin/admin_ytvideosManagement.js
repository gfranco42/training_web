import React, { Component } from 'react';
import { ShowYTVideos } from './showYtVideos';
import { AddYtVideo } from './addYtVideo';


/* COMPONENT */


class Admin_ytvideosManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            url: "",
            category: "",
            ep_nb: ""
        }
    }

    // handleChange = (e) => {
    //     e.preventDefault();
    //     this.setState({[e.target.name]: e.target.value});
    // }

    // componentDidMount = async () => {
    //     try {
    //         console.log(this.state)
    //     } catch (error) {
    //         console.error(error.message);    
    //     }
    // }

    render () {
        return (
        <div className="">
            <AddYtVideo />
            <ShowYTVideos />


            {/* <div className="">
                <p className="">Ajouter une vidéo Youtube:</p>
                <form onSubmit={(e) => AddYtVideo(e, this.state)}>
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
                        className=""
                        required>
                            <option value="">Catégorie de la vidéo...</option>
                            <option value="trueWarriors">True Warriors</option>
                            <option value="leagueofLesglands">League of Lesglands</option>
                            <option value="horsSeries">Hors-Série</option>
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
            </div> */}

        </div>

        )
    }
}

export default Admin_ytvideosManagement;