import React, { Component } from 'react';

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

export class ShowUsers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: null,
            loading: true
        }

    }

    async componentDidMount() {
        try {
            const response = await fetch("http://localhost:9000/users");
            const data = await response.json();
            this.setState({users: data, loading: false});
        } catch (error) {
            console.error(error.message);
        }
    }
    
    render () {
        if (this.state.loading === true)
            return <div className="adminform--error">Loading...</div>
        else if (this.state.users === null)
            return <div className="adminform--error">Aucun utilisateur enregistré !</div>
        else
            return (
                <table className="adminform__table">
                    <caption className="adminform__table--title">Liste des utilisateurs :</caption>
                    <thead>
                        <tr className="adminform__table__header">
                            <th className="adminform__table__header--columntitle left">Prénom</th>
                            <th className="adminform__table__header--columntitle">Pseudo</th>
                            <th className="adminform__table__header--columntitle">Email</th>
                            <th className="adminform__table__header--columntitle">Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user) =>
                        <tr className="adminform__table__body" key={user.id}>
                            <th className="adminform__table__body--cell left">{user.name}</th>
                            <th className="adminform__table__body--cell">{user.pseudo}</th>
                            <th className="adminform__table__body--cell">{user.email}</th>
                            <th className="adminform__table__body--cell">{user.status}</th>
                            <th className="adminform__table__body--button"><button type="button" name="edit">Modifier</button></th>
                            <th className="adminform__table__body--button"><button type="button" name="delete">Supprimer</button></th>
                        </tr>
                        )}
                    </tbody>
                </table>
            )
    }
};


// export const ShowUsers = () => {
//     const [users, setUsers] = useState([]);
//     console.log("users: " + users);

//     const getUsers = async () => {

//         try {
//             const response = await fetch("http://localhost:9000/users");
//             const jsonData = await response.json();

//             setUsers(jsonData);
//         } catch (error) {
//             console.error(error.message);
//         }
//     };
    
//     useEffect(() => {
//         getUsers();
//     }, []);

//     console.log(users);
//     return (
//         <div className="adminform__table">
//             <h2 className="adminform__table--title">Liste des utilisateurs :</h2>
//             <div className="adminform__table--columntitle">Prénom</div>
//             <div className="adminform__table--columntitle">Pseudo</div>
//             <div className="adminform__table--columntitle">Email</div>
//             <div className="adminform__table--columntitle">Status</div>
//             {users.map((user, index) =>
//             <div className="adminform__table--row" key={index}>
//                 <div className="cell">{user.name}</div>
//                 <div className="cell">{user.pseudo}</div>
//                 <div className="cell">{user.email}</div>
//                 <div className="cell">{user.status}</div>
//             </div>
//             )}
//         </div>
//     )
// };
