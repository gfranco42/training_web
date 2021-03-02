import { combineReducers } from 'redux'

// reducers
import { user } from './users'
import { ytVideos } from './ytVideos'
import { test } from './test'
import { log } from './log'

export const initStore = combineReducers({
    user,
    ytVideos,
    test,
    log,
})