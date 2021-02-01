import React, {Component} from 'react';
import footer_img from '../img/footer_bg.png'

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            random: ""
        }
    }

    render() {
        return (
            <div className ="footer">
                <img className="footer__bg" alt="footer" src={footer_img}/>
            </div>
        )
    }
}

export default Footer;