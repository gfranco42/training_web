/* CONTAINER */
import Header from "../container/header.js"

/* COMPONENT */
import Dbform from "../component/dbform.js"

/* STYLES */
import "../style/pages/_admin.scss"

const Admin = () =>
    <div className="admin">
        <Header />
        <div className="body"></div>
        <Dbform />
        <div className="footer"></div>
    </div>

export default Admin;