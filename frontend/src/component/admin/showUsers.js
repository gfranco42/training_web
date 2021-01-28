import React, { Component } from 'react';

/* MODULES */
import { EditPopup } from './editUser'
import _ from 'lodash';

// FUNCTIONS
import {translate_date} from "../../utils"


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
            status: "",
            sort: true,
            last: ""
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

    tableSort = (e, type) => {
        e.preventDefault();
        const {sort, last} = this.state;
        const data = this.state.users;
        const newState = _.sortBy(data, [type]);
        if (sort === true || last !== type) {
            this.setState({
                users: newState,
                loading: false,
                sort: false,
                last: type
            });               // on met a jour le state local pour pouvoir afficher
        }
        else if (sort === false || last === type) {
            this.setState({
                users: newState.reverse(),
                loading: false,
                sort: true,
                last: type
            });               // on met a jour le state local pour pouvoir afficher
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
            if (response === null)
                console.log(response);
            const data = this.state.users;
            this.setState({users: data.filter(user => user.id !== id)});
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
            return <div className="">Chargement...</div>
        else if (this.state.users === null || this.state.users.length === 0)
            return <div className="">Aucun utilisateur enregistré !</div>
        else {
            return (
                <table className="">
                    <caption className="">Liste des utilisateurs: </caption>
                    <thead>
                        <tr className="">
                            <th className="" onClick={ (e) => {this.tableSort(e, "pseudo")}}>Pseudo</th>
                            <th className="" onClick={ (e) => {this.tableSort(e, "age")}}>Âge</th>
                            <th className="" onClick={ (e) => {this.tableSort(e, "email")}}>Email</th>
                            <th className="" onClick={ (e) => {this.tableSort(e, "status")}}>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map( (user) =>
                            <tr className="" key={user.id}>
                                <th className="">{user.pseudo}</th>
                                <th className="">{translate_date(user.age)}</th>
                                <th className="">{user.email}</th>
                                <th className="">{user.status}</th>
                                <th className="">
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
                                <th className="">
                                    <button type="button" name="delete"
                                    onClick={(e) => this.DeleteUsers(e, user.id)}
                                    className="">
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
