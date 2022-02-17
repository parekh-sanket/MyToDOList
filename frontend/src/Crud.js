import React, { useContext, useEffect, useReducer, createContext } from 'react';
import axios from "axios"
import { useAuthContext } from './Auth';
import TaskUpdate from './components/taskupdate';

// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "https://sanket-todolist-backend.herokuapp.com/api/";
const crudContext = createContext()

const initialState = {
    data: "",
    loading: false,
    error: null,
    updateTask: false,
    taskForUpdate: {}
}

const crudReducer = (state, action) => {
    switch (action.type) {

        // LOGGEDIN_FATCH 
        case "LOGGEDIN_FATCH_LOADING":
            return {
                ...state,
                loading: true
            }
        case "LOGGEDIN_FATCH":
            return ({
                ...state,
                data: action.payload,
                loading: false,
            });
        case "LOGGEDIN_FATCH_ERROR":
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        // add task 

        // using this whole the list refresh 
        // case "ADD_TASK_LOADING":
        //     return ({
        //         ...state,
        //         loading: true
        //     });

        case "ADD_TASK":
            const predata = state.data
            return ({
                ...state,
                data: [...predata, { ...action.payload }],
            });
        case "ADD_TASK_ERROR":
            return ({
                ...state,
                error: action.payload,
            });

        // update
        case "UPDATE_TASK_REQUEST":
            return ({
                ...state,
                updateTask: true,
                taskForUpdate: state.data.filter((item) => item.id === action.payload)[0]
            });

        case "UPDATE_TASK_CLOSE":
            return ({
                ...state,
                updateTask: false,
            });

        default:
            return state;
    }
}

const Crud = ({ children }) => {

    const [data, dispatch] = useReducer(crudReducer, initialState);
    const { authState } = useAuthContext()



    useEffect(() => {
        if (localStorage.getItem("Token")) {
            dispatch({
                type: "LOGGEDIN_FATCH_LOADING"
            })

            axios.get(baseURL + 'todo-list/', {
                headers: {
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("Token")).access}`
                }
            }).then((res) => {
                console.log(res.data);
                dispatch({
                    ...data,
                    type: "LOGGEDIN_FATCH",
                    payload: res.data
                })
            }).catch((err) => {
                dispatch({
                    ...data,
                    type: "LOGGEDIN_FATCH_ERROR",
                    payload: err["response"] ? err.response.data : "Network Error"
                })
            })
        }
    }, [authState.isAuth])

    return <>
        <crudContext.Provider
            value={{
                data,
                dispatch
            }}
        >
            {data.updateTask && <TaskUpdate />}
            {children}
        </crudContext.Provider>
    </>;
};

export const useCrudContext = () => {
    return useContext(crudContext);
}

export default Crud;
