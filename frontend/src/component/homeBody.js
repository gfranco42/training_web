import React, { Component } from "react";
import ReactPlayer from 'react-player';

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
                <h1 className="home-body__title">Bienvenue sur le site Asylum Heroes !</h1>
                <div className="home-body__video aboutVideos">
                    <ReactPlayer url={"https://asylum-heroes.s3.eu-west-3.amazonaws.com/presentation_test.mov"}
                        controls={false}
                        playing={true}
                        loop={true}
                        volume={0}/>
                    <p>Sur notre site, vous pouvez retrouver toutes les videos Asylum Heroes dans la rubrique "VIDEOS"</p>
                </div>
                <div className="home-body__video aboutGallery">
                    <p>Si vous avez un compte, vous pouvez voir toutes les images dans la "GALLERIE", mais aussi en ajouter vous-même ou bien en supprimer !</p>
                    <ReactPlayer url={"https://asylum-heroes.s3.eu-west-3.amazonaws.com/presentation_test2.mov"}
                        controls={false}
                        playing={true}
                        loop={true}
                        volume={0}
                        />
                </div>
                <div className="who-presentation"></div>
            </div>
        )
    }
}

        export default HomeBody;