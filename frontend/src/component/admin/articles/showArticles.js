import React, { useState, useEffect } from 'react'

/* MODULES */
import EditArticle from './editArticle'
import _ from 'lodash';

/* POPUP */
import Popup from 'reactjs-popup';

/* FUNCTIONS */
import { readableDate } from '../../../utils'

// nl2br
import nl2br from 'react-nl2br'


const ShowArticles = (display) => {

    const [articles, setArticles] = useState()
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState({sorted: true, last: ""})

    const tableSort = (e, type) => {
        e.preventDefault();
        const {sorted, last} = sort;
        const data = articles;
        const newState = _.sortBy(data, [type]);
        if (sorted === true || last !== type) {
            setArticles(newState)
            setLoading(false)
            setSort({sorted: false, last: type})
            // on met a jour le state local pour pouvoir afficher
        }
        else if (sorted === false || last === type) {
            newState.reverse();
            setArticles(newState)
            setLoading(false)
            setSort({sorted: true, last: type})
        }
    }


    // DELETE YT VIDEO
    const deleteArticle = async (e, id) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:9000/articles/${id}`, {
                method: "DELETE"
            });
        if (response === null)
            console.log(response);
        const data = articles;
        // setState({articles: data.filter(article => article.id !== id)});
        setArticles(data.filter(article => article.id !== id))

    }

    // UPDATE ARTICLES LIST FROM DB
    useEffect( () => {
        const getArticles = async () => {
            const response = await fetch("http://localhost:9000/articles");// recup les infos de la DB
            if (response === null)
                console.log(response)
            const data = await response.json();                         // les infos sont lisibles en json
            const newData = _.sortBy(data, ['date']);
            newData.reverse();
            setArticles(newData)
            setLoading(false)
        }
        getArticles();
    }, [])


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
    if (loading === true)
        return <div className="" style={{display: display.display}}>Chargement...</div>
    else if (articles === null || articles.length === 0)
        return <div className="" style={{display: display.display}}>Aucun article disponible !</div>
    else {
        return (
            <div className="adm-article" style={{display: display.display}}>
                <table className="adm-article__table">
                    <caption className="adm-article__title">Liste des articles: </caption>
                    <thead>
                        <tr className="adm-article__title-row">
                            <th className="title-column" onClick={ (e) => {tableSort(e, "title")}}>Titre</th>
                            <th className="image-column">Miniature</th>
                            <th className="popup-column">Description</th>
                            <th className="popup-column">Contenu texte</th>
                            <th className="popup-column">Contenu image</th>
                            <th className="popup-column">Contenu vidéo</th>
                            <th className="date-column" onClick={ (e) => {tableSort(e, "date")}}>Date</th>
                            <th className="edit-column"></th>
                            <th className="delete-column"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map( item =>
                            <tr key={item.id}>
                                <th className="title-column"><div className="title-container">{item.title}</div></th>     
                                <th className="image-column"><img src={item.image} alt="miniature"></img></th>     
                                <th className="popup-column">
                                    <Popup trigger={ open => (
                                        <button className="">
                                            {open ? 'Cacher' : 'Afficher description'}
                                        </button>)}
                                        position="left center"
                                        closeOnDocumentClick
                                    >
                                        <div className="popup-column__description"style={style}>{nl2br(item.description)}</div>
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
                                        <div className="popup-column__text_content" style={style}>{item.text_content.length > 0
                                            ? nl2br(item.text_content) : "aucun contenu"}</div>
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
                                        <div className="popup-column__img_content" style={style}>{item.img_content.length === 0 ? "aucun contenu"
                                        : item.img_content.map( (item, index) =>
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
                                        <div className="popup-column__video_content" style={style}>{item.video_content.length === 0 ? "aucun contenu"
                                        : item.video_content.map( (item, index) =>
                                                <div key={index} className="content-item">{item}</div>
                                            )}
                                        </div>
                                    </Popup>
                                </th>     
                                <th className="date-column">{readableDate(item.date)}</th>     
                                <th className="edit-column">
                                    <EditArticle props={item}/>
                                </th>     
                                <th className="delete-column">
                                    <button onClick={ (e) => deleteArticle(e, item.id)}>
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

export default ShowArticles;