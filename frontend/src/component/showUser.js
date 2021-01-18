import React, { Component } from 'react';

/* COMPONENT */

/* MODULES */
import { EditPopup } from './editUser'
import _ from 'lodash';

// FUNCTIONS
import {translate_date} from "../utils"


 /******************************************************** EXAMPLE ********************************************************/
// class Child extends Component {
//     render() {
//         return (
//             <div>
//                 <div>I am Child</div>
//                 <input type="text" 
//                  placeholder="Write text" onChange={(e) => this.props.updateTextCB(e, 'yolo')} />
//             </div>
//         )
//     }
// }

// class Parent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {text: "Initial Text"}
//         // this.updateText1 = this.updateText1
//     }

//     updateText1 = (e, text) => {
//         e.preventDefault();
//         this.setState({ text: text })
//     }

//     render() {
//         return (
//             <div>
//                 <div>I am Parent</div>
//                 <div>{this.state.text}</div>
//                 <Child updateTextCB={this.updateText1} />
//             </div>
//         )
//     }
// }

 /******************************************************** EXAMPLE ********************************************************/






/* CLASS SHOWUSERS */
export class ShowUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: null, 
            loading: true,
            age: "",
            pseudo: "",
            email: "",
            status: ""
        }
    }

    // UPDATE AN INFORMATION OF ONE USER
    updateUserInfo = (e, type) => {
        e.preventDefault();
        try {
            if (type === "age")
                this.setState({age: e.target.value});
            else if (type === "pseudo")
                this.setState({pseudo: e.target.value});
            else if (type === "email")
                this.setState({email: e.target.value});
            else if (type === "status")
                this.setState({status: e.target.value});
        } catch (error) {
            console.error(error.message);        
        }
    }
    
    // DELETE USER
    DeleteUsers = async (e, id) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:9000/users/${id}`, {
                    method: "DELETE"
                });
            const data = this.state.users;
            this.setState({users: data.filter(user => user.id !== id)});
            if (response === null)
                console.log(response);
        } catch (error) {
            console.error(error.message); 
        }
    }

    // UPDATE USER LIST FROM DB
    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:9000/users");// recup les infos de la DB
            const data = await response.json();                         // les infos sont lisibles en json
            const newData = _.sortBy(data, 'name', function(n) {
                return Math.sin(n);
            });
            this.setState({users: newData, loading: false});               // on met a jour le state local pour pouvoir afficher
            if (response === null)
                console.log(response);
        } catch (error) {
            console.error(error.message);
        }
    }

    render () {
        if (this.state.loading === true)
            return <div className="adminform--error">Loading...</div>
        else if (this.state.users === null || this.state.users.length === 0)
            return <div className="adminform--error">Aucun utilisateur enregistré !</div>
        else {
            return (
                <table className="adminform__table">
                    <caption className="adminform__table--title">Liste des utilisateurs: </caption>
                    <thead>
                        <tr className="adminform__table__header">
                            <th className="adminform__table__header--columntitle left">Pseudo</th>
                            <th className="adminform__table__header--columntitle">Âge</th>
                            <th className="adminform__table__header--columntitle">Email</th>
                            <th className="adminform__table__header--columntitle">Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) =>
                            <tr className="adminform__table__body" key={user.id}>
                                <th className="adminform__table__body--cell left">{user.pseudo}</th>
                                <th className="adminform__table__body--cell">{translate_date(user.age)}</th>
                                <th className="adminform__table__body--cell">{user.email}</th>
                                <th className="adminform__table__body--cell">{user.status}</th>
                                <th className="adminform__table__body--button-cell">
                                    <EditPopup
                                        updateUserInfo={this.updateUserInfo}
                                        userId={user.id}
                                        age={this.state.age}
                                        pseudo={this.state.pseudo}
                                        email={this.state.email}
                                        status={this.state.status}
                                        users={this.state.users}
                                    />
                                </th>
                                <th className="adminform__table__body--button-cell">
                                    <button type="button" name="delete"
                                    onClick={(e) => this.DeleteUsers(e, user.id, )}
                                    className="adminform__table__body--button">
                                        Supprimer
                                    </button>
                                </th>
                            </tr>
                        )}
                    </tbody>
                </table>
            )
        }
    }
};
