import React, { useState, useEffect } from 'react';

import YouTube from "react-youtube";
import getYoutubeID from "get-youtube-id";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import _ from 'lodash';

const LOLGallery = () => {
    // GET ALL VIDEO FROM CATEGORY "TRUE WARRIORS"

    const [videos, setVideos] = useState()
    const [loading, setLoading] = useState(true)
    const opts = {height: '390', width: '640'}
    const category = "LOL"
    const slideProps = {
        transitionDuration: 500,
        indicators: true,
        arrows: true,
        infinite: false,
        autoplay: false,
    }
    

    useEffect( () => {
        const getVideo = async () => {
            const response = await fetch(`http://localhost:9000/ytvideos/category/${category}`, {
                method: "GET",
            });
            if (response === null)
                console.log(response);
            const data = await response.json();
            const newData = _.sortBy(data, ['ep_nb']);
            setVideos(newData)
            setLoading(false)
        }
        getVideo();
    }, [])

        
    if (loading === true)
        return <div className="videoGallery">Chargement...</div>
    else if (videos === null || videos.length === 0)
        return <div className="videoGallery">Aucune vidéo enregistrée !</div>
    else {
        return (
            <div className="videoGallery">
                <h1 className="videoGallery__title">League of Lesglands</h1>
                <div className="slide-container">
                    <Slide {...slideProps}>
                        {videos.map( (item) => {
                            return (
                                <div key={item.id} className="each-slide">
                                    <div className="video">
                                        <h2>{item.title}</h2>
                                        <YouTube videoId={getYoutubeID(item.url)} opts={opts} />
                                    </div>
                                </div>
                            )
                        })}
                    </Slide>
                </div>
            </div>
        )
    }
}

export default LOLGallery;