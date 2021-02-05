import React, { Component } from "react";

// GIFS
import wave_body from "../img/gifs/wave_body.gif";

// REACT PLAYER
import ReactPlayer from "react-player";

// COMPONENT
import News from "./news.js"

class HomeBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            random: ""
        }
    }

    render() {
        return (
            <div className="home-body">
                <div className="home-header">
                    <h1 className="home-header__title">Bienvenue sur le site Asylum Heroes !</h1>
                </div>
                <div className="home-main">
                    <News />
                </div>
                <div className="home-foot">
                    <img src={wave_body} alt="wave_gif" className="home-foot__wave"/>
                    <ReactPlayer url={"https://asylum-heroes.s3.eu-west-3.amazonaws.com/ending_tw.mp4"}
                        loop={true} onReady={ () => {} } playing={true} volume={0}
                        width="100%" height="100%"
                        className="home-foot__video"/>
                </div>
            </div>
        )
    }
}

export default HomeBody;