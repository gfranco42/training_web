import { combineReducers } from 'redux'

// reducers
import { getUser } from './users'
import { getYtVideos } from './ytVideos'

const allReducers = combineReducers({
    getUser,
    getYtVideos,
})

export default allReducers;