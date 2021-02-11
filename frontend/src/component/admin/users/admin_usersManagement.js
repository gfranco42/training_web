import React, { Component } from 'react';


/* COMPONENT */

import { ShowUsers } from "./showUsers.js"


class Admin_usersManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <div className="admin__component">
                <ShowUsers />
            </div>
        )
    }
}

export default Admin_usersManagement;