export const getUser = async (state, action) => {
    switch(action.type) {
        case 'GET_USER':
            const response = await fetch("http://localhost:9000/profil/", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const parseRes = await response.json();
            console.log(parseRes)
            return {...state, parseRes};
        default:
            return state;
    }
}