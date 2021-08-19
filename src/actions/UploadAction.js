import {
    UPLOAD_AUDIO,
    CHECKED_AUDIO,
    CHANGE_ORDER
} from './types'

export const uploadAudioAction = (data)=> async (dispatch) => {
    dispatch({
        type: UPLOAD_AUDIO,
        payload: data
    });
}

export const checkedAudio = (index) => async (dispatch) => {
    dispatch({
        type: CHECKED_AUDIO,
        payload: index,
    })
}

export const changeOrder = (index1, index2) => async (dispatch) => {
    dispatch({
        type: CHANGE_ORDER,
        payload: {
            index1,
            index2,
        }
    });
}