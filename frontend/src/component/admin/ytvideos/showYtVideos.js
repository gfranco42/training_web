import React, { useState, useEffect } from 'react';

/* MODULES */
import { EditYtVideo } from './editYtVideos'
import _ from 'lodash';

/* POPUP */
import Popup from 'reactjs-popup';


const ShowYTVideos = (props) => {

    const [videos, setVideos] = useState({});
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState({sorted: true, last: ""})


    const tableSort = (e, type) => {
        e.preventDefault();
        const {sorted, last} = sort;
        const data = videos;
        const newState = _.sortBy(data, [type]);
        if (sorted === true || last !== type) {
            // setState({
            //     videos: newState,
            //     loading: false,
            //     sort: false,
            //     last: type
            // });               // on met a jour le state local pour pouvoir afficher
            setVideos(newState)
            setLoading(false)
            setSort({sorted: false, last: type})
        }
        else if (sorted === false || last === type) {
            // setState({
            //     videos: newState.reverse(),
            //     loading: false,
            //     sort: true,
            //     last: type
            // });               // on met a jour le state local pour pouvoir afficher
            setVideos(newState)
            setLoading(false)
            setSort({sorted: false, last: type})
        }
    }


    // DELETE YT VIDEO
    const deleteYtVideo = async (e, id) => {
        e.preventDefault();
            const response = await fetch(
                `http://localhost:9000/ytvideos/${id}`, {
                    method: "DELETE"
                });
            if (response === null)
                console.log(response);
            const data = videos;
            // setState({videos: data.filter(video => video.id !== id)});
            setVideos(data.filter(video => video.id !== id))
    }

    // UPDATE YT VIDEO LIST FROM DB
    useEffect( () => {
        const getYtVideos = async () => {
            const response = await fetch("http://localhost:9000/ytvideos");// recup les infos de la DB
            if (response === null)
                console.log(response);
            const data = await response.json();                         // les infos sont lisibles en json
            const newData = _.sortBy(data, ['category', 'ep_nb']);
            setVideos(newData)
            setLoading(false)
        }
        getYtVideos();
    }, [])

    const style = {
        "maxWidth": "400px",
        "border": "solid 1px white",
        "padding": "20px",
        "borderRadius": "10px",
        "boxShadow": "5px 5px 10px #444",
        "fontFamily": "Gotham Bold",
        "background": "#444",
        "color": "white",
    }

    if (loading === true)
        return <div className="" style={{display: props.display}}>Chargement...</div>
    else if (videos === null || videos.length === 0)
        return <div className="" style={{display: props.display}}>Aucun utilisateur enregistré !</div>
    else {
        return (
            <table className="adm-ytvideos" style={{display: props.display}}>
                <caption className="adm-ytvideos--title">Liste des videos: </caption>
                <thead>
                    <tr className="adm-ytvideos__tab-title">
                        <th className="title-column" onClick={ (e) => {tableSort(e, "title")}}>Titre</th>
                        <th className="link-column"onClick={ (e) => {tableSort(e, "url")}}>Lien</th>
                        <th className="category-column" onClick={ (e) => {tableSort(e, "category")}}>Catégorie</th>
                        <th className="ep_nb-column" onClick={ (e) => {tableSort(e, "ep_nb")}}>Nº de l'épisode</th>
                        <th className="description-column">Description</th>
                        <th className="edit-column"></th>
                        <th className="delete-column"></th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map( (video) =>
                        <tr className="adm-ytvideos__tab-rows" key={video.id}>
                            <th className="title-column">{video.title}</th>
                            <th className="link-column">{video.url}</th>
                            <th className="category-column">{video.category}</th>
                            <th className="ep_nb-column">{video.ep_nb}</th>
                            <th className="description-column">
                                <Popup trigger={open => (
                                    <button className="description-column--button">
                                        {open ? 'Cacher' : 'Afficher'}
                                    </button>)}
                                    position="left center"
                                    closeOnDocumentClick
                                >
                                    <div style={style}>{video.description}</div>
                                </Popup>
                            </th>
                            <th className="edit-column">
                                <EditYtVideo
                                    // updateVideoInfo={updateVideoInfo}
                                    props={video}

                                    // videoId={video.id}
                                    // title={video.title}
                                    // url={video.url}
                                    // category={video.category}
                                    // ep_nb={video.ep_nb}
                                    // description={video.description}
                                    // videos={video.videos}
                                />
                            </th>
                            <th className="delete-column">
                                <button type="button" name="delete"
                                onClick={(e) => deleteYtVideo(e, video.id)}
                                className="adm-ytvideos--button">
                                    Supprimer
                                </button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
};

export default ShowYTVideos;