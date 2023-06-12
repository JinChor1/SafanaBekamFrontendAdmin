import { createContext, useEffect, useReducer } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return {
                user: action.payload, loading: false
            }
        case 'LOGOUT': 
            return {
                user: null, loading: false
            }
        default:
            return state
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null, // initial value,
        loading: true
    })

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))

        if (user){
            dispatch({ type: 'LOGIN', payload: user })
        } else {
            dispatch({ type: 'LOGOUT' })
        }
    },[])

    // dispatch({type: 'SET_TEST', payload: [{},{}]}) <-- action
    console.log('authcontext: ', state)

    return(
        <AuthContext.Provider value={{...state,dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}
