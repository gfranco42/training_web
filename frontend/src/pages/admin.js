
/* COMPONENT */
import AdminUserManagement from "../component/admin/admin_usersManagement.js"
import AdminYTVideosManagement from "../component/admin/admin_ytvideosManagement.js"
import Header from "../component/header.js"
import Footer from "../component/footer"


const Admin = () => {
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