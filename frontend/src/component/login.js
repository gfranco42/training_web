import React, { Component } from 'react';

// POPUP
import Popup from "reactjs-popup";

// IMG
import ah_logo from "../img/ah_logo.png"

// TOAST
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// COMPONENT
import RegisterPopup from './register'

/* HEADER LOGIN POPUP */
class LoginPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    // handleSubmit = () => {
    //     toast("test");
    // }

    // test = (e) => {
    //     e.preventDefault();
    //     console.log("login test");
    // }


    login = async (e) => {
        e.preventDefault();
        try {
            // NEED TOKEN
            const {email, password} = this.state;
            const body = {email, password};
            const response = await fetch("http://localhost:9000/auth/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                // headers: {"keys": "token"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
    
            localStorage.setItem('token', parseRes);
            // window.location.reload();
        if (response === null)
            console.log("No Response from server");
        } catch (error) {
            console.error(error.message);    
        }
    } 


    render () {
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

                        <form className="loginpopup__form" onSubmit={this.login}>
                            <label className="loginpopup__form__label">
                                <span>Email:</span>
                                <input type="email"
                                    value={this.state.login}
                                    onChange={(e) => {this.handleChange(e)}}
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
                                    value={this.state.password}
                                    onChange={(e) => {this.handleChange(e)}}
                                    name="password"
                                    placeholder="ex. ********"
                                    required
                                    className="loginpopup__form__label--input"
                                    >
                                </input>
                            </label>
                            <input type="submit"
                                value="Et zé partiiiii !"
                                onClick={this.login}
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
}

export {
    LoginPopup,
};