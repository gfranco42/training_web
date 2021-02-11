import React, { Component } from 'react'


/* COMPONENT */
import AdminUserManagement from "../component/admin/users/admin_usersManagement.js"
import AdminYTVideosManagement from "../component/admin/ytvideos/admin_ytvideosManagement.js"
import AdminArticlesManagement from "../component/admin/articles/admin_articlesManagement.js"


//layout
import Header from "../component/layout/header.js"
import Footer from "../component/layout/footer"


class Admin extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    componentDidMount = async () => {
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

    render() {
        return (
            <div className="admin">
                <Header />
                <div className="admin__body">
                    <div className="admin__title">
                        <h1>Admin</h1>
                    </div>
                    <AdminUserManagement />
                    <AdminArticlesManagement />
                    <AdminYTVideosManagement />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Admin;