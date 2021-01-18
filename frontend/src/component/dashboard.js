import React, { Component } from 'react';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false
        }
    }

    componentWillMount = (e) => {
        if (!this.state.isAuthenticated)
            window.location = '/';
    }

    render() {
        return (
            <div>DASHBOARD</div>
        )
    }
}

export default Dashboard;