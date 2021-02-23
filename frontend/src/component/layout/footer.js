import React from 'react';

// GIF
import wave_footer from "../../img/gifs/wave_footer.gif";


// IMG
import logo_broccoli from "../../img/footer/logo_broccoli.png"
import logo_fb from "../../img/footer/logo_fb.png"
import logo_footer from "../../img/footer/logo_footer.png"
import logo_pslc from "../../img/footer/logo_pslc.png"
import logo_twitter from "../../img/footer/logo_twitter.png"
import logo_yt from "../../img/footer/logo_yt.png"

const Footer = () => {
    return (
        <div className ="footer">
            <img className="footer__wave" src={wave_footer} alt="footer_wave" />

            <div className="footer__main">


                <a className="footer__title" href="/">
                    <img src={logo_footer} alt="footer_title"/>
                </a>


                <div className="footer__navbar">
                    <div className="footer__navbar__rubric">NOUS CONTACTER</div>
                    <div className="footer__navbar__rubric">AIDEZ-NOUS A AMELIORER LE SITE</div>
                    <div className="footer__navbar__rubric">FOIRE AUX QUESTIONS</div>
                </div>


                <div className="footer__partner">
                    <p>REDIRECTION SUR LE SITE DES COPAINS DE :<br/>
                        <span className="partner__name">PLAN SUR LA COMETE</span></p>
                    <a href="https://planssurlacomete.fr/"
                        target="_blank" rel="noreferrer noopener">
                        <img className="footer__partner--pslc" src={logo_pslc} alt="pslc_logo"/>
                    </a>
                    <a href="https://www.youtube.com/channel/UCNyI0kceUUNeT2wv-rzKGHQ"
                        target="_blank" rel="noreferrer noopener">
                        <img className="footer__partner--broccoli" src={logo_broccoli} alt="pslc_logo"/>
                    </a>
                </div>


                <div className="footer__networks">
                    <a href="https://www.youtube.com/channel/UC2anhXu9pf90wkk9p2A_ojQ"
                        target="_blank" rel="noreferrer noopener">
                        <img src={logo_yt} alt="yt_logo"/>
                    </a>
                    <a href="https://twitter.com/AsylumHeroes"
                        target="_blank" rel="noreferrer noopener">
                        <img src={logo_twitter} alt="tw_logo"/>
                    </a>
                    <a href="https://www.facebook.com/AsylumYT"
                        target="_blank" rel="noreferrer noopener">
                        <img src={logo_fb} alt="fb_logo"/>
                    </a>
                </div>


            </div>

        </div>
    )
}

export default Footer;