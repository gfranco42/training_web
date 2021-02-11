import React, { Component } from 'react';
import { ShowYTVideos } from './showYtVideos';
import { AddYtVideo } from './addYtVideo';


/* COMPONENT */


class Admin_ytvideosManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <div className="admin__component">
                <AddYtVideo />
                <ShowYTVideos />
            </div>
        )
    }
}

export default Admin_ytvideosManagement;