export const ytVideos = (state = 'all videos', action) => {
    switch(action.type){
        case 'GET_YTVIDEOS':
            return state + ' yolo';
        default:
            return state;
    }
}