import React, { Component } from 'react';


/* COMPONENT */

import { AddUser } from "./addUser.js"
import { ShowUsers } from "./showUser.js"


/* IMG */
// import ah_logo from "../img/ah_logo.png"

class adminform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            age: "",
            pseudo: "",
            email: "",
            status: ""
        }
    }

    handleChange = (e, type) => {
        if (type === "age")
            this.setState({age: e.target.value})
        else if (type === "pseudo")
            this.setState({pseudo: e.target.value})
        else if (type === "email")
            this.setState({email: e.target.value})
        else if (type === "status")
            this.setState({status: e.target.value})
    }

    componentDidMount = async () => {
        try {
            if (!localStorage.token){
                localStorage.setItem("error", "Vous n'êtes pas autorisé à pénétrer cet espace !!")
                window.location = "/error";
            }

            // VERIFY TOKEN
            const responseVerify = await fetch("http://localhost:9000/auth/token-verify", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const parseResVerify = await responseVerify.json();
            if (!parseResVerify || parseResVerify === "Not Authorized"){
                localStorage.removeItem("token");
                localStorage.setItem("error", "Vous n'êtes pas autorisé à pénétrer cet espace !!")
                window.location = "/error";
            }
        } catch (error) {
            console.error(error.message);    
        }
    }

    render () {
        return (
        <div className="adminform">

            <div className="adminform__top">
                <h1 className="adminform__top--title">Admin</h1>
            </div>

            <div className="adminform__form">
                <p className="adminform__form--title">Add a new user:</p>
                <form onSubmit={(e) => AddUser(e, this.state)}>
                    <label>
                        Date de naissance:
                        <input type="date"
                            value={this.state.login}
                            onChange={(e) => {this.handleChange(e, "age")}}
                            name="age"
                            className="adminform__form--input"
                            required
                            >
                        </input>
                    </label>
                    <label>
                        Pseudo:
                        <input type="text"
                            value={this.state.password}
                            onChange={(e) => {this.handleChange(e, "pseudo")}}
                            name="pseudo"
                            placeholder="ex. Yolodu06"
                            className="adminform__form--input"
                            required
                            >
                        </input>
                    </label>
                    <label>
                        Email:
                        <input type="email"
                            value={this.state.email}
                            onChange={(e) => {this.handleChange(e, "email")}}
                            name="email"
                            placeholder="ex. bichette06@gmail.com"
                            className="adminform__form--input"
                            required
                            >
                        </input>
                    </label>
                    <label>
                        Statut:
                        <select value={this.state.status}
                        onChange={(e) => {this.handleChange(e, "status")}}
                        className="adminform__form--select"
                        required>
                            <option value="">Statut de l'utilisateur...</option>
                            <option value="admin">Admin</option>
                            <option value="common">Common</option>
                        </select>
                    </label>
                    <input type="submit"
                    value="Et zé partiiiii !"
                    className="adminform__form--submit">
                    </input>
                </form>
            </div>

            <ShowUsers />
        </div>

        )
    }
}

export default adminform;