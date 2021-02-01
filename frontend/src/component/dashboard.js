import React, { Component } from 'react';


// TOAST
// import { toast } from "react-toastify";

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
            status: "",
        }
    }

    adminPage = () => {
        if (this.state.status === "admin")
            return (
                <div>
                    <button className="dashboard__" onClick={() => {window.location = "/admin"}}>Administration</button>
                </div>
            )
        else
            return null;
    }

    componentDidMount = async () => {
        try {
            if (!localStorage.token) {
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
                localStorage.setItem("error", "Vous n'êtes pas autorisé.e à pénétrer cet espace !!")
                window.location = "/error"
            }

            // RECUP USER
            const response = await fetch("http://localhost:9000/profil/", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseRes = await response.json();
            const {id, age, pseudo, email, status} = parseRes;
            this.setState({id: id, age: age, pseudo: pseudo, email: email, status: status});
        } catch (error) {
           console.error(error.message);
        }
    }

    render() {
        return (
            <div className="dashboard">
                <h1 className="dashboard__title">Profil</h1>
                <div className="dashboard__infos">
                    <div>{this.state.id}</div>
                    <div>{translate_date(this.state.age)}</div>
                    <div>{this.state.pseudo}</div>
                    <div>{this.state.email}</div>
                    <div>{this.state.status}</div>
                    <a href="/profil">Page Profil !</a>
                    <a href="/gallery">Page Gallery !</a>
                </div>
                <this.adminPage />
            </div>
        )
    }
}

export default Dashboard;