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
            sort: true,
            last: ""
            // title: "",
            // url: "",
            // category: "",
            // ep_nb: ""
        }
    }

    // UPDATE AN INFORMATION OF ONE YT VIDEO
    // updateVideoInfo = (e) => {
    //     e.preventDefault();
    //     this.setState({[e.target.name]: e.target.value});
    // }

    // DELETE YT VIDEO

    tableSort = (e, type) => {
        e.preventDefault();
        const {sort, last} = this.state;
        const data = this.state.videos;
        const newState = _.sortBy(data, [type]);
        if (sort === true || last !== type) {
            this.setState({
                videos: newState,
                loading: false,
                sort: false,
                last: type
            });               // on met a jour le state local pour pouvoir afficher
        }
        else if (sort === false || last === type) {
            this.setState({
                videos: newState.reverse(),
                loading: false,
                sort: true,
                last: type
            });               // on met a jour le state local pour pouvoir afficher
        }
    }

    deleteYtVideo = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:9000/ytvideos/${id}`, {
                    method: "DELETE"
                });
            if (response === null)
                console.log(response);
            const data = this.state.videos;
            this.setState({videos: data.filter(video => video.id !== id)});
        } catch (error) {
            console.error(error.message);
        }
    }

    // UPDATE YT VIDEO LIST FROM DB
    componentDidMount = async () => {
        try {
            console.log('yolo');
            const response = await fetch("http://localhost:9000/ytvideos");// recup les infos de la DB
            if (response === null)
                console.log(response);
            const data = await response.json();                         // les infos sont lisibles en json
            // const newData = _.sortBy(data, 'ep_nb', function(n) {
            //     return Math.sin(n);
            // });
            const newData = _.sortBy(data, ['category', 'ep_nb']);
            this.setState({videos: newData, loading: false});               // on met a jour le state local pour pouvoir afficher
        } catch (error) {
            console.error(error.message);
        }
    }

    render () {
        const opts = {
            height: '200',
            width: '200',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
              showinfo: 0,
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
                            <th className="" onClick={ (e) => {this.tableSort(e, "title")}}>Titre</th>
                            <th className="" onClick={ (e) => {this.tableSort(e, "url")}}>Lien</th>
                            <th className="" onClick={ (e) => {this.tableSort(e, "category")}}>Catégorie</th>
                            <th className="" onClick={ (e) => {this.tableSort(e, "ep_nb")}}>Nº de l'épisode</th>
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
                                <th className="">
                                    <EditPopup
                                        // updateVideoInfo={this.updateVideoInfo}
                                        videoId={video.id}
                                        title={video.title}
                                        url={video.url}
                                        category={video.category}
                                        ep_nb={video.ep_nb}
                                        videos={video.videos}
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