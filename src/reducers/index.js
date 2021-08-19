  
import { combineReducers } from 'redux'
import AudioUploadReducer from './AudioUploadReducer'

export default combineReducers( {
  audioState: AudioUploadReducer,
})