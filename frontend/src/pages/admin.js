
/* COMPONENT */
import AdminUserManagement from "../component/admin/admin_usersManagement.js"
import AdminYTVideosManagement from "../component/admin/admin_ytvideosManagement.js"
import Header from "../component/header.js"
import Footer from "../component/footer"


const Admin = async () => {

    const response = await fetch("http://localhost:9000/profil/", {
        method: "GET",
        headers: {token: localStorage.token}
    })
    const parseRes = await response.json();
    const {id, age, pseudo, email, status} = parseRes;
    if (status !== 'admin') {
        localStorage.setItem("error", "Vous n'avez pas les droits administrateurs !!");
        window.location = '/error';
    }
    return (
        <div className="admin">
            <Header />
            <div className="admin__title">
                <h1>Admin</h1>
            </div>
            <AdminUserManagement />
            <AdminYTVideosManagement />
            <Footer />
        </div>
    )
    
}

export default Admin;