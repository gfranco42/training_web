import React, { Component } from 'react';

/* STYLE */
import "../style/component/_db_form.scss"

/* IMG */
// import ah_logo from "../img/ah_logo.png"

class Dbform extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            pseudo: "",
            email: "",
            status: ""
        }
    }

    handleChange = (e, type) => {
        if (type === "firstname")
            this.setState({firstname: e.target.value})
        else if (type === "pseudo")
            this.setState({pseudo: e.target.value})
        else if (type === "email")
            this.setState({email: e.target.value})
        else if (type === "status")
            this.setState({status: e.target.value})
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {firstname, pseudo, email, status} = this.state;
            const body = {firstname, pseudo, email, status};
            const response =  await fetch(
                "http://localhost:9000/users", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify(body)
                }
            );
            console.log(response);
        } catch (error) {
           console.error(error.message); 
        }
    }


    render () {
        return (
        <div className="dbform">

            <div className="dbform__top" onClick={this.test}>
                <h1 className="dbform__top--title">Admin</h1>
                <p>Add a new user</p>
            </div>

            <form className="dbform__form"  onSubmit={this.handleSubmit}>

                <label>
                    Prénom:
                    <input type="text"
                        value={this.state.login} onChange={(e) => {this.handleChange(e, "firstname")}}
                        name="firstname"
                        placeholder="ex. Lancelot">
                    </input>
                </label>
                <label>
                    Pseudo:
                    <input type="text"
                        value={this.state.password} onChange={(e) => {this.handleChange(e, "pseudo")}}
                        name="pseudo"
                        placeholder="ex. Yolodu06"
                        >
                    </input>
                </label>
                <label>
                    Email:
                    <input type="email"
                        value={this.state.email} onChange={(e) => {this.handleChange(e, "email")}}
                        name="email"
                        placeholder="ex. labichedesmontagne@gmail.com"
                        >
                    </input>
                </label>
                <label>
                    Statut:
                    <input type="text"
                        value={this.state.password} onChange={(e) => {this.handleChange(e, "status")}}
                        name="status"
                        >
                    </input>
                </label>

                <input type="submit" value="Et zé partiiiii !"></input>

            </form>

        </div>

        )
    }
}

export default Dbform;