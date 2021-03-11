import { ACTIONS } from '../../constants/constants'

const initialState = {
    user: null
}

export const user = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.SET_USER:
            return {...state, user: action.user};
        case ACTIONS.DELETE_USER:
            return {user: null};
        default:
            return state;
    }
}