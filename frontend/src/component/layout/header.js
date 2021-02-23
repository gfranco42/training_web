import React, { useState, useEffect } from 'react';

// COMPONENT
import { LoginPopup } from "../auth/login.js"

// IMGS
import ah_logo from "../../img/ah_logo.png";
import ah_title from "../../img/ah_title.png";

// GIFS
import wave_header from "../../img/gifs/wave_header.gif";

const Header = () => {

    const [log, setLog] = useState(false);
    const [navStyle, setNavStyle] = useState({});
    const [avatar, setAvatar] = useState('');
    const [status, setStatus] = useState('')

    const sticky_nav = () => {
        if (window.scrollY > ( window.innerWidth * 45.6 / 100) )
            setNavStyle({ 'background':  'rgba(0, 0, 0, 0.5)' })
        else
            setNavStyle({ 'background':  'rgba(68, 68, 68, 0)' })

    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location = "/";
    }

    const updateLogState = async (bool) => {
        setLog(bool);
        if (bool === true) {
            // RECUP USER AVATAR
            const response = await fetch("http://localhost:9000/profil/", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseRes = await response.json();
            // ON PEUT RECUP TOUTES LES INFOS DU PROFIL SI BESOIN
            const {avatar, status} = parseRes;
            setAvatar(avatar);
            setStatus(status);
        }
    }

    const AdminRubric = () => {
        if (status === 'admin') {
            return (
                <div className="menu__choice">
                    <a className="title"
                        href="/admin">
                            Admin
                    </a>
                </div>
            )
        }
        else
            return null;

    }

    const ConnectionButton = () => {

        if (log === false)
            return (
                <div className="navigation__button">
                    <LoginPopup updateLogState={updateLogState}/>
                </div>
            )
        else {
            return (
                <div className="account-block">
                    <div className="account-block__pipe"></div>
                    <img src={avatar} className="account-block__avatar" alt="avatar_img"/>
                    <div className="navigation__rubric--page account-block__menu">
                        <div className="rubric-title">
                            Profil
                            <div className="underline"></div>
                        </div>
                        <div className="menu">
                            <div className="menu__choice first">
                                <a className="title"
                                    href="/profil">
                                        Mon compte
                                </a>
                            </div>
                            <div className="menu__choice">
                                <a className="title"
                                    href="/">
                                        Mes messages
                                </a>
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

            // VERIFY TOKEN
        const getProfile = async () => {
            const responseVerify = await fetch("http://localhost:9000/auth/token-verify", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseResVerify = await responseVerify.json();
            if (!parseResVerify || parseResVerify === "Not Authorized"){
                localStorage.removeItem("token");
                setLog(false);
            }
            else {
                setLog(true)
                // RECUP USER AVATAR
                const response = await fetch("http://localhost:9000/profil/", {
                    method: "GET",
                    headers: {token: localStorage.token}
                })
                const parseRes = await response.json();
                // ON PEUT RECUP TOUTES LES INFOS DU PROFIL SI BESOIN
                const {avatar, status} = parseRes;
                setAvatar(avatar);
                setStatus(status);
            }
        }

        getProfile();
    }, [])

    return (
        <div className="header">

            <a className="header__background" href={'http://localhost:3000/'}>
                <img className="header__background--title" alt="title" src={ah_title}/>
            </a>



            <div className="header__navigation" style={navStyle}>


                            {/* LOGO SECTION  */}
                <a  href={'http://localhost:3000/'}>
                    <img className="header__navigation--logo" src={ah_logo} alt="ah_logo"/>
                </a>


                            {/* RUBRICS SECTION */}
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
                            <div className="menu__choice">
                                <a className="title"
                                    href="/videos/hs">
                                        Hors-Séries
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* ************ */}


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
                <ConnectionButton />
            </div>

            <img src={wave_header} alt="header_wave" className="header__wave"></img>
        </div>
    )
}
 
export default Header;