import { ACTIONS } from '../../constants/constants'

const initialState = {
    count: 0,
}

export const test = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.TEST:
            return {count: state.count + 1};
        default:
            return state;
    }
}
