import React, {Component} from 'react';
import S3FileUpload from 'react-s3';

// YOUTUBE
import YouTube from 'react-youtube';
var getYoutubeID = require('get-youtube-id');

class VideoUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: "",
        }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({url: e.target.value});
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
            },
        };
        return (
            <div className="gallery__upload">
                <label>Lien youtube:</label>
                <input type="texte" onChange={this.onChange}/>
                <YouTube videoId={getYoutubeID(this.state.url)} opts={opts} onReady={this.onReady} />
            </div>
        )
    }
}

export default VideoUpload;