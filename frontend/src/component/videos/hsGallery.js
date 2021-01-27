import React, { Component } from 'react';

import YouTube from "react-youtube";
import getYoutubeID from "get-youtube-id";

class HSGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "https://www.youtube.com/watch?v=0u37KaINjzA&list=PLbBpiGp9JNV0qhZoE2bwykvvzGPobvkay"
        }
    }


    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
            },
        }
        return (
            <div className="videoGallery">
                <h1 className="videoGallery--title">Hors-Séries</h1>
                <div className="videoGallery__upload">
                    <YouTube videoId={getYoutubeID(this.state.url)} opts={opts}/>
                </div>
            </div>
        )
    }
}


export default HSGallery;