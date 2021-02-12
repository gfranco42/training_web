import React, { Component } from 'react';
import { ShowYTVideos } from './showYtVideos';
import { AddYtVideo } from './addYtVideo';


/* COMPONENT */


class Admin_ytvideosManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: 'none'
        }
    }

    triggerElement = (e) => {
        e.preventDefault();
        this.setState({display: this.state.display === 'none' ? 'flex' : 'none'})
    }

    render () {
        return (
            <div className="admin__component">
                <h2 className="admin__component--title" onClick={this.triggerElement}>Section gestion des videos Youtube</h2>
                <AddYtVideo display={this.state.display}/>
                <ShowYTVideos  display={this.state.display}/>
            </div>
        )
    }
}

export default Admin_ytvideosManagement;