/* CONTAINER */
import Header from "../container/header.js"

/* COMPONENT */
import Adminform from "../component/adminform.js"


const Admin = () =>
    <div className="admin">
        <Header />
        <Adminform />
        <div className="footer"></div>
    </div>

export default Admin;