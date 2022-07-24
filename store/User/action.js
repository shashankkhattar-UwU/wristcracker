export const userActionTypes={
    SET_NAME: "SET_NAME",
    SIGN_IN: "SIGN_IN",
    SIGN_OUT: "SIGN_OUT",
    REFRESH_TOKEN: "REFRESH_TOKEN"
}

export const setName=(payload)=>{
    return{
        type: userActionTypes.SET_NAME,
        payload: payload
    };
}
export const signIn=(payload)=>{
    return{
        type: userActionTypes.SIGN_IN,
        payload: payload
    };
}
export const signOut=()=>{
    return{
        type: userActionTypes.SIGN_OUT,
    };
}
export const refreshToken=(payload)=>{
    return{
        type: userActionTypes.REFRESH_TOKEN,
        payload: payload
    };
}