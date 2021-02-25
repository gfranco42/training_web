import React, { useEffect } from 'react';
import ShowImgs from './showImgs';
import ImgUpload from './addImg';


const ImgGallery = () => {

    useEffect( () => {
        const tokenVerify = async () => {
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
        }
        tokenVerify();
    }, [])

    return (
        <div className="gallery">
            <h1 className="gallery--title">Gallerie de photos Asylum Heroes</h1>
            <ShowImgs />
            <ImgUpload />
        </div>
    )
}


export default ImgGallery;