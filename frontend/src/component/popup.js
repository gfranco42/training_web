import React, { Component } from 'react';


/* IMG */
import ah_logo from "../img/ah_logo.png"

class Loginpopup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: ""
        }
    }

    test = () => {
        console.log('props:' + this.props);
        console.log('state: ' + this.state);
    }

    handleChange = (e, type) => {
        if (type === "login")
            this.setState({login: e.target.value})
        else if (type === "password")
            this.setState({password: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        alert(`Salut ${this.state.login}`)
    }


    render () {
        return (
        <div className="loginpopup">

            <div className="loginpopup__top" onClick={this.test}>
                <img className="loginpopup__top--logo" src={ah_logo} alt="ah_logo"/>
                <h1 className="loginpopup__top--title">Connexion</h1>
            </div>

            <form className="loginpopup__form">

                <label>
                    Identifiant:
                    <input type="text"
                        value={this.state.login} onChange={(e) => {this.handleChange(e, "login")}}
                        name="login"
                        placeholder="ex. Yolodu06">
                    </input>
                </label>
                <label>
                    Mot de passe:
                    <input type="password"
                        value={this.state.password} onChange={(e) => {this.handleChange(e, "password")}}
                        name="password"
                        >
                    </input>
                </label>

                <input type="submit" value="Et zé partiiiii !" onClick={this.handleSubmit}></input>

            </form>

            <div className="loginpopup__bot">
                    <form className="loginpopup__bot--signin">
                        <label>
                            Pas de compte? Inscrivez vous !
                            <button value="Inscription"/>
                        </label>
                        <label>
                            Mot de passe oublié ?
                            <button value="Recupérer"/>
                        </label>
                    </form>
            </div>
        </div>
        )
    }
}

export default Loginpopup;