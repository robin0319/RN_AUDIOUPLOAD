import {
    UPLOAD_AUDIO,
    CHECKED_AUDIO,
    CHANGE_ORDER
} from '../actions/types'

const INITIAL_STATE = {
    audioList: [],
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPLOAD_AUDIO:
            return { audioList: [...state.audioList, action.payload] }

        case CHECKED_AUDIO:
            audioList = [];
            for (i = 0; i < state.audioList.length; i ++) {
                audioList[i] = state.audioList[i];
            }
            audioList[action.payload].checked = !audioList[action.payload].checked;
            return {...state, audioList}

        case CHANGE_ORDER:
            temp = state.audioList[action.payload.index1];
            audioList = [];
            for (i = 0; i < state.audioList.length; i ++) {
                if (i == action.payload.index1) {
                    audioList[i] = state.audioList[action.payload.index2];
                } else {
                    audioList[i] = state.audioList[i];
                }
            }
            audioList[action.payload.index2] = temp;
            return {...state, audioList}

        default:
            return state
    }
}