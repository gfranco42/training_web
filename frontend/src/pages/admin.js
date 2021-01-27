/* CONTAINER */
import Header from "../component/header.js"

/* COMPONENT */
import AdminUserManagement from "../component/admin/admin_usersManagement.js"
import AdminYTVideosManagement from "../component/admin/admin_ytvideosManagement.js"


const Admin = () =>
    <div className="admin">
        <Header />
        <div className="">
            <h1>Admin</h1>
        </div>
        <AdminUserManagement />
        <AdminYTVideosManagement />
        <div className="footer"></div>
    </div>

export default Admin;