import Header from "../component/header.js"
import Upload from "../component/upload.js"


const Home = () =>
<div className="home">
    <Header />
    <div className="body">
        <a className="adminLink" href="/admin">Page Admin !</a>
        <a className="adminLink" href="/profil">Page Profil !</a>
        <Upload />
    </div>
    <div className="footer"></div>
</div>

export default Home;