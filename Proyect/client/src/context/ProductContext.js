import { createContext, useReducer } from 'react';

export const ProductContext = createContext();

export const productReducer = (state, action) => {
    console.log(action.type)
    console.log(state)
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { products: action.payload }
        case 'CREATE_PRODUCT':
            return { products: [action.payload, ...state.products] }
        default:
            return state
    }
}

export const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, {
        products: null
    })

    console.log('ProductContext state', state)

    return (
        <ProductContextProvider.Provider value={{...state, dispatch}}>
            { children }
        </ProductContextProvider.Provider>
    )
}