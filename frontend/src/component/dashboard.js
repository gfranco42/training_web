import React, { Component } from 'react';
import S3FileUpload from 'react-s3';


// TOAST
import { toast } from "react-toastify";

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
            avatar: "",
            access_key: process.env.REACT_APP_ACCESS_KEY,
            secret_key: process.env.REACT_APP_SECRET_KEY,
            bucket_name: process.env.REACT_APP_BUCKET,
            region: process.env.REACT_APP_REGION,
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
            return [null];
    }

    uploadingAvatar = async (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region} = this.state;
        const config = {
            bucketName: bucket_name,
            dirName: "",
            accessKeyId: access_key,
            secretAccessKey: secret_key,
            region: region,
        };

        const data = await S3FileUpload.uploadFile(e.target.files[0], config)
        const avatar = data.location;
        const body = {avatar};
        const response = await fetch(
            `http://localhost:9000/users/avatar/${this.state.id}`, {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
        });
        const parseRes = await response.json();
        parseRes === 200 ?
            toast.success("Avatar modifié avec succès !", {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            })
            : toast.error("Erreur lors de l'upload de l'avatar !", {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            })
        setInterval( () => {
            this.setState({avatar: body})
            window.location.reload()}, 1500);
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
            const {id, age, pseudo, email, status, avatar} = parseRes;
            this.setState({id: id, age: age, pseudo: pseudo, email: email, status: status, avatar: avatar});
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
                    <div className="dashboard__upload">
                        <img src={this.state.avatar} alt="avatar" className="dashboard__upload--avatar"/>
                        <label
                            className="dashboard__upload--label" htmlFor="uploadBtn">
                            Modifier mon avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={this.uploadingAvatar}
                            className="dashboard__upload--input"
                            id="uploadBtn"
                            name="upload"/>
                    </div>
                </div>
                <this.adminPage />
            </div>
        )
    }
}

export default Dashboard;