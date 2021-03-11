import { ACTIONS } from "../constants/constants"

export const setUser = (user) => {
    return {
        type: ACTIONS.SET_USER,
        user: user,
    }
}

export const setAvatar = (img) => {
    return {
        type: ACTIONS.SET_AVATAR,
        user: img,
    }
}

export const deleteUser = (user) => {
    return {
        type: ACTIONS.DELETE_USER,
        user: user,
    }
}

export const setLog = (bool) => {
    return {
        type: ACTIONS.LOG,
        bool: bool,
    }
}

export const getTest = () => {
    return {
        type: ACTIONS.TEST
    }
}