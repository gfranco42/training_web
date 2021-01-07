import React, { useState, useEffect } from 'react';

export const AddUser = async (e, props) => {
    e.preventDefault();
    try {
        const {firstname, pseudo, email, status} = props;
        const body = {firstname, pseudo, email, status};
        const response =  await fetch(
            "http://localhost:9000/users", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)
            }
        );
        console.log(response);
        window.location = '/admin';
    } catch (error) {
       console.error(error.message); 
    }
};

export const ShowUsers = () => {
    const [users, setUsers] = useState([]);

    const getUsers = async () => {

        try {
            const response = await fetch("http://localhost:9000/users");
            const jsonData = await response.json();

            setUsers(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    };
    
    useEffect(() => {
        getUsers();
    }, []);

    console.log(users);
    return (
        <div className="dbform__table">
            <h2 className="dbform__table--title">Liste des utilisateurs :</h2>
            <div className="dbform__table--columntitle">Prénom</div>
            <div className="dbform__table--columntitle">Pseudo</div>
            <div className="dbform__table--columntitle">Email</div>
            <div className="dbform__table--columntitle">Status</div>
            {users.map((user, index) =>
            <div className="dbform__table--row" key={index}>
                <div className="cell">{user.name}</div>
                <div className="cell">{user.pseudo}</div>
                <div className="cell">{user.email}</div>
                <div className="cell">{user.status}</div>
            </div>
            )}
        </div>
    )
};
