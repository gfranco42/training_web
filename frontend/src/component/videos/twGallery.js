import React, { useState, useEffect } from 'react';

// YOUTUBE
// import YouTube from "react-youtube";
// import getYoutubeID from "get-youtube-id";
import ReactPlayer from 'react-player';

// SLIDESHOW
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import _ from 'lodash';

const TWGallery = () => {

    const [videos, setVideos] = useState()
    const [loading, setLoading] = useState(true)
    const [display, setDisplay] = useState()
    const [index, setIndex] = useState(0)
    const category = 'TW'
    const slideProps = {
        transitionDuration: 250,
        indicators: true,
        arrows: true,
        autoplay: false,
        onChange: (previous, current) => {
            setIndex(current)
        }
    };


    const handleClick = (e) => {
        e.preventDefault();
        setDisplay(e.target.name)
    }

    //temp
    const SpecificDisplay = () => {
        const video = videos[index];
        if (display === "description")
            return <div>{video.description}</div>
        else if (display === "bonus")
            return <div>Et maintenant, voila les bonus !</div>
        else if (display === "commentary")
            return <div>Finalement, voici les comms !</div>
        else
            return null;
    }


    // GET ALL VIDEO FROM CATEGORY "TRUE WARRIORS"
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
        getVideo()
    }, [])

        
    if (loading === true)
        return <div className="videoGallery">Chargement...</div>
    else if (videos === null || videos.length === 0)
        return <div className="videoGallery">Aucune vidéo enregistrée !</div>
    else {
        return (
            <div className="videoGallery">
                <div className="slide-container">
                    <Slide {...slideProps}>
                        {videos.map( (item) => {
                            return (
                                <div key={item.id} className="each-slide">
                                    <div className="each-slide__video">
                                        <h2>{item.title}</h2>
                                        <ReactPlayer url={item.url}
                                            controls={true}
                                            volume={0.5}/>
                                    </div>
                                </div>
                            )
                        })}
                    </Slide>
                </div>
                <div className="videoGallery__navigation">
                    <button name="description" onClick={handleClick}>Description</button>
                    <button name="bonus" onClick={handleClick}>Bonus</button>
                    <button name="commentary" onClick={handleClick}>Commentaires</button>
                </div>
                <div>
                    <SpecificDisplay />
                </div>

            </div>
        )
    }
}


export default TWGallery;