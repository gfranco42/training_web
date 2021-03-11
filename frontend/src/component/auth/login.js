import React, { useState } from 'react';
import { toast } from 'react-toastify';

// POPUP
import Popup from "reactjs-popup";

// IMG
import ah_logo from "../../img/ah_logo.png"

//REDUX
import { useDispatch } from 'react-redux'
import { setLog, setUser } from '../../actions'

// COMPONENT
import RegisterPopup from './register'

/* HEADER LOGIN POPUP */
const LoginPopup = () => {

    const [login, setLogin] = useState({email: "", password: ""})
    const dispatch = useDispatch()

    // const logState = useSelector(state => state.log)
    // const {log} = logState;

    const handleChange = (e) => {
        e.preventDefault();
        setLogin({...login, [e.target.name]: e.target.value})
    }

    
    const getProfile = async () => {
        const responseVerify = await fetch("http://localhost:9000/auth/token-verify", {
            method: "GET",
            headers: {token: localStorage.token}
        });
        const parseResVerify = await responseVerify.json();
        if (!parseResVerify || parseResVerify === "Not Authorized"){
            localStorage.removeItem("token");
            dispatch(setLog(false))
        }
        else {
            const response = await fetch("http://localhost:9000/profil/", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseRes = await response.json();
            dispatch(setLog(true))
            dispatch(setUser(parseRes))
        }
    }

    const toggleLogin = async (e) => {
        e.preventDefault();
            const {email, password} = login;
            const body = {email, password};
            const response = await fetch("http://localhost:9000/auth/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });
            if (response === null)
                console.log("No Response from server");

            const parseRes = await response.json();
    
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                getProfile();
                toast.success(`Bon retour !`, {
                    className: "toast",
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                });
                // setInterval( () => {
                    // setUser({...user, avatar: body})
                    // dispatch(setAvatar(body))
                    // window.location.reload()}, 1500);

                // props.updateLogState(true);
            }
            else {
                toast.error(parseRes, {
                    className: "toast",
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                });
                // props.updateLogState(false);
            }
    } 


    return (
        <Popup
            trigger={<button className="navigation__button--login">Connexion</button>}
            modal
            nested
        >
            {close => (
                <div className="loginpopup">

                    <div className="loginpopup__top">
                        <img className="loginpopup__top--logo" src={ah_logo} alt="ah_logo"/>
                        <h2 className="loginpopup__top--title">Connexion</h2>
                        <button className="loginpopup__top--close" onClick={close}>
                            &times;
                        </button>
                    </div>

                    <form className="loginpopup__form" onSubmit={toggleLogin}>
                        <label className="loginpopup__form__label">
                            <span>Email:</span>
                            <input type="email"
                                value={login.email || ""}
                                onChange={(e) => {handleChange(e)}}
                                name="email"
                                placeholder="ex. AsHe@gmail.com"
                                required
                                className="loginpopup__form__label--input"
                                >
                            </input>
                        </label>
                        <label className="loginpopup__form__label">
                            <span>Mot de passe:</span>
                            <input type="password"
                                value={login.password || ""}
                                onChange={(e) => {handleChange(e)}}
                                name="password"
                                placeholder="ex. ********"
                                required
                                className="loginpopup__form__label--input"
                                >
                            </input>
                        </label>
                        <input type="submit"
                            value="Et zé partiiiii !"
                            onClick={(e) => {
                                toggleLogin(e);
                                close()
                            }}
                            className="loginpopup__form--submit"
                            ></input>
                    </form>

                    <div className="loginpopup__bot">
                        <RegisterPopup />
                        <button className="loginpopup__bot--forgotpwd">
                            Mot de passe oublié ?
                        </button>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default LoginPopup;