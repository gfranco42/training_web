import { ACTIONS } from '../../constants/constants'

const initialState = {
    count: 0,
}

export const test = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.TEST:
            const newCount = state.count + 1;
            sessionStorage.setItem("Count", newCount)
            return {count: newCount};
        default:
            return state;
    }
}
