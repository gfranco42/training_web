import React, { Component } from 'react';
import ShowImgs from './showImgs';
import ImgUpload from './addImg';

class ImgGallery extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
        }
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
            console.log(parseResVerify)
            if (!parseResVerify || parseResVerify === "Not Authorized"){
                localStorage.removeItem("token");
                localStorage.setItem("error", "Vous n'êtes pas autorisé à pénétrer cet espace !!")
                window.location = "/error";
            }

        } catch (error) {
            console.error(error.message); 
        }       
    }

    render() {
        return (
            <div className="gallery">
                <h1 className="gallery--title">Gallerie de photos Asylum Heroes</h1>
                <ShowImgs />
                <ImgUpload />
            </div>
        )
    }
}


export default ImgGallery;