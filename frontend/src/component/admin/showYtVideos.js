import React, { Component } from 'react';

/* MODULES */
import { EditPopup } from './editYtVideos'
import _ from 'lodash';
import YouTube from "react-youtube";
import getYouTubeID from 'get-youtube-id';

export class ShowYTVideos extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: null,
            loading: true,
            title: "",
            url: "",
            category: "",
            ep_nb: ""
        }
    }

    // UPDATE AN INFORMATION OF ONE YT VIDEO
    updateVideoInfo = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    // DELETE YT VIDEO

    deleteYtVideo = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:9000/ytvideos/${id}`, {
                    method: "DELETE"
                });
            const data = this.state.videos;
            this.setState({videos: data.filter(video => video.id !== id)});
        } catch (error) {
            console.error(error.message);
        }
    }

    // UPDATE YT VIDEO LIST FROM DB
    componentDidMount = async () => {
        try {
            const response = await fetch("http://localhost:9000/ytvideos");// recup les infos de la DB
            const data = await response.json();                         // les infos sont lisibles en json
            const newData = _.sortBy(data, 'ep_nb', function(n) {
                return Math.sin(n);
            });
            this.setState({videos: newData, loading: false});               // on met a jour le state local pour pouvoir afficher
            if (response === null)
                console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }

    render () {
        const opts = {
            height: '185',
            width: '320',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
            },
        }
        if (this.state.loading === true)
            return <div className="">Chargement...</div>
        else if (this.state.videos === null || this.state.videos.length === 0)
            return <div className="">Aucun utilisateur enregistré !</div>
        else {
            return (
                <table className="">
                    <caption className="">Liste des utilisateurs: </caption>
                    <thead>
                        <tr className="">
                            <th className="">Titre</th>
                            <th className="">Lien</th>
                            <th className="">Catégorie</th>
                            <th className="">Nº de l'épisode</th>
                            <th className="">Pré-visualisation</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.videos.map( (video) =>
                            <tr className="" key={video.id}>
                                <th className="">{video.title}</th>
                                <th className="">{video.url}</th>
                                <th className="">{video.category}</th>
                                <th className="">{video.ep_nb}</th>
                                <th className=""><YouTube videoId={getYouTubeID(video.url)} opts={opts}/></th>
                                <th className="">
                                    <EditPopup
                                        updateVideoInfo={this.updateVideoInfo}
                                        videoId={video.id}
                                        title={this.state.title}
                                        url={this.state.url}
                                        category={this.state.category}
                                        ep_nb={this.state.ep_nb}
                                        videos={this.state.videos}
                                    />
                                </th>
                                <th className="">
                                    <button type="button" name="delete"
                                    onClick={(e) => this.deleteYtVideo(e, video.id)}
                                    className="">
                                        Supprimer
                                    </button>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            )
        }
    }

};