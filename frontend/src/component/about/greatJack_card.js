import React, {Component} from 'react';

class GreatJack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            random: "",
        }
    }

    render() {
        return (
            <div>
                <h1>GREAT JACK</h1>
                <div>
                    <h2>Infos:</h2>
                    <p>Je m'appelle Guillaume, j'ai 26 ans. Voila.</p>
                </div>
            </div>
        )
    }
}

export default GreatJack;