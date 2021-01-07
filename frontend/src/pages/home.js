import Header from "../container/header.js"

import "../style/pages/_home.scss"

const Home = () =>
<div className="home">
    <Header />
    <div className="body">
        <a className="adminLink" href="/admin">Page Admin !</a>
    </div>
    <div className="footer"></div>
</div>

export default Home;