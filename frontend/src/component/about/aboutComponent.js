import React from 'react';

//redux
// import { connect } from "react-redux"

// IMG
// import gj_avatar from '../../img/avatars/gj_avatar.png'
// import nyra_avatar from '../../img/avatars/nyra_avatar.png'

// REDUX
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../actions/index'

// PERSONNES
// import GreatJack from './greatJack_card';
// import Nyra from './nyra_card';


const AboutComponent = () => {
    const user  = useSelector(state => state.getUser)
    console.log(user)
    const dispatch = useDispatch()
    return (
        <div className="about">
            {/* {pseudo} */}
            <button onClick={ () => {dispatch(getUser())} }>+</button>
        </div>
    )
}
// class AboutComponent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             firstName: "Guillaume",
//             currentCard: "",
//         }
//     }

    
//     handleClick = (e) => {
//         e.preventDefault();
//         this.setState({currentCard: e.target.name});
//     }
//     displayCard = () => {
//         const {currentCard} = this.state;
//         if (currentCard === 'GreatJack') {
//             return <GreatJack />}
//         else if (currentCard === 'Nyra') {
//             return <Nyra />}
//         else
//                 return null;
//     } 

//     render() {
//         return (
//             <div className="about">
//                 <div className="about__avatars">
//                     <div className="avatar">
//                         <img name="GreatJack" alt="GreatJack-img"
//                             src={gj_avatar} onClick={this.handleClick}
//                             className="avatar__img"></img>
//                         <h3 className="avatar__name">Great-Jack</h3>
//                     </div>
//                     <div className="avatar">
//                         <img name="Nyra" alt="Nyra-img"
//                             src={nyra_avatar} onClick={this.handleClick}
//                             className="avatar__img"></img>
//                         <h3 className="avatar__name">Nÿra</h3>
//                     </div>
//                     <div className="avatar">
//                         <img name="Nyra" alt="Nyra-img"
//                             src={nyra_avatar} onClick={this.handleClick}
//                             className="avatar__img"></img>
//                         <h3 className="avatar__name">Nÿra</h3>
//                     </div>
//                 </div>
//                 <div className="about__description">
//                     <this.displayCard />
//                 </div>
//                 <div>

//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = state => ({
//     firstName: state.firstName,
// });
// export default connect(mapStateToProps)(AboutComponent);
export default AboutComponent;