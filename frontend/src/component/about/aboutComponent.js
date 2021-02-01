import React, {Component} from 'react';

// IMG
import avatar from '../../img/avatar.JPG'

// PERSONNES
import GreatJack from './greatJack_card';

class AboutComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCard: "",
        }
    }

    displayCard = () => {
        return this.state.currentCard;
    } 

    handleClick = (e) => {
        e.preventDefault();
        this.setState({currentCard: e.target.name});
        console.log(this.state.currentCard);
    }

    render() {
        return (
            <div>
                <div>
                    <img src={avatar} onClick={this.handleClick} name="<GreatJack />"></img>
                </div>
                <div>
                    {this.state.currentCard}
                </div>
            </div>
        )
    }
}

export default AboutComponent;