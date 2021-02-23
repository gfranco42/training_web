import React, { Component } from 'react';
import AddArticle from './addArticle.js';
import ShowArticles from './showArticles.js';


/* COMPONENT */


class Admin_ArticlesManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "none"
        }
    }

    triggerElement = (e) => {
        e.preventDefault();
        this.setState({display: this.state.display === 'none' ? 'flex' : 'none'})
    }

    render () {
        const {display} = this.state;
        return (
            <div className="admin__component">
                <h2  className="admin__component--title" onClick={this.triggerElement}>Section gestion d'articles</h2>
                <AddArticle display={display}/>
                <ShowArticles display={display}/>
            </div>
        )
    }
}

export default Admin_ArticlesManagement;