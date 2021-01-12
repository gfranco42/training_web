export const AddUser = async (e, state) => {
    e.preventDefault();
    try {
        const {firstname, pseudo, email, status} = state;// rendre lecriture + propre
        const body = {firstname, pseudo, email, status};// creation d'un objet 'users'
        const response =  await fetch(                  // recup le resultat d'un 'POST'
            "http://localhost:9000/users", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(body)              // on fait en sorte que ce soit lisible en json
            }
        );
        window.location.reload();
        if (response === null)
            console.log(response);
    } catch (error) {
       console.error(error.message); 
    }
};