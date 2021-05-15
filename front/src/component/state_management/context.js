import React,{createContext,useReducer} from 'react'
import Reducer from './reducer';

export const Context = createContext();

const ContextProvider = (props) => {
    const initialState = {
        loading : false,
        login : false
    };
    const [dataContext,dispatch] = useReducer(Reducer,initialState);

    return (
        <Context.Provider value = {{
                dataContext,
                dispatch
            }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider