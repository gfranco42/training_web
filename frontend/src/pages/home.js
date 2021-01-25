import Header from "../component/header.js"


const Home = () =>
<div className="home">
    <Header />
    <div className="body">
        <a className="adminLink" href="/admin">Page Admin !</a>
        <a className="adminLink" href="/profil">Page Profil !</a>
        <a className="adminLink" href="/gallery">Page Gallery !</a>
    </div>
    <div className="footer"></div>
</div>

export default Home;