import React, { Component } from 'react';
// import {Link} from 'react-router-dom';

/* STYLE */
import "../style/container/_header.scss";

/* FUNCTION */
import {string_cut} from "../utils.js";

/* PAGE */
// import Home from '../pages/home';
// import Projects from '../pages/projects';
// import Studies from '../pages/studies';

/* IMG */
import ah_logo from "../img/ah_logo.png";
import ah_title from "../img/ah_title.png";
// import header_bg from "../img/header_bg.png";



class Header extends Component {
    constructor(props) {
        super(props)
        this.state = { log: false,
                        nav_style: { top: 330 }}
    }

    sticky_nav = (e) => {
        e.preventDefault();
        console.log(window.scrollY)
        if (window.scrollY < 318)
            this.setState({nav_style: {top: 330 - window.scrollY}})
        else
            this.setState({nav_style: {top: 12}})

    }

    handleClick = (e) => {
        e.preventDefault();
        if (this.state.log === true)
            this.setState({log: false});
        else
            this.setState({log: true})

        console.log(this.state.log)
    }

    is_logged = (log) => {
        if (log === true) {
            return (
                <div className="navigation__button">
                    <div className="navigation__button--logout" onClick={this.handleClick}>Deconnexion</div>
                </div>
            )
        }
        else {
            return (
                <div className="navigation__button">
                    <div className="navigation__button--login" onClick={this.handleClick}>Connexion</div>
                    <div className="navigation__button--signin">Inscription</div>
                </div>
            )
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.sticky_nav);
    }

    render() { 
        return (
        <div className="header">

            <a className="header__background" href={'http://localhost:3000' + window.location.pathname}>
                <img className="header__background--title" alt="title" src={ah_title}/>
            </a>

            <div className="header__navigation" style={this.state.nav_style}>
                <img className="header__navigation--logo" src={ah_logo} alt="ah_logo"/>

                <div className="navigation__rubric">
                    <div className="navigation__rubric--page about">Qui sommes nous?
                        <div className="underline"></div>
                    </div>
                    <div className="navigation__rubric--page videos">Videos
                        <div className="underline"></div>
                    </div>
                    <div className="navigation__rubric--page project">Autres projets
                        <div className="underline"></div>
                    </div>
                    <div className="navigation__rubric--page forum">Forum
                        <div className="underline"></div>
                    </div>
                </div>

                {this.is_logged(this.state.log)}
            </div>
        </div>
        )
    }
}
 
export default Header;