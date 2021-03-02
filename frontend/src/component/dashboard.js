import React, { useState, useEffect } from 'react';
import S3FileUpload from 'react-s3';

//redux
import { useSelector, useDispatch } from 'react-redux'
import { setAvatar } from '../actions'


// TOAST
import { toast } from "react-toastify";

// UTILS FUNCTION
import { translate_date } from "../utils"


export const Dashboard = () => {
    // const [user, setUser] = useState([])
    const userState = useSelector(state => state.user)
    const {user} = userState
    const dispatch = useDispatch()

    const bucket = {
        access_key: process.env.REACT_APP_ACCESS_KEY,
        secret_key: process.env.REACT_APP_SECRET_KEY,
        bucket_name: process.env.REACT_APP_BUCKET,
        region: process.env.REACT_APP_REGION,
    }
    

    const AdminPage = () => {
        if (user.status === "admin")
            return (
                <div>
                    <button className="dashboard__" onClick={() => {window.location = "/admin"}}>Administration</button>
                </div>
            )
        else
            return null;
    }

    const uploadingAvatar = async (e) => {
        e.preventDefault();
        const {access_key, secret_key, bucket_name, region} = bucket;
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
            `http://localhost:9000/users/avatar/${user.id}`, {
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
            // setUser({...user, avatar: body})
            dispatch(setAvatar(body))
            window.location.reload()}, 1500);
    }

    useEffect(() => {
        // const getProfile = async () => {
                if (!localStorage.token) {
                    localStorage.setItem("error", "Vous n'êtes pas autorisé à pénétrer cet espace !!")
                    window.location = "/error";
                }

                // VERIFY TOKEN
        //         const responseVerify = await fetch("http://localhost:9000/auth/token-verify", {
        //             method: "GET",
        //             headers: {token: localStorage.token}
        //         });
        //         const parseResVerify = await responseVerify.json();
        //         if (!parseResVerify || parseResVerify === "Not Authorized"){
        //             localStorage.removeItem("token");
        //             localStorage.setItem("error", "Vous n'êtes pas autorisé.e à pénétrer cet espace !!")
        //             window.location = "/error"
        //         }

        //         // RECUP USER
        //         const response = await fetch("http://localhost:9000/profil/", {
        //             method: "GET",
        //             headers: {token: localStorage.token}
        //         })
        //         const parseRes = await response.json();
        //         // const {id, age, pseudo, email, status, avatar} = parseRes;
        //         // setUser({...user, id: id, age: age, pseudo: pseudo, email: email, status: status, avatar: avatar});
        //         setUser(parseRes)
        // }

        // getProfile();
    }, [])

    if (user) {
        return (
            <div className="dashboard">
                <h1 className="dashboard__title">Profil</h1>
                <div className="dashboard__infos">
                    <div>{user.id}</div>
                    <div>{translate_date(user.age)}</div>
                    <div>{user.pseudo}</div>
                    <div>{user.email}</div>
                    <div>{user.status}</div>
                    <div className="dashboard__upload">
                        <img src={user.avatar} alt="avatar" className="dashboard__upload--avatar"/>
                        <label
                            className="dashboard__upload--label" htmlFor="uploadBtn">
                            Modifier mon avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={uploadingAvatar}
                            className="dashboard__upload--input"
                            id="uploadBtn"
                            name="upload"/>
                    </div>
                </div>
                <AdminPage/>
            </div>
        )
    }
    else
        return <div></div>
}