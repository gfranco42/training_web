import React, { useState } from 'react';

// IMG
import ah_logo from "../../img/ah_logo.png"

// POPUP
import Popup from "reactjs-popup";

// TOAST
import { toast } from 'react-toastify';

// REACT ROUTER
import { useHistory } from 'react-router-dom';


const RegisterPopup = () => {

    const [register, setRegister] = useState("")
    const history = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        setRegister({...register, [e.target.name]: e.target.value})
    }


    const toggleRegister = async (e) => {
        e.preventDefault();
        const {age, pseudo, email, password} = register;
        const body = {age, pseudo, email, password};
        const response = await fetch("http://localhost:9000/auth/register", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body)
        }) 
            
        const parseRes = await response.json();
        if (parseRes.token) {
            toast.success(`Bienvenue chez Asylum Heroes ${body.pseudo} !`, {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            });
            localStorage.setItem('token', parseRes.token);
        }
        else
            toast.error(parseRes, {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            });
        // setInterval( () => window.location.reload(), 1500);
        history.push("/")
    }


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

                    <form className="registrationpopup__form"  onSubmit={toggleRegister}>
                        <label className="registrationpopup__form__label">
                            <span>Pseudo:</span>
                            <input type="text"
                                value={register.pseudo || ""}
                                placeholder="ex: XxD4rk-Sasuk3xX"
                                name="pseudo"
                                onChange={(e) => handleChange(e)}
                                required
                                className="registrationpopup__form__label--input"
                                >
                            </input>
                        </label>
                        <label className="registrationpopup__form__label">
                            <span>Date de naissance:</span>
                            <input type="date"
                                value={register.age || ""}
                                name="age"
                                onChange={(e) => handleChange(e)}
                                required
                                className="registrationpopup__form__label--input"
                                >
                            </input>
                        </label>
                        <label className="registrationpopup__form__label">
                            <span>Email:</span>
                            <input type="email"
                                value={register.email || ""}
                                placeholder="ex: AsHe@gmail.com"
                                name="email"
                                onChange={(e) => handleChange(e, "email")}
                                required
                                className="registrationpopup__form__label--input"
                                >
                            </input>
                        </label>
                        <label className="registrationpopup__form__label">
                            <span>Mot de passe:</span>
                            <input type="password"
                                value={register.password || ""}
                                placeholder="ex: ********"
                                name="password"
                                onChange={(e) => handleChange(e, "password")}
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
                            toggleRegister(e);
                            close()
                        }}
                        ></input>
                    </form>
                </div>)}
        </Popup>
    )
}

export default RegisterPopup;