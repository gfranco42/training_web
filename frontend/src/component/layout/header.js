import React, { Component } from 'react';

// COMPONENT
import { LoginPopup } from "../login.js"

// IMGS
import ah_logo from "../../img/ah_logo.png";
import ah_title from "../../img/ah_title.png";

// GIFS
import wave_header from "../../img/gifs/wave_header.gif";
// import wave_body from "../img/gifs/wave_body.gif";
// import wave_footer from "../img/gifs/wave_footer.gif";
// import ah_title from "../img/winter/ah_title.png";
// import header_bg from "../img/header_bg.png";



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            log: false,
            nav_style: {}
        }
    }

    sticky_nav = (e) => {
        e.preventDefault();
        if (window.scrollY > ( window.innerWidth * 45.6 / 100) )
            this.setState({nav_style: { 'background':  'rgba(0, 0, 0, 0.5)' }})
        else
            this.setState({nav_style: { 'background':  'rgba(68, 68, 68, 0)' }})

    }

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location = "/";
    }

    updateLogState = (bool) => {
        this.setState({log: bool});
    }

    connectionButton = () => {

        if (this.state.log === false)
            return (
                <div className="navigation__button">
                    <LoginPopup updateLogState={this.updateLogState}/>
                </div>
            )
        else
            return (
                <div className="navigation__button">
                    <button className="navigation__button--profil-page" onClick={() => {window.location = "/profil"}}>Profil</button>
                    <button className="navigation__button--logout" onClick={this.logout}>Deconnexion</button>
                </div>
            )
            
    }

    componentDidMount = async () => {
        window.addEventListener('scroll', this.sticky_nav);
        console.log(window.innerWidth)

        // VERIFY TOKEN
        const responseVerify = await fetch("http://localhost:9000/auth/token-verify", {
            method: "GET",
            headers: {token: localStorage.token}
        });
        const parseResVerify = await responseVerify.json();
        if (!parseResVerify || parseResVerify === "Not Authorized"){
            localStorage.removeItem("token");
            this.setState({log: false});
        }
        else
            this.setState({log: true})

    }

    render() { 
        return (
        <div className="header">

            <a className="header__background" href={'http://localhost:3000/'}>
                <img className="header__background--title" alt="title" src={ah_title}/>
            </a>

            <div className="header__navigation" style={this.state.nav_style}>
                <a  href={'http://localhost:3000/'}>
                    <img className="header__navigation--logo" src={ah_logo} alt="ah_logo"/>
                </a>

                <div className="navigation__rubric">
                    <a className="navigation__rubric--page"
                        href="/about">
                        Qui sommes nous?
                        <div className="underline"></div>
                    </a>


                    {/* VIDEO MENU */}
                    <div className="navigation__rubric--page videos-rubric">
                        <div className="rubric-title">
                            Videos
                            <div className="underline"></div>
                        </div>
                        <div className="menu">
                            <div className="menu__choice first">
                                <a className="title"
                                    href="/videos/tw">
                                        True Warriors
                                </a>
                            </div>
                            <div className="menu__choice">
                                <a className="title"
                                    href="/videos/lol">
                                        League of Lesglands
                                </a>
                            </div>
                            <div className="menu__choice last">
                                <a className="title"
                                    href="/videos/hs">
                                        Hors-Séries
                                </a>
                            </div>
                        </div>
                    </div>


                    <a className="navigation__rubric--page"
                        href="/gallery">
                        Gallerie
                        <div className="underline"></div>
                    </a>
                    <a className="navigation__rubric--page"
                        href="/">
                        Autres projets
                        <div className="underline"></div>
                    </a>
                    <a className="navigation__rubric--page"
                        href="/">
                        Forum
                        <div className="underline"></div>
                    </a>
                </div>

                {/* {this.is_logged(this.state.log)} */}
                {/* <LogginPopup state={this.state}/> */}
                <this.connectionButton />
            </div>

            <img src={wave_header} alt="header_wave" className="header__wave"></img>
        </div>
        )
    }
}
 
export default Header;