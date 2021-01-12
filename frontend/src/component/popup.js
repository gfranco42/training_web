import React, { Component } from 'react';

/* POPUP */
import Popup from 'reactjs-popup';

/* IMG */
import ah_logo from "../img/ah_logo.png"

/* ADMIN EDIT POPUP */
class EditPopup extends Component {

    editUser = async (e, id) => {
        e.preventDefault();
        try {
            this.setState({loading: true});
            const {firstname, pseudo, email, status} = this.props;
            let body = {firstname, pseudo, email, status};
            const response = await fetch(`http://localhost:9000/users/${id}`, {
                method: 'PUT',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body) 
            });
            // window.location.reload(); 
            window.location.reload();
            if (response === null)
                console.log(response);
        } catch (error) {
           console.error(error.message); 
        }
    }

    render() {
        if (this.props.loading === true)
            return <div className="adminform--error">Loading...</div>
        else {
            return (
                <Popup
                trigger={<button>Modifier</button>}
                modal
                nested>
               { close => (
                   <div className="editpopup">
                    <div>Modifier un utilisateur</div>
                    <form onSubmit={(e) => {this.editUser(e, this.props.userId)}}>
                        <label>
                            Nom: 
                            <input type="text"
                                value={this.props.users.firstname}
                                onChange={(e) => {this.props.updateUserInfo(e, "firstname")}}
                                pattern="[^\s]+"
                                name="name"
                                >
                            </input>
                        </label>
                        <label>
                            Pseudo: 
                            <input type="text"
                                value={this.props.users.pseudo}
                                onChange={(e) => {this.props.updateUserInfo(e, "pseudo")}}
                                name="pseudo"
                                >
                            </input>
                        </label>
                        <label>
                           Email: 
                            <input type="text"
                                value={this.props.users.email}
                                onChange={(e) => {this.props.updateUserInfo(e, "email")}}
                                name="email"
                                >
                            </input>
                        </label>
                        <label>
                            Statut:
                            <select value={this.props.users.status}
                            onChange={(e) => {this.props.updateUserInfo(e, "status")}}
                            >
                                <option value="">Statut de l'utilisateur...</option>
                                <option value="admin">Admin</option>
                                <option value="common">Common</option>
                            </select>
                        </label>
                        <button>Submit</button>
                    </form>
                    <button onClick={close}>Close</button>
                    <button onClick={this.test}>test</button>
                </div>
               )}
            </Popup>
        )}
    }
}

/* HEADER LOGIN POPUP */
class LoginPopup extends Component {
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
                <div className="loginpopup__top--close" >Fermer</div>
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

export {
    LoginPopup,
    EditPopup
};