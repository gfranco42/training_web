import React, { Component } from 'react';

// YOUTUBE
import YouTube from "react-youtube";
import getYoutubeID from "get-youtube-id";

// SLIDESHOW
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import _ from 'lodash';


class TWGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: null,
            category: "TW",
            opts: {
                height: '390',
                width: '640',
            },
            loading: false,
            display: null,
            index: 0,
        }
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({display: e.target.name})
    }

    //temp
    specificDisplay = () => {
        const {index} = this.state;
        const video = this.state.videos[index];
        if (this.state.display === "description")
            return <div>{video.description}</div>
        else if (this.state.display === "bonus")
            return <div>Et maintenant, voila les bonus !</div>
        else if (this.state.display === "commentary")
            return <div>Finalement, voici les comms !</div>
        else
            return null;
    }


    // GET ALL VIDEO FROM CATEGORY "TRUE WARRIORS"
    componentDidMount = async () => {
        try {
            const {category} = this.state;
            const response = await fetch(`http://localhost:9000/ytvideos/category/${category}`, {
                method: "GET",
            });
            const data = await response.json();
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
            autoplay: false,
            onChange: (previous, current) => {
                this.setState({index: current});
            }
        };
        
        if (this.state.loading === true)
            return <div className="videoGallery">Chargement...</div>
        else if (this.state.videos === null || this.state.videos.length === 0)
            return <div className="videoGallery">Aucune vidéo enregistrée !</div>
        else {
            return (
                <div className="videoGallery">
                    <h1 className="videoGallery__title">True Warriors</h1>
                    <div className="slide-container">
                        <Slide {...slideProps}>
                            {this.state.videos.map( (item) => {
                                return (
                                    <div key={item.id} className="each-slide">
                                        <div className="each-slide__video">
                                            <h2>{item.title}</h2>
                                            <YouTube videoId={getYoutubeID(item.url)} opts={this.state.opts} />
                                        </div>
                                    </div>
                                )
                            })}
                        </Slide>
                        
                    </div>
                    <div className="videoGallery__navigation">
                        <button name="description" onClick={this.handleClick}>Description</button>
                        <button name="bonus" onClick={this.handleClick}>Bonus</button>
                        <button name="commentary" onClick={this.handleClick}>Commentaires</button>
                    </div>
                    <div>
                        <this.specificDisplay/>
                    </div>

                </div>
            )
        }
    }
}


export default TWGallery;