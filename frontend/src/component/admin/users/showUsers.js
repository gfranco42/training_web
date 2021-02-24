import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

/* MODULES */
import EditUser from './editUser'
import _ from 'lodash';

// FUNCTIONS
import {translate_date} from "../../../utils"


/* CLASS SHOWUSERS */

const ShowUsers = (display) => {

    const [users, setUsers] = useState()
    const [userTmp, setUserTmp] = useState()
    const [sort, setSort] = useState({sorted: true, last: ""})
    const [loading, setLoading] = useState(true)

    // UPDATE AN INFORMATION OF ONE USER
    const updateUserInfo = (e, type) => {
        e.preventDefault();
        setUserTmp({...userTmp, [e.target.name]: [e.target.value]})
    }

    const tableSort = (e, type) => {
        e.preventDefault();
        const {sorted, last} = sort;
        const data = users;
        const newState = _.sortBy(data, [type]);
        if (sorted === true || last !== type) {
            setUsers(newState)
            setLoading(false)
            setSort({sorted: false, last: type})
        }
        else if (sorted === false || last === type) {
            setUsers(newState.reverse())
            setLoading(false)
            setSort({sorted: true, last: type})
        }
    }
    
    // DELETE USER
    const deleteUsers = async (e, id) => {
        e.preventDefault();
        const response = await fetch(
            `http://localhost:9000/users/${id}`, {
                method: "DELETE"
            });
        if (response === null)
            console.log(response);
        const data = users;
        setUsers(data.filter(user => user.id !== id))
        const parseRes = await response.json();// Message: "Modification reussi !"

        // TOAST
        parseRes === "Utilisateur supprimé !" ?
            toast.success(parseRes, {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            })
            : toast.error(parseRes, {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            });
    }

    // UPDATE USER LIST FROM DB
    
    useEffect( () => {
        const getUsers = async () => {
            const response = await fetch("http://localhost:9000/users");// recup les infos de la DB
            if (response === null)
                console.log(response);
            const data = await response.json();                         // les infos sont lisibles en json
            const newData = _.sortBy(data, 'name', function(n) {
                return Math.sin(n);
            });
            setUsers(newData)
            setLoading(false)
        }
        getUsers();
    }, [])


    // console.log(userTmp)
    if (loading === true)
        return <div style={{display: display.display}}>Chargement...</div>
    else if (users === null || users.length === 0)
        return <div style={{display: display.display}}>Aucun utilisateur enregistré !</div>
    else {
        return (
            <table className="adm-users" style={{display: display.display}}>
                <caption className="adm-users--title">Liste des utilisateurs: </caption>
                <thead>
                    <tr className="adm-users__tab-title">
                        <th onClick={ (e) => {tableSort(e, "pseudo")}}>Pseudo</th>
                        <th onClick={ (e) => {tableSort(e, "age")}}>Âge</th>
                        <th onClick={ (e) => {tableSort(e, "email")}}>Email</th>
                        <th onClick={ (e) => {tableSort(e, "status")}}>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map( (user) =>
                        <tr className="adm-users__tab-rows" key={user.id}>
                            <th className="">{user.pseudo}</th>
                            <th className="">{translate_date(user.age)}</th>
                            <th className="">{user.email}</th>
                            <th className="">{user.status}</th>
                            <th>
                                <EditUser
                                    updateUserInfo={updateUserInfo}
                                    // userTmp={userTmp}
                                    user={user}
                                    // userId={user.id}
                                    // age={this.state.age}
                                    // pseudo={this.state.pseudo}
                                    // email={this.state.email}
                                    // status={this.state.status}
                                    // users={this.state.users}
                                />
                            </th>
                            <th>
                                <button type="button" name="delete"
                                    onClick={(e) => deleteUsers(e, user.id)}
                                    className="adm-users--button">
                                    Supprimer
                                </button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }
};

export default ShowUsers;
