import React, { useState } from 'react';
import { toast } from 'react-toastify';

/* POPUP */
import Popup from 'reactjs-popup';

/* IMG */

/* ADMIN EDIT POPUP */
const EditUser = (props) => {
    
    const [user, setUser] = useState(props.user)

    const editUser = async (e, id) => {
        e.preventDefault();
        const {age, pseudo, email, status} = user;
        let body = {age, pseudo, email, status};
        console.log(user)
        console.log(body)
        console.log('yolo')
        const response = await fetch(`http://localhost:9000/users/${id}`, {
            method: 'PUT',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(body) 
        });
        if (response === null)
            console.log(response);
        const parseRes = await response.json();// Message: "Modification reussi !"
        parseRes === 200 ?
            toast.success("Modification réussie !", {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            })
            : toast.error("Echec de la modification !", {
                className: "toast",
                position: "top-center",
                hideProgressBar: true,
                closeButton: false,
            });
    }

    const handleChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name]: e.target.value})
    }

    return (
        <Popup
            trigger={<button className="adm-users--button">Modifier</button>}
            modal
            nested
        >
            {close => (
                <div className="edit-popup">
                    <button className="edit-popup--closeCross" onClick={close}>
                        &times;
                    </button>
                    <div className="edit-popup--title">Modifier un utilisateur</div>
                    <form onSubmit={(e) => {editUser(e, user.id)}}>
                        <label>
                            Âge: 
                            <input type="date"
                                value={user.age}
                                onChange={handleChange}
                                name="age">
                            </input>
                        </label>
                        <label>
                            Pseudo: 
                            <input type="text"
                                value={user.pseudo}
                                onChange={handleChange}
                                name="pseudo">
                            </input>
                        </label>
                        <label>
                           Email: 
                            <input type="text"
                                value={user.email}
                                onChange={handleChange}
                                name="email">
                            </input>
                        </label>
                        <label>
                            Statut:
                            <div className="edit-popup--select-field">
                                <select value={user.status}
                                    onChange={handleChange}
                                    name="status">
                                    <option value="">Statut de l'utilisateur...</option>
                                    <option value="admin">Admin</option>
                                    <option value="common">Common</option>
                                </select>
                            </div>
                        </label>
                        <input
                            className="edit-popup--submit"
                            type="submit"
                            value="Modifier"
                            onClick={(e) => {
                                editUser(e, user.id)
                                close()
                            }}>
                        </input>
                    </form>
                    <button className="edit-popup--closeBtn" onClick={close}>Close</button>
                </div>
            )}
        </Popup>
    )
}

export default EditUser;