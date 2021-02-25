import React, { useState, useEffect } from 'react';

import YouTube from "react-youtube";
import getYoutubeID from "get-youtube-id";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import _ from 'lodash';

// class HSGallery extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             videos: null,
//             category: "HS",
//             opts: {
//                 height: '390',
//                 width: '640',
//             },
//             loading: false,
//         }
//     }

const HSGallery = () => {

    const [videos, setVideos] = useState()
    const [loading, setLoading] = useState(true)
    const [opts, setOpts] = useState({height: '390', width: '640'})
    const category = 'HS'
    const slideProps = {
        transitionDuration: 500,
        indicators: true,
        arrows: true,
        infinite: false,
        autoplay: false,
    }
    // GET ALL VIDEO FROM CATEGORY "TRUE WARRIORS"

    useEffect( () => {
        const getVideo = async () => {
            console.log(category);
            const response = await fetch(`http://localhost:9000/ytvideos/category/${category}`, {
                method: "GET",
            });
            if (response === null)
                console.log(response);
            const data = await response.json();
            console.log(data);
            const newData = _.sortBy(data, ['ep_nb']);
            // this.setState({videos: newData, loading: false})
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
                <h1 className="videoGallery__title">Hors-Séries</h1>
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

export default HSGallery;