import React, {Component} from 'react';
import footer_wave from '../img/footer_wave.gif'
import ReactFreezeframe from 'react-freezeframe';

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
                {/* <img className="footer__wave" src={footer_wave} /> */}
                <ReactFreezeframe
                    options={{
                        trigger: false,
                    }}
                    src={footer_wave} />
                <div className="footer__main">
                </div>

            </div>
        )
    }
}

export default Footer;