import React, {Component} from 'react';

class Nyra extends Component {
    constructor(props) {
        super(props)
        this.state = {
            random: "",
        }
    }

    render() {
        return (
            <div>
                <h1>Nyra</h1>
                <div>
                    <h2>Infos:</h2>
                    <p>Je m'appelle Yoko, j'ai 23 ans. Voila.</p>
                </div>
            </div>
        )
    }
}

export default Nyra;