import React, { Component } from 'react';
import AddArticle from './addArticle.js';


/* COMPONENT */


class Admin_ArticlesManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <div className="admin__component">
                <AddArticle />
            </div>
        )
    }
}

export default Admin_ArticlesManagement;