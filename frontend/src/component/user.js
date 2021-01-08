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
            users: [],
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
            return <div className="adminform--loading">Loading...</div>
        else if (this.state.users === null)
            return <div className="adminform--nouser">Aucun utilisateur enregistré !</div>
        else
            return (
                <div className="adminform__table">
                    <h2 className="adminform__table--title">Liste des utilisateurs :</h2>
                    <div className="adminform__table--columntitle">Prénom</div>
                    <div className="adminform__table--columntitle">Pseudo</div>
                    <div className="adminform__table--columntitle">Email</div>
                    <div className="adminform__table--columntitle">Status</div>
                    <div className="adminform__table--columntitle">Modifier</div>
                    <div className="adminform__table--columntitle">Supprimer</div>
                    {this.state.users.map((user) =>
                    <div className="adminform__table--row" key={user.id}>
                        <div className="cell">{user.name}</div>
                        <div className="cell">{user.pseudo}</div>
                        <div className="cell">{user.email}</div>
                        <div className="cell">{user.status}</div>
                        <div className="cell">Modifier</div>
                        <div className="cell">Supprimer</div>
                    </div>
                    )}
                </div>
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
