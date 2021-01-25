import React, { Component } from 'react';
// import {Link} from 'react-router-dom';


/* FUNCTION */
// import {string_cut} from "../utils.js";

/* COMPONENT */
// import { EditPopup } from "./editUser.js"
import { LoginPopup } from "./login.js"

/* PAGE */
// import Home from '../pages/home';
// import Projects from '../pages/projects';
// import Studies from '../pages/studies';

/* IMG */
import ah_logo from "../img/ah_logo.png";
import ah_title from "../img/ah_title.png";
// import ah_title from "../img/winter/ah_title.png";
// import header_bg from "../img/header_bg.png";



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            log: false,
            nav_style: { top: 330 }}
    }

    sticky_nav = (e) => {
        e.preventDefault();
        if (window.scrollY < 318)
            this.setState({nav_style: {top: 330 - window.scrollY}})
        else
            this.setState({nav_style: {top: 12}})

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
                    <a className="navigation__rubric--page">
                        Qui sommes nous?
                        <div className="underline"></div>
                    </a>


                    <div className="navigation__rubric--page videos-rubric">
                        <div className="rubric-title">Videos</div>
                        <div className="menu">
                            <div className="menu__choice">
                                <a className="title" href="/videos/true-warriors">True Warriors</a>
                                <div className="choice-underline"></div>
                            </div>
                            <div className="menu__choice">
                                <a className="title">League of Lesglands</a>
                                <div className="choice-underline"></div>
                            </div>
                            <div className="menu__choice last">
                                <a className="title">Hors-Séries</a>
                                <div className="choice-underline"></div>
                            </div>
                        </div>
                        <div className="underline"></div>
                    </div>


                    <a className="navigation__rubric--page" href="/gallery">
                        Gallerie
                        <div className="underline"></div>
                    </a>
                    <a className="navigation__rubric--page">
                        Autres projets
                        <div className="underline"></div>
                    </a>
                    <a className="navigation__rubric--page">
                        Forum
                        <div className="underline"></div>
                    </a>
                </div>

                {/* {this.is_logged(this.state.log)} */}
                {/* <LogginPopup state={this.state}/> */}
                <this.connectionButton />
            </div>
        </div>
        )
    }
}
 
export default Header;