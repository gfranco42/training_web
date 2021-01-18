import React, { Component } from 'react';

// UTILS FUNCTION
import {translate_date} from "../utils"

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            age: "",
            pseudo: "",
            email: "",
        }
    }

    componentDidMount = async () => {
        try {
            if (!localStorage.token)
                window.location = "/";
            const response = await fetch("http://localhost:9000/profil/", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseRes = await response.json();
            const {id, age, pseudo, email} = parseRes;
            this.setState({id: id, age: age, pseudo: pseudo, email: email});
            console.log(this.state);
        } catch (error) {
           console.error(error.message);
        }
    }

    render() {
        return (
            <div className="dashboard">
                <div>{this.state.id}</div>
                <div>{translate_date(this.state.age)}</div>
                <div>{this.state.pseudo}</div>
                <div>{this.state.email}</div>
            </div>
        )
    }
}

export default Dashboard;