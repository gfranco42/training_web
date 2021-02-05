import React, { Component } from "react";
import _ from 'lodash';

class News extends Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: null,
            loading: true,
        }
    }

    componentDidMount = async () => {
        try {
            const response = await fetch("http://localhost:9000/articles");// recup les infos de la DB
            const data = await response.json();                         // les infos sont lisibles en json
            const newData = _.sortBy(data, 'date');
            this.setState({articles: newData.reverse()[0], loading: false});               // on met a jour le state local pour pouvoir afficher
            console.log(newData[0]);
            if (response === null)
                console.log(response);
        } catch (error) {
            console.error(error.message); 
        }
    }

    render() {
        if (this.state.loading === true)
            return <div className="news__loading">Chargement...</div>
        else if (this.state.articles === null || this.state.articles.length === 0)
            return <div className="news__empty">Aucun article disponible.</div>
        else {
            return (
                <div className="news">
                    <div className="news__current-article">
                        <div className="news__texts">
                            <div className="news__title">{this.state.articles.title}</div>
                            <div className="news__description">{this.state.articles.description}</div>
                        </div>
                        <a className="news__img" href="/articles">
                            <img alt="img_article" src={this.state.articles.image}/>
                        </a>
                    </div>
                    <div className="news__old-article">
                    </div>
                </div>
            )
        }
    }

}

export default News;