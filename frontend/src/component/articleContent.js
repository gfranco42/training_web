import React, { Component } from 'react';

export class ArticleContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            article: null,
            loading: true,
        }
    }




    render() {
        if (this.state.loading === true)
            return <div>Chargement...</div>
        else if (this.state.article === null || this.state.article.length === 0)
            return <div>Aucun article disponible.</div>
        else {
            return (
                <div>
                    Voici le contenu de l'article
                </div>
            )
        }
    }
}