import React, { Component } from 'react';

// IMG
import ah_logo from "../img/ah_logo.png"

// POPUP
import Popup from "reactjs-popup";
import { toast } from 'react-toastify';

// TOAST
// import {toast} from 'react-toastify';

class RegisterPopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            age: "",
            pseudo: "",
            email: "",
            password: "",
            popup: true,
        }

    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    }


    register = async (e) => {
        e.preventDefault();
        try {
            const {age, pseudo, email, password} = this.state;
            const body = {age, pseudo, email, password};
            const response = await fetch("http://localhost:9000/auth/register", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            }) 
            
            const parseRes = await response.json();
            if (parseRes.token) {
                toast.success(`Bienvenue chez Asylum Heroes ${body.pseudo} !`, {
                    position: "top-center",
                    hideProgressBar: true,
                    closeButton: false,
                });
                localStorage.setItem('token', parseRes.token);
            }
            else
                toast.error(parseRes);
            setInterval( () => window.location.reload(), 1500);
        } catch (error) {
            console.error(error.message);
        }
    }


    render() {
        return (
                <Popup
                trigger={<button className="loginpopup__bot--signin">Inscription</button>}
                modal
                nested
                >
                    {close => (
                        <div className="registrationpopup">
                            <div className="registrationpopup__top">
                                <img className="registrationpopup__top--logo" src={ah_logo} alt="ah_logo"/>
                                <h2 className="registrationpopup__top--title">Inscription</h2>
                                <button className="registrationpopup__top--close" onClick={close}>
                                    &times;
                                </button>
                            </div>

                            <form className="registrationpopup__form"  onSubmit={this.register}>
                                <label className="registrationpopup__form__label">
                                    <span>Pseudo:</span>
                                    <input type="text"
                                        value={this.state.pseudo}
                                        placeholder="ex: XxD4rk-Sasuk3xX"
                                        name="pseudo"
                                        onChange={(e) => this.handleChange(e)}
                                        required
                                        className="registrationpopup__form__label--input"
                                        >
                                    </input>
                                </label>
                                <label className="registrationpopup__form__label">
                                    <span>Date de naissance:</span>
                                    <input type="date"
                                        value={this.state.age}
                                        name="age"
                                        onChange={(e) => this.handleChange(e)}
                                        required
                                        className="registrationpopup__form__label--input"
                                        >
                                    </input>
                                </label>
                                <label className="registrationpopup__form__label">
                                    <span>Email:</span>
                                    <input type="email"
                                        value={this.state.email}
                                        placeholder="ex: AsHe@gmail.com"
                                        name="email"
                                        onChange={(e) => this.handleChange(e, "email")}
                                        required
                                        className="registrationpopup__form__label--input"
                                        >
                                    </input>
                                </label>
                                <label className="registrationpopup__form__label">
                                    <span>Mot de passe:</span>
                                    <input type="password"
                                        value={this.state.password}
                                        placeholder="ex: ********"
                                        name="password"
                                        onChange={(e) => this.handleChange(e, "password")}
                                        required
                                        className="registrationpopup__form__label--input"
                                        >
                                    </input>
                                </label>

                                <input
                                className="registrationpopup__form--submit"
                                type="submit"
                                value="S'inscrire"
                                onClick={(e) => {
                                    this.register(e);
                                    close()
                                }}
                                ></input>
                            </form>
                        </div>)}
                </Popup>
        )
    }
}

export default RegisterPopup