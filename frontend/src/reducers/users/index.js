import { ACTIONS } from '../../constants/constants'

const initialState = {
    user: null
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.GET_USER:
            return {...state, user: action.user};
        case ACTIONS.DELETE_USER:
            return {user: null};
        default:
            return state;
    }
}


// .  FAIRE LE FETCH DANS LE COMPONENT DIRECTEMENT

//      MOFIIER LE STATE ICI EN PASSANT LE USER EN PARAMETRES

//      UNE FONCTION PAR REDUCER