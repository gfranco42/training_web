//layout
import Header from "../component/layout/header.js"
import Footer from "../component/layout/footer"

import { ArticleContent } from "../component/articleContent.js"

const Admin = () => {
    return (
        <div className="article">
            <Header />
            <div className="article__body">
                <div className="article__title">
                    <h1>Article</h1>
                </div>
                <ArticleContent />
            </div>
            <Footer />
        </div>
    )
    
}

export default Admin;