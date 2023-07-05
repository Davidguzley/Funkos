import { createContext, useReducer } from 'react';

export const ProductContext = createContext();

export const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { products: action.payload }
        case 'CREATE_PRODUCT':
            return { products: [action.payload, ...state.products] }
        case 'DELETE_PRODUCT':
            return {
                products: state.products.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_PRODUCT':
            return {
                products: state.products.map((product) => {
                if (product._id === action.payload._id) {
                    return action.payload;
                }
                return product;
                })
            }
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
        <ProductContext.Provider value={{...state, dispatch}}>
            { children }
        </ProductContext.Provider>
    )
}