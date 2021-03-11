import React, { useState, useEffect } from 'react';

// COMPONENT
import LoginPopup from "../auth/login.js"

// REACT ROUTER
import { Link, useHistory } from 'react-router-dom';

// IMGS
import ah_logo from "../../img/ah_logo.png";
import ah_title from "../../img/ah_title.png";

//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, setLog } from '../../actions'

import wave_header from "../../img/gifs/wave_header.gif";

const Header = () => {

    // const [log, setLog] = useState(false);
    // const [avatar, setAvatar] = useState('');
    // const [status, setStatus] = useState('')
    
    const dispatch = useDispatch()
    const history = useHistory();


    const logState = useSelector(state => state.log)
    const {log} = logState;
    const userState = useSelector(state => state.user)
    const {user} = userState;

    // NAV BAR STYLE
    const [navStyle, setNavStyle] = useState({});
    const sticky_nav = () => {
        if (window.scrollY > ( window.innerWidth * 45.6 / 100) )
            setNavStyle({ 'background':  'rgba(0, 0, 0, 0.5)' })
        else
            setNavStyle({ 'background':  'rgba(68, 68, 68, 0)' })

    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        dispatch(deleteUser())
        dispatch(setLog(false))
        history.push("/")
    }

    const AdminRubric = () => {
        if (user && user.status === 'admin') {
            return (
                <div className="menu__choice">
                    <Link className="title"
                        to="/admin">
                            Admin
                    </Link>
                </div>
            )
        }
        else
            return null;

    }

    const ConnectionButton = () => {

        if (log === "false" || !log)
            return (
                <div className="navigation__button">
                    <LoginPopup />
                </div>
            )
        else {
            return (
                <div className="account-block">
                    <div className="account-block__pipe"></div>
                    {user
                        ? <img src={user.avatar} className="account-block__avatar" alt="avatar_img"/>
                        : <div></div>}
                    <div className="navigation__rubric--page account-block__menu">
                        <div className="rubric-title">
                            Profil
                            <div className="underline"></div>
                        </div>
                        <div className="menu">
                            <div className="menu__choice first">
                                <Link className="title"
                                    to="/profil">
                                        Mon compte
                                </Link>
                            </div>
                            <div className="menu__choice">
                                <Link className="title"
                                    to="/">
                                        Mes messages
                                </Link>
                            </div>
                            <AdminRubric />
                            <div className="menu__choice">
                                <div className="title"
                                    onClick={logout}>
                                        Déconnexion
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
    }
        
        // <button className="navigation__button--logout" onClick={this.logout}>Deconnexion</button>
    // https://asylum-heroes.s3.eu-west-3.amazonaws.com/ending_tw.mp4



    // USE EFFECT
    useEffect( () => {
        window.addEventListener('scroll', sticky_nav);
    }, [dispatch])

    return (
        <div className="header">

            <Link className="header__background" to="/">
                <img className="header__background--title" alt="title" src={ah_title}/>
            </Link>



            <div className="header__navigation" style={navStyle}>


                            {/* LOGO SECTION  */}
                <Link  to="/">
                    <img className="header__navigation--logo" src={ah_logo} alt="ah_logo"/>
                </Link>


                            {/* RUBRICS SECTION */}
                <div className="navigation__rubric">
                    <Link className="navigation__rubric--page"
                        to="/about">
                        Qui sommes nous?
                        <div className="underline"></div>
                    </Link>
                    {/* <Link className="navigation__rubric--page"
                        href="/about">
                        Qui sommes nous?
                        <div className="underline"></div>
                    </Link> */}

                    {/* VIDEO MENU */}
                    <div className="navigation__rubric--page videos-rubric">
                        <div className="rubric-title">
                            Videos
                            <div className="underline"></div>
                        </div>
                        <div className="menu">
                            <div className="menu__choice first">
                                <Link className="title"
                                    to="/videos/tw">
                                        True Warriors
                                </Link>
                            </div>
                            <div className="menu__choice">
                                <Link className="title"
                                    to="/videos/lol">
                                        League of Lesglands
                                </Link>
                            </div>
                            <div className="menu__choice">
                                <Link className="title"
                                    to="/videos/hs">
                                        Hors-Séries
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* ************ */}


                    <Link className="navigation__rubric--page"
                        to="/gallery">
                        Gallerie
                        <div className="underline"></div>
                    </Link>
                    <Link className="navigation__rubric--page"
                        to="/">
                        Autres projets
                        <div className="underline"></div>
                    </Link>
                    <Link className="navigation__rubric--page"
                        to="/">
                        Forum
                        <div className="underline"></div>
                    </Link>
                </div>
                <ConnectionButton />
            </div>

            <img src={wave_header} alt="header_wave" className="header__wave"></img>
        </div>
    )
}
 
export default Header;