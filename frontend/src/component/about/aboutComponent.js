import React from 'react';


// IMG
// import gj_avatar from '../../img/avatars/gj_avatar.png'
// import nyra_avatar from '../../img/avatars/nyra_avatar.png'

// REDUX
// import { useSelector } from 'react-redux'
// import { getTest, getUser } from '../../actions/index'
// import { ACTIONS } from '../../constants/constants'

// PERSONNES
// import GreatJack from './greatJack_card';
// import Nyra from './nyra_card';


const AboutComponent = () => {
    // const dispatch = useDispatch()

    // const countState = useSelector(state => state.test)
    // const {count} = countState;
    

    // alert(tmp);
    // const testState = useSelector(state => state.test)
    // const {count} = testState;

    // const DisplayUser = () => {
    //     return ( user
    //         ? <div>
    //             <div>{user.id}</div>
    //             <div>{user.pseudo}</div>
    //             <div>{user.email}</div>
    //             <div>{user.age}</div>
    //             <div>{user.status}</div>
    //             <img src={user.avatar} alt="profile_img"></img>
    //         </div>
    //         : <div></div>)
    // }

    // useEffect( () => {
    //     const getProfil = async () => {
    //         const response = await fetch("http://localhost:9000/profil/", {
    //             method: "GET",
    //             headers: {token: localStorage.token}
    //         })
    //         const parseRes = await response.json();
    //         dispatch( getUser(parseRes) )
    //         console.log('yolo')
    //     }
    //     getProfil();
    // }, [dispatch])

    return (
        <div className="about">
            {/* <h1>Count: {count}</h1> */}
            <p>Faire une présentation avec photos</p>
            {/* <DisplayUser/>
            <div>Count: {count}</div>
            <button onClick={ () => { dispatch(getTest()) }}>+</button> */}
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