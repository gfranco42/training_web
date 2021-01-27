import React, { Component } from 'react';

import YouTube from "react-youtube";
import getYoutubeID from "get-youtube-id";

class LOLGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "https://www.youtube.com/watch?v=YVM4IxIjDuc&list=PLbBpiGp9JNV265dFe1ezkTRC5ulakiJ5e"
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
                <h1 className="videoGallery--title">True Warriors</h1>
                <div className="videoGallery__upload">
                    <YouTube videoId={getYoutubeID(this.state.url)} opts={opts}/>
                </div>
            </div>
        )
    }
}


export default LOLGallery;