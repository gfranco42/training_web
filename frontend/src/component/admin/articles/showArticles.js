import React, { Component } from 'react'

/* MODULES */
import EditArticle from './editArticle'
import _ from 'lodash';

/* POPUP */
import Popup from 'reactjs-popup';

/* FUNCTIONS */
import { readableDate } from '../../../utils'
import { stringCut } from '../../../utils'

// nl2br
import nl2br from 'react-nl2br'


class ShowArticles extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: null,
            loading: true,
            sort: true,
            last: "",
        }
    }

    tableSort = (e, type) => {
        e.preventDefault();
        const {sort, last} = this.state;
        const data = this.state.articles;
        const newState = _.sortBy(data, [type]);
        if (sort === true || last !== type) {
            this.setState({
                articles: newState,
                loading: false,
                sort: false,
                last: type
            });               // on met a jour le state local pour pouvoir afficher
        }
        else if (sort === false || last === type) {
            this.setState({
                articles: newState.reverse(),
                loading: false,
                sort: true,
                last: type
            });               // on met a jour le state local pour pouvoir afficher
        }
    }


    // DELETE YT VIDEO
    deleteArticle = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:9000/articles/${id}`, {
                    method: "DELETE"
                });
            if (response === null)
                console.log(response);
            const data = this.state.articles;
            this.setState({articles: data.filter(article => article.id !== id)});
        } catch (error) {
            console.error(error.message);
        }
    }

    // UPDATE ARTICLES LIST FROM DB
    componentDidMount = async () => {
        try {
            const response = await fetch("http://localhost:9000/articles");// recup les infos de la DB
            if (response === null)
            console.log(response)
            const data = await response.json();                         // les infos sont lisibles en json
            const newData = _.sortBy(data, ['date']);
            this.setState({articles: newData.reverse(), loading: false});               // on met a jour le state local pour pouvoir afficher
        } catch (error) {
            console.error(error.message);
        }
    }





    render() {
        const style = {
            "maxWidth": "500px",
            "border": "solid 1px white",
            "padding": "20px",
            "borderRadius": "10px",
            "boxShadow": "5px 5px 10px #444",
            "fontFamily": "Gotham Bold",
            "background": "#444",
            "color": "white",
        }
        if (this.state.loading === true)
            return <div className="" style={{display: this.props.display}}>Chargement...</div>
        else if (this.state.articles === null || this.state.articles.length === 0)
            return <div className="" style={{display: this.props.display}}>Aucun article disponible !</div>
        else {
            return (
                <div className="adm-article" style={{display: this.props.display}}>
                    <table className="adm-article__table">
                        <caption className="adm-article__title">Liste des articles: </caption>
                        <thead>
                            <tr className="adm-article__title-row">
                                <th className="title-column" onClick={ (e) => {this.tableSort(e, "title")}}>Titre</th>
                                <th className="image-column">Miniature</th>
                                <th className="popup-column">Description</th>
                                <th className="popup-column">Contenu texte</th>
                                <th className="popup-column">Contenu image</th>
                                <th className="popup-column">Contenu vidéo</th>
                                <th className="date-column" onClick={ (e) => {this.tableSort(e, "date")}}>Date</th>
                                <th className="edit-column"></th>
                                <th className="delete-column"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.articles.map( (article) =>
                                <tr key={article.id}>
                                    <th className="title-column"><div className="title-container">{article.title}</div></th>     
                                    <th className="image-column"><img src={article.image} alt="miniature"></img></th>     
                                    <th className="popup-column">
                                        <Popup trigger={ open => (
                                            <button className="">
                                                {open ? 'Cacher' : 'Afficher description'}
                                            </button>)}
                                            position="left center"
                                            closeOnDocumentClick
                                        >
                                            <div className="popup-column__description"style={style}>{nl2br(article.description)}</div>
                                        </Popup>
                                    </th>     
                                    <th className="popup-column">
                                        <Popup trigger={ open => (
                                            <button className="">
                                                {open ? 'Cacher' : 'Afficher texte'}
                                            </button>)}
                                            position="left center"
                                            closeOnDocumentClick
                                        >
                                            <div className="popup-column__text_content" style={style}>{article.text_content.length > 0 ? nl2br(article.text_content) : "aucun contenu"}</div>
                                        </Popup>
                                    </th>     
                                    <th className="popup-column">
                                        <Popup trigger={ open => (
                                            <button className="">
                                                {open ? 'Cacher' : 'Afficher img(s)'}
                                            </button>)}
                                            position="left center"
                                            closeOnDocumentClick
                                        >
                                            <div className="popup-column__img_content" style={style}>{article.img_content.length === 0 ? "aucun contenu"
                                            : article.img_content.map( (item, index) =>
                                                    <img key={index} className="content-item" src={item} alt="article-img"></img>
                                                    // <div key={index} className="content-item">{stringCut(item, 39)}</div>
                                                )}
                                            </div>
                                        </Popup>
                                    </th>     
                                    <th className="popup-column">
                                        <Popup trigger={ open => (
                                            <button className="">
                                                {open ? 'Cacher' : 'Afficher vidéo(s)'}
                                            </button>)}
                                            position="left center"
                                            closeOnDocumentClick
                                        >
                                            {/* <div className="popup-column__video-content" style={style}>{article.video_content.length > 0 ? article.video_content : "aucun contenu"}</div> */}
                                            <div className="popup-column__video_content" style={style}>{article.video_content.length === 0 ? "aucun contenu"
                                            : article.video_content.map( (item, index) =>
                                                    <div key={index} className="content-item">{stringCut(item, 32)}</div>
                                                )}
                                            </div>
                                        </Popup>
                                    </th>     
                                    <th className="date-column">{readableDate(article.date)}</th>     
                                    <th className="edit-column">
                                        <EditArticle 
                                            articleId={article.id}
                                            title={article.title}
                                            image={article.image}
                                            description={article.description}
                                            text_content={article.text_content}
                                            img_content={article.img_content}
                                            video_content={article.video_content}
                                        />
                                    </th>     
                                    <th className="delete-column">
                                        <button onClick={ (e) => this.deleteArticle(e, article.id)}>
                                            Supprimer
                                        </button>
                                    </th>     
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default ShowArticles;