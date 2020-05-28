import authReducer from './authReducer'
import projectReducer from './projectReducer'
import updateReducer from './updateReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import usernameReducer from './usernameReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    update: updateReducer,
    usernames: usernameReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;