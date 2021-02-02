import React, { Component } from "react";

class HomeBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            random: ""
        }
    }

    render() {
        return (
            <div className="home-body">
                <h1 className="home-body__title">Bienvenue sur le site Asylum Heroes !</h1>
            </div>
        )
    }
}

export default HomeBody;