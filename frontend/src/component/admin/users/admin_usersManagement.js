import React, { Component } from 'react';


/* COMPONENT */

import ShowUsers from "./showUsers.js"


class Admin_usersManagement extends Component {
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
        return (
            <div className="admin__component">
                <h2 className="admin__component--title" onClick={this.triggerElement}>Section gestion utilisateurs</h2>
                <ShowUsers display={this.state.display}/>
            </div>
        )
    }
}

export default Admin_usersManagement;