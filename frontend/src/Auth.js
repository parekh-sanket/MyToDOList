import React, { useReducer, useContext, useEffect } from 'react';
import jwt from 'jwt-decode'
import axios from "axios"

const authContext = React.createContext()

// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "https://sanket-todolist-backend.herokuapp.com/api/";

const initialState = {
    isAuth: false,
    user: null
}

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem("Token", JSON.stringify(action.payload));
            console.log(jwt(action.payload.access).username)
            return {
                ...state,
                isAuth: true,
                user: jwt(action.payload.access).username
            };

        case 'LOGGEDIN':
            const token = localStorage.getItem("Token");

            const retunObj = token === null ?
                (initialState) : {
                    ...state,
                    isAuth: true,
                    user: jwt(JSON.parse(token).access).username
                }
            return retunObj;

        case "LOGOUT":
            localStorage.clear();
            return {
                ...state,
                isAuth: false,
                user: null,
            };

        default:
            return state;
    }
}


const Auth = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, initialState);

    console.log(authState.isAuth, authState.user)

    useEffect(() => {
        const token = localStorage.getItem("Token");
        console.log("token",token);

        if(token){
            let data1 = {"token"  : JSON.parse(token).access}
            axios.post(baseURL + 'token/verify/',JSON.stringify(data1),{
                headers : {
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                dispatch({
                    "type": "LOGGEDIN"
                })
            }).catch((err)=>{
                localStorage.clear()
                console.log(err)
                dispatch({
                    "type": "LOGGEDIN"
                })
            })
        }
    }, []);

    return <>
        <authContext.Provider
            value={{
                authState,
                dispatch
            }}>
            {children}
        </authContext.Provider>
    </>;
};

export const useAuthContext = () => {
    return useContext(authContext)
}

export default Auth;

