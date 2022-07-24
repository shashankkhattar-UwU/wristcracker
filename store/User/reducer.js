import { userActionTypes } from "./action";

const userInitialState={
    username: '',
    jwt: ''
}

export default function reducer(state=userInitialState, action){
    switch (action.type) {
        case userActionTypes.SET_NAME:
            return {...state, username: action.payload}
        case userActionTypes.SIGN_IN:
            localStorage.setItem('user', JSON.stringify({username: action.payload.username, jwt: action.payload.jwt}));
            return {...state, username: action.payload.username, jwt: action.payload.jwt}
        case userActionTypes.SIGN_OUT:
            localStorage.removeItem('user');
            return {userInitialState}
        case userActionTypes.REFRESH_TOKEN:
            return {...state, jwt: action.payload}
        default:
            return state
    }
}