import React, {Component} from 'react';

// IMG
import gj_avatar from '../../img/avatars/gj_avatar.png'
import nyra_avatar from '../../img/avatars/nyra_avatar.png'

// PERSONNES
import GreatJack from './greatJack_card';
import Nyra from './nyra_card';

class AboutComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCard: "",
        }
    }

    
    handleClick = (e) => {
        e.preventDefault();
        this.setState({currentCard: e.target.name});
    }
    displayCard = () => {
        const {currentCard} = this.state;
        if (currentCard === 'GreatJack') {
            return <GreatJack />}
        else if (currentCard === 'Nyra') {
            return <Nyra />}
        else
                return null;
    } 

    render() {
        return (
            <div className="about">
                <div className="about__avatars">
                    <div className="avatar">
                        <img name="GreatJack" alt="GreatJack-img"
                            src={gj_avatar} onClick={this.handleClick}
                            className="avatar__img"></img>
                        <h3 className="avatar__name">Great-Jack</h3>
                    </div>
                    <div className="avatar">
                        <img name="Nyra" alt="Nyra-img"
                            src={nyra_avatar} onClick={this.handleClick}
                            className="avatar__img"></img>
                        <h3 className="avatar__name">Nÿra</h3>
                    </div>
                    <div className="avatar">
                        <img name="Nyra" alt="Nyra-img"
                            src={nyra_avatar} onClick={this.handleClick}
                            className="avatar__img"></img>
                        <h3 className="avatar__name">Nÿra</h3>
                    </div>
                </div>
                <div className="about__description">
                    <this.displayCard />
                </div>
            </div>
        )
    }
}

export default AboutComponent;