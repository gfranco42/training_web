import React, { Component } from 'react';
import { toast } from 'react-toastify';

// POPUP
import Popup from "reactjs-popup";

// IMG
import ah_logo from "../../img/ah_logo.png"


// COMPONENT
import RegisterPopup from './register'

/* HEADER LOGIN POPUP */
class LoginPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            log: false,
            email: "",
            password: "",
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }

    login = async (e) => {
        e.preventDefault();
        try {
            const {email, password} = this.state;
            const body = {email, password};
            const response = await fetch("http://localhost:9000/auth/login", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
    
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                toast.success(`Bon retour !`, {
                    className: "toast",
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                });
                this.props.updateLogState(true);
            }
            else {
                toast.error(parseRes, {
                    className: "toast",
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                });
                this.props.updateLogState(false);
            }
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
                                onClick={(e) => {
                                    this.login(e);
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
}

export {
    LoginPopup,
};