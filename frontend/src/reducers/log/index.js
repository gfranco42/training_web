import { ACTIONS } from '../../constants/constants'

const initialState = {
    log: false
}

export const log = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.LOG:
            return {log: action.bool};
        default:
            return state;
    }
}
