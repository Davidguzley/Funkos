import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    console.log(action.type)
    console.log(state)
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
             return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('AuthContext state', state)

    return (
        <AuthContextProvider.Provider value={{...state, dispatch}}>
            { children }
        </AuthContextProvider.Provider>
    )
}