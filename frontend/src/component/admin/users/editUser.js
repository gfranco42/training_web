import React, { Component } from 'react';
import { toast } from 'react-toastify';

/* POPUP */
import Popup from 'reactjs-popup';

/* IMG */

/* ADMIN EDIT POPUP */
class EditUser extends Component {

    editUser = async (e, id) => {
        e.preventDefault();
        try {
            this.setState({loading: true});
            const {age, pseudo, email, status} = this.props;
            let body = {age, pseudo, email, status};
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
        } catch (error) {
           console.error(error.message); 
        }
    }

    render() {
        if (this.props.loading === true)
            return <div className="adminform--error">Loading...</div>
        else {
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
                            <form onSubmit={(e) => {this.editUser(e, this.props.userId)}}>
                                <label>
                                    Âge: 
                                    <input type="date"
                                        value={this.props.users.age}
                                        onChange={(e) => {this.props.updateUserInfo(e, "age")}}
                                        name="age">
                                    </input>
                                </label>
                                <label>
                                    Pseudo: 
                                    <input type="text"
                                        value={this.props.users.pseudo}
                                        onChange={(e) => {this.props.updateUserInfo(e, "pseudo")}}
                                        name="pseudo">
                                    </input>
                                </label>
                                <label>
                                   Email: 
                                    <input type="text"
                                        value={this.props.users.email}
                                        onChange={(e) => {this.props.updateUserInfo(e, "email")}}
                                        name="email">
                                    </input>
                                </label>
                                <label>
                                    Statut:
                                    <div className="edit-popup--select-field">
                                        <select value={this.props.users.status}
                                        onChange={(e) => {this.props.updateUserInfo(e, "status")}}>
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
                                        this.editUser(e, this.props.userId)
                                        close()
                                    }}>
                                </input>
                            </form>
                            <button className="edit-popup--closeBtn" onClick={close}>Close</button>
                        </div>
                    )}
            </Popup>
        )}
    }
}

export {
    EditUser,
};