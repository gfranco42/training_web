import React, { Component } from 'react';

import YouTube from "react-youtube";
import getYoutubeID from "get-youtube-id";

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import _ from 'lodash';

class LOLGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: null,
            category: "LOL",
            opts: {
                height: '390',
                width: '640',
            },
            loading: false,
        }
    }

    // GET ALL VIDEO FROM CATEGORY "TRUE WARRIORS"
    componentDidMount = async () => {
        try {
            const {category} = this.state;
            console.log(category);
            const response = await fetch(`http://localhost:9000/ytvideos/category/${category}`, {
                method: "GET",
            });
            const data = await response.json();
            console.log(data);
            const newData = _.sortBy(data, ['ep_nb']);
            this.setState({videos: newData, loading: false})
            if (response === null)
                console.log(response);
        } catch (error) {
            console.error(error.message)
        }
    }

    render() {
        const slideProps = {
            transitionDuration: 500,
            indicators: true,
            arrows: true,
            infinite: false,
            autoplay: false,
        }
        
        if (this.state.loading === true)
            return <div className="videoGallery">Chargement...</div>
        else if (this.state.videos === null || this.state.videos.length === 0)
            return <div className="videoGallery">Aucune vidéo enregistrée !</div>
        else {
            return (
                <div className="videoGallery">
                    <h1 className="videoGallery__title">League of Lesglands</h1>
                    <div className="slide-container">
                        <Slide {...slideProps}>
                            {this.state.videos.map( (item) => {
                                return (
                                    <div key={item.id} className="each-slide">
                                        <div className="video">
                                            <h2>{item.title}</h2>
                                            <YouTube videoId={getYoutubeID(item.url)} opts={this.state.opts} />
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
}

export default LOLGallery;